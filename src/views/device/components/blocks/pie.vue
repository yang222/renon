<template>
    <div class="flex items-center">
        <div class="flex-col justify-end pt-[80px] mr-4">
        <div>
          <p class="text-base text-[#999999]">Voltage:</p>
          <p class="text-xl font-bold text-black">{{getData11('tv')?getData11('tv')+'V':'----'}}</p>
        </div>
        <div class="mt-3">
          <p class="text-base text-[#999999]">Power:</p>
          <p class="text-xl font-bold text-black">{{ChargePower !==undefined&&ChargePower !==null? ChargePower + 'W':'----'}}</p>
        </div>
      </div>
      <div class="w-[240px] h-[240px] relative">
        <div class="w-[240px] h-[240px]" id="pie"></div>
        <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex">
            <!-- <img src="@/assets/images/icon/!.png" class="w-[5px] absolute top-[-18px] left-[54px]" alt=""> -->
            <div class="mr-4">
                <div class="w-[21px] h-[6px] border border-[#000] mx-auto"></div>
                <div class="border border-[#000] w-[48px] h-[84px] rounded-md p-1 pt-2 grid grid-cols-1 gap-[2px] justify-center relative">
                    <div :class="`${parseFloat(getData11('soc')) >=80?'bg-[#3ECE80]':'bg-white'}   w-full rounded-sm`"></div>
                    <div :class="`${parseFloat(getData11('soc')) >=60?'bg-[#3ECE80]':'bg-white'}   w-full rounded-sm`"></div>
                    <div :class="`${parseFloat(getData11('soc')) >=40?'bg-[#3ECE80]':'bg-white'}   w-full rounded-sm`"></div>
                    <div :class="`${parseFloat(getData11('soc')) >=20?'bg-[#3ECE80]':'bg-white'}   w-full rounded-sm`"></div>
                    <img src="@/assets/images/icon/power-icon.png" class="z-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-3" alt="">
                </div>
            </div>
            <div class="flex flex-col justify-between">
                <div class="text-sm font-bold">
                    <p class="text-[#3ECE80]">SoC:</p>
                    <p>{{getData11('soc')?getData11('soc')+'%':'--'}}</p>
                </div>
                 <div class="text-sm font-bold">
                    <p class="text-[#999999]">SoH:</p>
                    <p>{{getData11('soh')?getData11('soh')+'%':'--'}}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { onMounted ,ref,watch} from "vue";
import * as echarts from "echarts";
const props = defineProps({
    ChargePower:{
        type:String,
        default:""
    },
    subDev:{
        type:Array,
        default:[]
    },
    oriData:{
        type:Object,
        default:{}
    }
})
const getData11 = (key)=> {
// let curDev = props.subDev[0];
// // console.log(this.curDev,'1234567')
//     if (!curDev) {
//         return undefined;
//     }
//     let subDevNo = curDev.devNo;

//     if (!props.oriData[subDevNo]) {
//         return undefined;
//     }

    return props.oriData['E' + "_" + key];
}
let dataArr = []
for (var i = 0; i < 50; i++) {
  dataArr.push({
    value: 6,
    itemStyle: {
      normal: {
        color: "#A0A2B1",
      },
    },
  });
}
const option = ref({
  series: [
    {
      name: "一般",
      type: "pie",
      //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
      startAngle: -68,
      hoverAnimation: false,
      tooltip: {},
      radius: ["87%", "100%"],
      center: ["50%", "50%"],
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
        borderRadius: 8,
        borderColor: "#fff",
        borderWidth: 2,
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        {
          value: 40,
          itemStyle: {
            normal: {
              color: "rgba(80,150,224,0)",
            },
          },
        },
        {
          value: (getData11('soc')/(getData11('soc')+getData11('soh')))*300,
          itemStyle: {
            normal: {
              color: "#3ECE80",
            },
          },
        },
        {
          value: (getData11('soh')/(getData11('soc')+getData11('soh')))*300,
          itemStyle: {
            normal: {
              color: "#D9D9D9",
            },
          },
        },
      ],
    },
    {
      name: "",
      type: "pie",
      //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
      startAngle: -68,
      hoverAnimation: false,
      radius: ["90", "101"],
      center: ["50%", "50%"],
      tooltip:{

        show:false
      },
      itemStyle: {
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 9,
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        {
          value: 40,
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
});
const myChart = ref(null)
onMounted(() => {
  //需要获取到element,所以是onMounted的Hook
  myChart.value = echarts.init(document.getElementById("pie"));
  // 绘制图表
  myChart.value.setOption(option.value);
  window.onresize = function () {
    //自适应大小
    myChart.value.resize();
  };
});
watch(
    ()=>props.subDev,
    (newValue, oldValue) => {
       if(newValue){
            
            myChart.value.setOption({
  series: [
    {
      name: "一般",
      type: "pie",
      //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
      startAngle: -68,
      hoverAnimation: false,
      tooltip: {},
      radius: ["87%", "100%"],
      center: ["50%", "50%"],
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
        borderRadius: 8,
        borderColor: "#fff",
        borderWidth: 2,
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        {
          value: 40,
          itemStyle: {
            normal: {
              color: "rgba(80,150,224,0)",
            },
          },
        },
        {
          value: (getData11('soc')/(getData11('soc')+getData11('soh')))*300,
          itemStyle: {
            normal: {
              color: "#3ECE80",
            },
          },
        },
        {
          value: (getData11('soh')/(getData11('soc')+getData11('soh')))*300,
          itemStyle: {
            normal: {
              color: "#D9D9D9",
            },
          },
        },
      ],
    },
    {
      name: "",
      type: "pie",
      //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
      startAngle: -68,
      hoverAnimation: false,
      radius: ["90", "101"],
      center: ["50%", "50%"],
      tooltip:{

        show:false
      },
      itemStyle: {
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 9,
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        {
          value: 40,
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
});
            myChart.value.resize();
       }
    }
)
</script>
<style lang="scss" scoped>

</style>
