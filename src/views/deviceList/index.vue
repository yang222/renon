<template>
    <div class="">
        <div class="bg-white rounded-lg py-6 px-8 flex flex-wrap gap-3 relative">
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevID" size="large" />
            <span class="mx-1 text-base text-gray-400 flex items-center">-</span>
             <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="" size="large" />
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevName" size="large" />
            <el-input class="!w-[200px] h-10" v-model="query.deviceId" placeholder="Plant Info" size="large" />
            <el-input class="!w-[200px] h-10" v-model="query.deviceId" placeholder="Please Input Name" size="large" />
            <el-select v-model="value" class="" placeholder="Select" size="large">
                <el-option
                label="item.label"
                value="item.value"
                />
            </el-select>
             <el-select v-model="value" class="" placeholder="Hardware" size="large">
                <el-option
                label="item.label"
                value="item.value"
                />
            </el-select>
            <el-input class="!w-[200px] h-10" v-model="query.deviceId" placeholder="Software" size="large" />
            <el-select v-if="showQuery" v-model="value" class="" placeholder="Type" size="large">
                <el-option
                label="item.label"
                value="item.value"
                />
            </el-select>
            <el-select v-if="showQuery" v-model="value" class="" placeholder="Status" size="large">
                <el-option
                label="item.label"
                value="item.value"
                />
            </el-select>
             <el-date-picker
                v-if="showQuery"
                size="large"
                class="h-10"
                v-model="value1"
                type="date"
                placeholder="Installation time"
            />
            <div class="absolute bottom-3 right-3 flex items-center gap-6">
                <button class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10">Search</button>
                <el-icon :class="`cursor-pointer transition-all ${!showQuery && 'rotate-180'}`" @click="showQuery = !showQuery"><ArrowUpBold /></el-icon>
            </div>
        </div>
        <div class="bg-white p-6 rounded-lg mt-4">
            <el-table  :data="tableData" size="large" :stripe="false" style="width: 100%">
                <el-table-column align="center" header-align="center" prop="No." label="No." />
                <el-table-column align="center" header-align="center" prop="DevID" label="DevID" />
                <el-table-column align="center" header-align="center" prop="DevName" label="DevName" />
                <el-table-column align="center" header-align="center" prop="User" label="User" />
                <el-table-column align="center" header-align="center" prop="Hardware" label="Hardware" />
                <el-table-column align="center" header-align="center" prop="Software" label="Software" />
                <el-table-column align="center" header-align="center" prop="Plant Info" label="Plant Info" />
                <el-table-column align="center" header-align="center" prop="Plant Info" label="Type" />
                <el-table-column align="center" header-align="center" prop="Type" label="Installation time" />
                <el-table-column align="center" header-align="center" prop="" label="Status" />
                <el-table-column align="center" header-align="center" prop="" label="Operate">
                     <template #default="scope">
                       <div class="flex items-center gap-2" @click="scope">
                            <el-icon size="24"><View /></el-icon>
                            <img src="@/assets/images/icon/box-add.png" class="w-4" alt="">
                       </div>
                    </template>
                </el-table-column>
                
            </el-table>
            <div class="pt-10">
                <PageSize :total="100" :pageIndex="query.page" @CurrentChange="pageChange"/>
            </div>
        </div>
        <el-dialog
            v-model="showDialog"
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
                    <el-form-item label="DevID">
                        <el-input v-model="form.name" placeholder="Please Input" />
                    </el-form-item>
                    <el-form-item label="User">
                        <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                            <el-option label="Reboot" value="1"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="DevName">
                        <el-input v-model="form.region" placeholder="Please Input" />
                    </el-form-item>
                        <el-form-item label="Installation">
                        <el-input v-model="form.region" placeholder="Please Input" />
                    </el-form-item>
            
                </el-form>
                <div class="w-[130px] ml-6">
                    <Upload/>
                    <Upload class="mt-6"/>
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
import { reactive,ref } from "vue";
import PageSize from "@/components/pageSize.vue"
import Upload from "@/components/upload.vue"
const query = reactive({
    deviceId:"",
    page:1,
})
const tableData = ref([]);
const showQuery = ref(false);
const showDialog = ref(true)
const pageChange = (page)=>{
    query.page = page
}
const form = reactive({
    name:"",
})
</script>
<style lang="scss" scoped>

</style>