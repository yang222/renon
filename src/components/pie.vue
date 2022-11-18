<template>
  <div class="bg-white w-full h-[250px] relative">
    <div :id="echartId" class="w-full h-full relative"></div>
    <div class="text-center absolute bottom-[10%] left-0 w-full">
        <p class="text-[36px] text-black font-bold">10</p>
        <p class="text-black text-sm mt-3 mb-3">Total number of devices</p>
        <div class="w-[60%] mx-auto flex items-end">
            <div style="width:70%">
                <p :style="{'color':color}" class="pr-3 flex flex-wrap justify-between text-xs font-medium"><span>Online: 7</span><span>70%</span></p>
                <p :style="{'background':color}" class="mt-1 h-[11px] rounded-full"></p>
            </div>
            <div style="width:30%">
                <p :style="{'color':subColor}" class="pr-3 flex flex-wrap justify-between  text-xs font-medium"><span>Online: 7</span><span>70%</span></p>
                <p :style="{'background':subColor}" class="mt-1 h-[11px]  rounded-full"></p>
            </div>
        </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";

const props = defineProps({
    color:{
        type:String
    },
    subColor:{
          type:String
    },
    echartId:{
        type:String
    }
})

let dataArr = [];
for (var i = 0; i < 33; i++) {
  dataArr.push({
    value: 3,
    itemStyle: {
      normal: {
        color: "#A0A2B1",
      },
    },
  });
}
const option = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "0",
    left: "0",
  },
  series: [
    {
      name: "一般",
      type: "pie",
      //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
      startAngle: 0,
      hoverAnimation: false,
      tooltip: {},
      radius: ["130%", "150%"],
      center: ["50%", "90%"],
      label: {
        normal: {
          show: false,
          position: "center",
          color: "#fff",
          formatter: function (params) {
            return params.value;
          },
        },
      },
      itemStyle: {
        borderRadius: 6,
        borderColor: "#fff",
        borderWidth: 0,
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        {
          value: 300,
          itemStyle: {
            normal: {
              color: "rgba(80,150,224,0)",
            },
          },
        },
        {
          value: 270,
          itemStyle: {
            normal: {
              color: props.color,
            },
          },
        },
        {
          value: 30,
          itemStyle: {
            normal: {
              color: props.subColor,
            },
          },
        },
      ],
    },
    {
      name: "",
      type: "pie",
      //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
      startAngle: 0,
      hoverAnimation: false,
      radius: ["111%", "120%"],
      center: ["50%", "90%"],
      tooltip:{

        show:false
      },
      itemStyle: {
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 12,
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        {
          value: 100,
          itemStyle: {
            normal: {
              color: "rgba(80,150,224,0)",
            },
          },
        },
        ...dataArr,
      ],
    },
  ],
};

onMounted(() => {
  //需要获取到element,所以是onMounted的Hook
  let myChart = echarts.init(document.getElementById(props.echartId));
  // 绘制图表
  myChart.setOption(option);
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
});
</script>
<style lang="scss" scoped></style>
