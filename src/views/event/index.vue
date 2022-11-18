<template>
    <div class="">
        <div class="bg-white rounded-lg py-6 px-8 flex flex-wrap gap-3">
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevID" size="large" />
            <span class="mx-1 text-base text-gray-400 flex items-center">-</span>
             <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevName" size="large" />
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevName" size="large" />
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="Please Input Name" size="large" />
            <button class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl  min-h-[36px]">Search</button>
        </div>
        <div class="bg-white p-6 rounded-lg mt-4">
            <el-table  :data="tableData" size="large" :stripe="false" style="width: 100%">
                <el-table-column align="center" header-align="center" prop="Plant" label="No." />
                <el-table-column align="center" header-align="center" prop="Power(KW)-Efficiency" label="DevID" />
                <el-table-column align="center" header-align="center" prop="E_Today(KWh)" label="DevName" />
                <el-table-column align="center" header-align="center" prop="E_Total(KWh)" label="User" />
                <el-table-column align="center" header-align="center" prop="Creation" label="Hardware" />
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Software" />
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Type" />
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Alarm Data" />
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Description" />
                
            </el-table>
            <div class="pt-10">
                <PageSize :total="100" :pageIndex="query.page" @CurrentChange="pageChange"/>
            </div>
        </div>
        <!-- <el-dialog
            v-model="showDialog"
            title="Add Device"
            width="500px"
            :close-on-click-modal="false"
        >
          
            <div >
              
            </div>
        </el-dialog> -->
        
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
const pageChange = (page)=>{
    query.page = page
}
</script>
<style lang="scss" scoped>

</style>