<template>
	<div class="header flex justify-end bg-transparent mb-8">
		<div class="flex items-center pr-5">
			<img src="@/assets/images/icon/avatar.png" class="w-5 mr-2" alt="">
			<el-dropdown @command="handleCommand">
				<span class="el-dropdown-link text-white">
				Admin
				<el-icon class="el-icon--right">
					<arrow-down />
				</el-icon>
				</span>
				<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="1">Password</el-dropdown-item>
					<el-dropdown-item command="2">Account</el-dropdown-item>
					<el-dropdown-item command="3">Log out</el-dropdown-item>

				</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<el-dialog
            v-model="showDialog"
            title=""
			class="deviceAdd"
            width="500px"
            :close-on-click-modal="false"
        >
          
            <div class="p-6">
               <el-form
                    label-position="top"
                    :model="form"
                >
                    <el-form-item label="Current Password">
                        <el-input v-model="form.name" :type="state.show1?'text':'password'" placeholder="Please Enter" >
							<template #suffix>
								<div class=" cursor-pointer" @click="state.show1 = !state.show1">
									<el-icon v-if="state.show1" class="el-input__icon"><View /></el-icon>
									<el-icon v-else class="el-input__icon"><Hide /></el-icon>
								</div>
							</template>
						</el-input>
                    </el-form-item>
					<el-form-item label="New Password">
                        <el-input v-model="form.name" :type="state.show2?'text':'password'" placeholder="Please Enter" >
							<template #suffix>
								<div class=" cursor-pointer" @click="state.show2 = !state.show2">
									<el-icon v-if="state.show2" class="el-input__icon"><View /></el-icon>
									<el-icon v-else class="el-input__icon"><Hide /></el-icon>
								</div>
							</template>
						</el-input>
                    </el-form-item>
					<el-form-item label="Confirm Password">
                        <el-input v-model="form.name" :type="state.show3?'text':'password'" placeholder="Please Enter" >
							<template #suffix>
								<div class=" cursor-pointer" @click="state.show3 = !state.show3">
									<el-icon v-if="state.show3" class="el-input__icon"><View /></el-icon>
									<el-icon v-else class="el-input__icon"><Hide /></el-icon>
								</div>
							</template>
						</el-input>
                    </el-form-item>
                    
    
            
                </el-form>
            </div>
			 <template #footer>
                <span class="dialog-footer w-full flex justify-between">
                    <button @click="showDialog = false" class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md">Cancel</button>
                    <button class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px]  rounded-md">Confirm</button>
                </span>
            </template>
        </el-dialog>
	</div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router"
const showDialog = ref(false)
const state = reactive({
	show1:false,
	show2:false,
	show3:false
})
const form= reactive({
  name: '',
  region: '',
  type: '',
})
const router = useRouter();
const handleCommand = (command) => {
  if(command ==1){
	showDialog.value = true
  }else if(command == 2){
	router.push("/person-info")
  }else{
	localStorage.clear();
	router.push("/login")
  }
}
</script>
<style lang="scss">
.deviceAdd{
    .el-dialog__header{
        border-bottom: 0;
        height: 50px;
    }
	.el-form-item {
		position: relative;
		.el-input__suffix{
			position: absolute;
			cursor: pointer;
			font-size: 18px;
			right: 10px;
			top: -10px;
		}
	}
}
</style>
