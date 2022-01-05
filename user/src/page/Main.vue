<template>
  <div class="mainContainer">
    <div class="header-container">
      <div class="wrapper" style="margin-right:20px;">
        <!-- logo -->
        <div class="left-wrapper v-link" @click="goToMainPage">
          <img
            style="width: 50px;margin-left:60px;"
            width="50"
            height="50"
            src="../../static/images/logo.png"
          />
          <span class="text">医济达预约挂号平台</span>
        </div>

        <!-- 导航栏 -->
        <!-- <div style=""></div> -->
        <!-- <el-menu class="el-menu-demo" mode="horizontal">
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
        </el-menu> -->
        <el-autocomplete
          popper-class="my-autocomplete"
          class="search"
          style="width:58%"
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
import { getHospitalInfoByName } from "../api/hospital";

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
    if (sessionStorage.getItem("userId") != null) {
      this.userId = sessionStorage.getItem("userId");
      sessionStorage.setItem(
        "avatar",
        "https://s1.ax1x.com/2021/12/10/oo0y0x.jpg"
      );
      this.avatar = sessionStorage.getItem("avatar");
      this.userName = sessionStorage.getItem("userName");
      this.ifLogin = "1";
    } else this.ifLogin = "0";
    getHospitalInfoByName({ content: "医院" })
      .then((response) => {
        this.searchSuggests = response.data;
        // console.log(this.searchSuggests);
      })
      .catch((error) => {
        console.log(error);
      });
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
          this.$router.push({ name:"Hospital", query: { hosID: this.selectSuggest.id } });
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
  },
  data() {
    return {
      selectSuggest: [],
      searchSuggests: [],
      searchInput: "",
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
</style>
