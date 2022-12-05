
import { queryHistory3,getLastData,Subusers, Devices,MonthResultList } from "./index"
import { getRoleIdRenon } from "@/utils/data"
import moment from "moment"


export async function queryLastData(devId,devtype) {
    let res = await queryHistory3(devId, {
        limit: 100,
        devid: devId,
        devtype: devtype,
        filter: "{}", descend: true, skip: 0
    });
    let result = {};
    if (res.data) {
      for (let i = 0; i < res.data.length; i++) {
        let item = res.data[i];
        var keys = Object.keys(item);
        for (let j = 0; j < keys.length; j++) {
          if (keys[j].startsWith("M_") || keys[j].startsWith("P") || keys[j].startsWith("E_")) {
            let subDevNo = keys[j].split("_")[0];
            result[subDevNo] = item;
          }
        }
      }
    }
    res = await getLastData(devId);
    if (res && res.data) {
      for (let i = 0; i < res.data.length; i++) {
        let item = res.data[i];
        var keys = Object.keys(item);
        for (let j = 0; j < keys.length; j++) {
          if (keys[j].startsWith("M_") || keys[j].startsWith("P")) {
            let subDevNo = keys[j].split("_")[0];
            result[subDevNo] = item;
          }
  
        }
      }
    }
    return result;
  }


  export async function lastData( devId, fields, devType="HE_BAT", dataType="data"){
    let result =[]
    for(let key in fields){
      result.push(key);
    }
    var res = await queryHistory3(devId,{
        "limit": 1,
        "devid": devId,
        "devtype": devType,
        "datatype": dataType,
        "fields": JSON.stringify(fields),
        "filter": JSON.stringify({[result[0]]: {"\$exists": true}}), "descend": true, "skip": 0
      })
    return res;
  }



  export function SubCount({level,useranme}) {
    let filter={}
    if(getRoleIdRenon()==0){
      
      filter['parent'] = {"$regex": localStorage.getItem("account"), "$options": "i"}
    }else{
     
      filter={"parent":localStorage.getItem("account")};
    }
   
  
    if(useranme){
      filter["username"]=JSON.parse('{"$regex":"'+useranme+'","$options":"i"}')
    }
    return Subusers( {
      aggregation: "count",
      "descend": true,
      filter: JSON.stringify(filter)
    })
  }

  
export function findSelectList(subusers) {
  console.log(subusers,"subusers")
  let fields = {
    "_id": 1,
    "data_extra": 1,
    "desc": 1,
    "devclass": 1,
    "devgroup": 1,
    "devid": 1,
    "devname": 1,
    "devprotocol": 1,
    "devtype": 1,
    "cfg_info": 1,
    "gps": 1,
    "multicast": 1,
    "newfm": 1,
    "offlinetime": 1,
    "onlinetime": 1,
    "owner": 1,
    "registertime": 1,
    "resources": 1,
    "status": 1,
    "uri": 1
  };
  let filter = {"subusers": {"$elemMatch": {"$eq": subusers}}};

  filter["desc"] = {"$regex": subusers, "$options": "i"};
  return Devices({fields: JSON.stringify(fields), filter: JSON.stringify(filter)})
}

export async function totalMonthCharge(params) {
  const { devId,Totalday=0,lastDaty=30} = params
 
  const res = await MonthResultList({
    algorithmId: '637c262416df94002ee731bf', skip: Totalday, limit: lastDaty, exampleId: '637cb20916df94002ee86a35'
  });
  if (res) {
    let list = res.data.list
    let  resultList = {};
    for (var i = 0; i < list.length; i++) {
      let item = {};
      let time = moment(new Date(list[i]["statisticsTime"])).format("YYYY-MM-DD 00:00:00")
      item["statisticsTime"] = list[i]["statisticsTime"];
      item["time"] =moment(new Date(time)).format("MM-DD")
      // console.log(item,'itemitem')
      let  result = list[i]["result"];
      let obj = JSON.parse(result);
      if (obj[devId] == null) {
        item["value"] = 0;
      } else {
        let firstData = obj[devId]["first"][key];
        let lastData = obj[devId]["last"][key];
        item["value"] = lastData - firstData;
      }
      resultList[item["time"]]=item;
    }
    return resultList;
  }
}

//查询导出数据
export async function queryExport(devId, fields, startTime, endTime, limit,devType,dataType='data') {

  var res  = await queryHistory3(devId, {
    limit: limit,
    devid: devId,
    devtype: devType,
    dataType:dataType,
    starttime: Number.parseInt(startTime),
    endtime: Number.parseInt(endTime),
    // fields: JSON.stringify(fields),
    filter: JSON.stringify({[fields]: {"$exists": true}}), descend: true, skip: 0
  })
  if (res && res.data) {
    res.data = res.data.sort((a, b) => {
      return a.time - b.time;
    })
  }
  return res;
}


export async function queryFirstData(devId, fields,{ devType="HE_BAT", dataType="data"}) {
  let result =[]
  for(let key in fields){
    result.push(key);
  }
  //{"E_hv":1,"E_lv":1,"E_lt":1,"E_ht":1,"E_soc":1,"E_cur":1,"E_tv":1,"time":1}
  var res =await  queryHistory3(devId, {
    "limit": 1,
    "devid": devId,
    "datatype": dataType,
    "devtype": devType,
    "descend": true,
    "fields": JSON.stringify({...fields,"time":1}),
    "filter": JSON.stringify({[result[0]]: {"\$exists": true}}), "skip": 0
  });
  // console.log(res,'res["data"][0]1222')
  if(res!=null && res["data"]!=null && res["data"].length>0){
    console.log(res["data"][0],'res["data"][0]')
    return res["data"][0];
  }
  return null;
}

export async function lastDataAllField( devId, { devType="HE_BAT", dataType="data"}) {
  //{"E_hv":1,"E_lv":1,"E_lt":1,"E_ht":1,"E_soc":1,"E_cur":1,"E_tv":1,"time":1}
  var res = await queryHistory3(devId, {
    "limit": 1,
    "devid": devId,
    "devtype": devType,
    "datatype": dataType,
    "filter": JSON.stringify({'E_soc': {"\$exists": true}}), "descend": true, "skip": 0
  });
  if(res!=null &&  res["data"]!=null &&  res["data"].length>0){
    return res["data"][0];
  }
  return {};
}


export async function singleDeviceTotal1(devId) {
  const res = await MonthResultList({
    algorithmId: '637c262416df94002ee731bf', skip: 0, limit: 1, exampleId: '637cb20916df94002ee86a35'
  });
  let item = {};
 
  if (res) {
    let list = res.data.list
    let  resultList = {};
  
    
      let  result = list[0]["result"];
      let obj = JSON.parse(result);
      
    
    
   
    return obj;

   
 
  }
}


export function subusersPlant({useranme="",nickname="",level, skip, limit,isShowParent=true,leve4}) {
  let filter ={}
  if(isShowParent){
    if(getRoleIdRenon()==0){
      filter["parent"] = {"$regex": getUserName(), "$options": "i"};
    }else{
      filter={"parent":getUserName()};
    }
 
  }else{
    filter={"parent":leve4};
  }

 if(level!==undefined){
  filter["parents"]={"$size":level};

 }
  let json= filter;
  if(useranme){
    json["username"]=JSON.parse('{"$regex":"'+useranme+'","$options":"i"}')
  }
  if(nickname){
    json["nickname"]=JSON.parse('{"$regex":"'+nickname+'","$options":"i"}')
  }
  // json["parents"]=getUserName();
  return Subusers({filter: JSON.stringify(json), skip, limit, descend: true});
}