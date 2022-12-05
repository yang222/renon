import request from '../utils/request';

export const path = 'https://cocospy.io'


export const Login = (data) => {
    return request({
        url: "/auth/login",
        method: 'post',
        data
    });
}
//获取设备类型
export const DevType = (params) => {
    return request({
        url: "/devtype",
        method: 'get',
        params
    });
}
//获取Plant列表
export const Subusers = (params) => {
    return request({
        url: "/subusers",
        method: 'get',
        params
    });
}
//创建Plant
export const SubusersPost = (data) => {
    return request({
        url: "/subusers",
        method: 'post',
        data
    });
}
//删除Plant
export const subusersDelete = (data) => {
    return request({
        url: "/subusers/batch/delete",
        method: 'post',
        data
    });
}
//编辑Plant
export const editSubUserPlant = (username,data) => {
    return request({
        url: `/subusers/${username}`,
        method: 'put',
        data
    });
}
//查询设备列表
export const Devices = (params) => {
    return request({
        url: "/devices",
        method: 'get',
        params
    });
}
//查询数量
export const  devTypeCount = (params)=> {
    return request({
        url:"/devtype",
        get:"get",
        params:params || {skip:0,limit:5000,descend:true,hideSchema:true}
    })
  }
  
//绑定设备
export const DevicesBind = (data) => {
    return request({
        url: "/devices/bind",
        method: 'PUT',
        data
    });
}
//设备详情
export const deviceDetail = (devId,params) => {
    return request({
        url: `/devices/${devId}`,
        method: 'get',
        params
    });
}
//
export const queryHistory3 = (devId,params) => {
    return request({
        url: `/devices/${devId}/data`,
        method: 'get',
        params
    });
}

//更新设备
export const updateDevDesc = (devid,devtype,data) => {
    return request({
        url: `/devices/${devid}?devtype=${devtype}`,
        method: 'PUT',
        data:data
    });
}
export const getLastData = (devId) => {
    return request({
        url: `devices/batch/lastdata?devtype=HE_BAT`,
        method: 'post',
        data:[{"devid":devId,"devtype":'HE_BAT'}]
    });
}
  
//解绑设备
export const unBindDevice = (data) => {
    return request({
        url: `/devices/unbind`,
        method: 'PUT',
        data
    });
}
//获取所有Alarm
export const getEvents = (params) => {
    return request({
        url: `/multi_devices/events`,
        method: 'get',
        params
    });
}
//如果有devid 时的查询
export const getEventsQuery = (params) => {
    return request({
        url: `/devices/${params.filter.devid}/event`,
        method: 'get',
        params
    });
}

export const getEventsData = (params) => {
    return request({
        url: `/devices/${params.devid}/data`,
        method: 'get',
        params
    });
}

export const packageInfo = (params) => {
    return request({
        url: `/lastPackage`,
        method: 'get',
        params
    });
}
export const MonthResultList = (params) => {
    return request({
        url: `/statistics/result/list`,
        method: 'get',
        params
    });
}

export const Upgrade = (devid,data) => {
    return request({
        url: `/devices/${devid}/commands/Upgrade?devtype=HE_BAT&cmdtype=confirmed`,
        method: 'put',
        data
    });
}
export const UpdataUser = (account,data) => {
    return request({
        url: `/subusers/${account}`,
        method: 'put',
        data
    });
}
export const SetConfig = (devid,devtype,data) => {
    return request({
        url: `/devices/${devid}/commands/set_config?devtype=${devtype}&cmdtype=confirmed`,
        method: 'put',
        data
    });
}
