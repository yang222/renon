<template>
    <div
      class="absolute px-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px]"
    >
      <div class="text-lg text-black font-bold mb-8">
        <span class="mr-6">Account Name</span>
        <span>AAAAAAAA</span>
      </div>
      <el-form label-position="top" :model="form">
        <el-form-item label="Country">
          <el-input v-model="form.name" placeholder="Please Input Name" />
        </el-form-item>
        <el-form-item label="Region">
          <el-input
            v-model="form.region"
            placeholder="Please Input Telephone"
          />
        </el-form-item>
        <el-form-item label="Adress">
          <el-input v-model="form.region" placeholder="Please Input E-mail" />
        </el-form-item>
        <el-form-item label="Telephone">
          <el-input v-model="form.region" placeholder="Please Input Address" />
        </el-form-item>
        <el-form-item label="E-Mail">
          <el-input v-model="form.region" placeholder="Please Input Address" />
        </el-form-item>
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