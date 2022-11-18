<template>
    <div class="w-full h-[300px]">
        <div :id="echartId" class="w-full h-full relative"></div>
        <div class="text-xs text-black flex justify-end gap-3 mt-2">
            <div class="bg-white w-[110px] h-7 flex justify-center gap-2 shadow-button2 rounded items-center">
                <span :class="`block ${bgColor} w-[10px] h-[10px] rounded-sm`"></span>
                Battery SoC
            </div>
            <div class="bg-white w-[110px] h-7 flex justify-center gap-2 shadow-button2 rounded items-center">
                <span class="block border border-[#3ECE80] w-[10px] h-[10px] rounded-sm"></span>
                Voltage
            </div>
             <div class="bg-white w-[110px] h-7 flex justify-center gap-2 shadow-button2 rounded items-center">
                <span class="block border border-[#F9CF4A] w-[10px] h-[10px] rounded-sm"></span>
                SoH
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
const props = defineProps({
    echartId:{
        type:String,
        default:"echart"
    },
    color:{
        type:String,
        default:"#E76262"
    },
    bgColor:{
        type:String,
        default:"bg-[#6150E9]"
    },
    areaColor:{
        type:String,
        default:"rgba(137, 86, 248, 0.2)"
    }
})

const option  = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine:{
        show:false,
    },
    axisTick:{
        show:false,
    }
  },
   grid: {
      x: 50,
      y: 40,
      y2: 30,
      x2: 30,
    },
  yAxis: [
    {
      name: 'V',
      type: 'value'
    },
    {
      name: '%',
      nameLocation: 'start',
      alignTicks: true,
      type: 'value',
      inverse: true
  }],
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    //   symbol: 'none',
      lineStyle:{
        color:props.color,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: props.areaColor
          },
          {
            offset: 1,
            color: 'rgba(137, 86, 248, 0)'
          }
        ])
      },
    }
  ]
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
<style lang="scss" scoped>

</style>