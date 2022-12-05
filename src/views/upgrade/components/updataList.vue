<template>
    <el-dialog
            v-model="state.show"
            title="upgrade" :visible.sync="show" width="500" :modal-append-to-body="false"
             :modal="false"
             :close-on-click-modal="false"
        >
          
            <div class="py-4 px-8">
                <el-table :data="state.list"  :row-class-name="tableRowClassName" >
                <el-table-column align="center" label="DevName" prop="devname" width=""></el-table-column>
                <el-table-column align="center" label="DevID" prop="devid" width=""></el-table-column>
                <el-table-column align="center" label="Send" prop="address">
                <template #default="scope">
                    <span>
                      
                            <el-icon  v-if="scope.row.state==1" size="20"><Check /></el-icon>
                            <el-icon v-if="scope.row.state==2" size="20"   @click="handleResend(scope)"><Refresh /></el-icon>
                             <el-icon v-if="scope.row.state==5" size="20" class="is-loading"><Loading /></el-icon>
                    </span>
                </template>
                </el-table-column>
            </el-table>
            </div>
            <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                    <button @click="state.show = false" class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md">Cancel</button>
                    <!-- <button @click="UpDataSubmit" class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Update Now</button> -->
                </span>
            </template>
        </el-dialog>
</template>
<script setup>
import { reactive } from "vue";
import { Upgrade } from "@/api"

const state = reactive({
    show:false,
    list:[],
})
const  tableRowClassName = ({row})=> {
    // if (row.state == 0) {
    //     return "background-color: #fff;";
    // }
    // if (row.state == 1) {
    //     return "background-color: #DDF3E3;";
    // }
    // if (row.state == 2) {
    //     return "background-color: #FFCCCC;";
    // }
    // return "background-color: #fff;";
    if (row.state == 0) {
        return "bg-white";
    }
    if (row.state == 1) {
        return "!bg-[#DDF3E3]";
    }
    if (row.state == 2) {
        return "!bg-[#FFCCCC]";
    }
    return "bg-white";

}
const showModal =(list) =>{
    state.list = JSON.parse(JSON.stringify(list));
    ElMessageBox.confirm(
        'Whether you want to upgrade?',
        'upgrade',
        {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        }
    )
        .then(() => {
            state.show = true;
            upgradeData()
        })
}
const  send = async (data, i)=> {
    let params = {"EMS_module": 1, "master": 1, "pack": 1};
    data["state"] = 5;
    state.list[i] = data
    let res = await Upgrade(data["devid"], params);
    if (!res) {
        data["state"] = 2;
        state.list[i] = data;
        ElMessage({type: "error", message: `${data.devid} send fail`});
        return;
    }
    if (res.result) {
        data["state"] = 1;
        state.list[i] = data
        ElMessage({type: "success", message: `${data.devid} send success`});
        return;
    } else {
        data["state"] = 2;
        state.list[i] = data
        ElMessage({type: "error", message: `${data.devid} send fail，${res.message}`});
        return;
    }
}
const  upgradeData = async ()=> {
    for (let i = 0; i < state.list.length; i++) {
        await send(state.list[i],i)
    }
}
const handleResend = async (row)=> {
    let data = {...state.list[row["$index"]]};
    await send(data,row["$index"])
}
defineExpose({
  showModal,
})
</script>
<style lang="scss" scoped>

</style>