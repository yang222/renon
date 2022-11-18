<template>
    <div class="">
        <div class="rounded-lg bg-white py-8 px-4 flex gap-3 flex-wrap">
            <span 
            v-for="(item,index) in navList" 
            :key="index" 
            style="box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.2);" 
            :class="`w-[130px] cursor-pointer hover:underline leading-[50px] text-base font-bold  text-center h-[50px] rounded-lg ${active == item.id?'bg-[#000] text-white':'text-black'}`">{{item.title}}</span>
        </div>
        <div class="bg-white rounded-lg mt-4 flex">
            <ul class="w-[300px] py-10 border-r border-gray-300">
                <li class="">
                    <div @click="snShow = !snShow" :class="`cursor-pointer px-10 flex justify-between items-center text-base text-black font-semibold leading-[48px] ${deviceActive == 1?'bg-black text-white':''}`">(SN号) <el-icon :class="`${snShow?'rotate-180':''} transition-all`"><ArrowDownBold /></el-icon></div>
                    <ul :class="`px-10 text-[13px] text-black font-normal overflow-hidden transition-all ${snShow?'h-[80px]':'h-0'}`">
                        <li class="flex justify-between leading-[40px]">Hardware version <span>V1.0.2</span></li>
                        <li class="flex justify-between leading-[40px]">Software version <span>V1.0.0</span></li>
                    </ul>
                </li>
                 <li class="">
                    <div class="cursor-pointer px-10 flex justify-between items-center text-base text-black font-semibold leading-[48px]">12312312313123 <el-icon :class="`${deviceShow?'rotate-180':''} transition-all`"><ArrowDownBold /></el-icon></div>
                    <ul class="px-10 text-[13px] text-black font-normal">
                        <li class="flex justify-between leading-[40px]">Hardware version <span>V1.0.2</span></li>
                        <li class="flex justify-between leading-[40px]">Software version <span>V1.0.0</span></li>
                    </ul>
                </li>
            </ul>
            <div class="flex-1">
                <Info />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import Info from "./components/info.vue"

const active= ref(1)
const deviceActive= ref(1)
const snShow = ref(true)
const deviceShow = ref(true)
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
</script>
<style lang="scss" scoped>

</style>