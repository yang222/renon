<template>
  <div class="relative min-h-full">
    <div
      class="bg-white rounded-lg mb-4 py-6 px-8 flex flex-wrap gap-3 relative"
    >
      <el-input
        class="!w-[200px]"
        :clearable="true"
        v-model="query.devid"
        placeholder="DevID"
        size="large"
      />
      <el-input
        class="!w-[200px]"
        :clearable="true"
        v-model="query.devname"
        placeholder="DevName"
        size="large"
      />
      <el-input
        v-if="userInfo.role == 4"
        :clearable="true"
        class="!w-[200px] h-10"
        v-model="query.deviceId"
        placeholder="Plant Info"
        size="large"
      />
      <el-select
        v-model="query.subusers"
        :clearable="true"
        placeholder="User"
        size="large"
      >
        <el-option
          v-for="(item, index) in state.userList"
          :key="index"
          :label="item.username"
          :value="item.username"
        />
      </el-select>
      <el-input
        class="!w-[200px] h-10"
        :clearable="true"
        v-model="query.Hardware"
        placeholder="Hardware"
        size="large"
      />
      <el-input
        class="!w-[200px] h-10"
        :clearable="true"
        v-model="query.Software"
        placeholder="Software"
        size="large"
      />
      <el-select
        v-model="query.devtype"
        :clearable="true"
        placeholder="Type"
        size="large"
      >
        <el-option
          v-for="(item, index) in state.typeList"
          :key="index"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="query.status"
        :clearable="true"
        placeholder="Status"
        size="large"
      >
        <el-option label="on-line" :value="0"> </el-option>
        <el-option label="off-line" :value="1"> </el-option>
      </el-select>
      <el-date-picker
        :clearable="true"
        size="large"
        class="h-10"
        v-model="query.registertime"
        type="date"
        placeholder="Installation time"
      />
      <button
        @click="handleSearch"
        class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10"
      >
        Search
      </button>
    </div>
    <div class="bg-white p-6 rounded-lg">
      <el-table
        :data="state.devList"
        size="large"
        :stripe="false"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          header-align="center"
          prop="index"
          width="60"
          label="No."
        />
        <el-table-column
          align="center"
          header-align="center"
          prop="devid"
          label="DevID"
        />
        <el-table-column
          align="center"
          header-align="center"
          prop="devname"
          label="DevName"
        />
          <el-table-column align="center" label="User" prop="desc">
              <template #default="scope">
                <div >
                  {{UserName(scope.row.desc)}}
                </div>
              </template>
          </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="Creation"
          label="Hardware"
        >
          <template #default="scope">
            <div v-for="(item, index) in getHardware(scope.row)" :key="index">
              {{ item["type"] + ":" + item["version"] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="Creation"
          label="Software"
        >
          <template #default="scope">
            <div v-for="(item, index) in getSoftware(scope.row)" :key="index">
              {{ item["type"] + ":" + item["version"] }}
            </div>
          </template>
        </el-table-column>
           <el-table-column
          align="center"
          label="Plant Name"
          prop="devtype"
        ></el-table-column>
        <!-- <el-table-column align="center" label="Identify" prop="subemail">
          <template #default="scope">
            <div>
              {{ scope.row["Read"] ? scope.row["Read"].Identify : "" }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          label="Type"
          prop="devtype"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="registertime"
          label="Installation time"
        />
        <el-table-column
          align="center"
          header-align="center"
          prop="subemail"
          label="Status"
        >
          <template #default="scope">
            <span
              v-if="scope.row.status == 0"
              style="color: #56c271; text-align: center; cursor: pointer"
              >Online
            </span>
            <span
              v-else
              style="color: #ccc; text-align: center; cursor: pointer"
              >Off-line</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="Device Amount"
          label="Operation"
        >
          <template #default="scope">
            <div class="flex justify-center items-center gap-2">
              <el-icon
                @click="toDevice(scope.row)"
                class="cursor-pointer"
                :size="20"
                ><View
              /></el-icon>
              <div v-if="role == 3">
                <div
                  v-if="isShow(scope.row.desc)"
                  @click="update(scope.row)"
                  style="
                    display: inline-block;
                    color: white;
                    background: #56c271;
                    text-align: center;
                    cursor: pointer;
                    border-radius: 5px;
                    width: 24px;
                  "
                >
                  <el-icon><EditPen /></el-icon>
                </div>
                <div
                  v-else
                  style="
                    display: inline-block;
                    color: white;
                    background: #757575;
                    text-align: center;
                    cursor: pointer;
                    border-radius: 5px;
                    width: 24px;
                  "
                >
                  <el-icon><EditPen /></el-icon>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pt-10">
        <PageSize
          v-if="state.total"
          :total="state.total"
          :pageIndex="query.page"
          @CurrentChange="pageChange"
        />
      </div>
    </div>
    <UpdataList ref="batchRef" @load="getDevList()" />
  </div>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import PageSize from "@/components/pageSize.vue";
import {
  getUserInfo,
  getTime,
  getHardware,
  getSoftware,
  DateToTime,
} from "@/utils/data";
import { DevType, Devices, packageInfo, Subusers, Upgrade } from "@/api";
import UpdataList from "./updataList.vue";
import { getRoleId,UserName } from "@/utils/data";
const role = getRoleId();
const router = useRouter();
const query = reactive({
  devid: "",
  devname: "",
  devtype: "",
  Hardware: "",
  Software: "",
  registertime: "",
  subusers: "",
  status: "",
  page: 1,
});
const userInfo = getUserInfo();
const tableData = ref([]);
const showDialog = ref(false);
const showQuery = ref(true);
const showTips = ref(false);
const batchRef = ref(null);
const state = reactive({
  typeList: [],
  devList: [],
  package: {},
  userList: [],
  total: 0,
  selectList: [],
  selectData: {},
});
const pageChange = (page) => {
  query.page = page;
  getDevList();
};
const handleSelectionChange = (val) => {
  state.selectList = val;
};
const getDevType = () => {
  DevType({
    skip: 0,
    limit: 0,
    descend: true,
    hideSchema: true,
  }).then((res) => {
    state.typeList = res.data
      .map((item) => {
        return { name: item.devtype, value: item.devtype };
      })
      .filter((item1) => {
        return item1.name != "NewType";
      });
  });
};
getDevType();
const account = localStorage.getItem("account");
const getDevList = () => {
  let params = {
    skip: (query.page - 1) * 10,
    limit: 10,
    filter: {
      desc: { $regex: account, $options: "i" },
      $or: [{ parents: account }, { subusers: account }],
    },
  };
  if (query.devid) {
    params.filter["devid"] = { $regex: query.devid, $options: "i" };
  }
  if (query.devname) {
    params.filter["devname"] = { $regex: query.devname, $options: "i" };
  }
  if (query.devtype) {
    params.filter["devtype"] = { $regex: query.devtype, $options: "i" };
  }
  if(query.Hardware || query.Software){
     params.filter["$and"] = [];
  }
  if (query.Hardware) {
    
    params.filter["$and"].push({
      $or: [
        { "M_R2.M_hwver": { $regex: query.Hardware, $options: "i" } },
        { "P1_R2.P1_hwver": { $regex: query.Hardware, $options: "i" } },
      ],
    });
  }
  if (query.Software) {
    params.filter["$and"].push({
      $or: [
        { "M_R2.M_swver": query.Software },
        { "P1_R2.P1_swver": query.Software },
      ],
    });
  }
  if (query.registertime) {
    params.filter["$and"] = [
      { registertime: { $gte: DateToTime(query.registertime, "start") } },
      { registertime: { $lte: DateToTime(query.registertime, "end") } },
    ];
  }
  if (query.subusers) {
    params.filter["subusers"] = query.subusers;
  }
  if (query.status !== "") {
    params.filter["status"] = query.status;
  }
  if (query.Software) {
    state.devList = [];
    return;
  }
  Devices(params).then((res) => {
    state.devList = res.data.map((item, index) => {
      item["index"] = (index + 1 )+ (query.page - 1) * 10;
      item["registertime"] = getTime(item.registertime);
      return item;
    });
  });
};
getDevList();
const getDevCount = () => {
  let params = {
    aggregation: "count",
    descend: true,
    filter: {
      desc: { $regex: account, $options: "i" },
      $or: [{ parents: account }, { subusers: account }],
    },
  };
  if (query.devid) {
    params.filter["devid"] = { $regex: query.devid, $options: "i" };
  }
  if (query.devname) {
    params.filter["devname"] = { $regex: query.devname, $options: "i" };
  }
  if (query.devtype) {
    params.filter["devtype"] = { $regex: query.devtype, $options: "i" };
  }
  if (query.Hardware) {
    params.filter["$and"] = [
      {
        $or: [
          { "M_R2.M_hwver": { $regex: "cccc", $options: "i" } },
          { "P1_R2.P1_hwver": { $regex: "cccc", $options: "i" } },
        ],
      },
    ];
  }
  if (query.registertime) {
    params.filter["$and"] = [
      { registertime: { $gte: DateToTime(query.registertime, "start") } },
      { registertime: { $lte: DateToTime(query.registertime, "end") } },
    ];
  }
  if (query.subusers) {
    params.filter["subusers"] = query.subusers;
  }
  if (query.status) {
    params.filter["status"] = query.status;
  }
  if (query.Software) {
    state.devList = [];
    return;
  }
  Devices(params).then((res) => {
    state.total = res.count;
  });
};
getDevCount();
const getUser = () => {
  Subusers({
    filter: {
      parent: account,
      username: { $regex:'' , $options: "i" },
    },
    skip: 0,
    limit: 999,
    descend: true,
  }).then((res) => {
    state.userList = res.data;
  });
};
getUser();

const loadPackage = async () => {
  const master = await packageInfo({
    pkgtype: "master_firmware_2001_3.0",
  });
  const pack = await packageInfo({
    pkgtype: "slave_firmware_6_3.0",
  });
  const ems = await packageInfo({
    pkgtype: "EMS_V2_firmware",
  });
  state.package = { master, pack, ems };
};
loadPackage();
const handleSearch = () => {
  query.page = 1;
  state.total = 0;
  state.devList = [];
  getDevList();
  getDevCount();
};
const update = (item) => {
  batchRef.value.showModal(state.userList, item);
};

const checkIsLastVersion = async (data) => {
  let versionList = getSoftware(data);
  if (versionList.length != 2) {
    return false;
  }
  if (
    !state.package["master"] ||
    state.package["master"]["version"] != versionList[0]["version"]
  ) {
    return false;
  }
  if (
    !state.package["pack"] ||
    state.package["pack"]["version"] != versionList[1]["version"]
  ) {
    return false;
  }
  return true;
};

const toDevice = (item) => {
  router.push("/device?devId=" + item.devid);
};
const isShow = (data) => {
  try {
    let a = data ? JSON.parse(data) : "";

    if (a) {
      return a.parent.length != 0 && a.parent.length >= 5 ? false : true;
    }
  } catch (e) {
    return false;
  }
};
</script>
<style lang="scss" scoped></style>
