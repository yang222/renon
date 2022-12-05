<template>
  <div>
    <div class="p-5 bg-white rounded-lg mb-3 flex items-center">
      <div>
        <el-select
            class="w-[200px]"
            v-model="state.devid"
            placeholder="DevId"
            @change="devChange"
            size="large"
        >
            <el-option
            v-for="(item, index) in state.devList"
            :key="index"
            :label="item.devname"
            :value="item.devid"
            />
        </el-select>
        <button
            class="bg-[#000] ml-2 text-white text-sm px-6 rounded-md hover:shadow-xl h-10"
        >
            Search
        </button>
      </div>
      <ul v-if="state.devid" class="bg-[#F6F9FC] rounded-lg p-1 ml-3 flex gap-3">
          <li
            :class="`text-black rounded-lg text-xs font-bold w-[120px] h-p leading-9 text-center cursor-pointer ${
              state.activeType == item.type ? 'bg-white shadow-button2' : 'hover:underline'
            }`"
            v-for="(item, index) in state.navList"
            :key="index"
            @click="typeChange(item)"
          >
            {{ item.title }}
          </li>
        </ul>
    </div>
    <Master ref="masterRef" />
  </div>
</template>
<script setup>
import { reactive ,ref} from "vue";
import { Devices } from "@/api";
import Master from "./components/master.vue"
import { usePermissStore } from "@/store/permiss"

const store = usePermissStore();
const form = reactive({
  name: "",
});
const masterRef = ref();
const navList = [
    {
        title:"Master",
        type:"master",
        typeArr:['ME_AC','ME_DC','HE_BAT','HE_ALLINONE']
    },
     {
        title:"Inverter",
        type:"inverter",
        typeArr:['HE_ALLINONE']
    },
     {
        title:"DCDCIN",
        type:'dcdcin',
        typeArr:['ME_AC','ME_DC']
    },
     {
        title:"DCDCOUT",
        type:'dcdcout',
        typeArr:['ME_DC']
    },
    {
        title:"PCS",
        type:'pcs',
        typeArr:['ME_AC']
    }
  ]
const state = reactive({
  devList: [],
  devid: "",
  activeType:"",
  devInfo:{},
  navList:[]
});
//获取设备列表
const getDevList = () => {
  Devices({
    skip: 0,
    limit: 999,
    filter: {
     desc: { $regex: localStorage.getItem("account"), $options: "i" },
      $or: [
        { parents: localStorage.getItem("account") },
        { subusers: localStorage.getItem("account") },
      ],
    },
  }).then((res) => {
    state.devList = res.data;
    if(store.devInfo.devid){
        navChange(store.devInfo);
    }else{
        navChange(res.data[0]);
    }
    
  });
};
getDevList();
const typeChange = (item)=>{
    state.activeType = item.type;
    masterRef.value.loadData(state.devInfo,state.activeType);
}
const navChange  = (item)=>{
    console.log(item)
    state.devid = item.devid;
    state.devInfo = item;
    state.navList = navList.filter(ele=>ele.typeArr.includes(item.devtype))
    if(state.navList.length){
        state.activeType = state.navList[0].type;
    }
    masterRef.value.loadData(state.devInfo,state.activeType);
}
const devChange = (item)=>{
    console.log(item,'item')
    const obj  = state.devList.find((ele)=>ele.devid == item)

    navChange(obj);
}
</script>
<style lang="scss" scoped></style>
