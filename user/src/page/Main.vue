<template>
  <div class="mainContainer">
    <div class="header">
    <el-button type="text" class="topic">医济达</el-button><br />
    <!--导航栏-->
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      class="nav"
      @select="handleSelect"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
    </el-menu>
    </div>
    </div>
</template>

<script>
export default {
  name: "Main",
  data: {},
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
</style>