import moment from "moment";
// 标准时间转换成年月日时分秒（补0）
export function getTime(time, bool) {
  let date = new Date(bool ? time : time * 1000);
  let Y = date.getFullYear(),
    M =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1,
    D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
    h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}

export function getUserInfo() {
  if (localStorage.getItem("user_info")) {
    return JSON.parse(localStorage.getItem("user_info"));
  } else {
    return {};
  }
}

export function randomstring() {
  let random_1 = Math.random() + "";
  let e = random_1.charAt(3);
  if (e < 4 || e > 7) {
    e = "5";
  }
  let t = "abcdefghijkmlnopqrstwxyzvu0123456789";
  let a = t.length;
  let n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

let alarmTypeList = [
  ["W1", "单体过压保护", "Single Overvoltage Protection"],
  ["W2", "单体低压保护", "Single low voltage protection"],
  ["W3", "充电过流保护", "Charge overcurrent protection"],
  ["W4", "放电过流保护", "Discharge overcurrent protection"],
  ["F5", "短路保护", "Short circuit protection"],
  ["W6", "电芯充电高温保护", "Battery charging high temperature protection"],
  ["W7", "电芯放电高温保护", "Cell discharge high temperature protection"],
  ["W8", "电芯充电低温保护", "Battery charging low temperature protection"],
  ["W9", "电芯放电低温保护", "Cell discharge low temperature protection"],
  ["W11", "环境温度过高保护", "High ambient temperature protection"],
  ["W12", "压差过大保护", "Overpressure protection"],
  ["F13", "放电电路失效故障", "Discharge circuit failure"],
  ["F14", "充电电路失效故障", "Charge circuit failure"],
  ["F15", "电芯故障", "Cell failure"],
  ["F16", "NTC失校故障", "NTC out-of-school failure"],
  ["F17", "电压采集失校故障", "Voltage acquisition   out-of-calibration fault"],
  ["F18", "霍尔传感器故障", "Hall sensor failure"],
  [
    "F19",
    "外部设备通讯中断故障",
    "External device communication interruption fault",
  ],
  [
    "F20",
    "内部设备通讯中断故障",
    "Internal device communication interruption failure",
  ],
  ["W21", "并机失败保护", "Parallel failure protection"],
  ["W22", "继电器过温保护", "Relay over temperature protection"],
  ["W23", "铜排母线过温保护", "Copper busbar over temperature protection"],
  ["W24", "绝缘过低保护", "Low insulation protection"],
  [
    "F25",
    "屏与设备通讯失联故障",
    "The communication between the screen and the device was lost",
  ],
  ["F26", "微电子故障", "Microelectronics failure"],
  ["W51", "总压过充保护", "Total voltage overcharge protection"],
  ["W52", "总压过放保护", "Total voltage over-discharge protection"],
  ["W53", "环境温度过低保护", "Low ambient temperature protection"],
  ["W54", "MOS温度过高保护", "MOS over temperature protection"],
  ["W55", "MOS温度过低保护", "MOS low temperature protection"],
];

export function alarmCodeToStr(code) {
  let codes = code.split(" ");
  let result = [];

  for (var i = 0; i < codes.length; i++) {
    let find = alarmTypeList.find((item) => {
      return item[0] == codes[i];
    });
    if (find) {
      result.push(find[2]);
    }
  }
  return result.join("、");
}

export function DateToTime(date, type) {
  if (type == "start") {
    return Number.parseInt(date.getTime() / 1000) * 1000;
  } else {
    return Number.parseInt(date.getTime() / 1000 + 1 * 24 * 60 * 60) * 1000;
  }
}

export const getHardware = (data) => {
  // let result = [];
  // if (data["M_R2"]) {
  //   result.push({ type: "M", version: data["M_R2"]["M_hwver"] });
  // }
  // if (data["P1_R2"]) {
  //   result.push({ type: "P", version: data["P1_R2"]["P1_hwver"] });
  // }
  // return result;
  let result = [];
  if (data["Read"]) {
      result.push({type: "E", version: data["Read"]["HwVer"]});
  }
  return result;
};
export const getSoftware = (data) => {
  let result = [];
  // if (data["M_R2"]) {
  //   result.push({ type: "M", version: data["M_R2"]["M_swver"] });
  // }
  // if (data["P1_R2"]) {
  //   result.push({ type: "P", version: data["P1_R2"]["P1_swver"] });
  // }
  // return result;
  if (data["Read"]) {
    result.push({type: "E", version: data["Read"]["SwVer"]});
  }
  return result;
};

export function getRoleId() {
  //
  //
  // return 3
  let loginData = getUserInfo();
  let role = loginData.role;
  if (role === 0) {
    return 1;
  } else if (role !== 6) {
    return null;
  }

  let parents = loginData.parents;
  if (!parents) {
    return null;
  }
  parents = parents.filter((item) => {
    return item != loginData["username"];
  });

  // console.log(parents,"parents")
  let length = parents.length;
  if (length > 3) {
    return 4;
  }
  return length;
}
const getMonthTime = (date) => {
  var tempDate = new Date(date);
  var year = tempDate.getFullYear();
  var month = tempDate.getMonth() + 1;

  var d = new Date(year, month, 1); //取当年当月中的第一天
  var lastDay = new Date(d.getTime() - 1000 * 60 * 60 * 24).getDate(); //获取当月最后一天日期
  if (d.getMonth() < 10) {
    var mon = "0" + d.getMonth();
  } else {
    var mon = d.getMonth();
  }
  var firstDay = d.getFullYear() + "-" + mon + "-" + "0" + d.getDate();
  var lastDay = d.getFullYear() + "-" + mon + "-" + lastDay;

  var json = {};
  json.startDateTime = firstDay;
  json.endDateTime = lastDay;
  return json;
};

export const handleTime = (type, date) => {
  console.log(type, date);
  if (type == "day") {
    const startTime = moment(date).format("YYYY-MM-DD 00:00:00");
    const endTime = moment(date).format("YYYY-MM-DD 23:59:59");
    return {
      startTime: new Date(startTime).getTime() / 1000,
      endTime: new Date(endTime).getTime() / 1000,
    };
  } else if (type == "month") {
    let MonthTime = getMonthTime(date);
    let startTime = moment(new Date(MonthTime.startDateTime)).format(
      "YYYY-MM-DD 00:00:00"
    );
    let endTime = moment(new Date(MonthTime.endDateTime)).format(
      "YYYY-MM-DD 00:00:00"
    );

    //现在时间
    let dd = new Date(
      moment(new Date()).format("YYYY-MM-DD 00:00:00")
    ).getTime();
    //查询月最后一天
    let end = new Date(endTime).getTime();
    let Totalday = (dd - end) / 24 / 60 / 60 / 1000;

    let lastDaty = moment(new Date(MonthTime.endDateTime)).format("DD");
    return {
      Totalday,
      lastDaty,
    };
  } else if (type == "year") {
    const startTime = moment(new Date(date)).format("YYYY-01-01 00:00:00");
    const endTime = moment(new Date(date)).format("YYYY-12-30 23:59:59");
    return {
      startTime: new Date(startTime).getTime() / 1000,
      endTime: new Date(endTime).getTime() / 1000,
    };
  }
};

export const getRoleIdRenon = ()=> {
  //
  //
  // return 3
  let loginData = getUserInfo();
  let role = loginData.role;

  if (role === 0) {
    return 0;
  } else {
    return 1;
  }
}

export function get_last_login_ip() {
  var data = getUserInfo();
  if (data) {
    return data["last_login_ip"];
  }
  return "";
}

export function get_last_login_time() {
  var data = getUserInfo();
  if (data) {
    return moment(new Date(data["last_login_time"] * 1000)).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  }
  return "";
}

export function getParents() {
  // return 3
  let loginData = getUserInfo();
  let role = loginData.role;

  if (role === 6) {
    return loginData.parents;
  } else if (role == 0) {
    return [loginData.username];
  }
  return "";
}

export const UserName = (data) => {
  console.log(data)
  let name = ''
  let role = getRoleId()
  let getRoleIdRenons = getRoleIdRenon();
  try {
    let a = data ? JSON.parse(data) : "";
    if (a) {
      if (role == 1 && getRoleIdRenons == 0) {
        name = a.parent.length != 0 && a.parent.length >= 2
          ? a.parent[getRoleIdRenons + 1]
          : "";
      }

      if (role == 1 && getRoleIdRenons == 1) {
        name = a.parent.length != 0 && a.parent.length >= 3
          ? a.parent[role + 1]
          : "";
      }
      if (role == 2) {
        name = a.parent.length != 0 && a.parent.length >= 4
          ? a.parent[role + 1]
          : "";
      }
      if (role == 3) {
        name = a.parent.length != 0 && a.parent.length >= 5
          ? a.parent[role + 1]
          : "";
      }
    } else {
      return "";
    }
    return name;
  } catch (e) {
    return "";
  }
};
