<template>
    <div class="relative min-h-full">
        <div class="bg-white rounded-lg mb-4 py-6 px-8 flex flex-wrap gap-3 relative">
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevID" size="large" />
            <span class="mx-1 text-base text-gray-400 flex items-center">-</span>
             <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="" size="large" />
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevName" size="large" />
            <el-input class="!w-[200px] h-10" v-model="query.deviceId" placeholder="Plant Info" size="large" />
            <el-select v-model="value" class="" placeholder="User" size="large">
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
            <el-select v-model="value" class="" placeholder="Type" size="large">
                <el-option
                label="item.label"
                value="item.value"
                />
            </el-select>
            <el-select  v-model="value" class="" placeholder="Status" size="large">
                <el-option
                label="item.label"
                value="item.value"
                />
            </el-select>
             <el-date-picker
               
                size="large"
                class="h-10"
                v-model="value1"
                type="date"
                placeholder="Installation time"
            />
             <button class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10">Search</button>
        </div>
        <div class="bg-white p-6 rounded-lg">
            <div class="text-right mb-4">
                <button style="box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);" class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-input min-h-[36px]">Upgrade</button>
            </div>
            <el-table @selection-change="handleSelectionChange"  :data="tableData" size="large" :stripe="false" style="width: 100%">
                <el-table-column  align="center" header-align="center" type="selection" width="55" />
                <el-table-column align="center" header-align="center" prop="Plant" width="60" label="No." />
                <el-table-column align="center" header-align="center" prop="Power(KW)-Efficiency" label="DevID" />
                <el-table-column align="center" header-align="center" prop="E_Today(KWh)" label="DevName" />
                <el-table-column align="center" header-align="center" prop="E_Total(KWh)" label="Type" />
                <el-table-column align="center" header-align="center" prop="Creation" label="Hardware" />
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Software" />
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Installation time" />
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Status" />
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Upgrade">
                    <template #default="scope">
                        <div v-if="scope.row.a =='a'" class="flex items-center justify-center">
                            <span class="text-[#56C271] font-medium text-sm underline cursor-pointer">Upgrade</span>
                        </div>
                        <div v-else class="text-sm font-medium text-black flex items-center justify-center">Latest</div>
                    </template>
                </el-table-column>
                
            </el-table>
            <div class="pt-10">
                <PageSize :total="100" :pageIndex="query.page" @CurrentChange="pageChange"/>
            </div>
        </div>
        <el-dialog
            v-model="showDialog"
            title="Latest Version"
            width="500px"
            :close-on-click-modal="false"
        >
          
            <div class="py-4 px-8">
             <ul>
                <li class="mb-8 last:mb-0 text-black text-xs">

                    <p class="mb-1"><span class="font-bold">Master :</span> <span class="value">V2.0.0</span></p>
                    <p><span class="font-bold">Specific Description :</span> <span class="value">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span></p>
                </li>
             </ul>
            </div>
            <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                    <button @click="showDialog = false" class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md">Cancel</button>
                    <button class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Update Now</button>
                </span>
            </template>
        </el-dialog>
        <div v-if="showTips" style="box-shadow: 0px 8px 40px rgba(138, 149, 158, 0.2);" class="bg-white w-[500px] h-[182px] rounded-lg fixed z-[100] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center text-center">
            <div class="text-black font-base font-bold">
                <p class="mb-6">The command is issued successfully,</p>
                <p>please wait for 10 minutes and observe the device</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive,ref } from "vue";
import PageSize from "@/components/pageSize.vue"
const query = reactive({
    deviceId:"",
    page:1,
})
const tableData = ref([]);
const showDialog = ref(true)
const showQuery = ref(true)
const showTips = ref(false)
const pageChange = (page)=>{
    query.page = page
}
const handleSelectionChange = ()=>{

}
</script>
<style lang="scss" scoped>

</style>