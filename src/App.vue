<template>
  <router-view />
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./assets/css/main.scss";
@import "./assets/css/color-dark.scss";
.searchForm {
  display: flex;
  row-gap: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
  & > div {
    margin-right: 10px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .query-input {
    width: 200px;
  }
}
.pagination {
  text-align: center;
}
.el-dialog__footer {
  text-align: right;
}
</style>
