<template>
    <div
      class="absolute  px-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[700px]"
    >
      <div class="text-lg text-black font-bold mb-8">
        <span class="mr-6">Account Name</span>
        <span>AAAAAAAA</span>
      </div>
      <el-form label-position="top" :model="form">
        <div class="flex gap-6 md:flex-col">
            <el-form-item class="flex-1" label="Company">
                <el-input v-model="form.name" placeholder="Company" />
            </el-form-item>
            <el-form-item class="flex-1" label="Address">
                <el-input v-model="form.name" placeholder="Address" />
            </el-form-item>
        </div>
        <div class="flex gap-6 md:flex-col">
            <el-form-item class="flex-1" label="Country">
                <el-input v-model="form.name" placeholder="Company" />
            </el-form-item>
            <el-form-item class="flex-1" label="Remark">
                <el-input v-model="form.name" placeholder="Address" />
            </el-form-item>
        </div>
        <div class="flex gap-6 md:flex-col">
            <el-form-item class="flex-1" label="Region">
                <el-input v-model="form.name" placeholder="Company" />
            </el-form-item>
            <div class="flex-1"></div>
        </div>
         <div class="flex gap-6 md:flex-col">
            <el-form-item class="flex-1" label="Telephone">
                <el-input v-model="form.name" placeholder="Company" />
            </el-form-item>
            <div class="flex-1"></div>
        </div>
        <div class="flex gap-6 md:flex-col">
            <el-form-item class="flex-1" label="E-Mail">
                <el-input v-model="form.name" placeholder="Company" />
            </el-form-item>
            <div class="flex-1"></div>
        </div>
        
        
      </el-form>
      <div class="text-center pt-8">
        <button
          class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl min-h-[36px]"
        >
          Confirm
        </button>
      </div>
    </div>
</template>
<script setup>
import { reactive } from "vue";
const form = reactive({
  name: "",
});
</script>
<style lang="scss" scoped>

</style>