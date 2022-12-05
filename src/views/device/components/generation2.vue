<template>
  <div class="Generation2">
      <div class="w-[440px] ml-[60px] h-[450px] relative">
        <div class="absolute top-[70px] left-[130px]">
          <div>
            <div
              class="text-[#8956F8] w-[80px] h-[80px] border-[2px] border-[#8956F8] rounded-full flex justify-center items-center"
            >
              <div class="text-center">
                <img
                  src="@/assets/images/type2/icon1.svg"
                  class="w-8 inline-block"
                  alt=""
                />
                <p class="text-xs font-bold mt-[6px]">{{state.dcdcin?`${state.dcdcin} kW`:'--'}}</p>
              </div>
            </div>
            <p class="text-[#8956F8] text-sm font-semibold text-center">DCDCIN</p>
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
        
        <div class="absolute  left-[164px] top-[40px]">
            <img src="@/assets/images/type2/line1.svg"  class="w-[191px] h-[23px]" alt="">
            <span  class="absolute hidden top-[-6px] left-[-2px] bg-[#FDD015] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#FDD015] rounded-full block"></span>
            </span>
        </div>
        <div class="absolute  right-[90px] bottom-[50px]">
            <img src="@/assets/images/type2/line2.svg"  class="w-[191px] h-[23px]" alt="">
            <span  class="absolute hidden right-[-2px] bottom-[-6px] bg-[#00E0FF] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center">
                <span class="w-[10px] h-[10px] bg-[#00E0FF] rounded-full block"></span>
            </span>
        </div>

        <div class="absolute w-[210px] left-[-40px] top-[175px]">
            <p class="w-[1px] h-[90px] absolute top-0 right-0 bg-[#2DCEBC]"></p>
            <p class="h-[1px] w-full absolute top-[45px] right-0 bg-[#2DCEBC]"></p>

            <span  :class="`${state.dcdcin? 'move2':'hidden'} absolute top-[39px] left-[-2px] bg-[#2DCEBC] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center`">
                <span class="w-[10px] h-[10px] bg-[#2DCEBC] rounded-full block"></span>
            </span>
            <span  :class="`${state.dcdcin?parseFloat(ChargePower) !=0 ?ChargePower < 0?'move1':'move1-sort'  :'hidden':'hidden'} absolute top-[39px] left-[-2px] bg-[#854BFF] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center`">
                <span class="w-[10px] h-[10px] bg-[#854BFF] rounded-full block"></span>
            </span>
        </div>
    
        <div class="absolute bottom-[75px] left-[127px]">
          <div>
            <div
              class="text-[#77E4D1] mx-auto w-[80px] h-[80px] border-[2px] border-[#77E4D1] rounded-full flex justify-center items-center"
            >
              <div class="text-center">
                <img
                  src="@/assets/images/type2/icon2.svg"
                  class="w-8 inline-block"
                  alt=""
                />
                <p class="text-xs font-bold mt-[6px]">{{state.pcs?`${state.pcs} kW`:'--'}}</p>
              </div>
            </div>
            <p class="text-[#77E4D1] text-sm font-semibold text-center">PCS</p>
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
  pcs:0,
  dcdcin:0,
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
  state.oriData = item;
  state.dcdcin  = item['DI_sysoutp'] || 0;
  state.pcs  = item['PC_power'] || 0;
};


</script>
<style lang="scss" scope>
.Generation2{
  @keyframes g-an-move1 {
  0% {
    left: -2px;
  }
  70% {
    left: 203px;
     top:39px;
  }
  100%{
    left: 203px;
    top:84px;
  }
}
@keyframes g-an-move1-sort {
  0%{
    left: 203px;
    top:-2px;
  }
  20% {
    left: 203px;
     top:39px;
  }
  100% {
    left: -2px;
    top:39px;
  }
}
@keyframes g-an-move2 {
  0% {
    left: 203px;
    top: -2px;
  }
  100%{
    left: 203px;
    top:84px;
  }
}
.move1 {
  animation: g-an-move1 4s linear 0s infinite;
}
.move1-sort {
  animation: g-an-move1-sort 4s linear 0s infinite;
}
.move2 {
  animation: g-an-move2 4s linear 0s infinite;
}
}

</style>
