<template>
  <div class="mt-4 pt-8 px-6 bg-white rounded-lg flex items-start">
    <div class="flex-1 border-r pr-6 border-gray-200">
      <el-table
        :data="tableData"
        size="large"
        :stripe="false"
        style="width: 100%"
      >
        <!-- <el-table-column align="center" label="id" prop="index" width="80" ></el-table-column>-->
        -->
        <el-table-column
          align="center"
          label="Type Name"
          prop="devtype"
        ></el-table-column>
        <!--              <el-table-column align="center" label="Type Description" prop="devType"></el-table-column>-->
        <el-table-column
          align="center"
          label="Normal Equipment"
          prop="devices.online"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          label="Fault Equipment"
          prop="devices.fault"
        ></el-table-column>
        <el-table-column
          align="center"
          label="Offline Equipment"
          prop="devices.offline"
        ></el-table-column>
        <el-table-column
          align="center"
          label="Summary"
          prop="devices.count"
        ></el-table-column>
      </el-table>
      <!-- <PageSize :total="100" :pageIndex="1" @CurrentChange="pageChange"/> -->
    </div>
    <ul class="w-[250px]  pl-6">
      <li class="p-4 rounded-md shadow-button2 mb-4">
        <p class="text-sm font-semibold mb-2">User Statistics</p>
        <p class="text-sm"><span>Lower Level User Number： </span>{{state.lowUserCount}}</p>
      </li>
      <li class="p-4 rounded-md shadow-button2 mb-4">
        <p class="text-sm font-semibold mb-2">The login information</p>
        <p class="text-sm"><span>Last Login Time： </span> {{get_last_login_time()}}</p>
        <p class="text-sm"><span>Last Login IP Address ： </span> {{get_last_login_ip()}}</p>
      </li>
      <li class="p-4 rounded-md shadow-button2 mb-4">
        <p class="text-sm font-semibold mb-2">Firmware Upgrade Information</p>
        <p class="text-sm"><span>Device Upgrade: </span> <router-link class="text-[#67c23a] underline" to="/upgrade">
View</router-link></p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { Devices, devTypeCount } from "@/api";
import { SubCount } from "@/api/devices";
import { getRoleId } from "@/utils/data"
import {get_last_login_ip, get_last_login_time, } from "@/utils/data";
const tableData = ref([]);
const loadData = async () => {
  var res = await devTypeCount();
  if (!res) {
    return;
  }
  tableData.value = res.data;
  let devTypeList = [...res.data];
  for (let i = 0; i < devTypeList.length; i++) {
    devTypeList[i].devices.online = 0;
    devTypeList[i].devices.fault = 0;
    devTypeList[i].devices.offline = 0;
  }
  const devList = await Devices({
    skip: 0,
    limit: 99999,
    filter: "",
  });
  if (!devList) {
    return;
  }

  for (let i = 0; i < devList.data.length; i++) {
    let item = devList.data[i];
    let devType = item["devtype"];
    let status = item["status"];
    let find = devTypeList.find((item) => {
      return item["devtype"] == devType;
    });

    if (status == 1) {
      find.devices.offline = find.devices.offline + 1;
    }
    if (status == 2) {
      find.devices.fault = find.devices.fault + 1;
    }
    if (status == 0) {
      find.devices.online = find.devices.online + 1;
    }
  }

  tableData.value = JSON.parse(JSON.stringify(devTypeList));
};
loadData();
const state = reactive({
    lowUserCount:0,
})
const  loadCount = async ()=>{
      let res = await SubCount({level: getRoleId()});
      if(res){
          state.lowUserCount=res.count;
      }
  }
loadCount()
</script>
<style lang="scss" scoped></style>
