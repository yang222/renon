<template>
    <div class="bg-white rounded-lg p-6">
        <div class="flex justify-end gap-3">
            <el-input class="!w-[200px]" :prefix-icon="Search" v-model="query.deviceId" placeholder="User" size="large" />
            <button class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10">Search</button>
            <button class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10">+New Users</button>
        </div>
        <div class="mt-8">
            <el-table class="mb-8" :data="tableData" :border="parentBorder" style="width: 100%">
               
                <el-table-column align="center" header-align="center"  label="No." prop="date" />
                <el-table-column align="center" header-align="center"  label="User" prop="name" />
                <el-table-column align="center" header-align="center"  label="Equipment QTY" prop="name" />
                <el-table-column align="center" header-align="center"  label="Telephone" prop="name" />
                <el-table-column align="center" header-align="center"  label="E-mail" prop="name" />
                <el-table-column align="center" header-align="center"  label="Address" prop="name" />
                <el-table-column align="center" header-align="center"  label="Registration time" prop="name" />
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
import { Search } from '@element-plus/icons-vue'
const query = reactive({
    deviceId:"",
    page:1,
})
// const tableData = ref([]);
const showQuery = ref(false);
const showDialog = ref(true)
const pageChange = (page)=>{
    query.page = page
}
const form = reactive({
    name:"",
})
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
