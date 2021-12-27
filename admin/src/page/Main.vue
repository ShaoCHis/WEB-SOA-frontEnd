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
          >
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
          <a class="box" v-if="this.form.focus === 'hosList'">
            <router-link to="/HosList">
              <i class="iconfont icon-yiliaojigou"></i><span> 医院列表</span>
            </router-link>
            <br />
          </a>
          <a class="box" v-else>
            <router-link to="/HosList">
              <i
                class="iconfont icon-yiliaojigou"
                @click="
                  () => {
                    this.form.focus = 'hosList';
                  }
                "
              ></i
              ><span> 医院列表</span>
            </router-link>
            <br />
          </a>

          <a class="box" v-if="this.form.focus === 'applyList'">
            <router-link to="/applyList">
              <i class="iconfont icon-yiliaofuwu"></i><span> 申请列表</span>
            </router-link>
            <br />
          </a>
          <a class="box" v-else>
            <router-link to="/applyList">
              <i
                class="iconfont icon-yiliaofuwu"
                @click="
                  () => {
                    this.form.focus = 'applyList';
                  }
                "
              ></i
              ><span> 申请列表</span>
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
          <a @click="exit" href="#" class="box"
            ><i class="iconfont icon-yuanchengchuantou"></i><span>退出</span></a
          >
        </div>

        <!-- 指示信息栏（所有栏目都会显示的信息） -->
        <!-- avatar放logo -->
        <el-main>
          <!-- 选择信息栏，依据展示信息的不同而不同 -->

          <!-- 医院信息 -->

          <el-container class="main">
            <router-view></router-view>
          </el-container>
        </el-main>
      </el-container>

      <!-- 页面底部 -->
      <!-- <footer class="footer">
        请拨打 +021 6895 1732 或 +021 6843 9284 联系我们
      </footer> -->
    </div>
  </div>
</template>

<script>
import "../style/iconfont.css";
import "../style/main.css";
import { hospModifyLogo } from "../api/hospital";

export default {
  name: "Main",
  data() {
    return {
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
      //医院信息
      //hosDataVisible: false, //控制el-card是否显示
      hosData: {
        id: 1,
      },
    };
  },
  mounted() {
    //console.log(this.hosData);
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
      this.hosData = JSON.parse(sessionStorage.getItem("hospital"));
    },
    modifyInfo() {},
    upload(res) {
      //console.log(res);
      hospModifyLogo(sessionStorage.getItem("HospitalID"), res.data)
        .then((response) => {
          if (response.success == true)
            this.$message({ message: "上传成功", type: "success" });
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.hosData.image = res.data;
      sessionStorage.setItem("hospital", JSON.stringify(this.hosData));
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
</style>