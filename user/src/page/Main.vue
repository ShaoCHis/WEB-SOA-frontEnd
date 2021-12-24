<template>
  <div class="mainContainer">
    <!--导航栏-->
    <div class="header-container">
      <div class="wrapper">
        <!-- logo -->
        <div class="left-wrapper v-link">
          <img
            style="width: 50px"
            width="50"
            height="50"
            src="../../static/images/logo.png"
          />
          <span class="text">医济达预约挂号平台</span>
        </div>

        <!-- 导航栏 -->
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1"
            ><router-link style="text-decoration: none" to="/"
              >首页</router-link
            ></el-menu-item
          >
          <el-menu-item index="2"
            ><router-link style="text-decoration: none" to="/reservation"
              >挂号</router-link
            ></el-menu-item
          >
        </el-menu>
        <el-input class="search" placeholder="请输入医院名称" />
        <el-button circle icon="el-icon-search" type="primary"></el-button>
        <div class="avatar">
          <el-avatar size="large" fit="fit" :src="avatar"></el-avatar>
        </div>
        <!-- 右侧 -->
        <div class="right-wrapper"></div>
      </div>
    </div>
    



    <myfooter></myfooter>
  </div>
</template>

<script>
import "@/style/iconfont.css";
import "@/style/app.css";
import "@/style/main.css";
import "@/style/chunk.css";

import myfooter from "../layout/myfooter.vue";

export default {
  components: { myfooter },
  name: "Main",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
</style>