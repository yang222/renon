<template>
    <div class="relative min-h-full">
        <div class="bg-white rounded-lg mb-4 py-6 px-8 flex flex-wrap gap-3 relative">
            <el-input class="!w-[200px]" :clearable="true" v-model="query.devid" placeholder="DevID" size="large" />
            <el-input class="!w-[200px]" :clearable="true" v-model="query.devname" placeholder="DevName" size="large" />
            <el-input   v-if="userInfo.role==4" :clearable="true" class="!w-[200px] h-10" v-model="query.deviceId" placeholder="Plant Info" size="large" />
            <el-select v-model="query.subusers" :clearable="true" placeholder="User" size="large">
                <el-option
                    v-for="(item,index) in state.userList"
                    :key="index"
                    :label="item.username" :value="item.username"
                />
            </el-select>
            <el-input class="!w-[200px] h-10" :clearable="true" v-model="query.Hardware" placeholder="Hardware" size="large" />
            <el-input class="!w-[200px] h-10" :clearable="true" v-model="query.Software" placeholder="Software" size="large" />
            <el-select v-model="query.devtype" :clearable="true" placeholder="Type" size="large">
                <el-option
                    v-for="(item,index) in state.typeList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                />
            </el-select>
            <el-select  v-model="query.status"  :clearable="true" placeholder="Status" size="large">
                <el-option label="on-line" :value="0"> </el-option>
                <el-option label="off-line" :value="1"> </el-option>
            </el-select>
             <el-date-picker
                 :clearable="true"
                size="large"
                class="h-10"
                v-model="query.registertime"
                type="date"
                placeholder="Installation time"
            />
             <button @click="handleSearch" class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10">Search</button>
        </div>
        <div class="bg-white p-6 rounded-lg">
            <div class="text-right mb-4">
                <button @click="handleUpdata('')" style="box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);" class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-input min-h-[36px]">Upgrade</button>
            </div>
            <el-table @selection-change="handleSelectionChange"  :data="state.devList" size="large" :stripe="false" style="width: 100%">
                <el-table-column  align="center" header-align="center" type="selection" width="55" />
                <el-table-column align="center" header-align="center" prop="index" width="60" label="No." />
                <el-table-column align="center" header-align="center" prop="devid" label="DevID" />
                <el-table-column align="center" header-align="center" prop="devname" label="DevName" />
                <el-table-column align="center" header-align="center" prop="devtype" label="Type" />
                <el-table-column align="center" header-align="center" prop="Creation" label="Hardware" >
                     <template #default="scope">
                        <div v-for="(item,index) in getHardware(scope.row)" :key="index">
                        {{item["type"]+":"+item["version"]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" prop="Creation" label="Software" >
                    <template #default="scope">
                        <div v-for="(item,index) in getSoftware(scope.row)" :key="index">
                        {{item["type"]+":"+item["version"]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" prop="registertime" label="Installation time" />
                <el-table-column align="center" header-align="center" prop="subemail" label="Status" >
                    <template #default="scope">
                        <span v-if="scope.row.status==0" style="color:#56C271;text-align: center;cursor: pointer">Online </span>
                        <span v-else style="color:#ccc;text-align: center;cursor: pointer">Off-line</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" prop="Device Amount" label="Upgrade">
                    <template #default="scope">
                        <div @click="handleUpdata(scope.row)" v-if="checkIsLastVersion(scope.row)" class="flex items-center justify-center">
                            <span class="text-[#56C271] font-medium text-sm underline cursor-pointer">Upgrade</span>
                        </div>
                        <div v-else class="text-sm font-medium text-black flex items-center justify-center">Latest</div>
                        
                    </template>
                </el-table-column>
                
            </el-table>
            <div class="pt-10">
                <PageSize v-if="state.total" :total="state.total" :pageIndex="query.page" @CurrentChange="pageChange"/>
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

                    <p class="mb-1"><span class="font-bold">Master :</span> <span class="value">V{{state.package.master.version}}</span></p>
                    <p><span class="font-bold">Specific Description :</span> <span class="value">{{state.package.master.desc.desc}}</span></p>
                </li>
                <li class="mb-8 last:mb-0 text-black text-xs">

                    <p class="mb-1"><span class="font-bold">Pack :</span> <span class="value">V{{state.package.pack.version}}</span></p>
                    <p><span class="font-bold">Specific Description :</span> <span class="value">{{state.package.pack.desc.desc}}</span></p>
                </li>
                <li class="mb-8 last:mb-0 text-black text-xs">

                    <p class="mb-1"><span class="font-bold">EMS :</span> <span class="value">V{{state.package.ems.version}}</span></p>
                    <p><span class="font-bold">Specific Description :</span> <span class="value">{{state.package.ems.desc.desc}}</span></p>
                </li>
             </ul>
            </div>
            <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                    <button @click="showDialog = false" class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md">Cancel</button>
                    <button @click="UpDataSubmit" class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Update Now</button>
                </span>
            </template>
        </el-dialog>
        <div v-if="showTips" style="box-shadow: 0px 8px 40px rgba(138, 149, 158, 0.2);" class="bg-white w-[510px] h-[182px] rounded-xl fixed z-[100] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center text-center">
            <div class="text-black font-base font-bold">
                <p class="mb-6">The Upgrade Command is sent</p>
                <p class="mb-6">to the device {{state.selectData.devid}}, the Auto-upgrading</p>
                <p>will start shortly and will finish in about 10 min.</p>
            </div>
        </div>
        <UpdataList  ref="batchRef" />
    </div>
</template>
<script setup>
import { reactive,ref } from "vue";
import PageSize from "@/components/pageSize.vue"
import { getUserInfo,getTime,getHardware,getSoftware,DateToTime } from "@/utils/data"
import { DevType, Devices,packageInfo,Subusers,Upgrade} from "@/api"
import UpdataList from "./components/updataList.vue"
const query = reactive({
    devid:"",
    devname:"",
    devtype:"",
    Hardware:"",
    Software:"",
    registertime:"",
    subusers:"",
    status:'',
    page:1,
})
const userInfo = getUserInfo();
const tableData = ref([]);
const showDialog = ref(false)
const showQuery = ref(true)
const showTips = ref(false)
const batchRef = ref(null);
const state= reactive({
    typeList:[],
    devList:[],
    package:{},
    userList:[],
    total:0,
    selectList:[],
    selectData:{},
})
const pageChange = (page)=>{
    query.page = page
    getDevList();
}
const handleSelectionChange = (val)=>{
    state.selectList = val
}
const getDevType = ()=>{
    DevType({
        skip:0,
        limit:0,
        descend:true,
        hideSchema:true,
    }).then(res=>{
        state.typeList=res.data.map(item=>{
            return {"name":item.devtype,"value":item.devtype}
        }).filter((item1)=>{
            return item1.name!="NewType"
        });
    })
}
getDevType();
const account = localStorage.getItem("account");
const getDevList = ()=>{
    let params = {
        skip:(query.page -1) *10,
        limit:10,
        filter:{"desc":{"$regex":account,"$options":"i"},"$or":[{"parents":account},{"subusers":account}]}
    }
    if(query.devid){
        params.filter['devid'] = {"$regex":query.devid,"$options":"i"}
    }
    if(query.devname){
        params.filter['devname'] = {"$regex":query.devname,"$options":"i"}
    }
    if(query.devtype){
        params.filter['devtype'] = {"$regex":query.devtype,"$options":"i"}
    }
    if(query.Hardware || query.Software){
        params.filter["$and"] = [];
    }
    if(query.Hardware){
        params.filter['$and'].push({"$or":[{"M_R2.M_hwver":{"$regex":query.Hardware,"$options":"i"}},{"P1_R2.P1_hwver":{"$regex":query.Hardware,"$options":"i"}}]})
    }
    if (query.Software) {
        params.filter["$and"].push({"$or": [{"M_R2.M_swver": query.Software}, {"P1_R2.P1_swver": query.Software}]})
    }
    if(query.registertime){
        params.filter['$and'] =[{"registertime":{"$gte":DateToTime(query.registertime,'start')}},{"registertime":{"$lte":DateToTime(query.registertime,'end')}}]
    }
    if(query.subusers){
        params.filter['subusers'] = query.subusers
    }
    if(query.status !==''){
        params.filter['status'] = query.status
    }
    if(query.Software){
        state.devList = []
        return
    }
    Devices(params).then(res=>{  
     
        state.devList = res.data.map((item,index)=>{
             item['index'] = (index+1)+(query.page-1)*10;
             item['registertime'] = getTime(item.registertime)
             return item
        });
    })
    
}
getDevList();
const getDevCount = ()=>{
     let params = {
        aggregation: "count",
        descend: true,
        filter:{"desc":{"$regex":account,"$options":"i"},"$or":[{"parents":account},{"subusers":account}]}
    }
    if(query.devid){
        params.filter['devid'] = {"$regex":query.devid,"$options":"i"}
    }
    if(query.devname){
        params.filter['devname'] = {"$regex":query.devname,"$options":"i"}
    }
    if(query.devtype){
        params.filter['devtype'] = {"$regex":query.devtype,"$options":"i"}
    }
    if(query.Hardware){
        params.filter['$and'] =[{"$or":[{"M_R2.M_hwver":{"$regex":"cccc","$options":"i"}},{"P1_R2.P1_hwver":{"$regex":"cccc","$options":"i"}}]}]
    }
    if(query.registertime){
        params.filter['$and'] =[{"registertime":{"$gte":DateToTime(query.registertime,'start')}},{"registertime":{"$lte":DateToTime(query.registertime,'end')}}]
    }
    if(query.subusers){
        params.filter['subusers'] = query.subusers
    }
    if(query.status){
        params.filter['status'] = query.status
    }
    if(query.Software){
        state.devList = []
        return
    }
    Devices(params).then(res=>{  
        state.total = res.count;
      
    })
}
getDevCount();
const getUser =  ()=>{
    Subusers({
        filter: {"parent":account,"username":{"$regex":"[object Object]","$options":"i"}},
        skip:0,
        limit:999,
        descend:true,
    }).then(res=>{
        state.userList=res.data
    })
}
getUser();

 const loadPackage = async ()=>{
    const master= await packageInfo({
        pkgtype: "master_firmware_2001_3.0",
    });
     const pack= await packageInfo({
        pkgtype: "slave_firmware_6_3.0",
    });
    const ems= await packageInfo({
        pkgtype: "EMS_V2_firmware",
    });
    state.package =   {master,pack,ems};
}
loadPackage()
const handleSearch = ()=>{
    query.page = 1;
    state.total = 0;
    state.devList = [];
    getDevList();
    getDevCount();
}
const handleUpdata = (item)=>{
    if(item){
        state.selectData = item;
        showDialog.value = true;
    }else {
         if(!state.selectList.length){
            ElMessage.warning("Please select a device")
            return
         }
         console.log(batchRef)
         batchRef.value.showModal(state.selectList)

    }
    
}
const UpDataSubmit = async ()=>{
    showTips.value = true;
    showDialog.value = false;
    const item = state.selectData;
    let params={"EMS_module":1,"master":1,"pack":1};
    let res = await Upgrade(item["devid"],params);
    
    if (res?.result) {
        ElMessage({type: "success", message: `${item["devid"]} send success`});
    }
    showTips.value = false;
        
}

const checkIsLastVersion = async (data)=>{

    let versionList= getSoftware(data);
    if(versionList.length!=2){
        return  false;
    }
    if(! state.package["master"] ||  state.package["master"]["version"]!=versionList[0]["version"]){
        return  false;
    }
    if(! state.package["pack"] ||  state.package["pack"]["version"]!=versionList[1]["version"]){
        return  false;
    }
    return  true;

}
</script>
<style lang="scss" scoped>

</style>