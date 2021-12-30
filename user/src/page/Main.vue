<template>
  <div class="mainContainer">
    <div class="header-container">
      <div class="wrapper">
        <!-- logo -->
        <div class="left-wrapper v-link" @click="goToMainPage">
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
        <div class="right" v-show="this.ifLogin == '0'">
          <el-button class="loginBtn" type="primary" @click="login()"
            >登录/注册</el-button
          >
        </div>
        <div class="right" v-show="this.ifLogin == '1'">
          <el-avatar class="avatar" size="large" fit="fit" :src="avatar">
          </el-avatar>
          <el-dropdown
            placement="bottom"
            style="float: right; margin-top: -5px; margin-left: -44px"
            v-show="this.ifLogin == '1'"
          >
            <span class="el-dropdown-link">
              <span>⚪</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-tools" @click="goToInfoPage">
                <!-- <div class="right" @click="goToInfoPage"> -->
                <span style="width: 100px" @click="goToInfoPage">我的</span>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button">
                <span>退出当前用户</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 右侧 -->
        <div class="right-wrapper"></div>
      </div>
    </div>

    <div class="contentContainer">
      <!-- 首页走马灯 -->
      <home-carousel></home-carousel>

      <!-- 医院列表 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">医院列表</div>
      </div>

      <hospital-choose></hospital-choose>

      <!-- 根据科室选择医院 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">根据科室选择医院</div>
      </div>

      <department-choose></department-choose>
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
import DepartmentChoose from "../components/DepartmentChoose.vue";
import HospitalChoose from "../components/HospitalChoose.vue";
import HomeCarousel from "../components/HomeCarousel.vue";

export default {
  components: {
    myheader,
    myfooter,
    DepartmentChoose,
    HospitalChoose,
    HomeCarousel,
  },
  name: "Main",
  mounted() {
    if (sessionStorage.getItem("userId") != null) this.goToMainPage();
    else this.ifLogin = "0";
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    goToMainPage() {
      // this.$router.push({ name: "Main" });
      this.ifLogin = "1";
      sessionStorage.setItem("userId", "1234765400");
      this.userId = sessionStorage.getItem("userId");
      sessionStorage.setItem(
        "avatar",
        "https://s1.ax1x.com/2021/12/10/oo0y0x.jpg"
      );
      this.avatar = sessionStorage.getItem("avatar");
      sessionStorage.setItem("userName", "用户");
      this.userName = sessionStorage.getItem("userName");
      // this.$store
      // console.log(1);
    },
    goToInfoPage() {
      this.$router.push({ name: "UserInfo" });
    },
  },
  data() {
    return {
      avatar: "",
      userName: "",
      userId: "",
      ifLogin: "0", //用户是否已经登录
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
.right {
  margin-right: -150px;
  float: left;
}
.avatar {
  border: 2px solid #d3d9d9;
  &:hover {
    cursor: pointer;
  }
}
.loginBtn {
  display: flex;
  position: relative;
}
.el-dropdown-link {
  font-size: 35px;
  &:hover {
    cursor: pointer;
  }
  opacity: 0;
}
</style>


