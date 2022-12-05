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
           ( DCDCOUT-1 )
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
      <Power v-show="tabId ==1" ref="powerRef" />
      <div v-show="tabId ==1" class="mt-8 pb-6">
        <Line
          :active="active"
          ref="echartRef1"
          :chartField="state.chartField1"
          class="mb-[80px]"
          :showMonthYear="false"
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
const { devId,devType } = route.query;
const deviceActive = ref(1);
const snShow = ref(true);
const deviceShow = ref(false);

const active = ref("day");
const checked = ref([]);
const tabId = ref(1)
const menuList = ref([
  { title: "DCDCIN", id: 1 },
  { title: "Custom", id: 2 },
]);

const powerRef = ref();
const echartRef1 = ref();
const echartRef2 = ref();
const downRef = ref();
const showDown = ()=>{
  downRef.value.showModal({devId,devType,type:'DO_sysoutc'});
}

const state = reactive({
  M_Pbmssn: "",
  M_hwver: "",
  M_swver: "",
  detailFields2: [
                 {
                      "nickname": "M1",
                      "comment": "最大允许充电电流",
                      "unit": "A",
                      "min": 0,
                      "max": 3000,
                      "type": "number",
                      "format": "float",
                      "alias":"module number"
                    },
                    {
                      "nickname": "M2",
                      "comment": "最大允许放电电流",
                      "unit": "A",
                      "min": 0,
                      "max": 3000,
                      "type": "number",
                      "format": "float",
                      "alias":"System status0"
                    },
                    {
                      "nickname": "M3",
                      "comment": "累计放电量",
                      "unit": "KWH",
                      "min": 0,
                      "max": 4294967295,
                      "type": "number",
                      "format": "float",
                      "alias":"System status1"
                    },
                    {
                      "nickname": "M4",
                      "comment": "Pack数量（在线）",
                      "min": 0,
                      "max": 65535,
                      "type": "number",
                      "format": "int",
                      "alias":"System status2"
                    },
                     {
                      "nickname": "M5",
                      "comment": "最高电压位置",
                      "min": 0,
                      "max": 65535,
                      "type": "number",
                      "format": "int",
                      "alias":"is in the 0 state"
                    },

                    {
                      "nickname": "M6",
                      "comment": "最低电压位置",
                      "min": 0,
                      "max": 65535,
                      "type": "number",
                      "format": "int",
                      "alias":"is in the 1 state"
                    },

                    {
                      "nickname": "M7",
                      "comment": "最高温度位置",
                      "min": 0,
                      "max": 65535,
                      "type": "number",
                      "format": "int",
                      "alias":"is in the 2 state"
                    },

               ],

  chartField1: [
                  {
                    "nickname": "DO_sysoutv",
                    "comment": "系统输出电压",
                    "unit": "V",
                    "alias":"System Out Voltage"
                  },
                  {
                    "nickname": "DO_sysoutc",
                    "comment": "系统输出电流",
                    "unit": "A",
                    "alias":"System Out Current"

                  },
                  {
                    "nickname": "DO_sysoutp",
                    "comment": "系统输出功率",
                    "unit": "kW",
                    "alias":"System Out Power"

                  }
               ],
  chartField2: [
   
  ],
  filterList: [],
});
const getChart2Config = ()=>{
    state.chartField2=[]
        for(var i=0;i<10;i++){
        state.chartField2.push(
       {
                        "nickname": `DO_M${i+1}outv`,
                        "comment": "模块N输出电压(N>=1)",
                        "unit": "V",
                        "alias":`Module${i+1} Out Voltage`
                      },
                      {
                        "nickname": `DO_M${i+1}outc`,
                        "comment": "模块N输出电流",
                        "unit": "A",
                        "alias":`Module${i+1} Out Current`
                      },
                      {
                        "nickname":`DO_M${i+1}inv`,
                        "comment": "模块N输入电压",
                        "unit": "V",
                        "alias":`Module${i+1} Input Voltage`
                      },
                      {
                        "nickname":`DO_M${i+1}temp`,
                        "comment": "模块N环境温度",
                        "alias":`Module${i+1} Env Temnp`
                      }
        )
    }
        

}
getChart2Config();
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
    echartRef1.value.loadData(devId, data.devtype);
    echartRef2.value.loadData(devId, data.devtype);
  }
};
getXulieNub();
const tabChange = (type) => {
  active.value = type;
};
</script>
<style lang="scss" scoped></style>
