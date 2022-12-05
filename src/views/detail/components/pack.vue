<template>
  <div class="flex min-h-[600px]">
    <ul class="w-[300px] py-10 border-r border-gray-300">
      <li class="">
        <div
          @click="snShow = !snShow"
          :class="`cursor-pointer px-10 flex justify-between items-center text-base text-black font-semibold mb-4 leading-[48px] ${
            deviceActive == 1 ? 'bg-black text-white' : ''
          }`"
        >
          ( {{ state.pbmssn || 'PACK-1'}} )
          <el-icon :class="`${snShow ? 'rotate-180' : ''} transition-all`"
            ><ArrowDownBold
          /></el-icon>
        </div>
        <ul
          :class="`px-10 text-[13px] text-black font-normal overflow-hidden transition-all ${
            snShow ? 'h-[80px]' : 'h-0'
          }`"
        >
          <li v-if="state.hwver" class="flex justify-between leading-[40px]">
            Hardware version
            <span>{{ state.hwver ? "V" + state.hwver : "---" }}</span>
          </li>
          <li v-if="state.swver" class="flex justify-between leading-[40px]">
            Software version
            <span>{{ state.swver ? "V" + state.swver : "---" }}</span>
          </li>
        </ul>
      </li>
      <li class="">
        <div
          @click="snShow = !snShow"
          :class="`cursor-pointer px-10 flex justify-between items-center text-base text-black font-semibold mb-4 leading-[48px] ${
            deviceActive == 1 ? 'bg-black text-white' : ''
          }`"
        >
          ( {{ state.pbmssn1 || 'PACK-2' }} )
          <el-icon :class="`${snShow ? 'rotate-180' : ''} transition-all`"
            ><ArrowDownBold
          /></el-icon>
        </div>
        <ul
          :class="`px-10 text-[13px] text-black font-normal overflow-hidden transition-all ${
            snShow ? 'h-[80px]' : 'h-0'
          }`"
        >
          <li v-if="state.hwver1" class="flex justify-between leading-[40px]">
            Hardware version
            <span>{{ state.hwver1 ? "V" + state.hwver1 : "---" }}</span>
          </li>
          <li v-if="state.swver1" class="flex justify-between leading-[40px]">
            Software version
            <span>{{ state.swver1 ? "V" + state.swver1 : "---" }}</span>
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
      <Power ref="powerRef" v-show="tabId ==1" />
      <div class="mt-8 pb-6" v-if="tabId ==1">
        <Line
          :active="active"
          ref="echartRef1"
          :showMonthYear="false"
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
          :chartField="state.chartField2"
          :devId="devId"
          :devType="devType"
          :showMonthYear="false"
          echartId="echartId2"
        />
      </div>
    </div>
     <DownDialog ref="downRef" />
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import Line from "./line.vue";
import DownDialog from "./downDialog.vue";
import { useRoute } from "vue-router";
import { Devices } from "@/api";
import Power from "./power.vue";

const route = useRoute();
const { devId ,devType} = route.query;
const deviceActive = ref(1);
const snShow = ref(true);
const deviceShow = ref(false);

const active = ref("day");
const checked = ref([]);
const tabId = ref(1);
const menuList = ref([
  { title: "Master", id: 1 },
  { title: "Custom", id: 2 },
]);

const powerRef = ref();
const echartRef1 = ref();
const echartRef2 = ref();

const downRef = ref();
const showDown = ()=>{
  downRef.value.showModal({devId,devType,type:'P1_mostemp'});
}

const state = reactive({
  pbmssn: "",
  hwver: "",
  swver: "",
  pbmssn1: "",
  hwver1: "",
  swver1: "",
  detailFields2:[
    {
        "nickname": "P1_maxchgcur",
        "comment": "最大允许充电电流",
        "unit": "A",
        "min": 0,
        "max": 3000,
        "type": "number",
        "format": "float",   "alias":"Max Allow Chg cur"
    },
    {
        "nickname": "P1_maxdchgcur",
        "comment": "最大允许放电电流",
        "unit": "A",
        "min": 0,
        "max": 3000,
        "type": "number",
        "format": "float",  "alias":"Max Allow Dhg cur"
    },
    {
        "nickname": "P1_cumdchg",
        "comment": "累计放电量",
        "unit": "KWH",
        "min": 0,
        "max": 4294967295,
        "type": "number",
        "format": "float",  "alias":"Cumulative discharge"
    },
        {
        "nickname": "P1_cellnum",
        "comment": "单体数量",
        "min": 0,
        "max": 999,
        "type": "number",
        "format": "int", "alias":"Cell Num"
    },
    {
        "nickname": "P1_hvloc",
        "comment": "最高电压位置",
        "min": 0,
        "max": 65535,
        "type": "number",
        "format": "int", "alias":"Max Volt Position"
    },

    {
        "nickname": "P1_lvloc",
        "comment": "最低电压位置",
        "min": 0,
        "max": 65535,
        "type": "number",
        "format": "int", "alias":"Min Volt Position"
    },

    {
        "nickname": "P1_htloc",
        "comment": "最高温度位置",
        "min": 0,
        "max": 65535,
        "type": "number",
        "format": "int",  "alias":"Max Temp Position"
    },

    {
        "nickname": "P1_ltloc",
        "comment": "最低温度位置",
        "min": 0,
        "max": 65535,
        "type": "number",
        "format": "int", "alias":"Min Temp Position"
    },
        {
        "nickname": "P1_Rrun",
        "comment": "运行状态",
        "min": 0,
        "max": 2,
        "enums": ["0", "1", "2"],
        "enumNames": ["quiescence ", "charge", "discharge"],
        "type": "number",
        "format": "int", "alias":"Run State"
    },


    {
        "nickname": "P1_tempnum",
        "comment": "温度数量",
        "min": 0,
        "max": 499,
        "type": "number",
        "format": "int", "alias":"Temp Num"
    },
    {
        "nickname": "P1_remaincap",
        "comment": "剩余容量",
        "unit": "mAH",
        "max": 4294967295,
        "type": "number",
        "format": "int", "alias":"Residual Capacity"
    }
    ],

  chartField1: [
    {
      nickname: "P1_tv",
      comment: "总压",
      unit: "V",
      min: 0,
      max: 1000,
      type: "number",
      format: "float",
      alias: "Total Volt",
    },
    {
      nickname: "P1_cur",
      comment: "电流",
      unit: "A",
      min: -3000,
      max: 3000,
      type: "number",
      format: "float",
      alias: "Current",
    },
    {
      nickname: "P1_soc",
      comment: "SOC",
      unit: "%",
      min: 0,
      max: 100,
      type: "number",
      format: "float",
      alias: "SOC",
    },
    {
      nickname: "P1_soh",
      comment: "SOH",
      unit: "%",
      min: 0,
      max: 100,
      type: "number",
      format: "float",
      alias: "SOH",
    },
  ],
  chartField2: [
    {
      nickname: "P1_hv",
      comment: "最高电压",
      unit: "mV",
      min: 0,
      max: 5000,
      type: "number",
      format: "int",
      alias: "Max Volt",
    },
    {
      nickname: "P1_lv",
      comment: "最低电压",
      unit: "mV",
      min: 0,
      max: 5000,
      type: "number",
      format: "int",
      alias: "Min Volt",
    },
    {
      nickname: "P1_ht",
      comment: "最高温度",
      unit: "℃",
      min: -50,
      max: 200,
      type: "number",
      format: "float",
      alias: "Max Temp",
    },
    {
      nickname: "P1_lt",
      comment: "最低温度",
      unit: "℃",
      min: -50,
      max: 200,
      type: "number",
      format: "float",
      alias: "Min Temp",
    },

    {
      nickname: "P1_mostemp",
      comment: "MOS温度",
      unit: "℃",
      min: -50,
      max: 200,
      type: "number",
      format: "float",
      alias: "Mos Temp",
    }
  ],
  filterList: [],
});

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
  // console.log(res.data[0],"&^**&&**")
  if (res) {
    res.data.forEach((item)=>{
      if(item.P1_R2 && !state.swver ){
        const data =item['P1_R2'];
        state.pbmssn = data.P1_Pbmssn;
        state.hwver = data.P1_hwver;
        state.swver = data.P1_swver;
      }
      if(item.P2_R2 && !state.hwver1 ){
        const data =item['P2_R2'];
        state.pbmssn1 = data.P2_Pbmssn;
        state.hwver1 = data.P2_hwver;
        state.swver1 = data.P2_swver;
      }
    })
    powerRef.value.loadData(state.detailFields2, devId, devType);
  
  }
};
getXulieNub();
const tabChange = (type) => {
  console.log(type, "type");
  active.value = type;
};
</script>
<style lang="scss" scoped></style>
