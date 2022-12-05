<template>
  <el-dialog
    v-model="state.show"
    title="Select Time"
    width="500px"
    @close="Cancel"
    :close-on-click-modal="false"
  >
    <div class="py-8 text-center px-4">
      <el-date-picker
        v-model="state.date"
        type="daterange"
        class="mx-auto"
        value-format="YYYY-MM-DD"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>
    </div>
    <template #footer>
      <span class="dialog-footer w-full flex justify-end">
        <button
          @click="exportFile"
          class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px] rounded-md"
        >
          Confirm
        </button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive } from "vue";
import moment from "moment";
import * as ExcelJs from "exceljs";
import { queryExport } from "@/api/devices";
import {saveAs} from "file-saver"

const state = reactive({
  show: false,
  devid: "",
  devType: "",
  type: "",
  date: [
    moment(new Date()).add(-1, "day").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ],
});
const showModal = (params) => {
  state.devid = params.devId;
  state.devType = params.devType;
  state.type = params.type
  state.show = true;
};
const exportFile = async () => {
  state.show = false;

  //1.创建workbook
  let workbook = new ExcelJs.Workbook();

  //2.给workbook添加worksheet
  let worksheet = workbook.addWorksheet("firstTable");

  let startTime = new Date(
    moment(state.date[1]).format("YYYY-MM-DD") +
      moment(new Date()).format(" HH:mm:ss")
  ).getTime();
  const startDate = moment(moment(state.date[0]).format("YYYY-MM-DD")).format(
    "YYYY-MM-DD"
  );
  const endDate = moment(moment(state.date[1]).format("YYYY-MM-DD")).format(
    "YYYY-MM-DD"
  );
  let day = moment(endDate).diff(startDate, "day");
  const res = await queryExport(
    state.devid,
    state.type,
    (startTime - day * 24 * 60 * 60 * 1000) / 1000,
    startTime / 1000,
    20000,
    state.devType
  );
  if (res.data.length !== 0) {
    let arr = [];
    for (let i in res.data[0]) {
      arr.push({ header: i, key: i, width: 15 });
    }

    worksheet.columns = arr;

    let list = [];
    list = res.data.map((item) => {
      return {
        ...item,
        isodate: moment(new Date(item.isodate)).format("YYYY-MM-DD HH:mm:ss"),
        time: moment(new Date(item.time)).format("YYYY-MM-DD HH:mm:ss"),
      };
    });

    worksheet.addRows(list);

    //设置表头
    let headerRows = worksheet.getRow(1);
    headerRows.height = 32.5;
    headerRows.eachCell((cell) => {
      cell.font = { bold: true }; //表头列字体加粗
      cell.alignment = { vertical: "middle", horizontal: "center" }; //表头列字对齐
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      }; //表头列边框
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "F4F4F4" },
      }; //表头列背景色
    });

    //5.将内存里excel导出本地
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data]);
      saveAs(blob, "RUINUO.xlsx");
    });
    return;
  }
  return ElMessage({
    message: "No data is exported",
    type: "warning",
    showClose: true,
    duration: 2000,
  });
};
defineExpose({
  showModal,
});
</script>
<style lang="scss" scoped></style>
