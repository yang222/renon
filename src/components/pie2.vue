<template>
  <div class="bg-white w-full h-[250px] relative">
    <div :id="echartId" class="w-full h-full relative"></div>
    <div class="text-center absolute bottom-[10%] left-0 w-full">
        <p class="text-[36px] text-black font-bold">{{devAllStatus.all}}</p>
        <p class="text-black text-sm mt-3 mb-3">Total number of devices</p>
        <div v-if="devAllStatus.alarm || devAllStatus.fault" class="w-[60%] mx-auto flex items-end">
            <div v-if="devAllStatus.alarm" :style="`width:${devAllStatus.fault==0 && devAllStatus.alarm ==0?'50%':((devAllStatus.alarm)/(devAllStatus.fault+devAllStatus.alarm)*100).toFixed(0)}%`">
                <p :style="{'color':color}" class="pr-3 flex flex-wrap justify-between text-xs font-medium"><span>{{keyArr[0].title}}: {{(devAllStatus.alarm)}}</span><span>{{((devAllStatus.alarm)/(devAllStatus.fault+devAllStatus.alarm)*100).toFixed(0)}}%</span></p>
                <p :style="{'background':color}" class="mt-1 h-[11px] rounded-full"></p>
            </div>
            <div v-if="devAllStatus.fault" :style="`width:${devAllStatus.fault ==0 && devAllStatus.alarm ==0?'50%':((devAllStatus.fault)/(devAllStatus.fault+devAllStatus.alarm)*100).toFixed(0)}%`">
                <p :style="{'color':subColor}" class="pr-3 flex flex-wrap justify-between  text-xs font-medium"><span>{{keyArr[1].title}}: {{devAllStatus.fault}}</span><span>{{(devAllStatus.fault/(devAllStatus.fault+devAllStatus.alarm)*100).toFixed(0)}}%</span></p>
                <p :style="{'background':subColor}" class="mt-1 h-[11px]  rounded-full"></p>
            </div>
        </div>
        <div v-else class="w-[60%] mx-auto flex items-end">
            <div  :style="`width:50%`">
                <p :style="{'color':color}" class="pr-3 flex flex-wrap justify-between text-xs font-medium"><span>{{keyArr[0].title}}: {{(devAllStatus.alarm)}}</span><span>0%</span></p>
                <p :style="{'background':color}" class="mt-1 h-[11px] rounded-full"></p>
            </div>
            <div  :style="`width:50%`">
                <p :style="{'color':subColor}" class="pr-3 flex flex-wrap justify-between  text-xs font-medium"><span>{{keyArr[1].title}}: {{devAllStatus.fault}}</span><span>0%</span></p>
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
    },
    devAllStatus:{
      type:Object,
      default:{
        all:10,
        online:7,
        fault:3,
        offline:0,
        alarm:0
      }
    },
    keyArr:{
      type:Array,
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
      name: "??????",
      type: "pie",
      //????????????????????????????????? 90 ??????????????????????????????0 ???????????????????????????
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
          value:!props.devAllStatus.alarm && !props.devAllStatus.fault?150:300*((props.devAllStatus.alarm)/(props.devAllStatus.fault+props.devAllStatus.alarm)),
          itemStyle: {
            normal: {
              color: props.color,
            },
          },
        },
        {
          value: !props.devAllStatus.alarm && !props.devAllStatus.fault?150:300*(props.devAllStatus.fault/(props.devAllStatus.fault+props.devAllStatus.alarm)),
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
      //????????????????????????????????? 90 ??????????????????????????????0 ???????????????????????????
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
  //???????????????element,?????????onMounted???Hook
  let myChart = echarts.init(document.getElementById(props.echartId));
  // ????????????
  myChart.setOption(option);
  window.onresize = function () {
    //???????????????
    myChart.resize();
  };
});
</script>
<style lang="scss" scoped></style>
