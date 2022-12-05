<template>
  <div>
    <div class="mt-4 pt-8 px-6 bg-white rounded-lg">
      <div class="flex justify-between items-center mb-12">
        <p class="font-bold text-black text-2xl">Plant List</p>
        <div class="flex items-center gap-3">
          <el-input
            v-model="query.nickname"
            class="m-2"
            :clearable="true"
            style="width: 200px"
            placeholder="Plant"
            :prefix-icon="Search"
          />
          <button
            @click="getSubusers"
            class="bg-black h-8 px-4 rounded-lg hover:shadow-lg text-white font-medium text-xs"
          >
            Search
          </button>
          <button
            @click="
              showDialog = true;
              type = 'plant';
            "
            class="bg-black h-8 px-4 rounded-lg hover:shadow-lg text-white font-medium text-xs"
          >
            +Create Plant
          </button>
        </div>
      </div>
      <el-table
        v-loading="state.loading"
        :data="tableData"
        size="large"
        :stripe="false"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          header-align="center"
          prop="nickname"
          label="Plant"
        >
          <template #default="scope">
            <router-link
              class="text-[#3ECE80] font-bold"
              :to="`/home/device?plantName=${scope.row.username}`"
              >{{ scope.row.nickname }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="totalPowe" label="Power(KW)-Efficiency">
          <template #default="scope">
            {{ scope.row.totalPowe ? scope.row.totalPowe.toFixed(2) : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="today" label="E_Today(KWh)" />
        <el-table-column prop="total" label="E_Total(KWh)" />
        <el-table-column prop="register_time" label="Creation">
          <template #default="scope">
            {{ getTime(scope.row.register_time) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="amount"
          label="Device Amount"
        />
        <el-table-column prop="Operate" label="Operate">
          <template #default="scope">
            <div class="flex items-center gap-2">
              <img
                @click="handleDevice(scope.row)"
                src="@/assets/images/icon/box-add.png"
                class="h-5 cursor-pointer"
                alt=""
              />
              <img
                @click="handleDelete(scope.row)"
                src="@/assets/images/icon/del.png"
                class="h-5 cursor-pointer"
                alt=""
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <PageSize :total="100" :pageIndex="1" @CurrentChange="pageChange"/> -->
    </div>
    <el-dialog
      v-model="showDialog"
      :title="type == 'device' ? 'Add Device' : 'Created Plant'"
      width="600px"
      :close-on-click-modal="false"
    >
      <div
        v-if="type == 'device'"
        class="tableBox px-4 max-h-[400px] overflow-y-auto"
      >
        <el-table
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :data="plantList"
          size="large"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            header-align="center"
            type="selection"
            width="55"
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
            label="Name"
          />
          <el-table-column
            align="center"
            header-align="center"
            prop="devtype"
            label="Type"
          />
        </el-table>
      </div>
      <div v-else class="p-5 pb-0">
        <el-form
          ref="formRef"
          label-position="top"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 460px"
        >
          <el-form-item label="Name" prop="nickname">
            <el-input
              v-model="formLabelAlign.nickname"
              placeholder="Please Input Name"
            />
          </el-form-item>
          <el-form-item label="Telephone" prop="submobile">
            <el-input
              v-model="formLabelAlign.submobile"
              maxlength="11"
              placeholder="Please Input Telephone"
            />
          </el-form-item>
          <el-form-item label="E-mail" prop="subemail">
            <el-input
              v-model="formLabelAlign.subemail"
              placeholder="Please Input E-mail"
            />
          </el-form-item>
          <el-form-item label="Address" prop="subaddress">
            <el-input
              v-model="formLabelAlign.subaddress"
              placeholder="Please Input Address"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer w-full flex justify-between">
          <button
            @click="Cancel"
            class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md"
          >
            Cancel
          </button>
          <button
            @click="onSubmit"
            class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px] rounded-md"
          >
            Confirm
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getTime, getUserInfo, randomstring } from "@/utils/data";
import {
  Subusers,
  SubusersPost,
  subusersDelete,
  Devices,
  DevicesBind,
  updateDevDesc,
  unBindDevice,
} from "@/api";
import {
  queryFirstData,
  lastDataAllField,
  singleDeviceTotal1,
} from "@/api/devices";
import { ElMessage, ElMessageBox } from "element-plus";

const showDialog = ref(false);
const type = ref("plant");
const query = reactive({
  nickname: "",
});
const state = reactive({
  res: [],
    loading:false,
});
const formLabelAlign = reactive({
  nickname: "",
  submobile: "",
  subaddress: "",
  subemail: "",
});
const formRef = ref(null);
const resetForm = () => {
  formRef.value.resetFields();
};

const tableData = ref([]);
const getSubusers = () => {
  state.loading = true;
  let filter = { parent: localStorage.getItem("account") };
  if (query.nickname) {
    filter["nickname"] = { $regex: query.nickname, $options: "i" };
  }
  Subusers({
    filter: filter,
    skip: 0,
    limit: 999,
    descend: true,
  }).then(async (res) => {
    for (var i = 0; i < res.data.length; i++) {
      let obj = await getDeviceList(res.data[i].username);
      res.data[i]["amount"] = obj.amount.length;
      res.data[i]["today"] = obj.Today;
      res.data[i]["total"] = obj.Total;
      res.data[i]["totalPowe"] = obj.TotalPowe;
    }
    tableData.value = res.data;
    state.loading = false;
  });
};
getSubusers();

const getTotal = async () => {
  state.res = await singleDeviceTotal1();
};

getTotal();
//获取绑定的设备
const getDeviceList = async (username) => {
  const res = await Devices({
    skip: 0,
    limit: 1000,
    filter: JSON.stringify({
      $or: [{ parents: username }, { subusers: username }],
    }),
  });
  let a = res.data.filter((item) => {
    let desc = JSON.parse(item.desc);
    return desc.parent.includes(username);
  });

  //   console.log(a,"aassa")
  let Today = 0;
  let Total = 0;
  let TotalPowe = 0;
  if (a.length != 0) {
    for (let i = 0; i < a.length; i++) {
      let Today1 = getTodayCumdchg(a[i].devid);
      Today = Today1 + Today;

      let Total1 = await getTotalCumdchg(a[i].devid, a[i].devtype);
      Total = Total1 + Total;

      let TotalPowe1 = await getPower(a[i].devid, a[i].devtype);
      TotalPowe = TotalPowe1 + TotalPowe;
    }
  }
  return { amount: a, Today: Today, Total: Total, TotalPowe: TotalPowe };
};

//获取随机数

//今日放电量
const getTodayCumdchg = (devid) => {
  let item = 0;
  for (let i in state.res.devices) {
    if (i == devid) {
      let firstData = state.res.devices[devid]
        ? state.res.devices[devid]["first"]["M_cumdchg"]
        : 0;
      let lastData = state.res.devices[devid]
        ? state.res.devices[devid]["last"]["M_cumdchg"]
        : 0;
      item = lastData - firstData;
    }
  }
  return item;
};

//累计放电量
const getTotalCumdchg = async (devid, devtype) => {
  let field = { M_cumdchg: 1 };

  const resww = await queryFirstData(devid, field, { devType: devtype });
  if (resww != null) {
    let M_cumdchg = resww["M_cumdchg"];
    return M_cumdchg;
  }
  return 0;
};

//累计功率
const getPower = async (devid, devtype) => {
  let oriData = await lastDataAllField(devid, { devType: devtype });
  if (JSON.stringify(oriData) != "{}") {
    return oriData["E_cur"] * oriData["E_tv"];
  }
  return 0;
};

const onSubmit = () => {
  if (type.value == "plant") {
    const username = randomstring();
    const parents = getUserInfo()?.parents?.push(username) || "";
    const accessControllerList = getUserInfo()?.accessControllerList?.map(
      (item) => {
        return item.id;
      }
    );

    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机号
    let email= /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
      if(formLabelAlign.nickname.length<1||formLabelAlign.nickname.length>32){
          return  ElMessage({message: " Creation failed，Name's digit number can't go beyond 32", type: 'warning'});
      }
      if(formLabelAlign.subemail&&email.test(formLabelAlign.subemail) == false){
                return  ElMessage({message: "Creation failed，Please check Email formatting", type: 'warning'});
        }
      if(formLabelAlign.subaddress.length<1||formLabelAlign.subaddress.length>64){
          return  ElMessage({message: "Creation failed，Address is 1 to 64 characters in length", type: 'warning'});
      }
    SubusersPost({
      parents,
      accessControllerList,
      parent: localStorage.getItem("account"),
      password: "123456789",
      username,
      ...formLabelAlign,
    }).then(async (res) => {
      if (res.result) {
        ElMessage.success("Created successfully");
        resetForm();
        showDialog.value = false;
        getSubusers();
      }
    });
  } else {
    if (selectList.value.length) {
      const devs = selectList.value.map((item) => {
        return item._id;
      });
      DevicesBind({
        devs,
        subuser: plantInfo.value.username,
      }).then((res) => {
        selectList.value.forEach(async (item) => {
          let desc = {};
          try {
            desc = JSON.parse(item["desc"]);
            desc["test"] = "test";
            delete desc["test"];
          } catch (e) {
            desc = {};
          }
          let parent = getUserInfo().parents;
          parent.push(plantInfo.value.username);
          if (desc["level"] && desc["level"] > parent.length) {
            return;
          }
          desc["parent"] = parent;
          desc["level"] = desc["parent"].length;
          await updateDevDesc(item["devid"], item["devtype"], {
            desc: JSON.stringify(desc),
          });
        });
        ElMessage.success("Distribution successful");
        UnBind();
        showDialog.value = false;
      });
    }
  }
};
const handleDelete = (item) => {
    if(item.amount > 0) {
        ElMessage.warning(`The current ${item.nickname} power station has equipment, please cancel the distribution of equipment first`)
        return
    }
  ElMessageBox.confirm(
    `Be certain to delete the ${item.nickname} station`,
    "Delete Plant",
    {
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  ).then(() => {
    subusersDelete([item.username]).then((res) => {
      ElMessage.success("delete success");
      getSubusers();
    });
  });
};
const plantInfo = ref({});
const plantList = ref([]);
const initSelectList = ref([]);
const multipleTable = ref(null);
const handleDevice = (item) => {
  plantInfo.value = item;
  type.value = "device";
  showDialog.value = true;
  Devices({
    skip: 0,
    limit: 999,
    filter: {},
  }).then((res) => {
    plantList.value = res.data.filter((element) => {
      let desc = {};

      try {
        desc = JSON.parse(element["desc"]);
      } catch (e) {}
      if (!desc.parent || !desc.level) {
        return false;
      }
      if (desc.level == 5 || desc.parent.includes(plantInfo.value.username)) {
        return true;
      }
      return false;
    });
    let SelectList = [];
    for (var i = 0; i < plantList.value.length; i++) {
      let item = plantList.value[i];
      var desc = {};
      try {
        desc = JSON.parse(item["desc"]);
      } catch (e) {}
      if (desc.parent.includes(plantInfo.value.username)) {
        SelectList.push(item);
      }
    }
    initSelectList.value = SelectList;
    console.log(SelectList);
    setTimeout(() => {
      SelectList.forEach((item) => {
        multipleTable.value.toggleRowSelection(item, undefined);
      });
    }, 300);
  });
};
const selectList = ref([]);
const handleSelectionChange = (val) => {
  selectList.value = val;
};

//解绑设备
const UnBind = async () => {
  //解绑
  let result = [];
  for (let i = 0; i < initSelectList.value.length; i++) {
    let isExist = false;
    for (let j = 0; j < selectList.value.length; j++) {
      if (initSelectList.value[i]._id === selectList.value[j]._id) {
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      result.push(initSelectList.value[i]);
    }
  }

  const res1 = await unBindDevice({
    subuser: plantInfo.value.username,
    devs: result.map((item) => {
      return item._id;
    }),
  });
  if(res1){
    ElMessage.success("Cancellation successful");
     result.forEach(async (item) => {
    let desc = {};
    try {
      desc = JSON.parse(item["desc"]);
      desc["test"] = "test";
      delete desc["test"];
    } catch (e) {
      desc = {};
    }
    let parent = getUserInfo().parents;
    desc["parent"] = parent;
    desc["level"] = desc["parent"].length;
    const res1 = await updateDevDesc(
      item["devid"],
      item["devtype"],
      JSON.stringify(desc)
    );
  });
   getSubusers();
  }else{
    
  }
 
 
};
//关闭弹框
const Cancel = () => {
  if (type == "device") {
    resetForm();
    showDialog.value = false;
  } else {
    showDialog.value = false;
    plantList.value = "";
    plantInfo.value = {};
  }
};
</script>
<style lang="scss" scoped></style>
