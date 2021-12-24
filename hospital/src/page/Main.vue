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
        <!-- <div class="other-header"> -->
        <el-avatar
          icon="el-icon-user-solid"
          @click.native="getHospitalInfo()"
          :style="avatarHos"
          class="hosInfo"
        ></el-avatar>
        <el-button
          class="el-icon-caret-top sticky"
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
          <a @click="exit" href="#" class="box"
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
    <el-drawer
      title="医院基本信息"
      class="ivu-drawer-body"
      :visible.sync="hosDataVisible"
      width="100%"
      :before-close="handleCloseHos"
    >
      <!-- 医院头像 -->
      <div>
        <div>
          <img
            class="hosPic"
            :src="hosData.image"
            style="margin-left: 20%; width: 50%; height: 50%; float: center"
          />
        </div>
        <el-button type="primary" style="margin-left: 40%">上传头像</el-button>
      </div>

      <div
        class="ivu-row"
        style="margin-top: 15px; margin-left: 10px; margin-right: -16px"
      >
        <!-- 医院名称 -->
        <div
          class="ivu-col ivu-col-span-12"
          style="padding-left: 16px; padding-right: 16px"
        >
          <div class="ivu-form-item">
            <label>医院名称:</label>
            <div class="ivu-form-item-content">
              <div class="ivu-input-wrapper">
                <el-input
                  autocomplete="off"
                  spellcheck="false"
                  type="text"
                  placeholder="请输入医院名称..."
                  v-model="hosData.name"
                  disabled="disabled"
                  class="el-input"
                >
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <!-- 医院编号 -->
        <div
          class="ivu-col ivu-col-span-12"
          style="padding-left: 16px; padding-right: 16px"
        >
          <div class="ivu-form-item">
            <label>医院编号:</label>
            <div class="ivu-form-item-content">
              <div class="ivu-input-wrapper">
                <el-input
                  autocomplete="off"
                  spellcheck="false"
                  type="text"
                  placeholder="请输入医院编号..."
                  v-model="hosData.id"
                  disabled="disabled"
                  maxlength="11"
                  class="el-input"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <!-- 医院简介 -->
        <div
          class="ivu-col ivu-col-span-12"
          style="padding-left: 16px; padding-right: 16px"
        >
          <div class="ivu-form-item">
            <label>医院简介:</label>
            <div class="ivu-form-item-content">
              <div class="ivu-input-wrapper">
                <el-input
                  autocomplete="false"
                  type="textarea"
                  placeholder="请输入医院简介..."
                  v-model="hosData.introduction"
                  maxlength="30"
                  disabled="disabled"
                  show-word-limit
                  style="margin-bottom: 15px"
                >
                </el-input>
                <el-button type="warning" @click="modifyInfo">修改</el-button>
                <el-button type="primary">确认</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getHospInfo } from "../api/hospital";
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
  mounted() {
    //页面初始化
    //getHospitalInfo();
  },
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
    //医院图标跳转
    getHospitalInfo() {
      this.hosDataVisible = true;
      getHospInfo({
        id: this.hosData.id + "",
      })
        .then((response) => {
          this.hosData = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(-1);
        });
    },
    //医院头像处信息
    handleCloseHos(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
      this.hosDataVisible = false;
    },
    modifyInfo() {},
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
</style>