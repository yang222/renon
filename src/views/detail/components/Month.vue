<template>
  <div class="pb-10">
    <div class="flex items-center">
      <ul class="flex justify-start">
        <li
          :class="`px-6 h-8 border border-gray-900 flex justify-center items-center text-xs cursor-pointer border-r-0 last:border-r ${
            active == item.id ? 'font-extrabold text-theme' : ' font-normal'
          }`"
          @click="handleTab(item.id)"
          v-for="(item, index) in menuList2"
          :key="index"
        >
          {{ item.title }}
        </li>
      </ul>
      <!-- <el-icon class="ml-6 cursor-pointer"><ArrowRight /></el-icon> -->
    </div>
    <DataChange :active="'month'" @change="changeDate" />
    <div class="w-full h-[300px]">
      <div id="echartMonth" class="w-full h-full relative"></div>
      <div class="text-xs text-black flex justify-end flex-wrap gap-3 mt-2">
        <div
          v-for="(item, index) in state.seriesData"
          :key="index"
          class="bg-white px-4 h-7 flex justify-center gap-2 shadow-button2 rounded items-center"
        >
          <span
            :style="`background:${item.color}`"
            :class="`block w-[10px] h-[10px] rounded-sm`"
          ></span>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import * as echarts from "echarts";
import DataChange from "@/components/dataChange.vue";
import moment from "moment";
import { queryHistory3 } from "@/api";
import { totalMonthCharge } from "@/api/devices";
import { handleTime } from "@/utils/data";
const color = [
  "rgba(86, 194, 113",
  "rgba(255,75,129",
  "rgba(000,224,225",
  "rgba(253,208,21",
  "rgba(000,122,204",
  "rgba(254,197,255",
];
const emits = defineEmits(["tabChange"]);
const props = defineProps({
  active: {
    type: String,
    default: "day",
  },
  devId: {
    type: String,
    default: "day",
  },
});
const state = reactive({
  echartsData: [],
  seriesData: [
    {
      name:"Accumulated charging capacity",
      color:"rgba(86, 194, 113,0.7)"
    },
     {
      name:"Cumulative discharge quantity",
      color:"rgba(255,75,129,0.6 )"
    }
  ],
  myChart: null,
  chartField: [
    {
      nickname: "M_cur",
      comment: "电流",
      unit: "kWH",
      min: -3000,
      max: 3000,
      type: "number",
      format: "float",
      alias: "Accumulated charging capacity",
    },
    {
      nickname: "M_soh",
      comment: "SOH",
      unit: "kWH",
      min: 0,
      max: 100,
      type: "number",
      format: "float",
      alias: "Cumulative discharge quantity",
    },
  ],
});
const query = reactive({
  date: moment().format("YYYY-MM"),
  devId: "",
  devType: "",
});
const menuList2 = ref([
  { title: "Day", id: "day" },
  { title: "Month", id: "month" },
  { title: "Year", id: "year" },
  //   { title: "Total", id: 4 },
]);

// watch(
//   () => props.active,
//   (news) => {
//     if (news == "month") {
//       setTimeout(() => {
//         loadData();
//       }, 300);
//     }
//   }
// );

//获取初始数据
const loadData = async () => {
  const { Totalday, lastDaty } = handleTime(props.active, query.date);
  const res = await totalMonthCharge({
    devId: props.devId,
    Totalday:Totalday<0?0:Totalday ,
    lastDaty: lastDaty,
  });
  console.log(res)
  if(!res){
    return 
  }
  let arr = [];
  for (let i in res) {
    arr.unshift(res[i]);
  }
  console.log(arr,'arr')
  state.echartsData = arr;
  drawLine();
};

const changeDate = (data) => {
  query.date = data.date;
  loadData();
};
const handleTab = (type) => {
  emits("tabChange", type);
};
const drawLine = () => {
  let arr1 = state.echartsData;
  let xMonthData = arr1.map((item) => {
    return item.time;
  });
  let yData = arr1.map((item) => {
    return item.value;
  });

  let TData = xMonthData;
  const option = {
    color: ["#C6EADC"],
    // legend: {
    //   // data: this.selectPar,
    //   selectedMode: false,
    //   textStyle: {
    //     fontSize: 12,
    //     color: "rgb(0,253,255,0.6)",
    //   },
    //   bottom: "2%",
    // },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        var relVal = params[0].name;

        for (var i = 0, l = params.length; i < l; i++) {
          relVal +=
            "<br/>" +
            params[i].marker +
            params[i].seriesName +
            " : " +
            params[i].value +
            "KWH";
        }
        return relVal;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: TData,
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000",
          width: 1,
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#000",
          fontSize: 14,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#cccc",
          width: 1,
          type: "dashed",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "kWH",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#000",
          },
        },

        splitLine: {
          show: true,
          lineStyle: {
            color: "#cccc",
            width: 1,
            type: "dashed",
          },
        },
        // nameLocation: 'middle',
        axisLabel: {
          formatter: "{value}",
        },
        // nameGap: 70,
      },
      {
        type: "value",
        name: "kWH",
        axisLine: {
          show:true,
          lineStyle: {
            color: "#000",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#cccc",
            width: 1,
            type: "dashed",
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
        // nameLocation: 'middle',
        // nameGap: 50
      },
    ],
    series: [
      {
        data: yData,
        type: "line",
        name: `Accumulated charging capacity`,
        color: "rgba(86, 194, 113 )",
        smooth: true,
        yAxisIndex: 1,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(86, 194, 113, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(86, 194, 113, 0.3), 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
        },
        symbol: "circle",
        symbolSize: 2,
      },
      {
        data: yData,
        type: "line",
        name: `Cumulative discharge quantity`,
        color: "rgba(255,75,129,0.6 )",
        smooth: true,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(255,75,129, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(255,75,129, 0.3), 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
        },
        symbol: "circle",
        symbolSize: 2,
      },
    ],
  };
  if (state.myChart) state.myChart.dispose();
  //需要获取到element,所以是onMounted的Hook
  state.myChart = echarts.init(document.getElementById("echartMonth"));
  // 绘制图表
  state.myChart.setOption(option);
  // state.myChart.resize();
};
loadData()
defineExpose({
  loadData,
});
</script>
<style lang="scss">
.el-checkbox.el-checkbox--large {
  height: 30px;
}
</style>
