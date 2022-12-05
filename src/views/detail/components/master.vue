<template>
  <div class="flex">
    <ul class="w-[300px] py-10 border-r border-gray-300">
      <li class="">
        <div
          @click="snShow = !snShow"
          :class="`cursor-pointer px-10 flex justify-between items-center text-base text-black font-semibold mb-4 leading-[48px] ${
            deviceActive == 1 ? 'bg-black text-white' : ''
          }`"
        >
          ( {{ state.M_Pbmssn || 'Master-1' }} )
          <el-icon :class="`${snShow ? 'rotate-180' : ''} transition-all`"
            ><ArrowDownBold
          /></el-icon>
        </div>
        <ul
          :class="`px-10 text-[13px] text-black font-normal overflow-hidden transition-all ${
            snShow ? 'h-[80px]' : 'h-0'
          }`"
        >
          <li v-if="state.M_hwver" class="flex justify-between leading-[40px]">
            Hardware version
            <span>{{ state.M_hwver ? "V" + state.M_hwver : "---" }}</span>
          </li>
          <li v-if="state.M_swver" class="flex justify-between leading-[40px]">
            Software version
            <span>{{ state.M_swver ? "V" + state.M_swver : "---" }}</span>
          </li>
        </ul>
      </li>

      <li class="mt-4 px-4">
        <!-- <div class="cursor-pointer px-10 flex justify-between items-center text-base text-black font-semibold leading-[48px]">12312312313123 <el-icon :class="`${deviceShow?'rotate-180':''} transition-all`"><ArrowDownBold /></el-icon></div>
                    <ul class="px-10 text-[13px] text-black font-normal">
                        <li class="flex justify-between leading-[40px]">Hardware version <span>V1.0.2</span></li>
                        <li class="flex justify-between leading-[40px]">Software version <span>V1.0.0</span></li>
                    </ul> -->
        <!-- <el-select class="w-full" v-model="state.devid" @change="devChange" filterable placeholder="Please Input Device">
                        <el-option
                        v-for="item in state.devList"
                        :key="item.devid"
                        :label="item.devname"
                        :value="item.devid"
                        />
                    </el-select> -->
      </li>
    </ul>
    <div class="w-full py-10 px-6">
      <div class="flex justify-between items-center">
        <ul class="bg-[#F6F9FC] rounded-lg p-1 flex gap-3">
          <li
            :class="`text-black rounded-lg text-xs font-bold w-[120px] h-p leading-9 text-center cursor-pointer ${
              tabId == item.id ? 'bg-white shadow-button2' : 'hover:underline'
            }`"
            v-for="(item, index) in menuList"
            :key="index"
            @click="tabId = item.id"
          >
            {{ item.title }}
          </li>
        </ul>
        <img
          @click="showDown"
          src="@/assets/images/icon/down.png"
          class="w-6 cursor-pointer"
          alt=""
        />
      </div>
      <div v-show="tabId == 1">
        <Power ref="powerRef" />
        <div class="mt-8 pb-6" v-if="active=='day'">
          <Line
            :active="active"
            ref="echartRef1"
            :chartField="state.chartField1"
            class="mb-[80px]"
            :devId="devId"
            :devType="devType"
            echartId="echartId1"
            @tabChange="tabChange"
          />
          <Line
            v-show="active == 'day'"
            ref="echartRef2"
            :devId="devId"
            :devType="devType"
            :chartField="state.chartField2"
            :showMonthYear="false"
            echartId="echartId2"
          />
        </div>
        <div class="mt-8 pb-6" v-if="active=='month'">
            <Month :active="active" :devId="devId"  @tabChange="tabChange" />
        </div>
        <div class="mt-8 pb-6" v-if="active=='year'">
            <Year :active="active" :devId="devId"  @tabChange="tabChange" />
        </div>
      </div>
    </div>
    <DownDialog ref="downRef" />
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import Line from "./line.vue";
import Month from "./Month.vue";
import DownDialog from "./downDialog.vue";
import Year from "./year.vue";
import { useRoute } from "vue-router";
import { Devices } from "@/api";
import Power from "./power.vue";

const route = useRoute();
const { devId,devType} = route.query;
const deviceActive = ref(1);
const snShow = ref(true);
const deviceShow = ref(false);


const active = ref("day");
const checked = ref([]);
const tabId = ref(1);
const menuList = ref([
  { title: "Marst", id: 1 },
  { title: "Custom", id: 2 },
]);

const powerRef = ref();
const echartRef1 = ref();
const echartRef2 = ref();
const state = reactive({
  M_Pbmssn: "",
  M_hwver: "",
  M_swver: "",
  detailFields2: [
    {
      nickname: "M_maxchgcur",
      comment: "最大允许充电电流",
      unit: "A",
      min: 0,
      max: 3000,
      bg: "bg-[#56C271]",
      color: "text-[#56C271]",
      type: "number",
      format: "float",
      alias: "Max Allow Chg cur",
    },
    {
      nickname: "M_maxdchgcur",
      comment: "最大允许放电电流",
      unit: "A",
      min: 0,
      max: 3000,
      bg: "bg-[#FDD015]",
      color: "text-[#FDD015]",
      type: "number",
      format: "float",
      alias: "Max Allow Dhg cur",
    },
    {
      nickname: "M_cumdchg",
      comment: "累计放电量",
      unit: "KWH",
      min: 0,
      max: 4294967295,
      bg: "bg-[#E76262]",
      color: "text-[#E76262]",
      type: "number",
      format: "float",
      alias: "Cumulative discharge",
    },
    {
      nickname: "M_cumchgcap",
      comment: "累计充电量",
      unit: "KWH",
      min: 0,
      max: 4294967295,
      bg: "bg-[#00E0FF]",
      color: "text-[#00E0FF]",
      type: "number",
      format: "float",
      alias: "Cumulative charge",
    },
    {
      nickname: "M_ponlnnum",
      comment: "Pack数量（在线）",
      min: 0,
      max: 65535,
      bg: "bg-[#596CFF]",
      color: "text-[#596CFF]",
      type: "number",
      format: "int",
      alias: "Online pack Qty",
    },
    {
      nickname: "M_hvloc",
      comment: "最高电压位置",
      min: 0,
      bg: "bg-[#FF4B81]",
      color: "text-[#FF4B81]",
      max: 65535,
      type: "number",
      format: "int",
      alias: "Max Volt Position",
    },

    {
      nickname: "M_lvloc",
      comment: "最低电压位置",
      min: 0,
      max: 65535,
      bg: "bg-[#596CFF]",
      color: "text-[#596CFF]",
      type: "number",
      format: "int",
      alias: "Min Volt Position",
    },

    {
      nickname: "M_ltloc",
      comment: "最低温度位置",
      min: 0,
      max: 65535,
      bg: "bg-[#000]",
      color: "text-[#000]",
      type: "number",
      format: "int",
      alias: "Min Temp Position",
    },

    {
      nickname: "M_dctemp",
      comment: "直流母排温度",
      unit: "℃",
      min: -50,
      max: 200,
      bg: "bg-[#FDD015]",
      color: "text-[#FDD015]",
      type: "number",
      format: "int",
      alias: "DC Temp",
    },
    {
      nickname: "M_mostemp",
      comment: "Mos温度",
      unit: "℃",
      min: -50,
      max: 200,
      bg: "bg-[#E76262]",
      color: "text-[#E76262]",
      type: "number",
      format: "int",
      alias: "Mos Temp",
    },
  ],

  chartField1: [
    { nickname: "M_hv", comment: "", unit: "mV", alias: "Max Volt" },
    { nickname: "M_lv", comment: "", unit: "mV", alias: "Min Volt" },
    { nickname: "M_ht", comment: "", unit: "℃", alias: "Max Temp" },
    { nickname: "M_lt", comment: "", unit: "℃", alias: "Min Temp" },
  ],
  chartField2: [
    { nickname: "M_soc", comment: "SOC", unit: "%", alias: "SOC" },
    { nickname: "M_tv", comment: "总压", unit: "V", alias: "Total Voltage" },
    {
      nickname: "M_cur",
      comment: "电流",
      unit: "A",
      min: -3000,
      max: 3000,
      type: "number",
      format: "float",
      alias: "Current",
    },
    {
      nickname: "M_soh",
      comment: "SOH",
      unit: "%",
      min: 0,
      max: 100,
      type: "number",
      format: "float",
      alias: "SOH",
    },
  ],
  filterList: [],
});
const downRef = ref();
const showDown = ()=>{
  downRef.value.showModal({devId,devType,type:'M_hvloc'});
}

//序列号
const getXulieNub = async () => {
  const res = await Devices({
    skip: 0,
    limit: 999,
    filter: {
      devid: { $regex: devId, $options: "i" },
      desc: { $regex: localStorage.getItem("account"), $options: "i" },
      $or: [
        { parents: localStorage.getItem("account") },
        { subusers: localStorage.getItem("account") },
      ],
    },
  });
  if (res) {
    res.data.forEach((item)=>{
      if(item.M_R2 && !state.M_swver ){
        const data =item;
        state.M_Pbmssn = data["M_R2"].M_Pbmssn;
        state.M_hwver = data["M_R2"].M_hwver;
        state.M_swver = data["M_R2"].M_swver;
      }
    })
    powerRef.value.loadData(state.detailFields2, devId, devType);
  }
              
};
getXulieNub();
const tabChange = (type) => {
  active.value = type;
};
</script>
<style lang="scss" scoped></style>
