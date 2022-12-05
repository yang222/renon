<template>
    <div class="">
        <div class="bg-white rounded-lg py-6 px-8 flex flex-wrap gap-3">
            <!-- <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevID" size="large" />
            <span class="mx-1 text-base text-gray-400 flex items-center">-</span>
             <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevName" size="large" />
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="DevName" size="large" />
            <el-input class="!w-[200px]" v-model="query.deviceId" placeholder="Please Input Name" size="large" /> -->
            <el-select v-model="query.devid"  @change="devChange" :clearable="true" placeholder="DevId" size="large">
                <el-option
                v-for="(item,index) in state.devList"
                :key="index"
                :label="item.devname"
                :value="item.devid"
                />
            </el-select>
            <el-date-picker
                v-model="query.dateTime"
                :clearable="true"
                type="date"
                placeholder="Alarm Date"
                size="large"
            />
            <button @click="handleSearch" class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10">Search</button>
        </div>
        <div class="bg-white p-6 rounded-lg mt-4">
            <el-table  :data="state.alarmList" size="large" :stripe="false" style="width: 100%">
                <el-table-column align="center" header-align="center" prop="index" label="No." />
                <el-table-column align="center" header-align="center" prop="devid" label="DevID">
                    <template #default="scope">
                        <span @click="handleClickAlarm(scope.row)" style="display: inline-block; color:#56C271;cursor: pointer;">{{scope.row.devid}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"  label="DevName" prop="devName">
                     <template #default="scope">
                       {{scope.row.detail?scope.row.detail.devname:''}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="User" width="120">
              
                    <template #default="scope">
                    <div >
                    {{UserName(scope.row.detail.desc)}}
                    </div>
                </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" prop="subemail" label="Hardware" >
                     <template #default="scope">
                        <div v-for="(item,index) in getHardware(scope.row.detail)" :key="index">
                            {{item["type"]+":"+item["version"]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" prop="subemail" label="Software" >
                     <template #default="scope">
                        <div v-for="(item,index) in getSoftware(scope.row.detail)" :key="index">
                            {{item["type"]+":"+item["version"]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" prop="devType" label="Type" />
                <el-table-column align="center" header-align="center" prop="time" label="Alarm Data" />
                <el-table-column align="center" header-align="center" prop="alarmType" label="Description" width="200" />
                
            </el-table>
            <div class="pt-10" v-if="state.count">
                <PageSize :total="state.count" :pageIndex="query.page" @CurrentChange="pageChange"/>
            </div>
        </div>
        <el-dialog
            v-model="showDialog"
            title="Alarm"
            width="600px"
            :close-on-click-modal="false"
        >
          
             <div class="p-6" style="margin-top: 0px;width: 100%;overflow-y: auto;">
                <el-table :data="state.alarmData"
                    element-loading-text="拼命加载中"  
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    <el-table-column v-for="(item,index) in state.headList" :key="index" align="center" :label="item" :prop="index"></el-table-column>
                    
                </el-table>
                
                </div>
        </el-dialog>
        
    </div>
</template>
<script setup>
import { reactive,ref } from "vue";
import PageSize from "@/components/pageSize.vue"
import { Devices,getEvents,getEventsQuery,getEventsData } from "@/api"
import { getTime,alarmCodeToStr,DateToTime,getHardware,getSoftware,UserName} from "@/utils/data"
import { ElMessage } from "element-plus";
import moment from "moment"
import { usePermissStore } from "@/store/permiss"

const store = usePermissStore();


const query = reactive({
    devid:store.devInfo.devid?store.devInfo.devid:"",
    dateTime:"",
    page:1,
    devInfo:store.devInfo.devid?store.devInfo:{},
})
const showDialog = ref(false)
const state = reactive({
    devList:[],
    count:0,
    alarmList:[],
    alarmData:[],
    headList:[],
})
const pageChange = (page)=>{
    query.page = page
    getEventsList();
}
const devChange = (item)=>{
    console.log(item)
    const obj = state.devList.find((ele)=>ele.devid == item);
    console.log(obj)
    query.devid = item;
    query.devInfo = obj;
}
//获取设备列表
const getDevList = ()=>{
    Devices({
        skip:0,
        limit:999,
        filter:{"devid":{"$regex":"","$options":"i"},"$or":[{"parents":localStorage.getItem("account")},{"subusers":localStorage.getItem("account")}]}
    }).then(res=>{
        state.devList = res.data;
        getEventsList();
    })
}
getDevList();

const middleStr = (str, start, end) => {
  let i = str.indexOf(start) + start.length
  let res = str.substring(i, str.indexOf(end, i)).trim();
  return res;
}

//获取events 列表
const getEventsList = ()=>{
    const params = {
        skip:(query.page-1)*10,
        limit:10,
        descend: true,
        filter:{"eventtype":"log","$and":[{"level":1}]}
    }
    if(query.devid){
        params['devid'] = query.devid;
        params['devtype'] = query.devInfo.devtype ;
        params.filter['devid'] = query.devid;
    }
    if(query.dateTime){
        params.filter['time'] = {"$gt":DateToTime(query.dateTime,'start'),"$lt":DateToTime(query.dateTime,'end')};
    }
    if(query.devid){
        getEventsQuery(params).then(res=>{
            for (let i = 0; i < res.data.length; i++) {
                res.data[i]["index"] = (query.page-1)*10+i+1;
                res.data[i]["devType"] = res.data[i].info.split(":")[0]
                res.data[i]["time"] = moment(res.data[i].time).format("YYYY-MM-DD HH:mm:ss")
                      const alarmType = middleStr(res.data[i].info, 'Log:', ';').trim();
                res.data[i]["alarmType"] = alarmCodeToStr(alarmType)
                    res.data[i]["detail"] = state.devList.find((item)=>item.devid == res.data[i].devid)
            }
            state.alarmList = res.data;
        })
    }else{
        getEvents(params).then(res=>{
         for (let i = 0; i < res.data.length; i++) {
                res.data[i]["index"] = (query.page-1)*10+i+1;
                res.data[i]["devType"] = res.data[i].info.split(":")[0]
                res.data[i]["time"] = moment(res.data[i].time).format("YYYY-MM-DD HH:mm:ss")
                const alarmType = middleStr(res.data[i].info, 'Log:', ';').trim();
                res.data[i]["alarmType"] = alarmCodeToStr(alarmType)
                res.data[i]["detail"] = state.devList.find((item)=>item.devid == res.data[i].devid)
            }
            state.alarmList = res.data;
        })
    }
    console.log(state.alarmList,'alarmList')

    
}


//获取events 数量
const getEventsCount = ()=>{
   
    let params = {
        aggregation:'count',
        filter:{
            "eventtype":"log"
        }
    }
    if(query.devid){
        params.filter['devid'] = query.devid;
        params['devtype'] = query.devInfo.devtype;
        params.filter['devtype'] = query.devInfo.devtype;
    }
    // {"devtype":"HE_BAT","eventtype":"log","devid":"JYHtest01","$and":[{"level":1}]}
    if(query.dateTime){
        params.filter['time'] = {"$gt":DateToTime(query.dateTime,'start'),"$lt":DateToTime(query.dateTime,'end')};
    }
    params.filter["$and"] = [{"level":1}]
    if(query.devid){
         getEventsQuery(params).then(res=>{
            state.count = res.count;
        })
    }else{
        getEvents(params).then(res=>{
            state.count = res.count;
        })
    }
}
getEventsCount();

const loading = ref(false)
//处理点击事件
const handleClickAlarm=(row)=>{
    showDialog.value = true;
    loading.value = true;
    let startTime= new Date(row.time).getTime()- 0.3 * 60 * 60 * 1000
    let endTime= new Date(row.time).getTime()+0.3 * 60 * 60 * 1000;
    let devType=row.devType
    let m=''
    if(devType=='MASTER'){
        m='M_hvloc'
    }
    if(devType=='PACK'){
        m='P1_mostemp'
    }
    if(devType=='EMSBAT'){
        m='E_hvloc'
    }
    getEventsData({
        devid:row.devid,
        starttime:startTime,
        endtime:endTime,
        devtype: row.devtype,
        limit:20000,
        dataType:"data",
        filter: JSON.stringify({[m]: {"$exists": true}}),
        descend: true, skip: 0

    }).then(res=>{
        if(res.data.length!==0){
            state.alarmData = res.data.map(item => {
                    return  {...item,isodate:moment(new Date(item.isodate)).format("YYYY-MM-DD HH:mm:ss"),time: moment(new Date(item.time)).format("YYYY-MM-DD HH:mm:ss")}
                });
                for(let i in  res.data[0]){
                    state.headList[i]=i    
                }
                    
              }else{
                  ElMessage.warning("No data is exported")
              }

    })
}


const handleSearch = ()=>{
    query.page =1;
    getEventsList();
    getEventsCount();
}

</script>
<style lang="scss" scoped>

</style>