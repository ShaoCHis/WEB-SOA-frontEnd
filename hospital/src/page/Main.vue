<template>
  <div>
    <!-- 页面头部 -->
    <!-- <el-container style="height:100px"> -->
    <!-- <el-header > -->
    <!-- <div class="page-header"> -->
    <div class="sticky">
      <div class="topic">
        <el-button type="text" @click="showHospitalInfo" class="topic"
          >医济达</el-button
        ><br />
      </div>
      <!-- <div class="other-header"> -->
      <el-button type="danger" class="searchBtn" @click="exit()" :style="loginTemp"
        >退出登录
      </el-button>
      <el-avatar
        icon="el-icon-user-solid"
        @click.native="getHospitalInfo()"
        :style="avatarHos"
        class="hosInfo"
      ></el-avatar>
        <el-button class="el-icon-caret-top sticky" style="float:right;margin-right:20px;margin-top:400px;" type="primary" @click="scrollTop">返回顶部</el-button>
    </div>

    <!-- 页面内容 -->
    <el-container class="page">
      <el-aside style="height: 60%" width=150px>
        <el-menu>
          <el-menu-item>
            <div v-if="this.form.focus === 'hosNotice'">
              <router-link to="/Notice">
                <el-button
                  type="text"
                  icon="el-icon-caret-right"
                  class="text-css-focus"
                  >医院公告</el-button
                >
              </router-link>
              <br />
            </div>
            <div v-else>
              <router-link to="/Notice"
                ><el-button type="text" @click="showHosNotice()" class="text-css"
                  >医院公告</el-button
                >
              </router-link>
              <br />
            </div>
          </el-menu-item>

          <el-menu-item>
            <div v-if="this.form.focus === 'room'">
              <router-link to="/RoomInfo">
                <el-button
                  type="text"
                  icon="el-icon-caret-right"
                  class="text-css-focus"
                  >科室信息</el-button
                ></router-link
              >
              <br />
            </div>
            <div v-else>
              <router-link to="/RoomInfo"
                ><el-button type="text" @click="showRoom()" class="text-css"
                  >科室信息</el-button
                ></router-link
              >
              <br />
            </div>
          </el-menu-item>

          <el-menu-item>
            <div v-if="this.form.focus === 'res'">
              <router-link to="/ReservationStatus"
                ><el-button
                  type="text"
                  icon="el-icon-caret-right"
                  class="text-css-focus"
                  >预约情况</el-button
                ></router-link
              >
              <br />
            </div>
            <div v-else>
              <router-link to="/ReservationStatus"
                ><el-button type="text" @click="showRes()" class="text-css"
                  >预约情况</el-button
                ></router-link
              >
              <br />
            </div>
          </el-menu-item>

          <el-menu-item>
            <div v-if="this.form.focus === 'suspend'">
              <router-link to="/suspendStatus">
                <el-button
                  type="text"
                  icon="el-icon-caret-right"
                  class="text-css-focus"
                  >停诊信息</el-button
                ></router-link
              >
              <br />
            </div>
            <div v-else>
              <router-link to="/suspendStatus"
                ><el-button type="text" @click="showSuspend()" class="text-css"
                  >停诊信息
                </el-button></router-link
              ><br />
            </div>
          </el-menu-item>

          <el-menu-item>
            <div v-if="this.form.focus === 'money'">
              <router-link to="/MoneyFlow"
                ><el-button
                  type="text"
                  icon="el-icon-caret-right"
                  class="text-css-focus"
                  >平台流水</el-button
                ></router-link
              >
              <br />
            </div>
            <div v-else>
              <router-link to="/MoneyFlow"
                ><el-button type="text" @click="showMoney()" class="text-css"
                  >平台流水</el-button
                ></router-link
              >
              <br />
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 指示信息栏（所有栏目都会显示的信息） -->
      <!-- avatar放logo -->
      <el-main style="left: 0%; width: 90%">       

        <!-- 选择信息栏，依据展示信息的不同而不同 -->

        <!-- 医院信息 -->

        <el-contaniner title="页面内容" >
          <router-view></router-view>
        </el-contaniner>
      </el-main>
      <el-footer>请拨打 +021 6895 1732 或 +021 6843 9284 联系我们</el-footer>
    </el-container>
    
    
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
            :src=hosData.image
            style="margin-left:20%;width: 50%; height: 50%; float: center"
            :fit="fit"
          />
        </div>
        <el-button type="primary" style="margin-left:40%;" @click="uploadImg">上传头像</el-button>
      </div>

      <div class="ivu-row" style="margin-top: 15px; margin-left: 10px; margin-right: -16px">
        <!-- 医院名称 -->
        <div class="ivu-col ivu-col-span-12" style="padding-left: 16px; padding-right: 16px">
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
                <el-button type="primary" @click="confirmInfo">确认</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- 页面底部 -->   
  </div>
</template>

<script>
import {getHospInfo} from "../api/main"
export default {
  name: "Main",
  data() {
    return {
      user_id: this.$route.query.user_id + "",

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
      hosInfo: {
        dialogVisible: true,
        content: "",
      },
      hosRoom: {
        dialogVisible: false,
        name: "",
      },
      hosRes: {
        dialogVisible: false,
      },
      hosSuspend: {
        dialogVisible: false,
      },
      hosMoney: {
        dialogVisible: false,
      },
    };
  },
  mounted() {
    //页面初始化
    pageInit();
    getHospitalInfo();
  },
  methods: {
    uploadImg(){

    },
    scrollTop(){
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
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
            id:this.hosData.id+'',
        })
        .then(response=>{
            this.hosData=response.data;
            console.log(response.data);
        })
        .catch(error=>{
            console.log(-1);
        })
    },
    //查询按钮
    search() {},
    //医院头像处信息
    handleCloseHos(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
      hosDataVisible = false;
    },
    //公告板
    showHosNotice() {
      this.form.focus = "hosNotice";
      this.hosInfo.dialogVisible = true; //控制el-card是否显示
      this.hosRoom.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //科室信息
    showRoom() {
      this.form.focus = "room";
      this.hosRoom.dialogVisible = true;
      this.hosInfo.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //预约信息
    showRes() {
      this.form.focus = "res";
      this.hosRoom.dialogVisible = false;
      this.hosInfo.dialogVisible = false;
      this.hosRes.dialogVisible = true;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //停诊信息
    showSuspend() {
      this.form.focus = "suspend";
      this.hosRoom.dialogVisible = false;
      this.hosInfo.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = true;
      this.hosMoney.dialogVisible = false;
    },
    //平台流水
    showMoney() {
      this.form.focus = "money";
      this.hosRoom.dialogVisible = false;
      this.hosInfo.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = true;
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
div.sticky {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 5px;
  height: 70px;
  background-color: white;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
  // border: 2px solid #4CAF50;
}
.page-header {
  background-color: white;
}

.topic {
  color: cornflowerblue;
  font-size: 42px;
  font-weight: bold;
  text-align: left;
  padding-top: 0.3%;
  padding-left: 1.5%;
  position: inherit;
}
.btns {
  display: flex;
  justify-content: center;
  height: 5%;
}
// .el-header{
//   line-height: 10%;
// }
.avatar-head {
  position: relative;
  margin-top: 2%;
}

.name-head {
  color: cornflowerblue;
  position: relative;
  font-size: 28px;
  font-weight: bold;
  margin-left: 2%;
  position: inherit;
}

.level-head {
  font-size: 16px;
  color: gray;
  position: inherit;
  margin-top: 2.7%;
  margin-left: 2%;
}

.choose-hos {
  color: black;
  position: relative;
  text-align: center;
  width: 100px;
  line-height: 20px;
  font-size: 20px;
  font-weight: bold;
}

.choose-room {
  color: black;
  position: relative;
  text-align: center;
  width: 100px;
  line-height: 20px;
  font-size: 20px;
  font-weight: bold;
}

/* 医院信息弹窗中内容 */
.hosInfo {
  position: fixed;
  font-size: 17px;
  right: 5%;
}
.el-footer {
  // background-color: #ffffffe7;
  color: #333;
  text-align: center;
  // line-height: 30px;
}

.el-aside {
  color: black;
  text-align: center;
  position: fixed;
  margin-top: 5%;
  line-height: 60px;
  font-size: 70px;
}
.search-hospital {
  padding-top: 1%;
}
.el-main {
  padding-top: 5%;
  margin-left: 17%;
  margin-right: 7%;
  color: #333;
  text-align: center;
  position: relative;
}
.el-input {
  width: 50%;
  margin-top: 15px;
  margin-bottom: 15px;
}

.text-css {
  font-size: 20px;
  color: black;
}

.text-css-focus {
  font-size: 20px;
  color: cornflowerblue;
  font-weight: bold;
}
.ivu-row {
  flex-flow: row wrap;
}
.ivu-col-span-12 {
  display: block;
  flex: 0 0 50%;
  max-width: 50%;
}
.ivu-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;
}
.ivu-form-item {
  margin-bottom: 24px;
  vertical-align: top;
  zoom: 1;
}
.ivu-form-item-content {
  position: relative;
  line-height: 32px;
  font-size: 14px;
}
.ivu-input-wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
  line-height: normal;
}
.ivu-drawer-body {
  width: 100%;
  height: 100%;
  padding: 16px;
  font-size: 20px;
  line-height: 1.5;
  word-wrap: break-word;
  position: flex;
  overflow: auto;
}
</style>