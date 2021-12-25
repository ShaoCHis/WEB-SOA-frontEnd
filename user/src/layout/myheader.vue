<template>
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
        <el-button v-show="this.ifLogin==false" class="loginBtn" type="primary" @click="login()">登录/注册</el-button>
        <el-avatar v-show="this.ifLogin==true" size="large" fit="fit" :src="avatar"></el-avatar>
      </div>
      <!-- 右侧 -->
      <div class="right-wrapper"></div>
    </div>
    <!-- 登录弹出层 -->
    <el-dialog
      title=""
      :visible.sync="patientLoginForm"
      style="text-align: left"
      top="50px"
      :append-to-body="true"
      width="500px"
      @close="closeDialog()"
    >
      <el-form :model="loginForm">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="primary" @click="register()">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import "@/style/iconfont.css";
import "@/style/app.css";
import "@/style/main.css";
import "@/style/chunk.css";

export default {
  props:{
    avatar:"",
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      patientLoginForm: false,
      name: "", // 用户登录显示的名称
      flag: true,
      ifLogin:false, //用户是否已经登录
    };
  },
  
  created() {},
  methods: {
      login(){
        this.$router.push({ name: "Login" });
      }
  },
};
</script>


<style scoped>
.thequit {
  cursor: pointer;
}
.search {
  width: 500px;
}
.avatar {
  margin-right: -150px;
}
.loginBtn{
    display: flex;
    position: relative;
}
</style>