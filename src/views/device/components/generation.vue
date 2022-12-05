<template>
  <div class="Generation">
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
              <p class="text-xs font-bold mt-[6px]">Load</p>
            </div>
          </div>
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
              <p class="text-xs font-bold mt-[6px]">Grid</p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute left-[94px] top-[40px]">
        <img
          src="@/assets/images/icon/line4.png"
          class="!w-[118px] block h-auto"
          alt=""
        />
        <span
          class="move21 absolute left-[10px] top-[-6px] bg-[#3ECE80] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center"
        >
          <!-- <span
            class="w-[10px] h-[10px] bg-[#3ECE80] rounded-full block"
          ></span> -->
        </span>
      </div>
      <div class="absolute right-[94px] top-[40px]">
        <img
          src="@/assets/images/icon/line1.png"
          class="!w-[118px] block h-auto"
          alt=""
        />
        <span
          class="absolute right-[12px] top-[-6px] bg-[#00E0FF] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center"
        >
          <!-- <span
            class="w-[10px] h-[10px] bg-[#00E0FF] rounded-full block"
          ></span> -->
        </span>
      </div>
      <div class="absolute left-[94px] bottom-[56px]">
        <img
          src="@/assets/images/icon/line3.png"
          class="!w-[118px] block h-auto"
          alt=""
        />
        <span
          class="absolute left-[10px] bottom-[-6px] bg-[#E76262] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center"
        >
          <!-- <span
            class="w-[10px] h-[10px] bg-[#E76262] rounded-full block"
          ></span> -->
        </span>
      </div>
      <div class="absolute right-[94px] bottom-[56px]">
        <img
          src="@/assets/images/icon/line2.png"
          class="!w-[118px] block h-auto"
          alt=""
        />
        <span
          class="move51 absolute right-[10px] bottom-[-6px] bg-[#FDD015] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center"
        >
          <!-- <span
            class="w-[10px] h-[10px] bg-[#FDD015] rounded-full block"
          ></span> -->
        </span>
      </div>
      <div  class="absolute left-[32px] top-[190px] w-[170px] h-[1px] bg-[#000]">
        <span
          :class="`${parseFloat(ChargePower) !=0 ?ChargePower < 0?'move1':'move1-sort'  :'hidden'}  absolute left-[-2px] top-[-7px] bg-[#000000] w-[14px] h-[14px] rounded-full bg-opacity-20 flex justify-center items-center`"
        >
          <span
            class="w-[10px] h-[10px] bg-[#000000] rounded-full block"
          ></span>
        </span>
      </div>
      <div class="absolute left-[50%] top-[153px] translate-x-[-50%]">

        <div
          class="w-[70px] h-[70px] border border-[#000] rounded-full flex justify-center items-center"
        >
          <img
            src="@/assets/images/icon/power-box.png"
            class="w-12 mt-1"
            alt=""
          />
        </div>
        <p
          class="text-black absolute bottom-[-20px] w-full text-sm font-semibold text-center"
        >
          Inverter
        </p>
      </div>
      <div class="absolute left-0 bottom-[20px]">
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
              <p class="text-xs font-bold mt-[6px]">Dynamo</p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute right-0 bottom-[20px]">
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
        </div>
      </div>
    </div>

    <div
      v-if="showTips"
      style="box-shadow: 0px 8px 40px rgba(138, 149, 158, 0.2)"
      class="bg-white max-w-[500px] p-8 rounded-lg absolute z-[100] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
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
  oriData: {
    type: Object,
    default: {},
  },
  status: {
    type: Number,
    default: 0,
  },
   ChargePower:{
        type:String,
        default:'0'
    },
});

const state = reactive({
  info: {},
  oriData:null,
  solar:0,
  load:0,
  grid:0,
  dynamo:0,
});

watch(
  () => props.oriData,
  (news) => {
    if (news) {
      ChargePower1(news);
    }
  }
);

const ChargePower1 = (news) => {
  state.oriData = news;
  if (props.status == 1) {
    return false;
  }
  return getData11("cur") * getData11("tv");
};
const getData11 = (key) => {
  if (state.oriData) {
    return state.oriData['E']["E_" + key];
  } else {
    return 0;
  }
};

</script>
<style lang="scss" scope>
.Generation{
  @keyframes an-move1 {
  0% {
    left: -2px;
  }
  100% {
    left: 100%;
  }
}
@keyframes an-move1-sort {
  0% {
    left: 100%;
  }
  100% {
    left: -2px;
  }
}
@keyframes an-move2 {
  0% {
    left: -2px;
    top: -6px;
  }
  40% {
    left: 90px;
    top: -6px;
  }
  45% {
    left: 92px;
    top: 0px;
  }
  90% {
    left: 92px;
    top: 114px;
  }
  100% {
    left: 110px;
    top: 116px;
  }
}
@keyframes an-move3 {
  0% {
    left: -2px;
    bottom: -6px;
  }
  40% {
    left: 90px;
    bottom: -6px;
  }
  45% {
    left: 92px;
    bottom: 0px;
  }
  90% {
    left: 92px;
    bottom: 114px;
  }
  100% {
    left: 110px;
    bottom: 116px;
  }
}
@keyframes an-move4 {
  0% {
    right: -2px;
    top: -6px;
  }
  40% {
    right: 90px;
    top: -6px;
  }
  45% {
    right: 92px;
    top: 0px;
  }
  90% {
    right: 92px;
    top: 114px;
  }
  100% {
    right: 110px;
    top: 116px;
  }
}
@keyframes an-move5 {
  0% {
    right: -2px;
    bottom: -6px;
  }
  40% {
    right: 90px;
    bottom: -6px;
  }
  45% {
    right: 92px;
    bottom: 0px;
  }
  90% {
    right: 92px;
    bottom: 114px;
  }
  100% {
    right: 110px;
    bottom: 116px;
  }
}
.move1 {
  animation: an-move1 4s linear 0s infinite;
}
.move1-sort {
  animation: an-move1-sort 4s linear 0s infinite;
}
// .move2 {
//   animation: an-move2 4s linear 0s infinite;
// }
// .move3 {
//   animation: an-move3 4s linear 0s infinite;
// }
// .move4 {
//   animation: an-move4 4s linear 0s infinite;
// }
// .move5 {
//   animation: an-move5 4s linear 0s infinite;
// }
}

</style>
