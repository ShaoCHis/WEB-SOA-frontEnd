<template>
  <div class="mainContainer">
    <div class="sticky">
      <div><el-button type="text" class="topic">医济达</el-button><br /></div>
      <!-- <div class="other-header"> -->
      <el-menu
        :default-active="activeIndex"
        class="nav"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item> 1234 </el-menu-item>
      </el-menu>

      <el-avatar
        icon="el-icon-user-solid"
        @click.native="getHospitalInfo()"
        :style="avatarHos"
        class="Info"
      ></el-avatar>
      <el-button
        class="el-icon-caret-top sticky"
        style="float: right; margin-right: 20px; margin-top: 400px"
        type="primary"
        circle
        @click="scrollTop"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data: {
    loginTemp: {
      position: "absolute",
      top: "18px",
      right: "5.5%",
    },
    avatarHos: {
      position: "absolute",
      top: "18px",
      right: "2%",
    },
    searchInput: {
      width: "66%",
      top: "3%",
      left: "18%",
      position: "absolute",
    },
    searchBtn: {
      position: "absolute",
      top: "18px",
      right: "12%",
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
</style>