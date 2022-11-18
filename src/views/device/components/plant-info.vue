<template>
    <div class="mt-4 bg-white rounded-lg p-4 PlanInfo">
        <h2 class="text-[24px] font-bold pb-4 border-b border-gray-300">Plant info</h2>
        <div class="py-8 px-3 flex">
            <img src="@/assets/images/plant-img.jpg" class="w-[336px]" alt="">
            <div class="bg-[#F8F9FA] p-8 pt-3 flex-1 relative rounded-r-lg">
                <div class="text-right mb-3">
                    <img src="@/assets/images/icon/pencil.png" class="w-5 cursor-pointer inline-block" alt="">
                </div>
                <ul class="grid grid-cols-1 gap-6">
                    <li class="text-xs text-black flex justify-between gap-4">
                        <span class="font-bold">Name:</span>
                        <span>Viking Burrito</span>
                    </li>
                    <li class="text-xs text-black flex justify-between gap-4">
                        <span class="font-bold">Device Amount:</span>
                        <span>2</span>
                    </li>
                    <li class="text-xs text-black flex justify-between gap-4">
                        <span class="font-bold">Installer:</span>
                        <span>xxxxxxxxxxxxxxxx</span>
                    </li>
                    <li class="text-xs text-black flex justify-between gap-4">
                        <span class="font-bold">Telephone:</span>
                        <span>1346798520000</span>
                    </li>
                     <li class="text-xs text-black flex justify-between gap-4">
                        <span class="font-bold">E-mail :</span>
                        <span>oliver@renonpower.com</span>
                    </li>
                     <li class="text-xs text-black flex justify-between">
                        <span class="font-bold">Address:</span>
                        <span>1346798520000</span>
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
                    label-position="top"
                    label-width="100px"
                    :model="form"
                    style="max-width: 460px"
                >
                    <el-form-item label="Name">
                        <el-input v-model="form.name" placeholder="Please Input Name" />
                    </el-form-item>
                    <el-form-item label="Telephone">
                        <el-input v-model="form.region" placeholder="Please Input Telephone" />
                    </el-form-item>
                    <el-form-item label="E-mail">
                        <el-input v-model="form.region" placeholder="Please Input E-mail" />
                    </el-form-item>
                        <el-form-item label="Address">
                        <el-input v-model="form.region" placeholder="Please Input Address" />
                    </el-form-item>
            
                </el-form>
                <div class="w-[170px] text-center">
                    <img src="@/assets/images/plant-img.jpg" class="w-[140px] inline-block" alt="">
                    <p class="text-black text-xs my-2">Upload photos</p>
                    <p class="text-xs text-gray-500">(Supported formats: jpg, png, bmp
Upload photos and compress them to 100K)</p>
                </div>  
            </div>
            <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                    <button @click="showDialog = false" class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md">Cancel</button>
                    <button class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Confirm</button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const showDialog = ref(true)
const form = reactive({
    name:"",
    region:"",
})
</script>
<style lang="scss">
.PlanInfo {
    .el-dialog {
        .el-dialog__header{
            border: none;
        }
    }
}
</style>