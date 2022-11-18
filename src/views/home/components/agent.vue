<template>
    <div class="mt-4 pt-8 px-6 bg-white rounded-lg flex items-center">
        <div class="flex-1">
            <el-table  :data="tableData" size="large" :stripe="false" style="width: 100%">
                <el-table-column align="center" header-align="center"  prop="Plant" label="Type Name">
                    <template #default="scope">
                       <router-link class="text-[#3ECE80] font-bold" :to="`/home/device?id=${scope.row.id}`">{{scope.row.Plant}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="Power(KW)-Efficiency" label="Type Description" />
                <el-table-column prop="E_Today(KWh)" label="Normal Equipment" />
                <el-table-column prop="E_Total(KWh)" label="Fault Equipment" />
                <el-table-column prop="Creation" label="Offline Equipment" />
                <el-table-column prop="Device Amount" label="Summary" />
             
            </el-table>
            <!-- <PageSize :total="100" :pageIndex="1" @CurrentChange="pageChange"/> -->
        </div>
        <ul class="w-[250px] border-l border-gray-200 ml-4 pl-6">
            <li class="p-4 rounded-md shadow-button2 mb-4">
                <p class="text-sm font-semibold mb-2">User Statistics</p>
                <p class="text-sm"><span>Lower Level User Number： </span> 112</p>
            </li>
            <li class="p-4 rounded-md shadow-button2 mb-4">
                <p class="text-sm font-semibold mb-2">User Statistics</p>
                <p class="text-sm"><span>Lower Level User Number： </span> 112</p>
            </li>
            <li class="p-4 rounded-md shadow-button2 mb-4">
                <p class="text-sm font-semibold mb-2">User Statistics</p>
                <p class="text-sm"><span>Lower Level User Number： </span> 112</p>
            </li>
        </ul>
       
    </div>
</template>
<script setup>
import { ref,reactive }  from "vue";

const tableData = [
  {
    Plant: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    Plant: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    Plant: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    Plant: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
<style lang="scss" scoped>

</style>