<template>
  <div
    class="absolute px-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px]"
  >
    <div class="text-lg text-black font-bold mb-8">
      <span class="mr-6">Account Name</span>
      <span>{{ state.info.username }}</span>
    </div>
    <el-form label-position="top" :model="state.info">
      <el-form-item label="Country">
        <el-input
          v-model="state.info.country"
          placeholder="Please Input Country"
        />
      </el-form-item>
      <el-form-item label="Region">
        <el-input
          v-model="state.info.region"
          placeholder="Please Input Region"
        />
      </el-form-item>
      <el-form-item label="Address">
        <el-input
          v-model="state.info.subaddress"
          placeholder="Please Input Address"
        />
      </el-form-item>
      <el-form-item label="Telephone">
        <el-input
          v-model="state.info.submobile"
          placeholder="Please Input Telephone"
        />
      </el-form-item>
      <el-form-item label="E-Mail">
        <el-input
          v-model="state.info.subemail"
          placeholder="Please Input E-Mail"
        />
      </el-form-item>
       
    </el-form>
    <div class="text-center pt-8">
      <button
        @click="onSubmit"
        class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl min-h-[36px]"
      >
        Confirm
      </button>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { Subusers, UpdataUser } from "@/api";
import { getRoleId } from "@/utils/data"
const state = reactive({
  info: {
    username: "",
    subaddress: "",
    subcompany: "",
    subemail: "",
    submobile: "",
    user_extra: "",
    parent: "",
    parents: "",
    region: "",
    country: "",
    remark: "",
  },
  role: getRoleId(),
});
const getSubusers = () => {
  Subusers({
    filter: { username: localStorage.getItem("account") },
    skip: 0,
    limit: 1,
    descend: true,
  }).then((res) => {
    let formData = {};
    const data = res.data[0];
    formData.subaddress = data.subaddress ? data.subaddress : "";
    formData.subcompany = data.subcompany ? data.subcompany : "";
    formData.subemail = data.subemail ? data.subemail : "";
    formData.submobile = data.submobile ? data.submobile : "";
    formData.username = data.username ? data.username : "";
    formData.user_extra = data.user_extra ? data.user_extra : "";
    formData.parent = data.parent;
    formData.parents = data.parents;
    try {
      formData.region = data.user_extra
        ? JSON.parse(data.user_extra).region
        : "";
      formData.country = data.user_extra
        ? JSON.parse(data.user_extra).country
        : "";
      formData.remark = data.user_extra
        ? JSON.parse(data.user_extra).remark
        : "";
    } catch (e) {}
    state.info = formData;
  });
};
getSubusers();
const onSubmit = async () => {
  let formData = { ...state.info };
  let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/; //手机号
  let email =
    /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
  if (state.role !== 4) {
    if (formData.subcompany.length < 1 || formData.subcompany.length > 64) {
      state.info.subcompany = "";

      return ElMessage({
        message: "Company is 1 to 64 characters in length ",
        type: "warning",
        duration: 5000,
        showClose: true,
      });
    }
  }

  if (formData.country.length < 1 || formData.country.length > 32) {
    state.info.country = "";
    return ElMessage({
      message: "Country is 1 to 32 characters in length",
      type: "warning",
      duration: 5000,
      showClose: true,
    });
  }
  if (formData.region.length < 1 || formData.region.length > 32) {
    state.info.region = "";
    //  this.$nextTick(() => {
    //   this.$refs.RegionBool.focus()
    // })
    return ElMessage({
      message: "Region is 1 to 32 characters in length",
      type: "warning",
      duration: 5000,
      showClose: true,
    });
  }

  if (formData.subaddress.length < 1 || formData.subaddress.length > 64) {
    state.info.subaddress = "";
    return ElMessage({
      message: "The subAddress is 1 to 64 characters in length ",
      type: "warning",
      duration: 5000,
      showClose: true,
    });
  }
  // if (formData.submobile.length != 11) {
  //   state.info.submobile = "";
  //   return ElMessage({
  //     message: "Telephone The character length is 11 ",
  //     type: "warning",
  //     duration: 5000,
  //     showClose: true,
  //   });
  // }

  if (email.test(formData.subemail) == false) {
    state.info.subemail = "";
    return ElMessage({
      message: "Please enter a valid email address",
      type: "warning",
      duration: 5000,
      showClose: true,
    });
  }
  if (state.role !== 4) {
    if (formData.remark.length < 1 || formData.remark.length > 64) {
      state.info.remark = "";

      return ElMessage({
        message: "Remark Specifies that the value contains 1 to 64 characters",
        type: "warning",
        duration: 5000,
        showClose: true,
      });
    }
  }
 let user_extra = {};
  if (formData.user_extra) {
    user_extra = JSON.parse(formData.user_extra);
  }
  user_extra.region = formData.region?formData.region:"";
  user_extra.country = formData.country?formData.country:"";
  user_extra.remark = formData.remark?formData.remark:"";
  formData.user_extra=JSON.stringify(user_extra)

  let sendParams = {
    desc: "",
    nickname: "",
    ...formData
  }
  delete sendParams.username;
  const res = await UpdataUser(formData.username,sendParams);
  if (res) {
    ElMessage({ message: "Edit successfully", type: "success" });
  }
};
</script>
<style lang="scss" scoped></style>
