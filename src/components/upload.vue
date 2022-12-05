<template>
    <div class="text-center border rounded-md border-gray-200 py-7 relative">
        <img src="@/assets/images/icon/add.png" class="w-3 inline-block" alt="">
        <p class="text-xs text-[#8392AB] font-normal mt-5">Installation picture</p>
        <el-upload
            class="absolute top-0 left-0 w-full h-full opacity-0"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >

        </el-upload>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const imageUrl = ref('')

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = uploadFile.raw
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>
<style lang="scss">
.el-upload{
  width: 100% !important;
  height: 100% !important;
}
</style>