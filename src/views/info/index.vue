<template>
  <div class="min-h-full bg-white rounded-lg relative Info w-full overflow-x-auto">
        <EndUser  v-if="role == 4" />
        <Installer v-if="role == 3" />
        <Agent v-if="role == 1 || role == 2" />
  </div>
</template>
<script setup>
import { reactive } from "vue";
import EndUser from "./components/end-user.vue"
import NoData from "../../components/nodata.vue"
import Installer from "./components/installer.vue"
import Agent from "./components/agent.vue"
import { getUserInfo,getRoleId } from "@/utils/data"

const role = getRoleId();
const userInfo = getUserInfo();

</script>
<style lang="scss">
.Info {
  .el-form {
    .el-form-item {
      margin-bottom: 24px !important;
      &.mb-0{
        margin-bottom: 0px !important;
      }
      .el-form-item__label {
        color: #000 !important;
        font-weight: 600;
      }
    }
  }
}
</style>
