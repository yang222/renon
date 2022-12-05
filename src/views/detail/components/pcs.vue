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
          <!-- ({{ state.M_Pbmssn }}) -->
          ( PCS-1 )
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
            @click="NavChange(item.id)"
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
      <Power v-if="tabId != 4" ref="powerRef" />
      <div v-if="tabId == 1">
         <div class="mt-8 pb-6" v-if="active == 'day'">
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
          </div>
          <div class="mt-8 pb-6" v-if="active=='month' ">
            <Month2 :active="active" :devId="devId"  @tabChange="tabChange" />
          </div>
          <div class="mt-8 pb-6" v-if="active=='year' ">
            <Year :active="active" :devId="devId"  @tabChange="tabChange" />
          </div>
      </div>
      <div v-if="tabId == 2">
         <div class="mt-8 pb-6" v-if="active == 'day'">
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
              v-if="active == 'day'"
              ref="echartRef2"
              :chartField="state.chartField2"
              :showMonthYear="false"
              :devId="devId"
              :devType="devType"
              echartId="echartId2"
            />
          </div>
          <div class="mt-8 pb-6" v-if="active=='month' ">
            <Month2 :active="active" :devId="devId"  @tabChange="tabChange" />
          </div>
          <div class="mt-8 pb-6" v-if="active=='year' ">
            <Year :active="active" :devId="devId"  @tabChange="tabChange" />
          </div>
      </div>
      <div v-if="tabId == 3">
         <div class="mt-8 pb-6" v-if="active == 'day'">
            <Line
              :active="active"
              ref="echartRef1"
              :chartField="state.chartField1"
              class="mb-[80px]"
              :devId="devId"
              :devType="devType"
               :showMonthYear="false"
              echartId="echartId1"
              @tabChange="tabChange"
            />
          
          </div>
          
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
const { devId,devType } = route.query;
const deviceActive = ref(1);
const snShow = ref(true);
const deviceShow = ref(false);

const active = ref("day");
const checked = ref([]);
const tabId = ref(1);
const menuList = ref([
  { title: "DC", id: 1 },
  { title: "AC", id: 2 },
  { title: "System", id: 3 },
  { title: "Custom", id: 4 },
]);

const powerRef = ref();
const echartRef1 = ref();
const echartRef2 = ref();
const state = reactive({
  M_Pbmssn: "",
  M_hwver: "",
  M_swver: "",
  detailFields2: [],

  chartField1: [],
  chartField2: [],
  filterList: [],
});

const downRef = ref();
const showDown = ()=>{
  downRef.value.showModal({devId,devType,type:'PC_tpow'});
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
  // console.log(res.data[0],"&^**&&**")
  if (res) {
    let data = res.data[0];
    if (data && data["M_R2"]) {
      state.M_Pbmssn = data["M_R2"].M_Pbmssn;
      state.M_hwver = data["M_R2"].M_hwver;
      state.M_swver = data["M_R2"].M_swver;
    }
    powerRef.value.loadData(state.detailFields2, devId, data.devtype);
    echartRef1.value && echartRef1.value.loadData(devId, data.devtype);
    echartRef2.value && echartRef2.value.loadData(devId, data.devtype);
  }
};

const tabChange = (type) => {
  active.value = type;
};
const NavChange = (id) => {
  tabId.value = id;
  if (id == 1) {
    state.detailFields2 = [
      {
        nickname: "PC_DSfulchg",
        comment: "直流支路1状态:battery fully charged",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "battery fully charged",
        groud: 1,
      },
      {
        nickname: "PC_DStotdchg",
        comment: "直流支路1状态:battery totally discharged",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "battery totally discharged",
        groud: 1,
      },
      {
        nickname: "PC_DSchging",
        comment: "直流支路1状态:charging",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "charging",
        groud: 1,
      },
      {
        nickname: "PC_DSdchging",
        comment: "直流支路1状态:discharging",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "discharging",
        groud: 1,
      },
      {
        nickname: "PC_DSequachg",
        comment: "直流支路1状态:equalizing charge",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "equalizing charge",
        groud: 1,
      },
      {
        nickname: "PC_DSfloatchg",
        comment: "直流支路1状态:floating charge",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "floating charge",
        groud: 1,
      },
      {
        nickname: "PC_DSdcswit",
        comment: "直流支路1状态:DC switch status",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "DC switch status",
        groud: 1,
      },
      {
        nickname: "PC_DSonoff",
        comment: "直流支路1状态:On/Off status",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "On/Off status",
        groud: 1,
      },
      {
        nickname: "PC_DSstarup",
        comment: "直流支路1状态:Startup status",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "Startup status",
        groud: 1,
      },
      {
        nickname: "PC_cumchgeng",
        comment: "直流累计充电电量(kWh)",
        unit: "kWh",
        min: 0,
        max: 4294967295,
        type: "number",
        format: "int",
        alias: "total charge",
        groud: 1,
      },
      {
        nickname: "PC_cumdchgeng",
        comment: "直流累计放电电量(kWh)",
        unit: "kWh",
        min: 0,
        max: 4294967295,
        type: "number",
        format: "int",
        alias: "total discharge",
        groud: 1,
      },
      {
        nickname: "PC_dcdpatchen",
        comment: "直流调度模式使能",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "",
        groud: 1,
      },
    ];

    state.chartField1 = [
      {
        nickname: "PC_power",
        comment: "直流功率(kW)",
        unit: "kW",
        min: -1500,
        max: 1500,
        type: "number",
        format: "float",
        alias: "DC Power",
      },
      {
        nickname: "PC_voltage",
        comment: "直流电压(V)",
        unit: "V",
        min: 0,
        max: 1000,
        type: "number",
        format: "float",
        alias: "DC Voltage",
      },
      {
        nickname: "PC_current",
        comment: "直流电流(A)",
        unit: "A",
        min: -2000,
        max: 2000,
        type: "number",
        format: "float",
        alias: "DC Current",
      },
    ];
  } else if (id == 2) {
    state.detailFields2 = [
      {
        nickname: "PC_ASonoff",
        comment: "AC模块状态:On/Off status 启停状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC On/Off status",
        groud: 2,
      },
      {
        nickname: "PC_ASstandby",
        comment: "AC模块状态:Standby status待机状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Standby status",
        groud: 2,
      },
      {
        nickname: "PC_ASgridtied",
        comment: "AC模块状态:Grid-tied status并网状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Grid-tied Status",
        groud: 2,
      },
      {
        nickname: "PC_ASofftied",
        comment: "AC模块状态:Off-grid status离网状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC :Off-grid  Status",
        groud: 2,
      },
      {
        nickname: "PC_ASlocmanctl",
        comment: "AC模块状态:Local manual control启动中状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Local manual control",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT1",
        comment: "AC模块组模块在线状态:AC-1:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State1",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT2",
        comment: "AC模块组模块在线状态:AC-2:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State2",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT3",
        comment: "AC模块组模块在线状态:AC-3:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State3",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT4",
        comment: "AC模块组模块在线状态:AC-4:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State4",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT5",
        comment: "AC模块组模块在线状态:AC-5:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State5",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT6",
        comment: "AC模块组模块在线状态:AC-6:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State6",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT7",
        comment: "AC模块组模块在线状态:AC-7:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State7",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT8",
        comment: "AC模块组模块在线状态:AC-8:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State8",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT9",
        comment: "AC模块组模块在线状态:AC-9:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State9",
        groud: 2,
      },
      {
        nickname: "PC_ACONSTAT10",
        comment: "AC模块组模块在线状态:AC-10:  online",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Online State10",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT1",
        comment: "AC模块组模块运行状态:AC-1:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State1",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT2",
        comment: "AC模块组模块运行状态:AC-2:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State2",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT3",
        comment: "AC模块组模块运行状态:AC-3:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State3",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT4",
        comment: "AC模块组模块运行状态:AC-4:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State4",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT5",
        comment: "AC模块组模块运行状态:AC-5:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State5",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT6",
        comment: "AC模块组模块运行状态:AC-6:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State6",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT7",
        comment: "AC模块组模块运行状态:AC-7:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State7",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT8",
        comment: "AC模块组模块运行状态:AC-8:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State8",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT9",
        comment: "AC模块组模块运行状态:AC-9:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State9",
        groud: 2,
      },
      {
        nickname: "PC_ACRUNSTAT10",
        comment: "AC模块组模块运行状态:AC-10:  running",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Sunning State10",
        groud: 2,
      },
      {
        nickname: "PC_freq",
        comment: "交流频率(Hz)",
        unit: "Hz",
        min: 40,
        max: 70,
        type: "number",
        format: "float",
        alias: "freq",
        groud: 2,
      },
      {
        nickname: "PC_cumchgengac",
        comment: "累积交流充电电量 (kWh)",
        unit: "kWh",
        min: 0,
        max: 4294967295,
        type: "number",
        format: "int",
        alias: "AC Total Charge",
        groud: 2,
      },
      {
        nickname: "PC_cumdchgengac",
        comment: "累积交流放电电量(kWh)",
        unit: "kWh",
        min: 0,
        max: 4294967295,
        type: "number",
        format: "int",
        alias: "AC Total Discharge",
        groud: 2,
      },
      {
        nickname: "PC_daychgenyac",
        comment: "当天交流充电电量(kWh)",
        unit: "kWh",
        min: 0,
        max: 65535,
        type: "number",
        format: "int",
        alias: "AC  Day Total Charge",
        groud: 2,
      },
      {
        nickname: "PC_daydchgengac",
        comment: "当天交流放电电量(kWh)",
        unit: "kWh",
        min: 0,
        max: 65535,
        type: "number",
        format: "int",
        alias: "AC  Day Total Discharge",
        groud: 2,
      },
      {
        nickname: "PC_acdpatchen",
        comment: "交流调度模式使能",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "acdpatchen",
        groud: 2,
      },
    ];
    state.chartField1 = [
      {
        nickname: "PC_volab",
        comment: "AB交流线电压(V)",
        unit: "V",
        min: 0,
        max: 600,
        type: "number",
        format: "float",
        alias: "AB Voltage",
      },
      {
        nickname: "PC_volbc",
        comment: "BC交流线电压(V)",
        unit: "V",
        min: 0,
        max: 600,
        type: "number",
        format: "float",
        alias: "BC Voltage",
      },
      {
        nickname: "PC_volac",
        comment: "CA交流线电压(V)",
        unit: "V",
        min: 0,
        max: 600,
        type: "number",
        format: "float",
        alias: "AC Voltage",
      },
      {
        nickname: "PC_cura",
        comment: "A相交流电流(A)",
        unit: "A",
        min: -1500,
        max: 1500,
        type: "number",
        format: "float",
        alias: "A Current",
      },
      {
        nickname: "PC_curb",
        comment: "B相交流电流(A)",
        unit: "A",
        min: -1500,
        max: 1500,
        type: "number",
        format: "float",
        alias: "B Current",
      },
      {
        nickname: "PC_curc",
        comment: "C相交流电流(A)",
        unit: "A",
        min: -1500,
        max: 1500,
        type: "number",
        format: "float",
        alias: "C Current",
      },
    ];
    state.chartField2 = [
      {
        nickname: "PC_powa",
        comment: "A相交流有功功率(kW)",
        unit: "kW",
        min: -400,
        max: 400,
        type: "number",
        format: "float",
        alias: "A Power",
      },
      {
        nickname: "PC_powb",
        comment: "B相交流有功功率(kW)",
        unit: "kW",
        min: -400,
        max: 400,
        type: "number",
        format: "float",
        alias: "B Power",
      },
      {
        nickname: "PC_powc",
        comment: "C相交流有功功率(kW)",
        unit: "kW",
        min: -400,
        max: 400,
        type: "number",
        format: "float",
        alias: "C Power",
      },
      {
        nickname: "PC_appowa",
        comment: "A相交流视在功率(kVA)",
        unit: "kVA",
        min: -400,
        max: 400,
        type: "number",
        format: "float",
        alias: "A AP Power",
      },
      {
        nickname: "PC_appowb",
        comment: "B相交流视在功率(kVA)",
        unit: "kVA",
        min: -400,
        max: 400,
        type: "number",
        format: "float",
        alias: "B AP Power",
      },
      {
        nickname: "PC_appowc",
        comment: "C相交流视在功率(kVA)",
        unit: "kVA",
        min: -400,
        max: 400,
        type: "number",
        format: "float",
        alias: "C AP Power",
      },
      {
        nickname: "PC_pfa",
        comment: "A相交流功率因数",
        min: -1,
        max: 1,
        type: "number",
        format: "float",
        alias: "pfa",
      },
      {
        nickname: "PC_pfb",
        comment: "B相交流功率因数",
        min: -1,
        max: 1,
        type: "number",
        format: "float",
        alias: "pfb",
      },
      {
        nickname: "PC_pfc",
        comment: "C相交流功率因数",
        min: -1,
        max: 1,
        type: "number",
        format: "float",
        alias: "pfc",
      },
      {
        nickname: "PC_tpow",
        comment: "总交流有功功率(kW)",
        unit: "kW",
        min: -1200,
        max: 1200,
        type: "number",
        format: "float",
        alias: "tpow",
      },
      {
        nickname: "PC_tappow",
        comment: "总交流视在功率(kvar)",
        unit: "kvar",
        min: -1200,
        max: 1200,
        type: "number",
        format: "float",
        alias: "tappow",
      },
      // {
      //   "nickname": "PC_tpf",
      //   "comment": "总交流功率因数",
      //   "min": -1,
      //   "max": 1,
      //   "type": "number",
      //   "format": "float",
      //   "alias":"tpf"
      // },
    ];
  } else if (id == 3) {
    state.detailFields2 = [
      {
        nickname: "PC_rackbodon",
        comment: "机架功能板在线",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "rackbodon",
        groud: 3,
      },
      {
        nickname: "PC_lochandctl",
        comment: "本地手动控制状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "Local Hand Ctrl",
        groud: 3,
      },
      {
        nickname: "PC_locautoctl",
        comment: "本地自动控制状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "Local Auto Ctrl",
        groud: 3,
      },
      {
        nickname: "PC_remctl",
        comment: "远程控制状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "Remote Ctl",
        groud: 3,
      },
      {
        nickname: "PC_fvrten",
        comment: "穿越使能",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "fvrten",
        groud: 3,
      },
      {
        nickname: "PC_antiislden",
        comment: "孤岛检测使能",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "antiislden",
        groud: 3,
      },
      {
        nickname: "PC_acswitcls",
        comment: "交流开关闭合",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AC Switch Close",
        groud: 3,
      },
      {
        nickname: "PC_alarmstat",
        comment: "告警状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "AlarmState",
        groud: 3,
      },
      {
        nickname: "PC_faultstat",
        comment: "故障状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "FaultState",
        groud: 3,
      },
      {
        nickname: "PC_initstat",
        comment: "PCS初始化状态",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "PCS InitStat",
        groud: 3,
      },
      {
        nickname: "PC_monsoftcod",
        comment: "监控软件内部代码",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "Monitor Soft Code",
        groud: 3,
      },
      {
        nickname: "PC_acsoftcod",
        comment: "AC软件内部代码",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "Ac Soft Code",
        groud: 3,
      },
      {
        nickname: "PC_u2softcod",
        comment: "U2软件内部代码",
        min: 0,
        max: 1,
        type: "number",
        format: "int",
        alias: "U2 Soft Code",
        groud: 3,
      },
    ];
    state.chartField1 = [
      {
        nickname: "PC_modtemp",
        comment: "模块温度(℃)",
        unit: "℃",
        min: 40,
        max: 120,
        type: "number",
        format: "float",
        alias: "Module Temp",
      },
      {
        nickname: "PC_ambtemp",
        comment: "环境温度(℃)",
        unit: "℃",
        min: -20,
        max: 80,
        type: "number",
        format: "float",
        alias: "Env Temp",
      },
    ];
  }
  getXulieNub()
};
NavChange(1);
</script>
<style lang="scss" scoped></style>
