<template>
  <div class="flex min-h-[500px]">
    <ul class="w-[300px] py-10 border-r border-gray-300">
      <li class="">
        <div
          @click="snShow = !snShow"
          :class="`cursor-pointer px-10 flex justify-between items-center text-base text-black font-semibold mb-4 leading-[48px] ${
            deviceActive == 1 ? 'bg-black text-white' : ''
          }`"
        >
          <!-- ({{ state.M_Pbmssn }}) -->
          ( Inverter-1 )
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
          src="@/assets/images/icon/down.png"
          class="w-6 cursor-pointer"
          alt=""
        />
      </div>
      <Power v-show="tabId ==1" ref="powerRef" />
      <div class="mt-8 pb-6" v-if="tabId ==1 && active=='day'">
        <Line
          :active="active"
          ref="echartRef1"
          :chartField="state.chartField1"
          class="mb-[80px]"
          echartId="echartId1"
          :devId="devId"
          :devType="devType"
          @tabChange="tabChange"
        />
        <Line
          v-show="active == 'day'"
          ref="echartRef2"
          :chartField="state.chartField2"
          :showMonthYear="false"
          :devId="devId"
          :devType="devType"
          echartId="echartId2"
        />
      </div>
      <div class="mt-8 pb-6" v-if="tabId ==1 && active=='month' ">
        <Month2 :active="active" :devId="devId"  @tabChange="tabChange" />
      </div>
      <div class="mt-8 pb-6" v-if="tabId ==1 && active=='year' ">
        <Year :active="active" :devId="devId"  @tabChange="tabChange" />
      </div>
    </div>
    <DownDialog ref="downRef" />
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import Line from "./line.vue";
import Month2 from "./Month2.vue";
import Year from "./year.vue";
import DownDialog from "./downDialog.vue";
import { useRoute } from "vue-router";
import { Devices } from "@/api";
import Power from "./power.vue";

const route = useRoute();
const { devId,devType} = route.query;
const deviceActive = ref(1);
const snShow = ref(true);
const deviceShow = ref(false);

const active = ref("day");
const tabId = ref(1);
const checked = ref([]);
const menuList = ref([
  { title: "Solar", id: 1 },
  { title: "Grid", id: 2 },
  { title: "Load", id: 3 },
]);

const powerRef = ref();
const echartRef1 = ref();
const echartRef2 = ref();

const downRef = ref();
const showDown = ()=>{
  downRef.value.showModal({devId,devType,type:'I_ppv2'});
}

const state = reactive({
  M_Pbmssn: "",
  M_hwver: "",
  M_swver: "",
  detailFields2: [
                      {
                    "nickname": "I_epv1day",
                    "comment": "PV1今日发电量/AC储能Epv_day",
                    "unit": "kWh",
                    "min": 0,
                    "max": 6553.5,
                    "type": "number",
                    "format": "float","alias":"PV1 Today Generate"
                  },
                  {
                    "nickname": "I_epv2day",
                    "comment": "PV2今日发电量,AC储能无此变量",
                    "unit": "kWh",
                    "min": 0,
                    "max": 6553.5,
                    "type": "number",
                    "format": "float","alias":"PV2 Today Generate"
                  },
                  {
                    "nickname": "I_epv3day",
                    "comment": "PV3今日发电量（总的PV今日发电量，由PV1，2,3相加得到）,AC储能无此变量",
                    "unit": "kWh",
                    "min": 0,
                    "max": 6553.5,
                    "type": "number",
                    "format": "float","alias":"PV3 Today Generate"
                  },
                  {
                    "nickname": "I_echgall",
                    "comment": "累积充电电量",
                    "unit": "kWh",
                    "min": 0,
                    "max": 429496729.5,
                    "type": "number",
                    "format": "float","alias":"Total Charge"
                  },
                  {
                    "nickname": "I_edchgall",
                    "comment": "累积放电电量",
                    "unit": "kWh",
                    "min": 0,
                    "max": 429496729.5,
                    "type": "number",
                    "format": "float","alias":"Total Discharge"
                  }
               ],

  chartField1: [
                 {
                    "nickname": "I_vpv1",
                    "comment": "PV1电压,AC储能无此变量",
                    "unit": "V",
                    "min": 0,
                    "max": 6553.5,
                    "type": "number",
                    "format": "float","alias":"PV1 Voltage"
                  },
                  {
                    "nickname": "I_vpv2",
                    "comment": "PV2电压,AC储能无此变量",
                    "unit": "V",
                    "min": 0,
                    "max": 6553.5,
                    "type": "number",
                    "format": "float","alias":"PV2 Voltage"
                  },
                  {
                    "nickname": "I_vpv3",
                    "comment": "PV3电压,AC储能无此变量",
                    "unit": "V",
                    "min": 0,
                    "max": 6553.5,
                    "type": "number",
                    "format": "float","alias":"PV3 Voltage"
                  }
               ],
  chartField2: [
                      {
                    "nickname": "I_ppv1",
                    "comment": "PV1功率/AC储能Ppv",
                    "unit": "W",
                    "min": 0,
                    "max": 65535,
                    "type": "number",
                    "format": "int","alias":"PV1 Power"
                  },
                  {
                    "nickname": "I_ppv2",
                    "comment": "PV2功率,AC储能无此变量",
                    "unit": "W",
                    "min": 0,
                    "max": 65535,
                    "type": "number",
                    "format": "int","alias":"PV2 Power"
                  },
                  {
                    "nickname": "I_ppv3",
                    "comment": "PV3功率（总的PV功率，由PV1，2，3相加得到）,AC储能无此变量",
                    "unit": "W",
                    "min": 0,
                    "max": 65535,
                    "type": "number",
                    "format": "int","alias":"PV3 Power"
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
    let data = res.data[0];
    if (data && data["M_R2"]) {
      state.M_Pbmssn = data["M_R2"].M_Pbmssn;
      state.M_hwver = data["M_R2"].M_hwver;
      state.M_swver = data["M_R2"].M_swver;
    }
    powerRef.value.loadData(state.detailFields2, devId, data.devtype);
   
  }
};
getXulieNub();
const tabChange = (type) => {
  console.log(type, "type");
  active.value = type;
};
</script>
<style lang="scss" scoped></style>
