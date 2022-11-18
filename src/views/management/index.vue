<template>
    <div class="bg-white rounded-lg p-6">
        <div class="flex justify-end gap-3">
            <el-input class="!w-[200px]" :prefix-icon="Search" v-model="query.deviceId" placeholder="User" size="large" />
            <button class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10">Search</button>
            <button class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10">+New Users</button>
        </div>
        <div class="mt-8">
            <el-table class="mb-8" :data="tableData" :border="parentBorder" style="width: 100%">
                <el-table-column type="expand">
                <template #default="props">
                    <div m="4">
                        <ul class="grid grid-cols-5 gap-4 text-center ">
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Type</p><p class=" font-medium">{{props.row.state}}</p></li>
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Devices Amount</p><p class=" font-medium">HE_BAT</p></li>
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Devices Installation</p><p class=" font-medium">HE_BAT</p></li>
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Online Devices </p><p class=" font-medium">HE_BAT</p></li>
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Fault Devices </p><p class=" font-medium">HE_BAT</p></li>
                        </ul>
                        <ul class="grid mt-6 grid-cols-5 gap-4 text-center ">
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Type</p><p class=" font-medium">{{props.row.state}}</p></li>
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Devices Amount</p><p class=" font-medium">HE_BAT</p></li>
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Devices Installation</p><p class=" font-medium">HE_BAT</p></li>
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Online Devices </p><p class=" font-medium">HE_BAT</p></li>
                            <li class="text-xs font-bold text-black"><p class="mb-3 font-bold">Fault Devices </p><p class=" font-medium">HE_BAT</p></li>
                        </ul>
                    </div>
                </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"  label="ID" prop="date" />
                <el-table-column align="center" header-align="center"  label="User" prop="name" />
                <el-table-column align="center" header-align="center"  label="Telephone" prop="name" />
                <el-table-column align="center" header-align="center"  label="E-mail" prop="name" />
                <el-table-column align="center" header-align="center"  label="Company" prop="name" />
                <el-table-column align="center" header-align="center"  label="Address" prop="name" />
                <el-table-column align="center" header-align="center"  label="Registration time" prop="name" />
                <el-table-column align="center" header-align="center"  label="Distribution equipment" prop="name">
                     <template #default="scope">
                       <div class="text-center gap-2" @click="scope">
                        <img src="@/assets/images/icon/box-add.png" class="h-5 inline-block cursor-pointer" alt="">
                       </div>
                    </template>
                </el-table-column>
                 <el-table-column  align="center" header-align="center"  label="Operate" prop="">
                     <template #default="scope">
                       <div class="flex justify-center items-center gap-3" @click="scope">
                        <img src="@/assets/images/icon/Group.png" class="h-5 cursor-pointer" alt="">
                        <img src="@/assets/images/icon/delete.png" class="h-5 cursor-pointer" alt="">
                       </div>
                    </template>
                </el-table-column>
            </el-table>
            <PageSize />
        </div>
        <el-dialog
            v-model="showDialog"
            title=""
            class="deviceAdd"
            width="700px"
        >
            <div class="tableBox px-4">
                 <div class="flex justify-end gap-3 mb-3">
                    <el-input class="!w-[200px] h-8"  v-model="query.deviceId" placeholder="Type" size="" />
                    <el-select v-model="value" class="" placeholder="Select" size="">
                        <el-option
                        label="item.label"
                        value="item.value"
                        />
                    </el-select>
                    <button class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-8">Search</button>
                    
                </div>
                 <el-table @selection-change="handleSelectionChange"  :data="tableData" size="large" :stripe="false" style="width: 100%">
                    <el-table-column  align="center" header-align="center" type="selection" width="55" />
                    <el-table-column align="center" header-align="center" prop="DevID" label="No." />
                    <el-table-column align="center" header-align="center" prop="DevID" label="DevID" />
                    <el-table-column align="center" header-align="center" prop="Power(KW)-Efficiency" label="Name" />
                    <el-table-column align="center" header-align="center" prop="E_Today(KWh)" label="Type" />
                </el-table>
            </div>
            
            <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                    <span></span>
                    <button class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Confirm</button>
                </span>
            </template>
        </el-dialog>
         <el-dialog
            v-model="addUserShow"
            title=""
            class="deviceAdd"
            width="500px"
        >
            <div class="tableBox px-4">
                 <el-form
                    label-position="top"
                    label-width="100px"
                    :model="form"
                    class="flex-1 pt-4"
                >
                    <el-form-item label="User">
                        <el-input v-model="form.name" placeholder="Please Input" />
                    </el-form-item>
                
                    <el-form-item label="Telephone">
                        <el-input v-model="form.region" placeholder="Please Input" />
                    </el-form-item>
                    <el-form-item label="E-mail">
                        <el-input v-model="form.region" placeholder="Please Input" />
                    </el-form-item>
                    <el-form-item label="Address">
                        <el-input v-model="form.region" placeholder="Please Input" />
                    </el-form-item>
            
                </el-form>
            </div>
            
            <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                     <button @click="addUserShow = false" class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md">Cancel</button>
                    <button class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Confirm</button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { reactive,ref } from "vue";
import PageSize from "@/components/pageSize.vue"
import { Search } from '@element-plus/icons-vue'
const query = reactive({
    deviceId:"",
    page:1,
})
// const tableData = ref([]);
const showQuery = ref(false);
const showDialog = ref(false)
const addUserShow = ref(false)
const pageChange = (page)=>{
    query.page = page
}
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
]
</script>
<style lang="scss">
.el-table tbody .el-table__cell.el-table__expanded-cell {
    // padding: 0 !important;
    background: rgba(0, 0, 0, 0.05);
    padding: 20px 10% !important;
    &:hover{
         background: rgba(0, 0, 0, 0.05) !important;
    }
}
.deviceAdd{
    .el-dialog__header{
        border-bottom: 0;
        height: 50px;
    }
    .el-table {
        .el-table__header {
            th{
                background: #000 !important;
                border-bottom: none;
                padding: 12px 0 !important;
                color: #fff ;
            }
        }
        .el-table__cell{
            padding: 14px 0 !important;
        }
    }
}
</style>
