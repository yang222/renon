<template>
    <div>
        <div class="flex">
            <div class="py-8 flex-1 px-7 bg-white rounded-lg">
                <div class="text-2xl font-bold text-black mb-[80px]">Device States</div>
                <div class="flex gap-6">
                    <div v-if="devAllStatus.all"  class="min-w-[400px] flex-1 rounded-lg overflow-hidden" style="box-shadow: 0px 8px 40px rgba(138, 149, 158, 0.2)">
                        <Pie :devAllStatus="devAllStatus" :keyArr='[{title:"Online",key:"online"},{title:"Off-line",key:""}]' color="#3ECE80" echartId="myEchart1" subColor="#E0E0E0" />
                    </div>
                    <div v-if="devAllStatus.all"  class="min-w-[400px] flex-1 rounded-lg overflow-hidden" style="box-shadow: 0px 8px 40px rgba(138, 149, 158, 0.2)">
                        <Pie2 :devAllStatus="devAllStatus" :keyArr='[{title:"Alarm",key:""},{title:"Fault",key:"fault"}]' color="#FDD015" echartId="myEchart2" subColor="#E76262" />
                    </div>
                </div>
            </div>
            <div class="py-6 px-7 bg-white rounded-lg flex-1 ml-4">
                <div class="text-2xl font-bold text-black mb-6">Type</div>
                <ul>
                    <li v-for="(item,index) in state.typeList" :key="index" class="rounded-2xl flex justify-between items-center py-2 px-4 mb-4 last:mb-0" style="box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.05);">
                        <div>
                            <p class="text-sm font-bold text-black-dark">{{item.devtype}}</p>
                            <p class="font-bold text-3xl text-black mt-2">{{item.devices.count}}</p>
                        </div>
                        <span v-if="index ==0" style="background:linear-gradient(140.67deg, #5E72E4 15.47%, #825EE4 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==1" style="background:linear-gradient(140.67deg, #F5583D 15.47%, #F54351 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==2" style="background:linear-gradient(140.67deg, #2DCEBC 15.47%, #2DCE96 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==3" style="background:linear-gradient(140.67deg, #FB9C40 15.47%, #FB7B40 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==4" style="background:linear-gradient(140.67deg, #5E72E4 15.47%, #825EE4 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==5" style="background:linear-gradient(140.67deg, #F5583D 15.47%, #F54351 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==6" style="background:linear-gradient(140.67deg, #2DCEBC 15.47%, #2DCE96 84.37%);" class="w-12 h-12 rounded-full"></span>
                    </li>

                </ul>
            </div>
        </div>
        
         <EndUser v-if="role == 4" />
         <AgentTable v-else />
        
    </div>
</template>
<script setup>
import { ref,reactive }  from "vue";
import PageSize from "@/components/pageSize.vue"
import Pie from "@/components/pie.vue"
import Pie2 from "@/components/pie2.vue"
import EndUser from "./components/end-user.vue"
import AgentTable from "./components/agent.vue"
import { DevType,Devices } from "@/api"
import { getUserInfo,getRoleId } from "@/utils/data"

const pageChange = (page)=>{
    console.log(page);
}
const state = reactive({
    typeList:[]
})
const role = getRoleId();
const userInfo = getUserInfo();

//获取设备类型
const getDevType = ()=>{
    DevType({
        descend:true,
        skip:0,
        limit:50000,
        hideSchema:true,
    }).then(res=>{
        state.typeList = res.data.filter(item=>item.devices.count > 0);
        console.log(state.typeList)
    })
}
getDevType()

const devAllStatus = ref({
    all:0,
    online:0,
    fault:0,
    offline:0,
    alarm:0,
})
const getDevList = ()=>{
    Devices({
        skip:0,
        limit:999,
         filter:{"desc":{"$regex":localStorage.getItem("account"),"$options":"i"},"$or":[{"parents":localStorage.getItem("account")},{"subusers":localStorage.getItem("account")}]}
    }).then(res=>{

        const online = res.data.filter(item => {
            return item.status==0
        })
        const offline = res.data.filter(item => {
            return item.status==1
        })

        const fault= res.data.filter(item => {
            return item.status==2
        })
        devAllStatus.value.all=res.data.length
        devAllStatus.value.online=online.length
        devAllStatus.value.offline=offline.length
        devAllStatus.value.fault=fault.length
        devAllStatus.value.alarm=res.data.length - offline.length -online.length - fault.length
    })
}
getDevList();
</script>
<style lang="scss">

</style>