<template>
    <div
      class="absolute  px-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[700px]"
    >
      <div class="text-lg text-black font-bold mb-8">
        <span class="mr-6">Account Name</span>
        <span>AAAAAAAA</span>
      </div>
      <el-form label-position="top" :model="subcompany">
        <div class="flex gap-6 md:flex-col">
            <el-form-item class="flex-1" label="Company" prop="subcompany">
                <el-input v-model="state.info.subcompany" placeholder="Please Input" />
            </el-form-item>
            <el-form-item class="flex-1" label="Address" prop="subaddress">
                <el-input v-model="state.info.subaddress" placeholder="Please Input" />
            </el-form-item>
        </div>
        <div class="flex gap-6 md:flex-col">
            <el-form-item class="flex-1" label="Country">
                <el-input v-model="state.info.country" placeholder="Please Input" />
            </el-form-item>
            <el-form-item class="flex-1" label="Remark">
                <el-input v-model="state.info.remark" placeholder="Please Input" />
            </el-form-item>
        </div>
        <div class="flex gap-6 md:flex-col mb-6">
            <div class="!flex-1">
                <el-form-item class="flex-1" label="Region">
                    <el-input v-model="state.info.region" placeholder="Please Input" />
                </el-form-item>
                <el-form-item class="flex-1" label="Telephone">
                    <el-input v-model="state.info.submobile" placeholder="Please Input" />
                </el-form-item>
                <el-form-item label="E-Mail" class="mb-0">
                    <el-input v-model="state.info.subemail" placeholder="Company" />
                </el-form-item>
            </div>
            <div class="!flex-1 overflow-auto border border-gray-200 rounded-md !box-border">
                <div class="flex w-full p-3 h-full">
                    <textarea class="h-full resize-none  mr-3 flex-1 box-border outline-none text-sm font-semibold" value="QR code"></textarea>
                    <div id="qrCode" class="w-[180px] h-full text-xs flex box-border justify-center items-center border border-gray-200 rounded-md">
                      
                    </div>
                </div>
            </div>
        </div>
        
        
        
        
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
import QRCode from 'qrcodejs2-fix';
 import Base64 from "@/utils/Base64";
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
    console.log(data)
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
    initQrcode(localStorage.getItem("account"))
  });
};
getSubusers();
const onSubmit = async () => {
  let formData = { ...state.info };
  let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/; //?????????
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
  if (formData.submobile.length != 11) {
    state.info.submobile = "";
    return ElMessage({
      message: "Telephone The character length is 11 ",
      type: "warning",
      duration: 5000,
      showClose: true,
    });
  }

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

const initQrcode = (userName)=>{
    if(getRoleId()!==3){
        return;
    }
    if(userName!=="RENON"){
        userName="RENON."+userName
    }else{
        userName="RENON"
    }
    var base1 = new Base64();
    var code=base1.encode(userName);

    let qrCodeDiv=document.getElementById("qrCode");
    new QRCode(qrCodeDiv, {
        text:code,
        width: 200,
        height: 200,
        colorDark: "#000000", //???????????????
        colorLight: "#ffffff", //??????????????????
        correctLevel: QRCode.CorrectLevel.L//????????????L/M/H
    });
}
</script>
<style lang="scss" scoped>

</style>