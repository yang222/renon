<template>
    <div class="">
        <div class="rounded-lg bg-white py-8 px-4 flex gap-3 flex-wrap">
            <span 
            v-for="(item,index) in navList" 
            :key="index" 
            @click="active = item.id"
            style="box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.2);" 
            :class="`w-[130px] cursor-pointer hover:underline leading-[50px] text-base font-bold  text-center h-[50px] rounded-lg ${active == item.id?'bg-[#000] text-white':'text-black'}`">{{item.title}}</span>
        </div>
        <div class="bg-white rounded-lg mt-4">
            <Master v-if="active == 1" />
            <Pack v-if="active == 2" />
            <Inverter v-if="active == 3" />
            <Dcdcin v-if="active == 4" />
            <Dcdcout v-if="active == 5" />
            <Pcs v-if="active == 6" />
            <div class="h-[500px]" v-if="active ==7 || active ==8 || active ==9 ">
                <NoData />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,reactive } from "vue"
import Master from "./components/master.vue"
import Pack from "./components/pack.vue"
import Inverter from "./components/inverter.vue"
import Pcs from "./components/pcs.vue"
import Dcdcin from "./components/dcdcin.vue"
import Dcdcout from "./components/dcdcout.vue"
import NoData from "@/components/nodata.vue"
import { Devices } from "@/api"


const active= ref(1)

const navList = [
    {title:"Master",id:1},
    {title:"Pack",id:2},
    {title:"Inverter",id:3},
    {title:"DCDCIN",id:4},
    {title:"DCDCOUT",id:5},
    {title:"PCS",id:6},
    {title:"Pv Controller",id:7},
    {title:"Combiner box",id:8},
    {title:"Smart switch",id:9},
]
const state= reactive({
    devList:[],
    selectData:"",
    devid:"",
})
const getDevList = ()=>{
    const username = localStorage.getItem("account");
    Devices({
        skip:0,
        limit:999,
        filter: {"desc":{"$regex":username,"$options":"i"},"$or":[{"parents":username},{"subusers":username}]}
    }).then(res=>{
        state.devList = res.data;
        state.selectData = res.data[0];
        state.devid = state.selectData.devid;
        // getDevDetail();
    })
}
// getDevList();

const handlePReport = async (value,devtype,status)=> {
    
}
const handleReport =(value,devtype, status)=>{
if(status==0){
 
}
}

const devChange = ()=>{
      //  this.$store.dispatch('deviceSelect/setDevice',value);
    state.selectData =this.devList.find((item)=>{
    return value==item.devid
    })
    this.handleReport(value,state.selectData.devtype,state.selectData.status)
    this.handlePReport(value,state.selectData.devtype,state.selectData.status)
}
</script>
<style lang="scss" scoped>

</style>