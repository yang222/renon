<template>
    <div class="flex items-center justify-center mt-6">
        <el-icon class="cursor-pointer" @click="handle('del')"><ArrowLeft /></el-icon>
        <span class="w-[120px] text-center text-xs text-black">{{state.date}}</span>
        <el-icon class="cursor-pointer" @click="handle('add')"><ArrowRight /></el-icon>
    </div>
</template>
<script setup>
import moment from 'moment'
import { reactive,watch } from "vue"
const emits = defineEmits(['change']);
const props = defineProps({
    active:{
        type:String,
        default:'day'
    }
})
const state = reactive({
    date: moment().format("YYYY-MM-DD"),
})
if(props.active == 'day'){
    state.date = moment().format("YYYY-MM-DD")
}else if(props.active == 'month'){
    state.date = moment().format("YYYY-MM")
}else if(props.active == 'year'){
    state.date = moment().format("YYYY")
}

watch(()=>props.active,function(news){
    if(news == 'day'){
        state.date = moment().format("YYYY-MM-DD")
    }else if(news == 'month'){
         state.date = moment().format("YYYY-MM")
    }else {
         state.date = moment().format("YYYY")
    }
})
const handle = (type)=>{
    if(type == 'del'){
        if(props.active == 'day'){
            state.date =  moment(state.date).subtract(1, 'day').format('YYYY-MM-DD');
        }else if(props.active == 'month'){
            state.date =  moment(state.date).subtract(1, 'month').format('YYYY-MM')
        }else{
            state.date = moment(state.date).subtract(1, 'year').format('YYYY-MM-DD')
        }
    }else{
        if(props.active == 'day'){
            if(state.date == moment().format('YYYY-MM-DD')){
                return
            }
            state.date =  moment(state.date).add(1, 'day').format('YYYY-MM-DD');
        }else if(props.active == 'month'){
            if(state.date == moment().format('YYYY-MM')){
                return
            }
            state.date =  moment(state.date).add(1, 'month').format('YYYY-MM')
        }else{
            if(state.date == moment().format('YYYY')){
                return
            }
            state.date = moment(state.date).add(1, 'year').format('YYYY-MM-DD')
        }
    }
    emits("change",{
        date:state.date,
        type
    })
}
</script>
<style lang="scss" scoped>

</style>