<template>
  <div>
    <div class="grid grid-cols-8 gap-3 mt-10">
    <div
      v-for="(item, index) in state.devData"
      :key="index"
      :class="`${!state.showMore && index>7?'hidden':''} p-3 text-center bg-white shadow-button2 rounded-lg`"
    >
      <div
        :class="`w-[51px]  h-[46px] p-1 flex rounded-lg mx-auto items-center justify-center ${item.bg}`"
      >
        <div class="text-xs text-white font-medium">
          <p v-if="item.alias.includes('Position')" class="font-bold mb-1">{{state.show?convertPos(item.value):"---"}}</p>
          <p v-else-if="item.enumNames" class="font-bold mb-1 break-all">{{ item.enumNames[item.value] || '--' }}</p>
          <p v-else class="font-bold mb-1">{{ item.value || '--' }}</p>
          <p>{{ item.unit }}</p>
        </div>
      </div>
      <p :class="`text-xs font-semibold mt-6 ${item.color}`">
        {{ item.alias }}
      </p>
      <p class="text-xs text-gray-600">generation today</p>
      <img
        src="@/assets/images/icon/line.png"
        class="w-[80%] max-w-[108px] block mx-auto mt-3"
        alt=""
      />
    </div>
   
  </div>
   <div v-if="state.devData.length" class="flex justify-center pt-6">
      <el-icon @click="state.showMore = !state.showMore" :size="24" :class="`cursor-pointer transition-all ${state.showMore?'rotate-180':''}`"><ArrowDownBold /></el-icon>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { lastData } from "@/api/devices";

const colors = ['#56C271','#FDD015','#E76262','#00E0FF','#596CFF','#FF4B81','#596CFF','#000000','#56C271','#FDD015','#E76262','#00E0FF','#596CFF','#FF4B81','#596CFF','#000000','#56C271','#FDD015','#E76262','#00E0FF','#596CFF','#FF4B81','#596CFF','#000000','#56C271','#FDD015','#E76262','#00E0FF','#596CFF','#FF4B81','#596CFF','#000000','#56C271','#FDD015','#E76262','#00E0FF','#596CFF','#FF4B81','#596CFF','#000000']
const state = reactive({
  devData: [],
  show: true,
  first: [],
  second: [],
  directCurrent: [],
  alternatingCurrent: [],
  systemSettings: [],
  showMore:false
});
const convertPos = (value) => {
  if (value === undefined) {
    return undefined;
  }
  let low = value & 0xff;
  let hight = (value >> 8) & 0xff;

  return hight + "_" + low;
};
const loadData = async (arr, devid, devtype) => {
  let fieldMap = {};
  let data = [];
  arr.forEach((item, i) => {
    data.push(item.nickname);
  });
  data.forEach((item) => {
    fieldMap[item] = 1;
  });
  let fields = { ...fieldMap, time: 1 };

  var res = await lastData(devid, fields, devtype);
  if (res == null || res["data"] == null || res["data"].length == 0) {
    state.devData = arr;

    state.show = false;
    for (const key in state.devData) {
      delete state.devData[key].value;
      // state.show=true
    }
    // state.first = state.devData.slice(0, 4);
    // state.second = state.devData.slice(4, state.devData.length);

    state.devData.forEach((item,index) => {
      item['color']=`text-[${colors[index]}]`
      item['bg']=`bg-[${colors[index]}]`
      if (item.groud === 1) {
        state.directCurrent.push(item);
      }
      if (item.groud === 2) {
        state.alternatingCurrent.push(item);
      }
      if (item.groud === 3) {
        state.systemSettings.push(item);
      }
    });

    return;
  } else {
    state.show = false;
    state.show = true;
    let devData = res["data"][0];

    let a = Object.keys(devData);
    arr.forEach((item, index) => {
      if (a.includes(item.nickname)) {
        item.value = devData[item.nickname];
      }
    });

    state.devData = arr;
    // console.log(state.devData, "devData", arr);
    // state.first = state.devData.slice(0, 4);
    // state.second = state.devData.slice(4, state.devData.length);
    // console.log(state.devData, "44544");

    state.devData.forEach((item,index) => {
       item['color']=`text-[${colors[index]}]`
      item['bg']=`bg-[${colors[index]}]`
      if (item.groud === 1) {
        state.directCurrent.push(item);
      }
      if (item.groud === 2) {
        state.alternatingCurrent.push(item);
      }
      if (item.groud === 3) {
        state.systemSettings.push(item);
      }
    });
  }
};

defineExpose({
  loadData,
});
</script>
<style lang="scss" scoped></style>
