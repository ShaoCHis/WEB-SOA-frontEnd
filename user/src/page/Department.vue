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
              <el-dropdown-item
                icon="el-icon-switch-button"
                @click="goToLoginPage"
              >
                <span @click="goToLoginPage">退出当前用户</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 右侧 -->
        <div class="right-wrapper"></div>
      </div>
    </div>

    <div class="contentContainer">

      <!-- 科室信息卡片 -->
      <div class="label">
        <el-breadcrumb style="font-size:24px;margin-top:10px;margin-bottom:30px;" class="breadcrumb" separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ name:'Main' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ name: 'Hospital' }">医院信息</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ name: 'Department' }">科室信息</el-breadcrumb-item></el-breadcrumb-item>
</el-breadcrumb>
      </div>

      <department-info-card></department-info-card>

      <schedule-choose></schedule-choose>

      <!-- 用户评价 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">患者评价</div>
      </div>
      <el-card style="margin-top: 20px">
        <el-row>
          <el-col :span="4">
            <div class="hospital-image">
              <img
                src="../assets/unknown_user.png"
                style="width: 100px; height: 100px"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <div>满意度:<el-rate v-model="rate"></el-rate></div>
            <div class="hospital-name">疾病： 功能性消化不良</div>
            <div class="hospital-name">感谢主任对我的认真有效的治疗</div>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-row>
          <el-col :span="4">
            <div class="hospital-image">
              <img
                src="../assets/unknown_user.png"
                style="width: 100px; height: 100px"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <div>满意度:<el-rate v-model="rate"></el-rate></div>
            <div class="hospital-name">疾病： 糖尿病</div>
            <div class="hospital-name">一问一答，还算耐心询问</div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <router-view></router-view>

    <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from "../layout/myfooter.vue";
import "@/style/iconfont.css";
import "@/style/app.css";
import "@/style/main.css";
import "@/style/chunk.css";
import HospitalChoose from "../components/DepartmentChoose.vue";
import HomeCarousel from "../components/HomeCarousel.vue";
import DepartmentInfoCard from "../components/DepartmentComponents/DepartmentInfoCard.vue";
import ScheduleChoose from "../components/DepartmentComponents/ScheduleChoose.vue";
export default {
  name: "Department",
  components: {
    myfooter,
    HospitalChoose,
    HomeCarousel,
    DepartmentInfoCard,
    ScheduleChoose,
  },
  data() {
    return {
      avatar: "",
      userName: "",
      userId: "",
      ifLogin: "0", //用户是否已经登录
      id: sessionStorage.getItem("selectedHosID"),
      rate: 5,
    };
  },
  mounted() {
     if (sessionStorage.getItem("userId") != null) {
      this.avatar = sessionStorage.getItem("avatar");
      this.ifLogin = "1";
    } else this.ifLogin = "0";
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    goToMainPage() {
      this.$router.push({ name: "Main" });
    },
    goToInfoPage() {
      this.$router.push({ name: "UserInfo" });
    },
    goToLoginPage() {
      sessionStorage.removeItem("userId");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/hospital.less";
</style>