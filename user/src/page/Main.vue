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
      <div class="carousel-container">
        <div class="home-carousel">
          <el-carousel indicator-position="inside" height="400px">
            <el-carousel-item v-for="item in carousel_list" :key="item.img">
              <img :src="item.img" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <!-- 根据科室选择医院 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">根据科室选择医院</div>
      </div>

      <div class="department-choose">
        <el-tabs type="border-card">
          <el-tab-pane
            v-for="(item, index) in department"
            :key="index"
            :label="item.name"
          >
            <!-- <div class="sort">
              {{ item.name }}
            </div> -->
            <div
              class="department-choose-hospital"
              v-for="(item, index) in currentHospital"
              :key="index"
            >
              <div class="inner-choose">
                <el-divider></el-divider>
                <div class="hospital-image">
                  <img :src="item.image" style="width: 100%; height: 100%" />
                </div>
                <div class="hospital-content">
                  <div class="hospital-name">{{ item.name }}</div>
                  <div class="hospital-level">{{ item.level }}</div>
                </div>
                <div class="enter-hospital">
                  <div class="inner-enter" @click="goToHospitalPage()">
                    <a
                      style="text-decoration: none"
                      href="https://ak.hypergryph.com/index"
                      target="_blank"
                      >选择医院</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :current-page.sync="currentPage"
              layout="total,prev, pager, next, jumper"
              :total="hospital.length"
            >
            </el-pagination>
          </div>
        </el-tabs>
      </div>

      <!-- 医院列表 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">医院列表</div>
      </div>

      <div class="hospital-choose">
        <el-tabs type="border-card">
          <el-tab-pane
            v-for="(item, index) in sortType"
            :key="index"
            :label="item.name"
          >
            <!-- <div class="sort">
              {{ item.name }}
            </div> -->
            <div
              class="department-choose-hospital"
              v-for="(item, index) in currentHospital"
              :key="index"
            >
              <div class="inner-choose">
                <el-divider></el-divider>
                <div class="hospital-image">
                  <img :src="item.image" style="width: 100%; height: 100%" />
                </div>
                <div class="hospital-content">
                  <div class="hospital-name">{{ item.name }}</div>
                  <div class="hospital-level">{{ item.level }}</div>
                </div>
                <div class="enter-hospital">
                  <div class="inner-enter" @click="goToHospitalPage()">
                    <a
                      style="text-decoration: none"
                      href="https://ak.hypergryph.com/index"
                      target="_blank"
                      >选择医院</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :current-page.sync="currentPage"
              layout="total,prev, pager, next, jumper"
              :total="hospital.length"
            >
            </el-pagination>
          </div>
        </el-tabs>
      </div>
    </div>
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

export default {
  components: { myheader, myfooter },
  name: "Main",
  mounted() {
    this.currentHospital = [];
    for (var i = 0; i < this.pageSize; i++) {
      if (this.hospital[this.pageSize * (this.currentPage - 1) + i] != null)
        this.currentHospital[i] =
          this.hospital[this.pageSize * (this.currentPage - 1) + i];
    }
    // console.log(this.currentHospital);
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    goToHospitalPage() {},
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.currentHospital = [];
      for (var i = 0; i < this.pageSize; i++) {
        if (this.hospital[this.pageSize * (this.currentPage - 1) + i] != null)
          this.currentHospital[i] =
            this.hospital[this.pageSize * (this.currentPage - 1) + i];
      }
      console.log(this.currentHospital);
    },
  },
  data() {
    return {
      ifLogin: false, //用户是否已经登录
      sortType: [
        // 筛选方法
        {
          id: "1",
          name: "综合",
        },
        {
          id: "2",
          name: "距离远近",
        },
        {
          id: "3",
          name: "医院等级",
        },
      ],
      carousel_list: [
        {
          id: "1",
          img: require("@/assets/carousel3.jpg"),
        },
        {
          id: "2",
          img: require("@/assets/carousel2.jpg"),
        },
        {
          id: "3",
          img: require("@/assets/carousel1.jpg"),
        },
      ],
      currentHospital: [],
      pageSize: 2,
      currentPage: 1,
      hospital: [
        {
          name: "北京协和医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
        {
          name: "柳州人民医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
        {
          name: "重庆人民医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
        {
          name: "金华人民医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
        {
          name: "南宁人民医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
      ],
      department: [
        {
          name: "外科",
        },
        {
          name: "内科",
        },
        {
          name: "中医科",
        },
        {
          name: "肿瘤科",
        },
        {
          name: "儿科",
        },
      ],
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


