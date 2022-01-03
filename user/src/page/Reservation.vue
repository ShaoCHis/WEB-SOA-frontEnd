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
      <!-- 科室列表 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">确认订单</div>
      </div>
      <!-- 预约确认界面先放这里了，后面再移到component里 -->
      <el-card>
        <div class="hospital-location">
          医院名称：{{ this.registerForm.hospitalName }}
        </div>
        <div class="hospital-location">
          科室名称：{{ this.registerForm.department }}
        </div>
        <div class="hospital-location">
          医生：{{ this.registerForm.doctor }}
        </div>
        <el-divider></el-divider>
        <div class="hospital-location">
          就诊时间：{{ this.registerForm.date }}&nbsp;{{
            this.registerForm.time
          }}
        </div>
        <div class="hospital-location">
          挂号费用：{{ this.registerForm.money }}
        </div>
        <div class="hospital-location">
          就诊人姓名：{{ this.registerForm.userName }}
        </div>
        <el-button
          style="margin-top: 30px"
          type="primary"
          @click="createOrder()"
          >提交待支付订单</el-button
        >
      </el-card>
    </div>
    <myfooter></myfooter>
  </div>
</template>

<script>
import Myfooter from "../layout/myfooter.vue";
import myheader from "../layout/myheader.vue";
import { submitReservation } from "../api/reservation";
export default {
  components: { myheader, Myfooter },
  name: "Reservation",
  data() {
    return {
      registerForm: {
        // 先前步骤已经确定的信息
        hospital: 1692369831,
        hospitalName: "上海交通大学医学院附属瑞金医院北院",
        department: "眼科",
        doctor: "Lisa",
        date: "2021-12-29",
        time: "10:00:00",
        money: "56",
        userId: sessionStorage.getItem("userId"), //1234765400
        userName: "hikazuri",
        // 预约步骤需要填写的信息
        date: "2021-12-30",
        startTime: "13:00:00",
        endTime: "17:00:00",
        reservedNumber: 43,
        availableNumber: 34,
        scheduleID: 158,
      },
    };
  },
  methods: {
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
    createOrder() {
      submitReservation(this.userId, this.scheduleID)
        .then((response) => {
          console.log(response.data);
          this.$message({
            message: "预约生成成功!您可以在个人信息界面查看待支付的订单...",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            message: "预约生成成功!您可在个人信息界面查看订单...",
            type: "success",
          });
        });
      this.$router.push({ name: "UserInfo" });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@import "../style/css/reservation.less";
</style>