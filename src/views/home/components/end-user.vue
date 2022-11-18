<template>
    <div>
        <div class="mt-4 pt-8 px-6 bg-white rounded-lg">
            <div class="flex justify-between items-center mb-12">
                <p class="font-bold text-black text-2xl">Plant List</p>
                <div class="flex items-center gap-3">
                     <el-input
                    v-model="input2"
                    class="m-2"
                    style="width:200px;"
                    placeholder="Plant"
                    :prefix-icon="Search"
                    />
                    <button class="bg-black h-8 px-4 rounded-lg hover:shadow-lg text-white font-medium text-xs">Search</button>
                    <button @click="showDialog = true" class="bg-black h-8 px-4 rounded-lg hover:shadow-lg text-white font-medium text-xs">+Create Plant</button>
                </div>
            </div>
            <el-table  :data="tableData" size="large" :stripe="false" style="width: 100%">
                <el-table-column align="center" header-align="center"  prop="Plant" label="Plant">
                    <template #default="scope">
                       <router-link class="text-[#3ECE80] font-bold" :to="`/home/device?id=${scope.row.id}`">{{scope.row.Plant}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="Power(KW)-Efficiency" label="Power(KW)-Efficiency" />
                <el-table-column prop="E_Today(KWh)" label="E_Today(KWh)" />
                <el-table-column prop="E_Total(KWh)" label="E_Total(KWh)" />
                <el-table-column prop="Creation" label="Creation" />
                <el-table-column prop="Device Amount" label="Device Amount" />
                <el-table-column prop="Operate" label="Operate">
                    <template #default="scope">
                       <div class="flex items-center gap-2" @click="scope">
                        <img src="@/assets/images/icon/box-add.png" class="h-5 cursor-pointer" alt="">
                        <img src="@/assets/images/icon/del.png" class="h-5 cursor-pointer" alt="">
                       </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <PageSize :total="100" :pageIndex="1" @CurrentChange="pageChange"/> -->
        </div>
        <el-dialog
            v-model="showDialog"
            title="Add Device"
            width="500px"
            :close-on-click-modal="false"
        >
            <div v-if="type == 'device'" class="tableBox px-4">
                 <el-table @selection-change="handleSelectionChange"  :data="tableData" size="large" :stripe="false" style="width: 100%">
                    <el-table-column  align="center" header-align="center" type="selection" width="55" />
                    <el-table-column align="center" header-align="center" prop="DevID" label="DevID" />
                    <el-table-column align="center" header-align="center" prop="Power(KW)-Efficiency" label="Name" />
                    <el-table-column align="center" header-align="center" prop="E_Today(KWh)" label="Type" />
                </el-table>
            </div>
            <div v-else class="p-5 pb-0">
                <el-form
                    label-position="top"
                    label-width="100px"
                    :model="formLabelAlign"
                    style="max-width: 460px"
                >
                    <el-form-item label="Name">
                        <el-input v-model="formLabelAlign.name" placeholder="Please Input Name" />
                    </el-form-item>
                    <el-form-item label="Telephone">
                        <el-input v-model="formLabelAlign.region" placeholder="Please Input Telephone" />
                    </el-form-item>
                    <el-form-item label="E-mail">
                        <el-input v-model="formLabelAlign.region" placeholder="Please Input E-mail" />
                    </el-form-item>
                        <el-form-item label="Address">
                        <el-input v-model="formLabelAlign.region" placeholder="Please Input Address" />
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
import { ref,reactive }  from "vue";
import { Search } from '@element-plus/icons-vue'
const showDialog = ref(false);
const type = ref("plant");

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
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