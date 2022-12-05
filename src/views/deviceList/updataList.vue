<template>
    <el-dialog
            v-model="state.show"
            title=""
            class="deviceAdd"
            width="500px"
            :close-on-click-modal="false"
        >
          
            <div class="p-6 pt-3 flex items-center">
              <el-form
                    label-position="top"
                    label-width="100px"
                    :model="form"
                    class="flex-1 pt-4"
                >
                    <el-form-item label="DevID" prop='devid'>
                        <!-- <el-input disabled v-model="form.devid" placeholder="Please Input" /> -->
                        <p class=" leading-5 text-xs text-gray-500">{{form.devid}}</p>
                    </el-form-item>
                    <el-form-item label="User" prop='user'>
                        <el-select v-model="form.user" class="m-2" placeholder="-- Select an option --" size="large">
                            <el-option v-for="(item,index) in state.userList"  :key="index"  :label="item.username"
          :value="item.username"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="DevName" prop='name'>
                        <el-input v-model="form.name" placeholder="Please Input" />
                    </el-form-item>
                        <el-form-item label="Installation" prop='installTime'>
                        <!-- <el-input disabled v-model="form.installTime" placeholder="Please Input" /> -->
                         <p class=" leading-5 text-xs text-gray-500">{{form.installTime}}</p>
                    </el-form-item>
            
                </el-form>
                <div class="w-[130px] ml-6">
                    <Upload/>
                    <Upload class="mt-6"/>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                    <button @click="state.show = false" class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md">Cancel</button>
                    <button @click="onSubmit" class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Confirm</button>
                </span>
            </template>
        </el-dialog>
        
</template>
<script setup>
import moment from "moment";
import { reactive } from "vue";
import { getParents } from "@/utils/data"
import { DevicesBind,updateDevDesc } from "@/api"

const emits = defineEmits(['load'])
const state = reactive({
    show:false,
    userList:[],
})
const form = reactive({
    devid:"",
    installTime:"",
    name:"",
    user:"",
    _id:"",
    mobile:"",
    address:"",
    email:"",
    devtype:"",
})
const showModal = (userList,info)=>{
    let a=info.desc?JSON.parse(info.desc):{}
    state.userList = userList;
    form.devid = info.devid;
    form._id=info._id
    form.name = a.name;
    form.user=a.parent.length!=0&&a.parent.length>=4? a.parent[4]:""
    form.installTime = a.installTime?a.installTime:moment().format("YYY-MM-DD");
    form.mobile=a.mobile
    form.address=a.address
    form.email=a.email
    form.devtype = info.devtype
    state.show = true;
}
const onSubmit = async ()=>{
    let formData={
       devid:form.devid ,
        user:form.user,
        mobile:form.mobile,
        name:form.name,
        email:form.email,
        address:form.address,
        installTime:form.installTime,
        devtype:form.devtype
    }
    if(!form.user){
        ElMessage.warning("please select user")
        return
    }
    if(!form.name){
        ElMessage.warning("Please enter the name")
        return
    }
    let parent= getParents();
    parent.push(form.user)
    form["parent"] =parent;
    form["level"] = form["parent"].length;
    
    const res1 = await DevicesBind( {devs: [form._id],subuser:form.user});
    const res = await updateDevDesc(form.devid,form.devtype,{
        desc:JSON.stringify(form),
        devname:form.name
    });

    if (res) {
        state.show = false;
        ElMessage({ message: 'Edit success', type: 'success' });
        emits('load');
    }
}

defineExpose({
    showModal
})
</script>
<style lang="scss" scoped>

</style>