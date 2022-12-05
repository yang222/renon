<template>
  <div v-loading="state.loading">
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="(item, index) in state.schemaStatus"
        :key="index"
        :class="`py-3 bg-white rounded-lg flex-1 px-8 ${
          !item.show_frontend
            ? 'hidden'
            : ''
        }`"
      >
        <h2 class="font-bold text-black text-3xl mb-8">{{ item.nickname }}</h2>
        <div class="px-10">
          <el-form
            v-if="Object.keys(item.properties).length == 0"
            label-position="top"
            label-width="100px"
            :model="form"
          >
          
            <el-form-item v-if="item.type == 'select'" :label="item.nickname">
              <el-select
                
                v-model="item.value"
                class="m-2"
                placeholder="-- Select an option --"
                size="large"
              >
                <el-option
                  v-for="(item2, index2) in item.selectList"
                  :key="index2"
                  :label="item2.text"
                  :value="item2.textValue"
                />
              </el-select>
              
            </el-form-item>
            <div
                v-if="item.type == 'switch'"
                class="flex justify-between items-center h-[48px] mb-4"
              >
                <p class="text-xs text-black">{{ item.nickname }}</p>
                <el-switch
                  :active-value="item.max"
                  :inactive-value="item.min"
                  v-model="item.value"
                  style="--el-switch-on-color: #13ce66"
                />
              </div>
              
              <div
                v-if="item.type == 'number'"
                class="flex justify-between items-center h-[48px] mb-4"
              >
                <p class="text-sm text-black">{{ item.nickname }}</p>
                <div class="flex items-center">
                  <el-input-number
                    :min="item.min"
                    :step="getStep(item)"
                    :max="item.max"
                    v-model="item.value"
                    class="mx-4"
                  />
                  <span class="text-black text-xs leading-6 w-[28px] pl-2">{{
                    item.unit
                  }}</span>
                </div>
              </div>
          </el-form>
          <el-form
            v-else
            :class="Object.keys(item.properties).length > 0 ? '' : 'hidden'"
            label-position="top"
            label-width="100px"
            :model="form"
          >
            <div v-for="(item2, index2) in item.properties" :key="index2">
              <el-form-item
                v-if="item2.type == 'select'"
                :label="item2.nickname"
              >
                <el-select
                  v-model="item2.value"
                  class="m-2"
                  placeholder="-- Select an option --"
                  size="large"
                >
                  <el-option label="Operating" value="1" />
                </el-select>
              </el-form-item>
              <div
                v-if="item2.type == 'switch'"
                class="flex justify-between items-center h-[48px] mb-4"
              >
                <p class="text-xs text-black">{{ item2.nickname }}</p>
                <el-switch
                  :active-value="item2.max"
                  :inactive-value="item2.min"
                  v-model="item2.value"
                  style="--el-switch-on-color: #13ce66"
                />
              </div>
              <div
                v-if="item2.type == 'number'"
                class="flex justify-between items-center h-[48px] mb-4"
              >
                <p class="text-sm text-black">{{ item2.nickname }}</p>
                <div class="flex items-center">
                  <el-input-number
                    :min="item2.min"
                    :step="getStep(item2)"
                    :max="item2.max"
                    v-model="item2.value"
                    class="mx-4"
                  />
                  <span class="text-black text-xs leading-6 w-[28px] pl-2">{{
                    item2.unit
                  }}</span>
                </div>
              </div>
            </div>
          </el-form>
          <div class="text-center p-4">
            <button
              @click="onSubmit(index)"
              class="w-[120px] h-[40px] bg-black hover:shadow-button2 text-white text-base font-bold rounded-lg mx-auto"
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.nodata" class="w-full h-[500px] bg-white rounded-lg">
      <NoData />
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import master from "./data/setting_master.json";
import dcdcin from "./data/setting_dcdcin.json";
import dcdcout from "./data/setting_dcdcout.json";
import Inverter from "./data/setting_inverter.json";
import pcs from "./data/setting_pcs.json";
import { deviceDetail, SetConfig } from "@/api";
import NoData from "@/components/nodata.vue";

const state = reactive({
  schemaStatus: {},
  initStatus: {},
  devInfo: {},
  devType: "",
  loading: false,
  nodata: true,
  navList: [
    {
      type: "master",
      data: master,
    },
    {
      type: "inverter",
      data: Inverter,
    },
    {
      type: "dcdcin",
      data: dcdcin,
    },
    {
      type: "dcdcout",
      data: dcdcout,
    },
    {
      type: "pcs",
      data: pcs,
    },
  ],
});
const form = ref({});
const getStep = (item) => {
  if (item.min == 1 && item.max == 10) {
    return 1;
  }
  if (item.max !== undefined || item.min !== undefined) {
    let result = Number.parseFloat(((item.max - item.min) / 100).toFixed(2));
    return result ? result : 0.01;
  }
  return 1;
};

const fillData = (params, object) => {
  let paramsKey = Object.keys(params);

  for (let i = 0; i < paramsKey.length; i++) {
    let key = paramsKey[i];
    if (object[key] == undefined) {
      params[key]["hide"] = true;
    } else {
      params[key]["hide"] = false;
    }
    if (params[key].type == "object") {
      if (object[key] == undefined) {
        continue;
      }
      // console.log(params[key],'object1222')
      fillData(params[key].properties, object[key]);
      continue;
    }
    if (params[key].ratio) {
      params[key].value = object[key] * params[key].ratio;
    } else {
      params[key].value = object[key];
    }
  }
  return params;
};

const setOriConfig = async () => {
  const statusRes = await deviceDetail(state.devInfo.devid, {
    devtype: state.devInfo.devtype,
  });
  state.loading = false;
  console.log(statusRes, "statusResstatusResstatusRes");
  if (statusRes) {
    const setData = fillData(state.initStatus, statusRes);
    console.log(setData, "setData");
    state.schemaStatus = setData;
  } else {
    state.nodata = true;
  }
};

const loadData = (devInfo, type) => {
  state.loading = true;
  state.devInfo = devInfo;
  state.devType = type;
  const obj = state.navList.find((item) => item.type == type);
  if (obj) {
    state.initStatus = obj.data.data;
    state.nodata = false;
    setOriConfig();
  } else {
    state.loading = false;
    state.nodata = true;
  }
};

const onSubmit = async (item) => {
  if (item) {
    const data = JSON.parse(JSON.stringify(state.schemaStatus[item]));
    console.log(data,'data')
    let config = {};
    if(Object.keys(data.properties).length == 0){
      config[item] = data.value;
    }else{
      config[item] = {};
      for (let i in data.properties) {
        if (data.properties[i].ratio) {
          config[item][i] = data.properties[i].value / data.properties[i].ratio;
        } else {
          config[item][i] = data.properties[i].value;
        }
      }
    }
    
    const res = await SetConfig(
      state.devInfo.devid,
      state.devInfo.devtype,
      config
    );
    let fail = false;
    if (!res) {
      fail = true;
      ElMessage({
        type: "error",
        message: `${state.devInfo.devid} Setup failed`,
      });
      return;
    }
    if (res.result) {
      ElMessage({
        type: "success",
        message: `${state.devInfo.devid} Setup success`,
      });
      return;
    } else {
      fail = true;
      ElMessage({
        type: "error",
        message: `${state.devInfo.devid} Setup failed${res.message}`,
      });
      return;
    }
    // if (key) {
    //   var status = this.resetSchemaStatus(JSON.parse(JSON.stringify(this.schemaStatus)));

    //   this.schemaStatus[key] = status[key]
    // } else {
    //   this.schemaStatus = this.resetSchemaStatus(JSON.parse(JSON.stringify(this.schemaStatus)))
    // }
  }
};

defineExpose({
  loadData,
});
</script>
<style lang="scss" scoped></style>
