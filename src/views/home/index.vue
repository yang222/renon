<template>
    <div>
        <div class="flex">
            <div class="py-8 px-7 bg-white rounded-lg">
                <div class="text-2xl font-bold text-black mb-[80px]">Device States</div>
                <div class="flex gap-6">
                    <div class="w-[400px] rounded-lg overflow-hidden" style="box-shadow: 0px 8px 40px rgba(138, 149, 158, 0.2)">
                        <Pie color="#3ECE80" echartId="myEchart1" subColor="#E0E0E0" />
                    </div>
                    <div class="w-[400px] rounded-lg overflow-hidden" style="box-shadow: 0px 8px 40px rgba(138, 149, 158, 0.2)">
                        <Pie color="#FDD015" echartId="myEchart2" subColor="#E76262" />
                    </div>
                </div>
            </div>
            <div class="py-6 px-7 bg-white rounded-lg flex-1 ml-4">
                <div class="text-2xl font-bold text-black mb-6">Type</div>
                <ul>
                    <li v-for="(item,index) in 4" :key="item" class="rounded-2xl flex justify-between items-center py-2 px-4 mb-4 last:mb-0" style="box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.05);">
                        <div>
                            <p class="text-sm font-bold text-black-dark">Home_AIO</p>
                            <p class="font-bold text-3xl text-black mt-2">3</p>
                        </div>
                        <span v-if="index ==0" style="background:linear-gradient(140.67deg, #5E72E4 15.47%, #825EE4 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==1" style="background:linear-gradient(140.67deg, #F5583D 15.47%, #F54351 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==2" style="background:linear-gradient(140.67deg, #2DCEBC 15.47%, #2DCE96 84.37%);" class="w-12 h-12 rounded-full"></span>
                        <span v-if="index ==3" style="background:linear-gradient(140.67deg, #FB9C40 15.47%, #FB7B40 84.37%);" class="w-12 h-12 rounded-full"></span>
                    </li>

                </ul>
            </div>
        </div>
        
         <EndUser />
         <AgentTable />
        
    </div>
</template>
<script setup>
import { ref,reactive }  from "vue";
import PageSize from "@/components/pageSize.vue"
import Pie from "@/components/pie.vue"
import EndUser from "./components/end-user.vue"
import AgentTable from "./components/agent.vue"

const pageChange = (page)=>{
    console.log(page);
}


</script>
<style lang="scss">

</style>