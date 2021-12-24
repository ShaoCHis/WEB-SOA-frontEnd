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
        <span class="text">智能分诊预约挂号平台</span>
      </div>

      <!-- 导航栏 -->
      <el-menu class="el-menu-demo" mode="horizontal">
        <!-- 智能分诊 -->
        <el-menu-item index="1"><nuxt-link to='/triage'>智能分诊</nuxt-link></el-menu-item>
        <!-- 查看医生信息 -->
        <el-menu-item index="2"><nuxt-link to='/doctorInfo'>医生信息</nuxt-link></el-menu-item>
        <!-- 挂号预约 -->
        <el-submenu index="3">
          <template #title>挂号预约</template>
          <el-menu-item index="3-1"><nuxt-link to='/order'>挂号</nuxt-link></el-menu-item>
          <!-- 查看预约信息 -->
          <el-menu-item index="3-2"><nuxt-link to='/orderInfo'>查看挂号信息</nuxt-link></el-menu-item>
        </el-submenu>
        <!-- 就医反馈 -->
        <!-- <el-menu-item index="4"><nuxt-link to='/advice'>就医反馈</nuxt-link></el-menu-item> -->
        <el-menu-item index="5">  <nuxt-link to='/userInfo'>个人资料</nuxt-link>     </el-menu-item>
        <!-- <el-menu-item index="1">预约处理</el-menu-item>
        <el-menu-item index="2">预约控制</el-menu-item>
        <el-menu-item index="3">预约统计</el-menu-item>
        <el-menu-item index="4">添加预约</el-menu-item> -->
      </el-menu>
      <!-- 右侧 -->
      <div class="right-wrapper">
        <span
          class="v-link clickable"
          @click="patientLoginForm = true"
          v-if="flag"
          >登录/注册</span
        >
        <span class="v-link clickable" v-else>
          当前用户:{{ name }}
          <span @click="quit()" class="thequit">&nbsp; &nbsp; 退出</span>
        </span>
      </div>
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
import '@/style/iconfont.css'
import '@/style/app.css'
import '@/style/main.css'
import '@/style/chunk.css'

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      patientLoginForm: false,
      name: "", // 用户登录显示的名称
      flag: true,
    };
  },

  created() {
  },
  methods: {

  },
};
</script>


<style scoped>
.thequit {
  cursor: pointer;
}
</style>