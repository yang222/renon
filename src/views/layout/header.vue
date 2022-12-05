<template>
  <div class="header flex justify-end bg-transparent mb-8">
    <div class="flex items-center pr-5">
      <img src="@/assets/images/icon/avatar.png" class="w-5 mr-2" alt="" />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link text-white">
          {{ state.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">Password</el-dropdown-item>
            <el-dropdown-item command="2">Account</el-dropdown-item>
            <el-dropdown-item command="3">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog
      v-model="showDialog"
      title=""
      class="deviceAdd"
      width="500px"
      :close-on-click-modal="false"
    >
      <div class="p-6">
        <el-form ref="formRef" label-position="top" :model="state.ruleForm">
          <el-form-item label="Current Password" prop="pass">
            <el-input
              v-model="state.ruleForm.pass"
              :type="state.show1 ? 'text' : 'password'"
              placeholder="Please Input"
            >
              <template #suffix>
                <div class="cursor-pointer" @click="state.show1 = !state.show1">
                  <el-icon v-if="state.show1" class="el-input__icon"
                    ><View
                  /></el-icon>
                  <el-icon v-else class="el-input__icon"><Hide /></el-icon>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="newPass">
            <el-input
              v-model="state.ruleForm.newPass"
              :type="state.show2 ? 'text' : 'password'"
              placeholder="Please Input"
            >
              <template #suffix>
                <div class="cursor-pointer" @click="state.show2 = !state.show2">
                  <el-icon v-if="state.show2" class="el-input__icon"
                    ><View
                  /></el-icon>
                  <el-icon v-else class="el-input__icon"><Hide /></el-icon>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="checkPass">
            <el-input
              v-model="state.ruleForm.checkPass"
              :type="state.show3 ? 'text' : 'password'"
              placeholder="Please Input"
            >
              <template #suffix>
                <div class="cursor-pointer" @click="state.show3 = !state.show3">
                  <el-icon v-if="state.show3" class="el-input__icon"
                    ><View
                  /></el-icon>
                  <el-icon v-else class="el-input__icon"><Hide /></el-icon>
                </div>
              </template>
            </el-input>
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
            @click="onSubmit()"
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
import { useRouter } from "vue-router";
import { getUserInfo } from "@/utils/data";
import { UpdataUser } from "@/api";
const showDialog = ref(false);
const formRef = ref(null);
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please enter your password again"));
  } else if (value !== this.ruleForm.newPass) {
    callback(new Error("The two passwords are different!"));
  } else {
    callback();
  }
};
const state = reactive({
  show1: false,
  show2: false,
  show3: false,
  username: localStorage.getItem("account"),
  ruleForm: {
    pass: "",
    newPass: "",
    checkPass: "",
  },
});

const router = useRouter();
const handleCommand = (command) => {
  if (command == 1) {
    showDialog.value = true;
  } else if (command == 2) {
    router.push("/person-info");
  } else {
    localStorage.clear();
    router.push("/login");
  }
};
const onSubmit = async () => {
  if (!state.ruleForm.pass) {
    ElMessage.warning("Please Input Current Password");
    return;
  }
  if (!state.ruleForm.newPass) {
    ElMessage.warning("Please Input New Password");
    return;
  }
  if (!state.ruleForm.checkPass) {
    ElMessage.warning("Please Input Confirm Password");
    return;
  }
  if (state.ruleForm.newPass != state.ruleForm.checkPass) {
    ElMessage({
      message: "passwords are inconsistent",
      type: "error",
      showClose: true,
      duration: 2000,
    });
    return;
  }
  
  let flag = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？% ]");
  if (flag.test(state.ruleForm.newPass.charAt(0)) == true) {
    return ElMessage({
      message: "Password cannot start with character",
      type: "error",
    });
  }
  let red = /^[0-9a-zA-z].*/;
  if (red.test(state.ruleForm.newPass) == false) {
    ElMessage({
      message: "Password update failed",
      type: "error",
      showClose: true,
      duration: 2000,
    });
    return;
  }

  let data = getUserInfo();

  let params = {
    parent: data.parent,
    parents: data.parents,
    password: state.ruleForm.newPass,
    oldpassword: state.ruleForm.pass,
  };
  const response = await UpdataUser(data.username, params);
  if (response) {
    ElMessage({
      message: "password updated successfully",
      type: "success",

      showClose: true,
      duration: 2000,
    });
	formRef.value.resetFields()
    showDialog.value = false;
  }
};
const Cancel = ()=>{
	formRef.value.resetFields()
    showDialog.value = false;
}
</script>
<style lang="scss">
.deviceAdd {
  .el-dialog__header {
    border-bottom: 0;
    height: 50px;
  }
  .el-form-item {
    position: relative;
    .el-input__suffix {
      position: absolute;
      cursor: pointer;
      font-size: 18px;
      right: 10px;
      top: -10px;
    }
  }
}
</style>
