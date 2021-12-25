<template>
  <div class="mainContainer">
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
          <el-button
            v-show="this.ifLogin == false"
            class="loginBtn"
            type="primary"
            @click="login()"
            >登录/注册</el-button
          >
          <el-avatar
            v-show="this.ifLogin == true"
            size="large"
            fit="fit"
            :src="avatar"
          ></el-avatar>
        </div>
        <!-- 右侧 -->
        <div class="right-wrapper"></div>
      </div>
    </div>

    <div class="contentContainer">
      
      <!-- 首页走马灯 -->
      <home-carousel></home-carousel>

      <!-- 根据科室选择医院 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">根据科室选择医院</div>
      </div>

      <department-choose></department-choose>

      <!-- 医院列表 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">医院列表</div>
      </div>

      <hospital-choose></hospital-choose>
      
    </div>

    <router-view></router-view>

    <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from "../layout/myfooter.vue";
import myheader from "../layout/myheader.vue";
import "@/style/iconfont.css";
import "@/style/app.css";
import "@/style/main.css";
import "@/style/chunk.css";
import DepartmentChoose from '../components/DepartmentChoose.vue';
import HospitalChoose from '../components/HospitalChoose.vue';
import HomeCarousel from '../components/HomeCarousel.vue'

export default {
  components: { myheader, myfooter, DepartmentChoose, HospitalChoose, HomeCarousel},
  name: "Main",
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
  },
  data() {
    return {
      ifLogin: false, //用户是否已经登录
    };
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
.thequit {
  cursor: pointer;
}
.search {
  width: 500px;
}
.avatar {
  margin-right: -150px;
}
.loginBtn {
  display: flex;
  position: relative;
}
</style>


