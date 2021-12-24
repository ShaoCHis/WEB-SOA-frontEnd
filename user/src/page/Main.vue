<template>
  <div>
    <div class="background">
      <!-- 页面头部 -->
      <!-- <el-container style="height:100px"> -->
      <!-- <el-header > -->
      <!-- <div class="page-header"> -->
      <div class="sticky">
        <div>
          <el-button type="text" @click="showHospitalInfo()" class="topic"
            >医济达</el-button
          ><br />
        </div>

        <div  class="NavMenu">
          <!--导航栏-->
          <el-menu
            :default-active="activeIndex"          
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">处理中心</el-menu-item>
          </el-menu>
        </div>

        <!-- <div class="other-header"> -->
        <el-button
          type="danger"
          class="searchBtn"
          @click="exit()"
          :style="loginTemp"
          >退出登录
        </el-button>
        <el-avatar
          icon="el-icon-user-solid"
          :style="avatarHos"
          class="avatar"
        ></el-avatar>
        <el-button
          class="sticky"
          style="float: right; margin-right: 20px; margin-top: 400px"
          type="primary"
          circle
          @click="scrollTop"
        ></el-button>
      </div>

      <!-- 页面内容 -->
      <el-container class="page">
        <div class="shell">
          <!-- <a href="#" class="box"><i class="iconfont icon-liebiao"></i><span>医院公告</span></a> -->
          <a class="box" v-if="this.form.focus === 'hosNotice'">
            <router-link to="/Notice">
              <i class="iconfont icon-yiliaojigou"></i><span> 医院公告</span>
            </router-link>
            <br />
          </a>
          <a class="box" v-else>
            <router-link to="/Notice">
              <i
                class="iconfont icon-yiliaojigou"
                @click="
                  () => {
                    this.form.focus = 'hosNotice';
                  }
                "
              ></i
              ><span> 医院公告</span>
            </router-link>
            <br />
          </a>

          <a class="box" v-if="this.form.focus === 'room'">
            <router-link to="/RoomInfo">
              <i class="iconfont icon-yiliaofuwu"></i><span> 科室信息</span>
            </router-link>
            <br />
          </a>
          <a class="box" v-else>
            <router-link to="/RoomInfo">
              <i
                class="iconfont icon-yiliaofuwu"
                @click="
                  () => {
                    this.form.focus = 'room';
                  }
                "
              ></i
              ><span> 科室信息</span>
            </router-link>
            <br />
          </a>
          <!-- <a href="#" class="box"><i class="iconfont icon-cangku"></i><span> 科室信息</span></a> -->
          <a class="box" v-if="this.form.focus === 'res'">
            <router-link to="/ReservationStatus">
              <i class="iconfont icon-dingdan"></i><span> 预约情况</span>
            </router-link>
            <br />
          </a>
          <a class="box" v-else>
            <router-link to="/ReservationStatus">
              <i
                class="iconfont icon-dingdan"
                @click="
                  () => {
                    this.form.focus = 'res';
                  }
                "
              ></i
              ><span> 预约情况</span>
            </router-link>
            <br />
          </a>
          <!-- <a href="#" class="box"><i class="iconfont icon-zhuti_tiaosepan"></i><span>预约信息</span></a> -->
          <a class="box" v-if="this.form.focus === 'suspend'">
            <router-link to="/suspendStatus">
              <i class="iconfont icon-shujujianguan"></i><span> 停诊信息</span>
            </router-link>
            <br />
          </a>
          <a class="box" v-else>
            <router-link to="/suspendStatus">
              <i
                class="iconfont icon-shujujianguan"
                @click="
                  () => {
                    this.form.focus = 'suspend';
                  }
                "
              ></i
              ><span> 停诊信息</span>
            </router-link>
            <br />
          </a>
          <!-- <a href="#" class="box"><i class="iconfont icon-qianbao"></i><span>停诊信息</span></a> -->
          <a class="box" v-if="this.form.focus === 'money'">
            <router-link to="/MoneyFlow">
              <i class="iconfont icon-renminbi"></i><span> 平台流水</span>
            </router-link>
            <br />
          </a>
          <a class="box" v-else>
            <router-link to="/MoneyFlow">
              <i
                class="iconfont icon-renminbi"
                @click="
                  () => {
                    this.form.focus = 'money';
                  }
                "
              ></i
              ><span> 平台流水</span>
            </router-link>
            <br />
          </a>
          <!-- <a href="#" class="box"><i class="iconfont icon-tupian"></i><span>平台流水</span></a> -->
          <a href="#" class="box"
            ><i class="iconfont icon-erweima"></i><span>QR code</span></a
          >
          <a href="#" class="box"
            ><i class="iconfont icon-guanli"></i><span>管理</span></a
          >
          <a href="#" class="box"
            ><i class="iconfont icon-yuanchengchuantou"></i><span>退出</span></a
          >
        </div>

        <!-- 指示信息栏（所有栏目都会显示的信息） -->
        <!-- avatar放logo -->
        <el-main style="left: 0%; width: 90%">
          <!-- 选择信息栏，依据展示信息的不同而不同 -->

          <!-- 医院信息 -->

          <el-container title="页面内容">
            <router-view></router-view>
          </el-container>
        </el-main>
      </el-container>

      <!-- 页面底部 -->
      <footer class="footer">
        请拨打 +021 6895 1732 或 +021 6843 9284 联系我们
      </footer>
    </div>
  </div>
</template>

<script>
import "../style/iconfont.css";
import "../style/css/main.css";

export default {
  name: "Main",
  data() {
    return {
      resData: [],

      user_id: this.$route.query.type + "",
      temp_id: "1",

      form: { focus: "hosNotice" },

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
      hospitalName: "",
      //医院信息
      hosDataVisible: false, //控制el-card是否显示
      hosData: {
        id: 1,
      },
    };
  },
  mounted() {},
  methods: {
    scrollTop() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    },
    register() {
      this.$router.push({
        name: "Register",
      });
    },
    exit() {
      this.$store.dispatch("LogOut");
      this.$router.push({ name: "Login" });
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less">
@import "../style/css/main.less";
</style>