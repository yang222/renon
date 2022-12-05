<template>
  <div class="Generation1">
    
      
      <div class="w-[440px] ml-[60px] h-[390px] relative">
        <div class="absolute top-0 left-0">
          <div>
            <div
              class="text-[#3ECE80] w-[80px] h-[80px] border-[2px] border-[#3ECE80] rounded-full flex justify-center items-center"
            >
              <div class="text-center">
                <img
                  src="@/assets/images/type1/icon1.svg"
                  class="w-8 inline-block"
                  alt=""
                />
                <p class="text-xs font-bold mt-[6px]">{{state.dcdcin?`${state.dcdcin} kW`:'--'}}</p>
              </div>
            </div>
            <p class="text-[#3ECE80] text-sm font-semibold text-center">DCDC_IN</p>
          </div>
        </div>
        <div class="absolute right-0 top-0">
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
                <p class="text-xs font-bold mt-[6px]">Solar</p>
              </div>
            </div>
            <p class="text-[#F9CF4A] text-sm font-semibold text-center"></p>
          </div>
        </div>
        
        <div class="absolute  left-[94px] top-[40px]">
            <p class="h-[1px] w-[250px] bg-[#F9CF4A]"></p>
            <span  class="hidden absolute top-[-6px] left-[-2px] bg-[#FDD015] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#FDD015] rounded-full block"></span>
            </span>
        </div>
        <div class="absolute  right-[90px] bottom-[55px]">
            <p class="h-[1px] w-[80px] bg-[#00E0FF]"></p>
            <span  class="hidden absolute left-[-2px] bottom-[-6px] bg-[#00E0FF] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#00E0FF] rounded-full block"></span>
            </span>
        </div>
        <div class="absolute  left-[90px] bottom-[56px]">
            <p class="h-[1px] w-[80px] bg-[#E76262]"></p>
            <span  class="absolute left-[-2px] bottom-[-6px] bg-[#E76262] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <!-- <span class="w-[10px] h-[10px] bg-[#E76262] rounded-full block"></span> -->
            </span>
        </div>
        <div class="absolute w-[90px] left-[-50px] top-[110px]">
            <p class="w-[1px] h-[170px] absolute top-0 right-0 bg-[#3ECE80]"></p>
            <p class="h-[1px] w-full absolute top-[70px] right-0 bg-[#3ECE80]"></p>
            <span  :class="`${state.dcdcin?'move2':'hidden'} absolute right-[-6px] top-[160px] bg-[#3ECE80] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center`">
                <span class="w-[10px] h-[10px] bg-[#3ECE80] rounded-full block"></span>
            </span>
            <span  :class="`${state.dcdcin?parseFloat(ChargePower) !=0 ?ChargePower < 0?'move1':'move1-sort'  :'hidden':'hidden'} absolute top-[64px] left-[-2px] bg-[#3ECE80] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center`">
                <span class="w-[10px] h-[10px] bg-[#3ECE80] rounded-full block"></span>
            </span>
        </div>
      
        <div class="absolute left-[50%] bottom-0 translate-x-[-50%]">
            
            <div class="w-[80px] h-[80px] border border-[#000] rounded-full flex justify-center items-center">
                <img src="@/assets/images/icon/power-box.png" class="w-12 mt-1" alt="">
            </div>
            <p class="text-black w-full text-sm font-semibold text-center">Inverter</p>
        </div>
        <div class="absolute left-0 bottom-0">
          <div>
            <div
              class="text-[#E76262] w-[80px] h-[80px] border-[2px] border-[#E76262] rounded-full flex justify-center items-center"
            >
              <div class="text-center">
                <img
                  src="@/assets/images/type1/icon2.svg"
                  class="w-8 inline-block"
                  alt=""
                />
                <p class="text-xs font-bold mt-[6px]">{{state.dcdcout?`${state.dcdcout} kW`:'--'}}</p>
              </div>
            </div>
            <p class="text-[#E76262] text-sm font-semibold text-center">DCDC_OU</p>
          </div>
        </div>
        <div class="absolute right-0 bottom-[18px]">
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
                <p class="text-xs font-bold mt-[6px]">Grid</p>
              </div>
            </div>
            <p class="text-[#00E0FF] text-sm font-semibold text-center"></p>
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
import {reactive, ref, watch } from "vue";

const showTips = ref(false);
const props = defineProps({
    oriData:{
        type:Object,
        default:{}
    },
  status: {
    type: Number,
    default: 0,
  },
   ChargePower:{
        type:String,
        default:''
    },
});

const state = reactive({
  info: {},
  oriData:null,
  solar:0,
  grid:0,
  dcdcin:0,
  dcdcout:0,
});

watch(
  () => props.oriData,
  (news) => {
    if(news.DI_sysoutp){
      handleData(news);
    }
  }
);
const handleData = (item) => {
  state.dcdcin = item['DI_sysoutp']
  state.dcdcout = item['DO_sysoutp']
};

</script>
<style lang="scss">

.Generation1{
  @keyframes dc-an-move1 {
  0% {
    left: -2px;
  }
  40% {
    left: 82px;
     top:64px;
  }
  100%{
    left: 82px;
    top:164px;
  }
}
@keyframes dc-an-move1-sort {
  0%{
    left: 82px;
    top:-2px;
  }
  40% {
    left: 82px;
    top:64px;
  }
  100% {
    left: -2px;
    top:64px;
  }
}
@keyframes dc-an-move2 {
  0% {
    right: -6px;
    top: -2px;
  }
  100%{
    right: -6px;
    top:164px;
  }
}
.move1 {
  animation: dc-an-move1 4s linear 0s infinite;
}
.move1-sort {
  animation: dc-an-move1-sort 4s linear 0s infinite;
}
.move2 {
  animation: dc-an-move2 4s linear 0s infinite;
}
}

</style>
