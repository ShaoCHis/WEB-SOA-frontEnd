<template>
  <div>
    <div class="login_container">
      <div class="login_box">
        <div class="tip">
          <h1>登录</h1>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          label-width="0px"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="userid">
            <el-input
              v-model="loginForm.userid"
              prefix-icon="el-icon-user"
              placeholder="请输入机构id"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
            <el-button type="text" @click="register"
              >加入我们</el-button
            >
          </el-form-item>

          <!--验证码-->
          <el-form-item>
            <s-Identify :identifyCode="identifyCode"></s-Identify>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validatePhone,isPassword } from "@/utils/validator";
import SIdentify from '@/components/identify'

export default {
  name: "Login",
  data() {
     const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {

      identifyCodes: '1234567890',
      identifyCode: '',//找回密码图形验证码

      loginForm: {
        userid: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "change", validator: validatePhone },
        ],
        password: [
          { required: true, trigger: "change", validator: isPassword },
        ],
      },
      searchSelect(val) {
        console.log(val);
        this.value = val;
        console.log(this.loginForm);
      },
    };
  },

  components: {
    's-Identify': SIdentify,
  },
  watch:{
    identifyCode(v) {
      this.isDebugLogin && (this.loginForm.code = v)
    }
  },

  methods: {
    //重置按钮
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$axios.post("/api/users/session",{
          email:"string",
          password:"string"
        }
      ).then
      (response=>{
          console.log(1)
      })
    },
    register() {
      this.$router.push({
        name: "Register",
      });
    },

    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)     
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ]
      }
    }

  },

  mounted() {
    const self = this
    self.dphone = localStorage.user
    self.dpass = localStorage.password
    self.identifyCode = "";
    self.makeCode(this.identifyCodes, 4);
    console.log(this.identifyCode)
  },
  created() {
    this.refreshCode()
  }

};
</script>

<style lang="less" scoped>
.tip {
  color: cornflowerblue;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.login_container {
  background-color: #5c2c948c;
  background-image: url("../assets/back.jpeg");
  background-size: 100%, 100%;
  height: 100%;
  width: 100%;
  position: fixed;
}

.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 25px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.5);
  .avatar_box {
    height: 110px;
    width: 110px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 2px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}
</style>