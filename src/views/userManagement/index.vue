<template>
  <div class="bg-white rounded-lg p-6">
    <div class="flex justify-end gap-3">
      <el-input
        class="!w-[200px]"
        :prefix-icon="Search"
        v-model="query.userName"
        :clearable="true"
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
        @click="addUser"
        class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10"
      >
        +New Users
      </button>
    </div>
    <div class="mt-8">
      <el-table
        v-loading="loading"
        class="mb-8"
        :data="state.tableData"
        :border="parentBorder"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          header-align="center"
          label="No."
          prop="index"
          width="50"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="User"
          prop="username"
          width="180"
        />
        <el-table-column
          align="center"
          header-align="center"
          label="Device Amount"
          prop="amount"
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
          width="200"
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
    <el-dialog v-model="showDialog" title="Add User" class="deviceAdd" width="500px">
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

          <el-form-item label="Telephone" prop='submobile'>
            <el-input v-model="form.submobile" placeholder="Please Input" />
          </el-form-item>
          <el-form-item label="E-mail" prop='subemail'>
            <el-input v-model="form.subemail" placeholder="Please Input" />
          </el-form-item>
          <el-form-item label="Address" prop='subaddress'>
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
  </div>
</template>
<script setup>
import moment from "moment";
import { reactive, ref } from "vue";
import PageSize from "@/components/pageSize.vue";
import { Search } from "@element-plus/icons-vue";
import { Subusers, Devices, editSubUserPlant ,subusersDelete,SubusersPost} from "@/api";
import { getParents } from "@/utils/data"
const query = reactive({
  userName: "",
  page: 1,
});
const loading = ref(false)
const showQuery = ref(false);
const showDialog = ref(false);
const formRef = ref();
const pageChange = (page) => {
  query.page = page;
  queryList();
  getCount();
};
const form = reactive({
  username: "",
  subaddress:"",
  subemail:"",
  submobile:"",
});
const state = reactive({
  total: 0,
  tableData: [],
});

const fillData = async (list) => {
  for (let i = 0; i < list.length; i++) {
    const res = await Devices({
      aggregation: "count",
      filter: JSON.stringify({
        subusers: list[i].username,
        desc: { $regex: '"' + list[i].username + '"', $options: "i" },
      }),
    });
    list[i]["amount"] = res.count;
    list[i]["index"] = i + 1;
  }
  loading.value = false;
  state.tableData = list;
};
const queryList = async () => {
  loading.value = true;
  const res = await Subusers({
    skip: (query.page - 1) * 10,
    limit: 10,
    filter: { parent: localStorage.getItem("account"),"username":{"$regex":query.userName,"$options":"i"}  },
    descend: true,
  });
  fillData(res.data);
};
const getCount = async (userName) => {
  const res = await Subusers({
    aggregation: "count",
    descend: true,
    filter: { parent: localStorage.getItem("account"),"username":{"$regex":query.userName,"$options":"i"} },
  });
  state.total = res.count;
};

queryList();
getCount("");
const resetPw = (item) => {
  console;
  ElMessageBox.confirm(`Reset the password to 123456789?`, 'Reset password', {
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
    if (item.amount == 0) {
      const res = subusersDelete([item.username]);
      if (res) {
        ElMessage({
          message: "delete success",
          type: "success",
          showClose: true,
          duration: 5000
        });
        queryList();
      }
    } else {
      ElMessage({
        message: "Devices under the current account cannot be deleted",
        type: "warning",
      });
    }
  });
};
const addUser = ()=>{
  showDialog.value = true;
}
const Cancel = ()=>{
  formRef.value.resetFields();
  showDialog.value = false;
}
const onSubmit = async ()=>{
  let formData = {...form};
          formData.password = "123456789";
          console.log(formData)
          let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机号
          let email= /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
            if(formData.username.length<2||formData.username.length>32){
                return  ElMessage({message: 'The userName is 2 to 32 characters in length ', type: 'warning'});
            }
            if(!formData.submobile.length){
                return  ElMessage({message: 'Please enter Telephone', type: 'warning'});
            }
            if(email.test(formData.subemail) == false){
                      return  ElMessage({message: 'Please enter a valid email ', type: 'warning'});
                    }
            if(formData.subaddress.length<1||formData.subaddress.length>64){
                return  ElMessage({message: 'The subAddress is 1 to 64 characters in length', type: 'warning'});
            }
            
         
          let parents=getParents();
            parents.push(formData.username);
            formData.parents=parents;
            formData.parent=localStorage.getItem("account");
            formData.user_extra = JSON.stringify(formData.extra || '');
            getParents.accessControllerList=["62f3ace26258cfb9289ec140"];
          //  delete params.extra;
             const res = await SubusersPost(formData);
          if (res) {
            formRef.value.resetFields();
            showDialog.value = false;
            ElMessage({message: 'add success', type: 'success'});
            pageChange(1);
          }
}
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
