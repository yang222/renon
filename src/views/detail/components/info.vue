<template>
  <div class="w-full py-10 px-6">
    <div class="flex justify-between items-center">
      <ul class="bg-[#F6F9FC] rounded-lg p-1 flex gap-3">
        <li
          :class="`text-black rounded-lg text-xs font-bold w-[120px] h-p leading-9 text-center cursor-pointer ${
            active == item.id ? 'bg-white shadow-button2' : 'hover:underline'
          }`"
          v-for="(item, index) in menuList"
          :key="index"
          @click="active = item.id"
        >
          {{ item.title }}
        </li>
      </ul>
      <img
        src="@/assets/images/icon/down.png"
        class="w-6 cursor-pointer"
        alt=""
      />
    </div>
    <div class="grid grid-cols-8 gap-3 mt-10">
      <div class="p-3 text-center bg-white shadow-button2 rounded-lg">
        <div
          class="w-[51px] bg-[#56C271] h-[46px] flex rounded-lg mx-auto items-center justify-center"
        >
          <div class="text-xs text-white font-medium">
            <p class="font-bold mb-1">20</p>
            <p>kWh</p>
          </div>
        </div>
        <p class="text-[#56C271] text-xs font-semibold mt-6">PV power</p>
        <p class="text-xs text-gray-600">generation today</p>
        <img
          src="@/assets/images/icon/line.png"
          class="w-[80%] max-w-[108px] block mx-auto mt-3"
          alt=""
        />
      </div>
      <div class="p-3 text-center shadow-button2 rounded-lg">
        <div
          class="w-[51px] bg-[#FDD015] h-[46px] flex rounded-lg mx-auto items-center justify-center"
        >
          <div class="text-xs text-white font-medium">
            <p class="font-bold mb-1">20</p>
            <p>kWh</p>
          </div>
        </div>
        <p class="text-[#FDD015] text-xs font-semibold mt-6">PV cumulative</p>
        <p class="text-xs text-gray-600">generation today</p>
        <img
          src="@/assets/images/icon/line.png"
          class="w-[80%] max-w-[108px] block mx-auto mt-3"
          alt=""
        />
      </div>
      <div class="p-3 text-center shadow-button2 rounded-lg">
        <div
          class="w-[51px] bg-[#E76262] h-[46px] flex rounded-lg mx-auto items-center justify-center"
        >
          <div class="text-xs text-white font-medium">
            <p class="font-bold mb-1">20</p>
            <p>kWh</p>
          </div>
        </div>
        <p class="text-[#E76262] text-xs font-semibold mt-6">PV1 power</p>
        <p class="text-xs text-gray-600">generation today</p>
        <img
          src="@/assets/images/icon/line.png"
          class="w-[80%] max-w-[108px] block mx-auto mt-3"
          alt=""
        />
      </div>
      <div class="p-3 text-center shadow-button2 rounded-lg">
        <div
          class="w-[51px] bg-[#00E0FF] h-[46px] flex rounded-lg mx-auto items-center justify-center"
        >
          <div class="text-xs text-white font-medium">
            <p class="font-bold mb-1">20</p>
            <p>kWh</p>
          </div>
        </div>
        <p class="text-[#00E0FF] text-xs font-semibold mt-6">PV2 power</p>
        <p class="text-xs text-gray-600">generation today</p>
        <img
          src="@/assets/images/icon/line.png"
          class="w-[80%] max-w-[108px] block mx-auto mt-3"
          alt=""
        />
      </div>
      <div class="p-3 text-center shadow-button2 rounded-lg">
        <div
          class="w-[51px] bg-[#596CFF] h-[46px] flex rounded-lg mx-auto items-center justify-center"
        >
          <div class="text-xs text-white font-medium">
            <p class="font-bold mb-1">20</p>
            <p>kWh</p>
          </div>
        </div>
        <p class="text-[#596CFF] text-xs font-semibold mt-6">PV2 power</p>
        <p class="text-xs text-gray-600">generation today</p>
        <img
          src="@/assets/images/icon/line.png"
          class="w-[80%] max-w-[108px] block mx-auto mt-3"
          alt=""
        />
      </div>
      <div class="p-3 text-center shadow-button2 rounded-lg">
        <div
          class="w-[51px] bg-[#FF4B81] h-[46px] flex rounded-lg mx-auto items-center justify-center"
        >
          <div class="text-xs text-white font-medium">
            <p class="font-bold mb-1">20</p>
            <p>kWh</p>
          </div>
        </div>
        <p class="text-[#FF4B81] text-xs font-semibold mt-6">PV2 power</p>
        <p class="text-xs text-gray-600">generation today</p>
        <img
          src="@/assets/images/icon/line.png"
          class="w-[80%] max-w-[108px] block mx-auto mt-3"
          alt=""
        />
      </div>
      <div class="p-3 text-center shadow-button2 rounded-lg">
        <div
          class="w-[51px] bg-[#8956F8] h-[46px] flex rounded-lg mx-auto items-center justify-center"
        >
          <div class="text-xs text-white font-medium">
            <p class="font-bold mb-1">20</p>
            <p>kWh</p>
          </div>
        </div>
        <p class="text-[#8956F8] text-xs font-semibold mt-6">PV2 power</p>
        <p class="text-xs text-gray-600">generation today</p>
        <img
          src="@/assets/images/icon/line.png"
          class="w-[80%] max-w-[108px] block mx-auto mt-3"
          alt=""
        />
      </div>
      <div class="p-3 text-center shadow-button2 rounded-lg">
        <div
          class="w-[51px] bg-[#000000] h-[46px] flex rounded-lg mx-auto items-center justify-center"
        >
          <div class="text-xs text-white font-medium">
            <p class="font-bold mb-1">--</p>
            <p>kWh</p>
          </div>
        </div>
        <p class="text-[#000000] text-xs font-semibold mt-6">PV3 power</p>
        <p class="text-xs text-gray-600">generation today</p>
        <img
          src="@/assets/images/icon/line.png"
          class="w-[80%] max-w-[108px] block mx-auto mt-3"
          alt=""
        />
      </div>
    </div>
    <div class="mt-8 pb-6">
      <div class="flex items-center">
        <ul class="flex justify-start">
          <li
            :class="`px-6 h-8 border border-gray-900 flex justify-center items-center text-xs cursor-pointer border-r-0 last:border-r ${
              active2 == item.id ? 'font-bold' : 'font-medium'
            }`"
            v-for="(item, index) in menuList2"
            :key="index"
          >
            {{ item.title }}
          </li>
        </ul>
        <el-icon class="ml-6 cursor-pointer"><ArrowRight /></el-icon>
      </div>
      <div class="flex items-center justify-center mt-6">
        <el-icon class="cursor-pointer"><ArrowLeft /></el-icon>
        <span class="w-[120px] text-center text-xs text-black">2022-11-03</span>
        <el-icon class="cursor-pointer"><ArrowRight /></el-icon>
      </div>
      <Line class="mb-[60px]" echartId="echartId1" color='#6150E9' />
      <Line echartId="echartId2" color="#E76262"  bgColor="bg-[#E76262]" areaColor="rgba(231, 98, 98, 0.2)"/>
    </div>
    <el-dialog
            v-model="showDialog"
            title="Paramaters"
            width="500px"
            :close-on-click-modal="false"
        >
          
            <div class="p-8 grid grid-cols-4 gap-4">
                <el-checkbox v-model="checked" label="Vp1" size="large" />
                <el-checkbox v-model="checked" label="Vp2" size="large" />
                <el-checkbox v-model="checked" label="Vp3" size="large" />
                <el-checkbox v-model="checked" label="Power1" size="large" />
                <el-checkbox v-model="checked" label="Power1" size="large" />
                <el-checkbox v-model="checked" label="Power1" size="large" />
            </div>
            <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                    <button @click="showDialog = false" class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md">Cancel</button>
                    <button class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Confirm</button>
                </span>
            </template>
        </el-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Line from "./line.vue";
const showDialog = ref(true);
const active = ref(1);
const checked = ref([])
const menuList = ref([
  { title: "Solar", id: 1 },
  { title: "Grid", id: 2 },
  { title: "Load", id: 3 },
  { title: "Custom", id: 4 },
]);
const menuList2 = ref([
  { title: "Paramaters", id: 1 },
  { title: "Day", id: 2 },
  { title: "Month", id: 3 },
  { title: "Year", id: 4 },
  { title: "Total", id: 5 },
]);
</script>
<style lang="scss" scoped></style>
