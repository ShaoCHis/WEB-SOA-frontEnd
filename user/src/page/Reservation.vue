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
        <el-autocomplete
          popper-class="my-autocomplete"
          class="search"
          v-model="searchInput"
          :fetch-suggestions="querySearch"
          placeholder="请输入医院名称"
          @select="handleSelect"
        >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick"
          >
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
            <!-- <span class="addr">{{ item.address }}</span> -->
          </template>
        </el-autocomplete>
        <el-button
          circle
          icon="el-icon-search"
          type="primary"
          @click="goToHospitalPage(searchInput)"
        ></el-button>

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

    <router-view></router-view>

    <myfooter></myfooter>
  </div>
</template>

<script>
import Myfooter from "../layout/myfooter.vue";
import myheader from "../layout/myheader.vue";
import { submitReservation } from "../api/reservation";
import { getHospitalInfoByName } from "../api/hospital";

export default {
  components: { myheader, Myfooter },
  name: "Reservation",
  data() {
    return {
      registerForm: JSON.parse(sessionStorage.getItem("reservationData")),
    };
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
    // 直接跳转到医院页面
    goToHospitalPage(hospitalName) {
      getHospitalInfoByName({ content: hospitalName })
        .then((response) => {
          this.selectSuggest = response.data[0];
          sessionStorage.setItem("selectedHosID", this.selectSuggest.id);
          sessionStorage.setItem("selectedName", this.selectSuggest.name);
          this.$router.push({
            name: "Hospital",
            query: { hosID: this.selectSuggest.id },
          });
          // console.log(this.selectSuggest);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    querySearch(queryString, cb) {
      var searchSuggests = this.searchSuggests;
      var results = queryString
        ? searchSuggests.filter(this.createFilter(queryString))
        : searchSuggests;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (searchSuggest) => {
        return (
          searchSuggest.name
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      this.searchInput = item.name;
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    createOrder() {
      // console.log(this.registerForm);
      submitReservation(
        sessionStorage.getItem("userId"),
        this.registerForm.scheduleID
      )
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
  mounted() {
    this.userId = sessionStorage.getItem("userId");
    this.avatar = sessionStorage.getItem("avatar");
    this.userName = sessionStorage.getItem("userName");
    this.ifLogin = "1";
    getHospitalInfoByName({ content: "医院" })
      .then((response) => {
        this.searchSuggests = response.data;
        // console.log(this.searchSuggests);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/reservation.less";
</style>