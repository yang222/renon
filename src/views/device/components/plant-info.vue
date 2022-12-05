<template>
  <div class="mt-4 bg-white rounded-lg p-4 PlanInfo">
    <h2 class="text-[24px] font-bold pb-4 border-b border-gray-300">
      Plant info
    </h2>
    <div class="py-8 px-3 flex">
      <img src="@/assets/images/plant-img.jpg" class="w-[336px]" alt="" />
      <div class="bg-[#F8F9FA] p-8 pt-3 flex-1 relative rounded-r-lg">
        <div class="text-right mb-3">
          <img
            v-if="role == 4"
            @click="handleEdit"
            src="@/assets/images/icon/pencil.png"
            class="w-5 cursor-pointer inline-block"
            alt=""
          />
        </div>
        <ul class="grid grid-cols-1 gap-6">
          <li class="text-xs text-black flex justify-between gap-4">
            <span class="font-bold">Name:</span>
            <span>{{
              state.plantInfo ? state.plantInfo.nickname : "---"
            }}</span>
          </li>
          <li class="text-xs text-black flex justify-between gap-4">
            <span class="font-bold">Device Amount:</span>
            <span>{{ state.plantInfo ? getDeviceList.length : "---" }}</span>
          </li>
          <li class="text-xs text-black flex justify-between gap-4">
            <span class="font-bold">Installer:</span>
            <span>{{ state.plantInfo && state.plantInfo ? state.parentsArr : "---" }}</span>
          </li>
          <li class="text-xs text-black flex justify-between gap-4">
            <span class="font-bold">Telephone:</span>
            <span>{{
              state.plantInfo ? state.plantInfo.submobile : "---"
            }}</span>
          </li>
          <li class="text-xs text-black flex justify-between gap-4">
            <span class="font-bold">E-mail :</span>
            <span>{{
              state.plantInfo ? state.plantInfo.subemail : "---"
            }}</span>
          </li>
          <li class="text-xs text-black flex justify-between">
            <span class="font-bold">Address:</span>
            <span>{{
              state.plantInfo ? state.plantInfo.subaddress : "---"
            }}</span>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      v-model="showDialog"
      title=""
      width="500px"
      :close-on-click-modal="false"
    >
      <div class="tableBox px-4 pt-8 pb-0 flex items-center gap-6">
        <el-form
          class="flex-1"
          ref="formRef"
          label-position="top"
          label-width="100px"
          :model="form"
          style="max-width: 460px"
        >
          <el-form-item label="Name" prop="nickname">
            <el-input v-model="form.nickname" placeholder="Please Input Name" />
          </el-form-item>
          <el-form-item label="Telephone" prop="submobile">
            <el-input
              v-model="form.submobile"
              placeholder="Please Input Telephone"
            />
          </el-form-item>
          <el-form-item label="E-mail" prop="subemail">
            <el-input
              v-model="form.subemail"
              placeholder="Please Input E-mail"
            />
          </el-form-item>
          <el-form-item label="Address" prop="subaddress">
            <el-input
              v-model="form.subaddress"
              placeholder="Please Input Address"
            />
          </el-form-item>
        </el-form>
        <div class="w-[170px] text-center">
          <img
            src="@/assets/images/plant-img.jpg"
            class="w-[140px] inline-block"
            alt=""
          />
          <p class="text-black text-xs my-2">Upload photos</p>
          <p class="text-xs text-gray-500">
            (Supported formats: jpg, png, bmp Upload photos and compress them to
            100K)
          </p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer w-full flex justify-between">
          <button
            @click="showDialog = false"
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
import { computed, reactive, ref, watch } from "vue";
import { Subusers, Devices, editSubUserPlant } from "@/api";
import { subusersPlant } from "@/api/devices";
import { getRoleId } from "@/utils/data";
import { ElMessage } from "element-plus";
const showDialog = ref(false);
const formRef = ref(null);
const props = defineProps({
  plantName: {
    type: String,
    default: "",
  },
  selectData: {
    type: String,
    default: "",
  },
});
const role = getRoleId();
const state = reactive({
  plantInfo: null,
  list: [],
  install: "",
  parents:{},
  parentsArr:''
});
const form = reactive({
  nickname: "",
  submobile: "",
  subemail: "",
  subaddress: "",
});
const DevList = async () => {
  const res = await Devices({
    skip: 0,
    limit: 999,
    filter:
      '{"devid":{"$regex":"","$options":"i"},"$or":[{"parents":"' +
      localStorage.getItem("account") +
      '"},{"subusers":"' +
      localStorage.getItem("account") +
      '"}]}',
  });
  if (res) {
    state.list = res.data;
  }
};
DevList();

//获取plant 信息
const getPlant = async () => {
  // if (!props.plantName) return;
  // Subusers({
  //   skip: 0,
  //   limit: 20,
  //   descend: true,
  //   filter: {
  //     parent: localStorage.getItem("account"),
  //     username: { $regex: props.plantName, $options: "i" },
  //   },
  // }).then((res) => {
  //   state.plantInfo = res.data[0];
  // });
  const res =await subusersPlant({skip: (1 - 1) * 20, limit: 20,  useranme: state.parents.leve5,isShowParent:false,leve4:state.parents.leve4})
  state.plantInfo=res.data[0]
};
// getPlant();

//获取设备列表
const getDeviceList = computed(() => {
  if (props.plantName) {
    return state.list.filter((item) => {
      let desc = {};
      try {
        desc = item.desc ? JSON.parse(item.desc) : "";
        return desc.parent.includes(props.plantName);
      } catch (e) {
        return false;
      }
    });
  } else {
    return state.list.filter((item) => {
      let desc = {};

      try {
        desc = item.desc ? JSON.parse(item.desc) : "";
        return desc.parent.includes(state.plantInfo.username);
      } catch (e) {
        return false;
      }
    });
  }
});
watch(
  () => props.selectData,
  (newValue, oldValue) => {
    console.log(newValue,'asdasdasdasd')
    if (newValue) {
      try{
        let a=newValue.desc?JSON.parse(newValue.desc):""
        console.log(a)
        if(a.level==6){
            state.parents={leve5:a.parent[a.parent.length-1],leve4:a.parent[a.parent.length-2]}
            state.parentsArr=a.parent[3]
            console.log(state.parents,"9999",state.parentsArr)
            getPlant()
        }else{
          state.plantInfo = null;
        }
    } catch (e) {
            state.parents=''
            state.plantInfo = null;
            
    }
    }
  }
);
//点击编辑
const handleEdit = () => {
  showDialog.value = true;
  form.nickname = state.plantInfo.nickname;
  form.submobile = state.plantInfo.submobile;
  form.subemail = state.plantInfo.subemail;
  form.subaddress = state.plantInfo.subaddress;
};
const onSubmit = async () => {
  let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/; //手机号
  let email =
    /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
  if (form.nickname.length < 1 || form.nickname.length > 32) {
    return ElMessage({
      message: "Creation failed，Name's digit number can't go beyond 32",
      type: "warning",
    });
  }
  // if (form.submobile.length != 11) {
  //   return ElMessage({
  //     message: "Telephone The character length is 11",
  //     type: "warning",
  //   });
  // }
  if (form.subemail && email.test(form.subemail) == false) {
    return ElMessage({
      message: "Creation failed，Please check Email formatting",
      type: "warning",
    });
  }
  if (form.subaddress.length < 1 || form.subaddress.length > 64) {
    return ElMessage({
      message: "Creation failed，Address is 1 to 64 characters in length",
      type: "warning",
    });
  }

  const res = await editSubUserPlant(state.plantInfo.username, form);
  if (res) {
    showDialog.value = false;
    ElMessage({ message: "Edit successfully", type: "success" });
    getPlant();
  }else{
    ElMessage({
      message: "Edit failed",
      type: "error",
    });
  }
};
</script>
<style lang="scss">
.PlanInfo {
  .el-dialog {
    .el-dialog__header {
      border: none;
    }
  }
}
</style>
