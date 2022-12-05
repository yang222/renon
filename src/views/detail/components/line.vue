<template>
  <div>
    <div class="flex items-center">
      <ul class="flex justify-start">
        <li
          v-if="active == 'day'"
          @click="showDialog = true"
          class="px-6 h-8 border border-gray-900 flex justify-center items-center text-xs cursor-pointer border-r-0 last:border-r"
        >
          Paramaters
        </li>
        <li
          v-if="showMonthYear"
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
    <DataChange :active="active" @change="changeDate" />
    <div class="w-full h-[300px]">
      <div :id="echartId" class="w-full h-full relative"></div>
      <div class="text-xs text-black flex justify-end flex-wrap gap-3 mt-2">
        <div
          v-for="(item,index) in state.seriesData"
          :key="index"
          class="bg-white px-4 h-7 flex justify-center gap-2 shadow-button2 rounded items-center"
        >
          <span :style="`background:${item.color}`" :class="`block w-[10px] h-[10px] rounded-sm`"></span>
          {{item.name}}
        </div>
        
      </div>
    </div>
    <el-dialog
      v-model="showDialog"
      title="Paramaters"
      width="600px"
      @close="Cancel"
      :close-on-click-modal="false"
    >
      <div class="pt-4 px-4">
        <el-checkbox-group
          v-model="state.selectList"
          @change="checkChange"
          class="grid grid-cols-4 gap-x-4"
        >
          <el-checkbox
            v-model="selectList"
            v-for="(item, index) in chartField"
            :key="index"
            :label="item.nickname"
            size="large"
          >
            {{ item.alias ? item.alias : item.nickname }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <template #footer>
        <span class="dialog-footer w-full flex justify-between">
          <button
            @click="Cancel"
            class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md"
          >
            Cancel
          </button>
          <button
            @click="Submit"
            class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px] rounded-md"
          >
            Confirm
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import * as echarts from "echarts";
import DataChange from "@/components/dataChange.vue";
import moment from "moment";
import { queryHistory3 } from "@/api";
import { handleTime } from "@/utils/data";
const color = [
  "rgba(86, 194, 113",
  "rgba(255,75,129",
  "rgba(000,224,225",
  "rgba(253,208,21",
  "rgba(000,122,204",
  "rgba(254,197,255",
];
const yArrIndex = ["M_lv", "M_hv"];
const showDialog = ref(false);
const emits = defineEmits(["tabChange"]);
const props = defineProps({
  showMonthYear: {
    type: Boolean,
    default: true,
  },
  echartId: {
    type: String,
    default: "echart",
  },
  chartField: {
    type: Array,
    default: [],
  },
  active: {
    type: String,
    default: "day",
  },
   devId: {
    type: String,
    default: "",
  },
   devType: {
    type: String,
    default: "",
  },
});
const state = reactive({
  selectList: [],
  echartsData: [],
  seriesData:[],
  myChart:null,
});
const query = reactive({
  selectList: [],
  date: moment().format("YYYY-MM-DD"),
  devId: props.devId,
  devType: props.devType,
});
const menuList2 = ref([
  { title: "Day", id: "day" },
  { title: "Month", id: "month" },
  { title: "Year", id: "year" },
  //   { title: "Total", id: 4 },
]);

props.chartField.forEach((item,index) => {
  if(index< 4){
    state.selectList.push(item.nickname);
    query.selectList.push(item.nickname);
  }
 
});
watch(()=>props.active,(news)=>{
  if(news == 'day'){
    loadData();
  }
})

const checkChange = ()=>{
  if( state.selectList.length>4){
    ElMessage({ message: 'Select a maximum of 4', type: 'warning' });
    state.selectList = state.selectList.slice(0,4)
  }
}
//获取初始数据
const loadData = async () => {

  const { startTime, endTime } = handleTime(props.active, query.date);
  let fieldMap = {};
  query.selectList.forEach((item, index) => {
    fieldMap[item] = 1;
  });
  let fields = { ...fieldMap, time: 1 };
  let result = [];
  for (let key in fields) {
    result.push(key);
  }

  var res = await queryHistory3(query.devId, {
    limit: 20000,
    devid: query.devId,
    devtype: query.devType,
    datatype: "data",
    starttime: Number.parseInt(startTime),
    endtime: Number.parseInt(endTime),
    fields: JSON.stringify(fields),
    filter: JSON.stringify({ [result[0]]: { $exists: true } }),
    descend: true,
    skip: 0,
  });
  if (res && res.data && res.data.length) {
    res.data = res.data.sort((a, b) => {
      return a.time - b.time;
    });
    state.echartsData = res.data;
    drawLine();
  }else{
    return
  }

};
const changeDate = (data) => {
  query.date = data.date;
  loadData();
};
const handleTab = (type) => {
  emits("tabChange", type);
};
const Submit = () => {
  if(!state.selectList.length){
    ElMessage.warning("Please select");
    return
  }
  query.selectList = JSON.parse(JSON.stringify(state.selectList));
  showDialog.value = false;
  loadData();
};
const Cancel = () => {
  state.selectList = JSON.parse(JSON.stringify(query.selectList));
  showDialog.value = false;
};

const drawLine = () => {
  let Xdata = state.echartsData.map((item) => {
    return moment(new Date(item.time)).format("HH:mm");
  });
  let Ydata = [];
  let obj1 = Object.keys(state.echartsData.length != 0 && state.echartsData[0]);
  query.selectList.forEach((item, index) => {
    Ydata.push({
      name: obj1.find((a) => {
        return a == item;
      }),
      arr: state.echartsData.map((item1, index1) => {
        return item1[item];
      }),
    });
  });
  let LineData = props.chartField.filter((item) => {
    return query.selectList.includes(item.nickname);
  });
  let yAxis = [];
  let unit = [];
  let colorbb = [];
  let series = [];
  LineData.forEach((item, index) => {
    var info = item;
    unit.push(info["unit"] ? info["unit"] : "");
    colorbb.push({
      nickname: item.nickname,
      color: color[index] + ", 0.3)",
      unit: item.unit,
    });
    series.push({
      name: `${info["alias"]}`,
      type: "line",
      color: color[index] + ")",
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
                color: color[index] + ", 0.3)",
              },
              {
                offset: 0.8,
                color: color[index] + ", 0)",
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
      yAxisIndex: index,
      data: state.echartsData.map((e) => {
        return e[info["nickname"]];
      }),
    });

    //  console.log(series,'seriesseries')
  });
  state.seriesData = series;
  if (state.echartsData.length != 0) {
    Ydata.forEach((item, index) => {
      yAxis.push({
        type: "value",
        name: colorbb.find((item2) => {
          return item.name == item2.nickname;
        })
          ? colorbb.find((item2) => {
              return item.name == item2.nickname;
            }).unit
          : "",
        // min : Math.min(...item['arr']),
        // max : Math.max(...item['arr']),
        position: yAxis.length % 2 == 0 ? "left" : "right",
        offset:
          yAxis.length == 1
            ? 0
            : yAxis.length == 2
            ? 0
            : yAxis.length == 3
            ? 50
            : yAxis.length == 4
            ? 50
            : 50,
        axisLine: {
          lineStyle: {
            color: colorbb.find((item2) => {
              return item.name == item2.nickname;
            })
              ? colorbb.find((item2) => {
                  return item.name == item2.nickname;
                }).color
              : color[index] + ", 0.7)",
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
      });
    });
  }
  const option = {
    backgroundColor: "white",
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
            unit[params[i].seriesIndex];
        }
        return relVal;
      },
    },
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
    grid: {
      top: "10%",
      left: "6%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: Xdata,
      axisTick: {
        show: true,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#cccc",
          width: 1,
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#666",
          fontSize: 12,
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#cccc",
          width: 1,
          type: "dashed",
        },
      },
    },
    yAxis:
      yAxis.length != 0
        ? yAxis
        : {
            type: "value",
            axisLabel: {
              show: false,
              textStyle: {
                color: "#F0F0F0",
              },
            },
            nameTextStyle: {
              color: "#666",
              fontSize: 12,
              lineHeight: 40,
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#E9E9E9",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#cccc",
                width: 1,
                type: "dashed",
              },
            },
            axisTick: {
              show: false,
            },
          },
    dataZoom: {
      type: "inside",
      start: 50,
      end: 100,
    },
    series: series,
  };
  if(state.myChart) state.myChart.dispose();
  //需要获取到element,所以是onMounted的Hook
  state.myChart = echarts.init(document.getElementById(props.echartId));
  // 绘制图表
  state.myChart.setOption(option);
  // state.myChart.resize(); 
};
loadData();
defineExpose({
  loadData,
});
</script>
<style lang="scss">
.el-checkbox.el-checkbox--large{
  height: 30px;
}
</style>
