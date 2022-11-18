<template>
    <div>
       <div class="flex gap-4">
            <div class="py-3 bg-white rounded-lg  flex-1 px-8">
                <h2 class="font-bold text-black text-3xl mb-8">Control</h2>
                <div class="">
                    
                    <el-form
                        label-position="top"
                        label-width="100px"
                        :model="formLabelAlign"
                    >
                        <div class="flex gap-6">
                            <div class="flex-1">
                                <el-form-item label="Operating Mode">
                                    <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Operating" value="1"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Reset">
                                    <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Reboot" value="1"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Clear">
                                    <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Reboot" value="1"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Force Charger State">
                                    <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Reboot" value="1"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Auxiliary Output Control">
                                    <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Reboot" value="1"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Refresh Configuration Data">
                                    <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Reboot" value="1"/>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Backup Mode</p>
                                    <el-switch v-model="form.name" style="--el-switch-on-color: #13ce66;" />
                                </div>
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Sell Enable/Disable</p>
                                    <el-switch v-model="form.name" style="--el-switch-on-color: #13ce66;" />
                                </div>
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Backup Mode</p>
                                    <el-switch v-model="form.name" style="--el-switch-on-color: #13ce66;" />
                                </div>
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Sell Enable/Disable</p>
                                    <el-switch v-model="form.name" style="--el-switch-on-color: #13ce66;" />
                                </div>
                            </div>
                        </div>
                      
                    </el-form>
                    
                </div>
            </div>
            <div class="py-3 bg-white rounded-lg flex-1  px-8">
                <h2 class="font-bold text-black text-3xl mb-8">Inverter</h2>
                <div class="">
                    
                    <el-form
                        label-position="top"
                        label-width="100px"
                        :model="formLabelAlign"
                        style="max-width: 460px"
                    >
                        <div class="flex gap-6">
                            <div class="flex-1">
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">AC Coupling</p>
                                    <el-switch v-model="form.name" style="--el-switch-on-color: #13ce66;" />
                                </div>
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Search Mode Enable</p>
                                    <el-switch v-model="form.name" style="--el-switch-on-color: #13ce66;" />
                                </div>
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">AC Coupling</p>
                                    <div class="flex items-center">
                                        <el-input-number v-model="num2" class="mx-4" />
                                        <span class="text-black text-xs leading-5 ml-2">W</span>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Search Mode Enable</p>
                                    <div class="flex items-center">
                                        <el-input-number v-model="num2" class="mx-4" />
                                        <span class="text-black text-xs leading-5 ml-2">S</span>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Recharge Voltage</p>
                                    <div class="flex items-center">
                                        <input placeholder="00:00" type="text" class="mr-1 outline-none text-xs border h-5 border-[#000] rounded-md px-1 w-[60px]">
                                        <img src="@/assets/images/icon/clock.png" class="w-[14px]" alt="">
                                    </div>
                                </div>
                                
                                <el-form-item label="Force Charger State">
                                    <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Reboot" value="1"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Auxiliary Output Control">
                                    <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Reboot" value="1"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Refresh Configuration Data">
                                    <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                        <el-option label="Reboot" value="1"/>
                                    </el-select>
                                </el-form-item>
                                
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Search Mode Enable</p>
                                    <div class="flex items-center">
                                        <el-input-number v-model="num2" class="mx-4" />
                                        <span class="text-black text-xs leading-5 ml-2">S</span>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center h-[48px] mb-4">
                                    <p class="text-xs text-black">Recharge Voltage</p>
                                    <div class="flex items-center">
                                        <input placeholder="00:00" type="text" class="mr-1 outline-none text-xs border h-5 border-[#000] rounded-md px-1 w-[60px]">
                                        <img src="@/assets/images/icon/clock.png" class="w-[14px]" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    </el-form>
                    
                </div>
            </div>
       </div>
       <div class="py-3 bg-white mt-4 rounded-lg  flex-1 px-8">
            <h2 class="font-bold text-black text-3xl mb-8">Battery</h2>
            <el-form
                label-position="top"
                label-width="100px"
                :model="formLabelAlign"
            >
                <div class="flex gap-6 flex-wrap">
                    <div class="w-[300px]">
                        <el-form-item label="Operating Mode">
                            <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Operating" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Reset">
                            <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Clear">
                            <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Force Charger State">
                            <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Auxiliary Output Control">
                            <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Refresh Configuration Data">
                            <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                    </div>
                     <div class="w-[300px]">
                        <el-form-item label="Operating Mode">
                            <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Operating" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Reset">
                            <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Clear">
                            <el-select v-model="value" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Force Charger State">
                            <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Auxiliary Output Control">
                            <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Refresh Configuration Data">
                            <el-select v-model="form.name" class="m-2" placeholder="-- Select an option --" size="large">
                                <el-option label="Reboot" value="1"/>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="w-[300px]">
                        <div class="flex justify-between items-center h-[48px] mb-4">
                            <p class="text-xs text-black">AC Coupling</p>
                            <el-switch v-model="form.name" style="--el-switch-on-color: #13ce66;" />
                        </div>
                        <div class="flex justify-between items-center h-[48px] mb-4">
                            <p class="text-xs text-black">Search Mode Enable</p>
                            <el-switch v-model="form.name" style="--el-switch-on-color: #13ce66;" />
                        </div>
                        <div class="flex justify-between items-center h-[48px] mb-4">
                            <p class="text-xs text-black">AC Coupling</p>
                            <div class="flex items-center">
                                <el-input-number v-model="num2" class="mx-4" />
                                <span class="text-black text-xs leading-5 ml-2">W</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center h-[48px] mb-4">
                            <p class="text-xs text-black">Search Mode Enable</p>
                            <div class="flex items-center">
                                <el-input-number v-model="num2" class="mx-4" />
                                <span class="text-black text-xs leading-5 ml-2">S</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center h-[48px] mb-4">
                            <p class="text-xs text-black">Recharge Voltage</p>
                            <div class="flex items-center">
                                <input placeholder="00:00" type="text" class="mr-1 outline-none text-xs border h-5 border-[#000] rounded-md px-1 w-[60px]">
                                <img src="@/assets/images/icon/clock.png" class="w-[14px]" alt="">
                            </div>
                        </div>
                    </div>
                    
                  
                </div>
                
            </el-form>

       </div>
    </div>
</template>
<script setup>
import { reactive } from "vue";

const form = reactive({
    name:"",
})
</script>
<style lang="scss" scoped>

</style>