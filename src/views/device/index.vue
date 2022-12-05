<template>
  <div class="flex Device min-h-full">
    <div
      class="w-[300px] pb-4 box-border absolute h-[calc(100%-64px)] overflow-y-auto bg-white rounded-lg"
    >
      <div v-if="role != 4">
        <div class="flex items-center mb-1 p-4">
          <el-icon @click="getDevDetail" size="22" class="cursor-pointer reset"
            ><Refresh
          /></el-icon>
          <el-input
            v-model="query.plantName"
            class="w-50 ml-2"
            :clearable="true"
            placeholder="Please Input Plant"
          >
          </el-input>
          <button
            @click="filterList2"
            class="bg-[#000] text-white text-xs px-4 ml-2 rounded-md hover:shadow-xl h-8"
          >
            Search
          </button>
        </div>
        <div class="bg-[#D9D9D9] text-xl font-bold py-1 px-6 mb-2">Plant</div>
        <ul class="px-6">
          <li
            @click="handleChange(item, 1)"
            v-for="(item, index) in state.plantList"
            :key="index"
            :class="`leading-8 text-sm rounded-md  cursor-pointer pl-2 ${
              state.plantInfo.id == item.id
                ? ' bg-gray-400 text-white'
                : 'text-[#6C757D] hover:bg-gray-400 hover:text-white'
            }`"
          >
            {{ item.nickname || item.username || item.id }}
          </li>
        </ul>
      </div>
      <div v-if="role != 4" class="h-[1px] w-[90%] bg-black mx-auto mt-2"></div>
      <div>
        <div class="flex items-center p-4">
          <el-input
            v-model="query.devName"
            :clearable="true"
            class="w-50 ml-2"
            placeholder="Please Input Device"
          >
          </el-input>
          <button
            @click="filterList"
            class="bg-[#000] text-white text-xs px-4 ml-2 rounded-md hover:shadow-xl h-8"
          >
            Search
          </button>
        </div>
        <div class="bg-[#D9D9D9] text-xl font-bold py-1 px-6 mb-2">DevName</div>
        <ul class="px-6">
          <li
            @click="handleChange(item, 2)"
            v-for="(item, index) in state.devList"
            :key="index"
            :class="`leading-8 text-sm rounded-md  cursor-pointer pl-2 ${
              state.selectData.devid == item.devid
                ? ' bg-gray-400 text-white'
                : 'text-[#6C757D] hover:bg-gray-400 hover:text-white'
            }`"
          >
            {{ item.devname }}
          </li>
        </ul>
      </div>
    </div>
    <div v-loading="state.loading" class="w-[calc(100%-316px)] ml-[316px]">
      <div class="bg-white rounded-lg py-6 px-8 flex relative">
        <div class="w-[160px]">
          <ul>
            <li class="text-lg font-bold">
              <p class="text-black mb-1">Status</p>
              <p v-if="state.selectData != 0" class="text-[#8B8F92]">
                Off-line
              </p>
              <p v-else class="text-[#3ECE80]">Online</p>
            </li>
            <li class="text-lg font-bold my-6">
              <p class="text-black mb-1">Type</p>
              <p class="text-black text-base font-normal">
                {{ state.selectData.devtype }}
              </p>
            </li>
            <li class="text-lg font-bold">
              <p class="text-black mb-1">DevID</p>
              <p class="text-black text-base font-normal">
                {{ state.selectData.devid }}
              </p>
            </li>
          </ul>
        </div>
        <div class="ml-12 overflow-x-auto flex-1">
          <div class="flex items-center w-[870px] overflow-x-auto">
            <Pie
              :oriData="state.oriData"
              :ChargePower="state.ChargePower"
              :subDev="state.subDev"
            />
            <!-- <Generation/> -->
            <div @click="toDetail" class="cursor-pointer">
              <Generation2
                :ChargePower="state.ChargePower"
                :oriData="state.oriData"
                :status="state.selectData && state.selectData.status"
                v-if="state.selectData && state.selectData.devtype == 'ME_AC'"
              />
              <Generation1
                :ChargePower="state.ChargePower"
                :oriData="state.oriData"
                :status="state.selectData && state.selectData.status"
                v-else-if="
                  state.selectData && state.selectData.devtype == 'ME_DC'
                "
              />
              <Generation3
                v-else-if="state.selectData && state.selectData.devtype == 'HE_ALLINONE'"
                :ChargePower="state.ChargePower"
                :oriData="state.oriData"
                :status="state.selectData && state.selectData.status"
              />
              <Generation
                v-else
                :oriData="state.oriData"
                :ChargePower="state.ChargePower"
                :status="state.selectData && state.selectData.status"
              />
            </div>
          </div>
        </div>
      </div>
      <PlantInfo :selectData="state.selectData" :plantName="plantName" />
    </div>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import Generation from "./components/generation.vue";
import Generation1 from "./components/generation1.vue";
import Generation2 from "./components/generation2.vue";
import Generation3 from "./components/generation3.vue";
import PlantInfo from "./components/plant-info.vue";
import Pie from "./components/blocks/pie.vue";
import { getRoleId } from "@/utils/data";
import { Devices, deviceDetail, Subusers } from "@/api";
import { lastDataAllField } from "@/api/devices";
import { reactive, watch } from "vue";
import { usePermissStore } from "@/store/permiss";

const store = usePermissStore();
const route = useRoute();
const router = useRouter();
const role = getRoleId();
const { plantName, devId } = route.query;
const state = reactive({
  devList: [],
  initList: [],
  initPlantList: [],
  selectData: "",
  plantInfo: {},
  plantList: [],
  devDetail: {},
  oriData: {},
  subDev: [],
  value: "",
  curDev: "",
  selectIndex: "",
  ChargePower: "",
  loading: false,
});

watch(
  () => state.selectData,
  (news) => {
    store.setDevId(news);
  }
);

const query = reactive({
  plantName: "",
  devName: "",
  devid: "",
});

const getSubusers = () => {
  let filter = { parent: localStorage.getItem("account") };
  Subusers({
    filter: filter,
    skip: 0,
    limit: 999,
    descend: true,
  }).then(async (res) => {
    state.plantList = res.data;
    state.initPlantList = res.data;
    console.log(state.plantList, "state.plantList");
  });
};
getSubusers();

const getDevList = () => {
  const username = localStorage.getItem("account");
  Devices({
    skip: 0,
    limit: 999,
    filter: {
      desc: { $regex: username, $options: "i" },
      $or: [{ parents: username }, { subusers: username }],
    },
  }).then((res) => {
    if (plantName) {
      state.devList = res.data.filter((item) => {
        try {
          let desc = item.desc ? JSON.parse(item.desc) : "";
          return desc.parent.includes(plantName);
        } catch (e) {
          return false;
        }
      });
    } else {
      state.devList = res.data;
    }

    state.initList = state.devList;
    if (devId) {
      const obj = state.devList.find((item) => item.devid == devId);
      query.devid = devId;
      state.selectData = obj;
    } else {
      state.selectData = state.devList[0];
      query.devid = state.selectData.devid;
    }
    getDevDetail();
  });
};
getDevList();
const devChange = (val) => {
  const obj = state.devList.find((item) => item.devid == val);
  if (obj) {
    state.selectData = obj;
    getDevDetail();
  }
};
const toDetail = () => {
  router.push(
    "/home/detail?devId=" + state.selectData.devid+ "&devType=" + state.selectData.devtype
  );
};

const getDevDetail = async () => {
  state.loading = true;
  if (state.selectData.devid) {
    state.devDetail = await deviceDetail(state.selectData.devid, {
      devtype: state.selectData.devtype,
    });
    state.oriData = await lastDataAllField(
      state.selectData.devid,
      {devType:state.selectData.devtype}
    );
    getPower();
  }

};
const getPower = () => {
  let cur = getData2("cur") ? getData2("cur") : 0;
  let tv = getData2("tv") ? getData2("tv") : 0;

  state.ChargePower = (cur * tv).toFixed(2);
  state.loading = false;
  // this.DischargePower = ''
};
const getData2 = (key) => {
  let subDevNo = "E";
  if (!state.oriData[subDevNo + "_" + key]) {
    return undefined;
  }
  // console.log(item,'oooo')
  return state.oriData[subDevNo + "_" + key];
};
const filterList = () => {
  if (!query.devName) {
    state.devList = JSON.parse(JSON.stringify(state.initList));
  } else {
    state.devList = state.initList.filter((item) => {
      return item.devname.indexOf(query.devName) > -1;
    });
  }
};

const filterList2 = () => {
  if (!query.plantName) {
    state.plantList = JSON.parse(JSON.stringify(state.initPlantList));
  } else {
    state.plantList = state.initPlantList.filter((item) => {
      return item.nickname.indexOf(query.plantName) > -1;
    });
  }
};

const handleChange = (item, type) => {
  if (type == 1) {
    if (item.username == state.plantInfo.username) return;
    state.plantInfo = item;
    state.devList = state.initList.filter((item) => {
      try {
        let desc = item.desc ? JSON.parse(item.desc) : "";
        return desc.parent.includes(state.plantInfo.username);
      } catch (e) {
        return false;
      }
    });
    if(state.devList.length){
      state.selectData = state.devList[0];
      getDevDetail();
    }
 
  } else {
    if (item.devid == state.selectData.devid) return;
    state.selectData = item;
    getDevDetail();
  }
};
</script>
<style lang="scss">
.Device {
  .el-input__wrapper {
    padding-right: 0;
  }
  //   .el-input__suffix {
  //     cursor: pointer;
  //     background: #000;
  //     padding-right: 10px;
  //     color: #fff;
  //     font-weight: 700;
  //     border-radius: 4px;
  //   }
  .reset {
    transition: all 0.7s;
    &:active {
      transform: rotate(720deg);
    }
  }
}
</style>
