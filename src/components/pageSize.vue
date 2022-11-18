<template>
    <div class="w-full flex justify-between items-center bg-white">
        <p class="text-sm text-black">Showing {{(pageIndex-1)*10+1}} to {{pageIndex*10}} of {{total}} entries </p>
        <div class="text-xs text-black flex items-center">
            <el-pagination page-size="10" :total="total" class="mr-2" :pager-count="5" @current-change="handleCurrentChange" layout="prev, pager, next" />
            <div class="flex items-center">
                 Jump to <input  v-model="pageNo" @blur="pageChange"  class="w-[50px] h-[30px] border border-gray-500 text-center rounded-md mx-2 outline-none" min="1" max="4" type="number" autocomplete="off" tabindex="0" id="el-id-4912-492">Pg
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";

const emits = defineEmits(['CurrentChange']);
 const props = defineProps({
    total:{
        type:Number,
        default:0
    },
    pageSize:{
        type:Number,
        default:10,
    },
    pageIndex:{
        type:Number,
        default:10,
    }
    
 })
 const pageNo = ref();
 const pageChange = ()=>{
    const totalPage = Math.ceil(props.total/props.pageSize);
    if(Number(pageNo.value) > 0 && Number(pageNo.value) <= totalPage){
         emits('CurrentChange',pageNo.value);
    }
 }
 const handleCurrentChange =(page)=>{
    emits('CurrentChange',page);
 }
</script>
<style lang="scss">
.el-pagination{
    .btn-prev,.btn-next{
          border:1px solid #E9ECEF;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            color: #000;
            font-size: 14px;
            align-items: center;
            box-sizing: border-box;
            margin: 0 4px;
            &:hover{
                background: #000;
                .el-icon {
                    color: #fff;
                }
            }
            .el-icon{
                display: flex;
                justify-content: center;
            }
    }
    .el-pager{
        .number{
            border:1px solid #E9ECEF;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            color: #000;
            font-size: 14px;
            align-items: center;
            box-sizing: border-box;
            margin: 0 4px;
            &.is-active{
                background: #000;
                color: #fff;
            }
            &:hover{
                background: #000;
                color: #fff;
            }
        }
    }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

</style>
