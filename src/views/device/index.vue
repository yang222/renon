<template>
    <div class="flex Device min-h-full">
        <div class="w-[300px] box-border absolute h-[calc(100%-64px)] overflow-y-auto p-5 bg-white rounded-lg">
            <div class="mb-8">
                <div class="flex items-center">
                    <el-icon size="22" class="cursor-pointer"><Refresh /></el-icon>
                    <el-input
                    v-model="input2"
                    class="w-50 m-2"
                    placeholder="Please Input Plant"
                    :suffix-icon="Search"
                    />
                </div>
                <ul class="pl-8">
                    <li class="leading-8 text-sm text-[#6C757D] cursor-pointer">Hardware version</li>
                    <li class="leading-8 text-sm text-[#6C757D] cursor-pointer">Hardware version</li>
                </ul>
            </div>
            <div>
                <div class="flex items-center">
                    <el-icon size="22" class="cursor-pointer"><Refresh /></el-icon>
                    <el-input
                    v-model="input2"
                    class="w-50 m-2"
                    placeholder="Please Input Device"
                    :suffix-icon="Search"
                    />
                </div>
                <ul class="pl-8">
                    <li v-for="item in 40" :key="item" class="leading-8 text-sm text-[#6C757D] cursor-pointer">Hardware version</li>
                    <li class="leading-8 text-sm text-[#6C757D] cursor-pointer">Hardware version</li>
                </ul>
            </div>
        </div>
        <div class="w-[calc(100%-316px)] ml-[316px]">
            <div class="bg-white rounded-lg py-6 px-8 flex relative">
                <div class="w-auto">
                    <ul>
                        <li class="text-lg font-bold">
                            <p class="text-black mb-1">Status</p>
                            <p class="text-[#8B8F92]">Off-line</p>
                            <p class="text-[#3ECE80]">On-line</p>
                        </li>
                        <li class="text-lg font-bold my-6">
                            <p class="text-black mb-1">Type</p>
                            <p class="text-black text-base font-normal">HE_BAT</p>
                        </li>
                        <li class="text-lg font-bold">
                            <p class="text-black mb-1">DevID</p>
                            <p class="text-black  text-base font-normal">VGHKSL12345678</p>
                        </li>
                    </ul>
                </div>
                <div class="ml-12 overflow-x-auto flex-1">
                    <Generation/>
                </div>
            </div>
             <PlantInfo/>
        </div>

    </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import Generation from './components/generation.vue'
import PlantInfo from './components/plant-info.vue'
</script>
<style lang="scss">
.Device{
    .el-input__wrapper{
        padding-right: 0;
    }
    .el-input__suffix{
        cursor: pointer;
        background: #000;
        padding-right: 10px;
        color: #fff;
        font-weight: 700;
        border-radius: 4px;
    }
}
</style>
