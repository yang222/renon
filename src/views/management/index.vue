<template>
  <div class="bg-white rounded-lg p-6">
    <div class="flex justify-end gap-3">
      <el-input
        class="!w-[200px]"
        :prefix-icon="Search"
        :clearable="true"
        v-model="query.userName"
        placeholder="User"
        size="large"
      />
      <button
        @click="pageChange(1)"
        class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10"
      >
        Search
      </button>
      <button
        @click="showDialog = true"
        class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10"
      >
        +New Users
      </button>
    </div>
    <div class="mt-8">
      <el-table
        class="mb-8"
        v-loading="state.loading"
        @expand-change="handleExpandChange"
        :data="state.tableData"
        :border="parentBorder"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div  m="4">
              <ul v-for="(item,index) in state.expandData[props.row.id] || []" :key="index" class="grid grid-cols-5 mb-3 last:mb-0 gap-4 text-center">
                <li class="text-xs font-bold text-black">
                  <p class="mb-2 font-bold">Type</p>
                  <p class="font-medium">{{ item.devType }}</p>
                </li>
                <li class="text-xs font-bold text-black">
                  <p class="mb-2 font-bold">Devices Amount</p>
                  <p class="font-medium">{{item.total}}</p>
                </li>
                <li class="text-xs font-bold text-black">
                  <p class="mb-2 font-bold">Devices Installation</p>
                  <p class="font-medium"><span class="mr-3">{{item.deviceInstall}}/{{item.total}}</span> <span>{{(item.deviceInstall/item.total*100).toFixed(2)}}%</span></p>
                </li>
                <li class="text-xs font-bold text-black">
                  <p class="mb-2 font-bold">Online Devices</p>
                  <p class="font-medium"><span class="mr-3">{{item.online}}/{{item.total}}</span> <span>{{(item.online/item.total*100).toFixed(2)}}%</span></p>
                </li>
                <li class="text-xs font-bold text-black">
                  <p class="mb-2 font-bold">Fault Devices</p>
                  <p class="font-medium"><span class="mr-3">{{item.fault}}/{{item.total}}</span> <span>{{(item.fault/item.total*100).toFixed(2)}}%</span></p>
                </li>
              </ul>
              
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="ID"
          prop="index"
          width="60"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="User"
          prop="username"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="Telephone"
          prop="submobile"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="E-mail"
          prop="subemail"
        />
        <!-- <el-table-column align="center" header-align="center"  label="Company" prop="name" /> -->
        <el-table-column
          align="center"
          header-align="center"
          label="Address"
          prop="subaddress"
        />
        <el-table-column
          align="center"
          label="Registration time"
          prop="subemail"
          width="180"
        >
          <template #default="scope">
            {{
              moment(new Date(scope.row.register_time * 1000)).format(
                "YYYY-MM-DD hh:mm:ss"
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="Distribution equipment"
          prop="name"
        >
          <template #default="scope">
            <div class="text-center gap-2" @click="showBindUser(scope.row)">
              <img
                
                src="@/assets/images/icon/box-add.png"
                class="h-5 inline-block cursor-pointer"
                alt=""
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="Operate"
          prop=""
        >
          <template #default="scope">
            <div class="flex justify-center items-center gap-3" @click="scope">
              <img
                src="@/assets/images/icon/Group.png"
                @click="resetPw(scope.row)"
                class="h-5 cursor-pointer"
                alt=""
              />
              <img
                src="@/assets/images/icon/delete.png"
                @click="Delete(scope.row)"
                class="h-5 cursor-pointer"
                alt=""
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pt-10" v-if="state.total">
        <PageSize
          :total="state.total"
          :pageIndex="query.page"
          @CurrentChange="pageChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="showDialog"
      title="Add User"
      class="deviceAdd"
      width="500px"
    >
      <div class="tableBox px-4">
        <el-form
          label-position="top"
          label-width="100px"
          ref="formRef"
          :model="form"
          class="flex-1 pt-4"
        >
          <el-form-item label="User" prop="username">
            <el-input v-model="form.username" placeholder="Please Input" />
          </el-form-item>

          <el-form-item label="Telephone" prop="submobile">
            <el-input v-model="form.submobile" placeholder="Please Input" />
          </el-form-item>
          <el-form-item label="E-mail" prop="subemail">
            <el-input v-model="form.subemail" placeholder="Please Input" />
          </el-form-item>
          <el-form-item label="Address" prop="subaddress">
            <el-input v-model="form.subaddress" placeholder="Please Input" />
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
    <BindUser ref="bindUserRef" :typeList="state.typeList" />
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import moment from "moment";
import PageSize from "@/components/pageSize.vue";
import { Search } from "@element-plus/icons-vue";
import BindUser from "./components/bind-user.vue"

import {
  Subusers,
  Devices,
  editSubUserPlant,
  subusersDelete,
  SubusersPost,
  DevType
} from "@/api";
import { getParents } from "@/utils/data";

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
    ],
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
    ],
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
    ],
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
    ],
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
    ],
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
    ],
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
    ],
  },
];
const query = reactive({
  userName: "",
  page: 1,
});
const loading = ref(false);
const showQuery = ref(false);
const showDialog = ref(false);
const bindUserRef = ref();
const formRef = ref();
const pageChange = (page) => {
  query.page = page;
  queryList();
  getCount();
};
const form = reactive({
  username: "",
  subaddress: "",
  subemail: "",
  submobile: "",
});
const state = reactive({
  total: 0,
  tableData: [],
  loading: false,
  expandData:{},
  typeList:[],
});

const queryList = async () => {
  state.loading = true;
  const res = await Subusers({
    skip: (query.page - 1) * 10,
    limit: 10,
    filter: {
      parent: localStorage.getItem("account"),
      username: { $regex: query.userName, $options: "i" },
    },
    descend: true,
  });
  state.loading = false;
  const data = res.data.map((item, index) => {
    return {
      ...item,
      index: index + 1 + (query.page - 1) * 10,
    };
  });
  state.tableData = data;
  // fillData(res.data);
};
const getCount = async () => {
  const res = await Subusers({
    aggregation: "count",
    descend: true,
    filter: {
      parent: localStorage.getItem("account"),
      username: { $regex: query.userName, $options: "i" },
    },
  });
  state.total = res.count;
};

queryList();
getCount();

const queryData = async (username) => {
  let resultLit = [];
  const list = (await Devices({
    skip: 0,
    limit: 1000,
    filter: JSON.stringify({
      subusers: username,
      desc: { $regex: '"' + username + '"', $options: "i" },
    }),
  })).data;
  if (list.length == 0) {
    return [];
  }
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let find = resultLit.find((item2) => {
      return item["devtype"] == item2["devType"];
    });
    if (find == null) {
      find = {
        online: 0,
        total: 0,
        fault: 0,
        deviceInstall: 0,
        devType: item["devtype"],
      };
      resultLit.push(find);
    }
    find["total"]++;
    if (item["status"] == 0) {
      find["online"]++;
    }
    if (item["status"] == 2) {
      find["fault"]++;
    }

    try {
      let a = item.desc ? JSON.parse(item.desc) : "";
      if (a.level == 5) {
        find.deviceInstall++;
      }
    } catch (e) {
      return "";
    }
  }
  console.log(resultLit,'resultLit')

  return resultLit;
};

const handleExpandChange = async (a, b) => {
  if(state.expandData[a.id]){
    return
  }
  state.expandData[a.id] = await queryData(a.username);
};

const resetPw = (item) => {
  console;
  ElMessageBox.confirm(`Reset the password to 123456789?`, "Reset password", {
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    type: "warning",
  }).then(async () => {
    const response = await editSubUserPlant(item.username, {
      password: 123456789,
    });
    if (response) {
      ElMessage({
        message: "update success",
        type: "success",
        duration: 2000,
      });
    }
  });
};

const Delete = (item) => {
  ElMessageBox.confirm("Confirm whether to delete the User?", "Delete User", {
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    type: "warning",
  }).then(async () => {

      const res = subusersDelete([item.username]);
      if (res) {
        ElMessage({
          message: "delete success",
          type: "success",
          showClose: true,
          duration: 5000,
        });
        setTimeout(()=>{
          queryList();
          getCount();
        },1000)
      }
    
  });
};
const Cancel = () => {
  formRef.value.resetFields();
  showDialog.value = false;
};
const onSubmit = async () => {
  let formData = { ...form };
  formData.password = "123456789";
  console.log(formData);
  let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/; //手机号
  let email =
    /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
  if (formData.username.length < 2 || formData.username.length > 32) {
    return ElMessage({
      message: "The userName is 2 to 32 characters in length ",
      type: "warning",
    });
  }
  if (!formData.submobile.length) {
    return ElMessage({ message: "Please enter Telephone", type: "warning" });
  }
  if (email.test(formData.subemail) == false) {
    return ElMessage({
      message: "Please enter a valid email ",
      type: "warning",
    });
  }
  if (formData.subaddress.length < 1 || formData.subaddress.length > 64) {
    return ElMessage({
      message: "The subAddress is 1 to 64 characters in length",
      type: "warning",
    });
  }

  let parents = getParents();
  parents.push(formData.username);
  formData.parents = parents;
  formData.parent = localStorage.getItem("account");
  formData.user_extra = JSON.stringify(formData.extra || "");
  getParents.accessControllerList = ["62f3ace26258cfb9289ec140"];
  //  delete params.extra;
  const res = await SubusersPost(formData);
  if (res) {
    formRef.value.resetFields();
    showDialog.value = false;
    ElMessage({ message: "add success", type: "success" });
    pageChange(1);
  }
};

const showBindUser = (item)=>{
  bindUserRef.value.showModal(item)
}
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

</script>
<style lang="scss">
.el-table tbody .el-table__cell.el-table__expanded-cell {
  // padding: 0 !important;
  background: rgba(0, 0, 0, 0.05);
  padding: 20px 10% !important;
  &:hover {
    background: rgba(0, 0, 0, 0.05) !important;
  }
}
.deviceAdd {
  .el-dialog__header {
    border-bottom: 0;
    height: 50px;
  }
  .el-table {
    .el-table__header {
      th {
        background: #000 !important;
        border-bottom: none;
        padding: 12px 0 !important;
        color: #fff;
      }
    }
    .el-table__cell {
      padding: 14px 0 !important;
    }
  }
}
</style>
