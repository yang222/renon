<template>
  <div class="w-[870px] overflow-x-auto">
    <div class="flex items-center">
      <div class="flex-col justify-end pt-[80px] mr-4">
        <div>
          <p class="text-base text-[#999999]">Voltage:</p>
          <p class="text-xl font-bold text-black">240V</p>
        </div>
        <div class="mt-3">
          <p class="text-base text-[#999999]">Power:</p>
          <p class="text-xl font-bold text-black">15kw</p>
        </div>
      </div>
      <div class="w-[240px] h-[240px] relative">
        <div class="w-[240px] h-[240px]" id="pie"></div>
        <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex">
            <img src="@/assets/images/icon/!.png" class="w-[5px] absolute top-[-18px] left-[54px]" alt="">
            <div class="mr-4">
                <div class="w-[21px] h-[6px] border border-[#000] mx-auto"></div>
                <div class="border border-[#000] w-[48px] h-[84px] rounded-md p-1 pt-2 grid grid-cols-1 gap-[2px] justify-center">
                    <div class="bg-[#3ECE80] w-full rounded-sm"></div>
                    <div class="bg-[#3ECE80] w-full rounded-sm"></div>
                    <div class="bg-[#3ECE80] w-full rounded-sm"></div>
                    <div class="bg-[#3ECE80] w-full rounded-sm"></div>
                </div>
            </div>
            <div class="flex flex-col justify-between">
                <div class="text-sm font-bold">
                    <p class="text-[#3ECE80]">SoC:</p>
                    <p>60%</p>
                </div>
                 <div class="text-sm font-bold">
                    <p class="text-[#999999]">SoH:</p>
                    <p>40%</p>
                </div>
            </div>
        </div>
      </div>
      <div class="w-[500px] h-[390px] relative">
        <div class="absolute top-0 left-0">
          <div>
            <div
              class="text-[#3ECE80] w-[80px] h-[80px] border-[2px] border-[#3ECE80] rounded-full flex justify-center items-center"
            >
              <div class="text-center">
                <img
                  src="@/assets/images/icon/home.png"
                  class="w-8 inline-block"
                  alt=""
                />
                <p class="text-xs font-bold mt-[6px]">20 kW</p>
              </div>
            </div>
            <p class="text-[#3ECE80] text-sm font-semibold text-center">Load</p>
          </div>
        </div>
        <div class="absolute right-0 top-0">
          <div>
            <div
              class="text-[#00E0FF] w-[80px] h-[80px] border-[2px] border-[#00E0FF] rounded-full flex justify-center items-center"
            >
              <div class="text-center">
                <img
                  src="@/assets/images/icon/company.png"
                  class="w-8 inline-block"
                  alt=""
                />
                <p class="text-xs font-bold mt-[6px]">20 kW</p>
              </div>
            </div>
            <p class="text-[#00E0FF] text-sm font-semibold text-center">Grid</p>
          </div>
        </div>
        <div class="absolute  left-[94px] top-[40px]">
            <img src="@/assets/images/icon/line4.png" class="!w-[118px] block h-auto" alt="">
            <span  class="absolute right-[12px] bottom-[34px] bg-[#3ECE80] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#3ECE80] rounded-full block"></span>
            </span>
        </div>
        <div class="absolute  right-[94px] top-[40px]">
            <img src="@/assets/images/icon/line1.png" class="!w-[118px] block h-auto" alt="">
            <span  class="absolute left-[12px] bottom-[34px] bg-[#00E0FF] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#00E0FF] rounded-full block"></span>
            </span>
        </div>
        <div class="absolute  left-[94px] bottom-[56px]">
            <img src="@/assets/images/icon/line3.png" class="!w-[118px] block h-auto" alt="">
            <span  class="absolute right-[12px] top-[34px] bg-[#E76262] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#E76262] rounded-full block"></span>
            </span>
        </div>
        <div class="absolute  right-[94px] bottom-[56px]">
            <img src="@/assets/images/icon/line2.png" class="!w-[118px] block h-auto" alt="">
            <span  class="absolute left-[12px] top-[34px] bg-[#FDD015] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#FDD015] rounded-full block"></span>
            </span>
        </div>
        <div class="absolute left-[32px] top-[190px] w-[170px] h-[1px] bg-[#000]">
            <span  class="absolute left-[60%] top-[-7px] bg-[#000000] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#000000] rounded-full block"></span>
            </span>
        </div>
        <div class="absolute left-[50%] top-[153px] translate-x-[-50%]">
            
            <!-- <img src="@/assets/images/icon/line2.png" class="w-12" alt="">
            <img src="@/assets/images/icon/line3.png" class="w-12" alt="">
            <img src="@/assets/images/icon/line4.png" class="w-12" alt=""> -->
            <img src="@/assets/images/icon/!.png" class="w-[6px] absolute right-[0px] top-[-24px]" alt="">
            <div class="w-[70px] h-[70px] border border-[#000] rounded-full flex justify-center items-center">
                <img src="@/assets/images/icon/power-box.png" class="w-12 mt-1" alt="">
            </div>
            <p class="text-black absolute bottom-[-20px] w-full text-sm font-semibold text-center">Inverter</p>
        </div>
        <div class="absolute left-0 bottom-0">
          <div>
            <div
              class="text-[#E76262] w-[80px] h-[80px] border-[2px] border-[#E76262] rounded-full flex justify-center items-center"
            >
              <div class="text-center">
                <img
                  src="@/assets/images/icon/power.png"
                  class="w-8 inline-block"
                  alt=""
                />
                <p class="text-xs font-bold mt-[6px]">20 kW</p>
              </div>
            </div>
            <p class="text-[#E76262] text-sm font-semibold text-center">Dynamo</p>
          </div>
        </div>
        <div class="absolute right-0 bottom-0">
          <div>
            <div
              class="text-[#F9CF4A] w-[80px] h-[80px] border-[2px] border-[#F9CF4A] rounded-full flex justify-center items-center"
            >
              <div class="text-center">
                <img
                  src="@/assets/images/icon/sun.png"
                  class="w-8 inline-block"
                  alt=""
                />
                <p class="text-xs font-bold mt-[6px]">20 kW</p>
              </div>
            </div>
            <p class="text-[#F9CF4A] text-sm font-semibold text-center">Solar</p>
          </div>
        </div>
        
        
      </div>
    </div>
   <div v-if="showTips" style="box-shadow: 0px 8px 40px rgba(138, 149, 158, 0.2);" class="bg-white max-w-[500px] p-8 rounded-lg absolute z-[100] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div class="text-black font-base font-bold">
            <p class="mb-6 font-normal">Accident Details</p>
            <p>please wait for 10 minutes and observe the device</p>
        </div>
    </div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted,ref} from "vue";
let dataArr = [];
const showTips = ref(true)
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
const option = {
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
          value: 270,
          itemStyle: {
            normal: {
              color: "#3ECE80",
            },
          },
        },
        {
          value: 30,
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
};

onMounted(() => {
  //需要获取到element,所以是onMounted的Hook
  let myChart = echarts.init(document.getElementById("pie"));
  // 绘制图表
  myChart.setOption(option);
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
});
</script>
<style lang="scss">
</style>
