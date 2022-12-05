<template>
  <el-dialog
    v-model="state.show"
    title="Equipment distribution"
    class="deviceAdd"
    width="800px"
  >
    <div class="tableBox px-4">
      <div class="bg-white rounded-lg mb-4 pt-4 flex flex-wrap gap-3 relative">
        <el-select
          v-model="query.devtype"
          :clearable="true"
          placeholder="Type"
          size="large"
        >
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
        <el-input
          class="!w-[200px]"
          :clearable="true"
          v-model="query.devid"
          placeholder="DevID"
          size="large"
        />
        <el-input
          class="!w-[200px]"
          :clearable="true"
          v-model="query.devname"
          placeholder="DevName"
          size="large"
        />

        <button
          @click="pageChange(1)"
          class="bg-[#000] text-white text-sm px-6 rounded-md hover:shadow-xl h-10"
        >
          Search
        </button>
      </div>
      <el-table
        @selection-change="handleSelectionChange"
        :data="state.tableData"
        size="large"
        ref="multipleTable"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          header-align="center"
          type="selection"
          width="55"
        />
        <el-table-column
          align="center"
          header-align="center"
          prop="index"
          width="60"
          label="No."
        />
        <el-table-column
          align="center"
          header-align="center"
          prop="devid"
          label="DevID"
        />
        <el-table-column
          align="center"
          header-align="center"
          prop="devname"
          label="DevName"
        />
        <el-table-column
          align="center"
          header-align="center"
          prop="devtype"
          label="Type"
        />
      </el-table>
      <div class="pt-10" v-if="state.total">
        <PageSize
          :total="state.total"
          :pageIndex="query.page"
          @CurrentChange="pageChange"
        />
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer w-full flex justify-end">
        <!-- <button
          @click="Cancel"
          class="bg-gray-300 text-black text-sm m h-9 hover:shadow-input w-[97px] rounded-md"
        >
          Cancel
        </button> -->
        <button
          @click="onSubmit"
          class="bg-[#000] text-white text-sm h-9 hover:shadow-input w-[97px] rounded-md"
        >
          Confirm
        </button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, nextTick } from "vue";
import { getParents, getRoleIdRenon } from "@/utils/data";
import { Devices,DevicesBind ,unBindDevice,updateDevDesc } from "@/api";
import { findSelectList } from "@/api/devices";
import PageSize from "@/components/pageSize.vue";

const props = defineProps({
  typeList: {
    type: Array,
    default: [],
  },
});
const multipleTable = ref();

const state = reactive({
  show: false,
  username: "",
  total: 0,
  tableData: [],
  initSelect: [],
  selectList: [],
  initSelectList:[],
});
const query = reactive({
  devid: "",
  devname: "",
  devtype: "",
  page: 1,
});
const pageChange = (page) => {
  query.page = page;
  state.tableData = [];
  state.initSelect = [];
  queryList();
  loadCount();
};
const showModal = async (item) => {
    query.page =1;
    state.tableData = [];
    state.initSelect = [];
  state.show = true;
  state.username = item.username;
  await loadSelect();
  await queryList();
  loadCount();
};
const handleSelectionChange = (val) => {
  state.selectList = val;
};
const queryList = () => {
  let search = {};
  if (query.devid) {
    search.devid = { $regex: query.devid, $options: "i" };
  }
  if (query.devtype) {
    search.devtype = query.devtype;
  }
  if (query.devname) {
    search.devname = query.devname;
  }
  let parents = getParents().length;
  if (parents != 1) {
    search["subusers"] = localStorage.getItem("account");
  }
  if (parents == 1) {
    let level = `\\"level\\":${parents}`;
    search["$or"] = [
      { desc: { $regex: level, $options: "i" } },
      { desc: { $not: { $regex: "level", $options: "i" } } },
      { desc: { $regex: '\\"' + state.username + '\\"', $options: "i" } },
    ];
  } else {
    let level = `\\"level\\":${parents}`;
    search["$or"] = [
      { desc: { $regex: level, $options: "i" } },
      { desc: { $regex: '\\"' + state.username + '\\"', $options: "i" } },
    ];
  }
  Devices({
    skip: (query.page - 1) * 10,
    limit: 10,
    filter: search,
  }).then((res) => {
    const data = res.data.map((item, index) => {
      return {
        ...item,
        index: index + 1 + (query.page - 1) * 10,
      };
    });
    state.tableData = data;
    setTimeout(() => {
      state.initSelectList.forEach((item) => {
        let obj = state.tableData.find((item2) => item2._id == item._id);
        if (obj) {
         state.initSelect.push(obj);
          nextTick(() => {
            multipleTable.value.toggleRowSelection(obj);
          });
        }
      });
    }, 100);
  });
};
const loadCount = () => {
  let search = {};
  if (query.devid) {
    search.devid = { $regex: query.devid, $options: "i" };
  }
  if (query.devtype) {
    search.devtype = query.devtype;
  }
  if (query.devname) {
    search.devname = query.devname;
  }
  let parents = getParents().length;
  if (parents == 1) {
    let level = `\\"level\\":${parents}`;
    search["$or"] = [
      { desc: { $regex: level, $options: "i" } },
      { desc: { $not: { $regex: "level", $options: "i" } } },
      { desc: { $regex: '\\"' + state.username + '\\"', $options: "i" } },
    ];
  } else {
    let level = `\\"level\\":${parents}`;
    search["$or"] = [
      { desc: { $regex: level, $options: "i" } },
      { desc: { $regex: '\\"' + state.username + '\\"', $options: "i" } },
    ];
  }

  if (getRoleIdRenon() != 0) {
    search["subusers"] = localStorage.getItem("account");
  }

  Devices({
    aggregation: "count",
    descend: true,
    filter: search,
  }).then((res) => {
    state.total = res.count;
  });
};
const loadSelect = async () => {
  const res = await findSelectList(state.username);
  state.initSelectList = res.data;
};

const onSubmit = async () => {
  if (state.selectList.length !== 0) {
    let bindList = state.selectList.filter((item) => {
      return (
        state.initSelect.find((item2) => {
          return item._id == item2._id;
        }) === undefined
      );
    });
    console.log(bindList, "bindList", state.initSelect);
    if (bindList.length != 0) {
      const res = await DevicesBind({
        devs: bindList.map((item) => {
          return item._id;
        }),
        subuser:state.username
      }
      );
      if (res) {
        ElMessage({
          message: "distribution success",
          type: "success",
          showClose: true,
          duration: 2000,
          // offset:230
        });
      }
    }

    state.selectList.forEach(async (item) => {
      let desc = {};
      try {
        desc = JSON.parse(item["desc"]);
        desc["test"] = "test";
        delete desc["test"];
      } catch (e) {
        desc = {};
      }

      let parent = getParents();
      parent.push(state.username);
      console.log(parent, desc["level"], 'desc["level"]');
      if (desc["level"] && desc["level"] > parent.length) {
        return;
      }

      desc["parent"] = parent;
      desc["level"] = desc["parent"].length;

      await updateDevDesc(item["devid"], item["devtype"], {
        desc:JSON.stringify(desc)
      });
    });
  }

  //解绑
  let result = [];
  for (let i = 0; i < state.initSelect.length; i++) {
    let isExist = false;
    for (let j = 0; j < state.selectList.length; j++) {
      if (state.initSelect[i]._id === state.selectList[j]._id) {
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      result.push(state.initSelect[i]);
    }
  }
  result.forEach(async (item) => {
    let desc = {};
    try {
      desc = JSON.parse(item["desc"]);
    } catch (e) {}
    let parent = getParents();
    desc["parent"] = parent;
    desc["level"] = desc["parent"].length;
    const res1 = await updateDevDesc(
      item["devid"],
      item["devtype"],
      {
        desc:JSON.stringify(desc)
      }
    );
  });
  const res2 = await unBindDevice({
    devs:result.map((item) => {
      return item._id;
    }),
    subuser:state.username
  } 
  );
  state.show = false;
};
defineExpose({
  showModal,
});
</script>
<style lang="scss"></style>
