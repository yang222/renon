<template>
  <div class="bg-[#F5F5F5] overflow-y-auto h-[100vh]">
    <div class="relative h-[400px] z-10">
      <img
        src="@/assets/images/login-bg.jpg"
        class="w-full h-full object-cover"
        alt=""
      />
      <span
        v-if="showForgot"
        @click="showForgot = !showForgot"
        class="absolute top-[57px] left-[42px] cursor-pointer w-6 h-6"
      >
        <img src="@/assets/images/icon/back.png" class="w-4" alt="" />
      </span>
      <div class="absolute w-full text-center top-[80px] text-white">
        <h1 class="font-bold text-[48px] leading-[60px]">
          Make Green Power Within Reach
        </h1>
        <p v-if="!showForgot" class="text-sm leading-6 mt-2">
          Copyright © 2022 Renon Power Technology Inc.
        </p>
        <p v-else class="text-sm leading-6 mt-2">www.renonpower.com</p>
      </div>
    
    </div>
      <div
        v-if="!showForgot"
        class="w-[500px] px-[40px] relative left-[50%] translate-x-[-50%] top-[-130px] z-10 py-4 pb-8 rounded-2xl bg-white"
      >
        <div class="text-[40px] font-bold text-[#000] mb-6 text-center">
          Sign In
        </div>
        <div class="mb-4">
          <p class="text-sm mb-1">User</p>
          <el-input v-model="form.username" size="large" placeholder="User" />
        </div>
        <div class="mb-4">
          <p class="text-sm mb-1">Password</p>
          <el-input
            v-model="form.password"
            size="large"
            :type="!showPw?'password':'text'"
            placeholder="Password"
          >
          <template #suffix>
                <div class="cursor-pointer" @click="showPw = !showPw">
                  <el-icon v-if="showPw" class="el-input__icon"
                    ><View
                  /></el-icon>
                  <el-icon v-else class="el-input__icon"><Hide /></el-icon>
                </div>
              </template>
          </el-input>
        </div>

        <div class="flex justify-between items-center">
          <span
            @click="showForgot = true"
            class="cursor-pointer hover:underline text-sm text-black"
            >Forgot Password?</span
          >
          <el-checkbox v-model="checked" label="Remember" size="large" />
        </div>
        <button
          @click="submitForm"
          class="h-10 w-full bg-[#000] text-white rounded-md mt-6 text-sm font-bold"
        >
          Login
        </button>
        <div class="text-xs text-center mt-6 leading-8">
          <p>
            This application is protected by copyright law and international
            treaties.
          </p>
          <p>Copyright © 2022 Renon Power Technology Inc.</p>
          <p>Data Privacy and Cookie Policy.</p>
        </div>
      </div>
      <div
        v-else
        class="w-[500px] z-10 h-[440px] px-[70px] relative left-[50%] translate-x-[-50%] top-[-120px] pt-[100px] rounded-2xl bg-white"
      >
        <div class="text-2xl font-bold text-[#000] mb-[90px] text-center">
          Forgot Password
        </div>
        <p class="text-xl text-[#000] leading-[46px] text-center">
          Please contact your superior user to reset the password
        </p>
      </div>
    <div class="z-1 text-center fixed bottom-0 w-full left-0">
      <a href="https://www.renonpower.com/" target="_blank"><img
        src="@/assets/images/logo.png"
        class="w-[170px] h-auto block mx-auto"
        alt=""
      /></a>
      <div class="flex justify-center gap-10 mt-6 mb-3">
        <a href="https://www.linkedin.com/company/renonpower/mycompany" target="_black"> <img src="@/assets/images/icon/linkedin.png" alt="" class="w-7" /></a>
        <a href="https://twitter.com/RenonPower" target="_black"><img src="@/assets/images/icon/vector.png" alt="" class="w-7" /></a>
        <a href="https://www.facebook.com/Renon-Power-Technology-106702948200020" target="_blank"><img src="@/assets/images/icon/facebook-fill.png" alt="" class="w-7" /></a>
        <a href="https://www.youtube.com/channel/UCnUzTUEK6Xvcpa1a83OOv1w" target="_blank"><img src="@/assets/images/icon/youtube.png" alt="" class="w-7" /></a>
      </div>
    </div>
    <div class="fixed bottom-[50px] left-[50px]">
      <p class="text-base mb-4 text-center">Download RENON Cloud.</p>
      <a href="http://"><img src="@/assets/images/apple.svg" class="w-[200px] mb-3" alt=""></a>
      <a href="http://"><img src="@/assets/images/google.svg" class="w-[200px]" alt=""></a>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { Login } from "@/api"
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const ruleFormRef = ref();
const router = useRouter()
const checked = ref(localStorage.getItem("username")?['Remember']:[])
const showPw = ref(false);
const form = reactive({
  username: localStorage.getItem("username") || '',
  password: "",
});
const showForgot = ref(false);
const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
});
const submitForm = async (formEl) => {
  if(!form.username){
    ElMessage.error("Please enter a user name")
    return 
  }
  if(!form.password){
    ElMessage.error("Please enter a password")
    return 
  }
  Login({
    username:form.username+"@RENON",
    password:form.password
  }).then(res=>{
    if(checked.value.length){
      localStorage.setItem("username",form.username);
    }else{
      localStorage.setItem("username",'');
    }
    localStorage.setItem("jwt",res.jwt)
    localStorage.setItem("account",form.username)
    localStorage.setItem("user_info",JSON.stringify(res.data))
    ElMessage.success("Login succeeded!")
    setTimeout(() => {
      router.push("/home")
    }, 1000);
  }).catch(err=>{
    ElMessage.error("Login failed,Please enter the correct account and password");
  })
};
</script>
<style lang="scss"></style>
