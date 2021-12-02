<template>
  <div>
    <div class="login_container">
      <div class="login_box">
        <div class="tip">
          <h1>医院登录</h1>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="user_id">
            <!-- 机构id -->
            <el-input
              v-model="loginForm.user_id"
              prefix-icon="el-icon-user"
              placeholder="请输入机构id"
              v-if="this.loginForm.isCode == false"
            ></el-input>
            <!-- 机构Code -->
            <el-input
              v-model="loginForm.user_id"
              prefix-icon="el-icon-user"
              placeholder="请输入机构code"
              v-if="this.loginForm.isCode == true"
            ></el-input>
            <el-button
              type="text"
              style="
                position: absolute;
                right: 0%;
                font-size: 5px;
                height: 5px;
                bottom: -50%;
              "
              v-if="this.loginForm.isCode == false"
              @click="changeWay"
              ><u>使用code登录</u></el-button
            >
            <el-button
              type="text"
              style="
                position: absolute;
                right: 0%;
                font-size: 5px;
                height: 5px;
                bottom: -50%;
              "
              v-if="this.loginForm.isCode == true"
              @click="changeWay"
              ><u>使用id登录</u></el-button
            >
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

          <!--验证码-->
          <el-form-item prop="input_code" label="验证码">
            <el-input
              style="position: absolute; width: 45%; left: 15%"
              placeholder="请输入验证码"
              v-model="loginForm.input_code"
            >
            </el-input>
            <s-Identify
              :identifyCode="identifyCode"
              @click.native="refreshCode()"
              style="position: absolute; width: 30%; right: 0%"
            ></s-Identify>
          </el-form-item>

          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
            <el-button type="text" @click="register">加入我们</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//导入验证规则和验证码组件
import { validateNumber, isPassword } from "@/utils/validator";
import SIdentify from "@/components/identify";

export default {
  name: "Login",
  data() {
    const validate = (rule, value, callback) => {
      if (this.identifyCode !== value && this.loginForm.input_code !== "") {
        this.loginForm.input_code = "";
        this.refreshCode();
        //callback(new Error("请输入正确的验证码"));
        this.$message({
          message: "请输入正确的验证码！",
          type: "error",
        });
      } else {
        callback();
      }
    };
    return {
      identifyCodes: "1234567890",
      identifyCode: "", //图形验证码

      //登录框，用户id，密码，验证码
      loginForm: {
        user_id: "",
        password: "",
        input_code: "",
        isCode: false,
      },
      //登录框输入规则验证
      loginRules: {
        user_id: [
          { required: true, trigger: "change", validator: validateNumber },
          { required: true, trigger: "blur", validator: validateNumber },
          {
            required: true,
            trigger: "blur",
            min: 1,
            message: "机构ID不能为空",
          },
        ],
        password: [
          { required: true, trigger: "change", validator: isPassword },
          { required: true, trigger: "blur", validator: isPassword },
          { required: true, trigger: "blur", min: 1, message: "密码不能为空" },
        ],
        input_code: [
          { required: true, trigger: "blur", validator: validate },
          {
            required: true,
            trigger: "blur",
            min: 1,
            message: "验证码不能为空",
          },
        ],
      },
    };
  },
  //引入验证码组件
  components: {
    "s-Identify": SIdentify,
  },

  methods: {
    //重置按钮
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    //验证验证码是否正确以及账号密码是否为空
    validateInput() {
      if (this.loginForm.user_id === "") {
        this.$message({
          message: "机构ID或Code不能为空！",
          type: "error",
        });
        this.$router.push({ name: "Login" });
        return false;
      }
      if (this.loginForm.password === "") {
        this.$message({
          message: "密码不能为空！",
          type: "error",
        });
        this.$router.push({ name: "Login" });
        return false;
      }
      if (this.loginForm.input_code === "") {
        this.$message({
          message: "验证码不能为空！",
          type: "error",
        });
        this.$router.push({ name: "Login" });
        return false;
      }
      if (this.identifyCode != this.loginForm.input_code) return false;
      return true;
    },
    //登录
    login() {
      //this.$router.push({ name: "Main" });
      //return;
      if (!this.validateInput()) {
        return;
      }
      //console.log(this.$store.state.user);
      this.$store
        .dispatch("Login", this.loginForm)
        .then(() => {
          this.LoginSuccess();
          //console.log(1);
        })
        .catch(() => {
          //console.log(2);
          //this.LoginFail();
          this.LoginFail()
        })
        
    },
    //登录成功提示及跳转
    LoginSuccess() {
      if (
        this.loginForm.user_id != "" &&
        this.loginForm.password != "" &&
        this.loginForm.input_code != ""
      ) {
        this.$message({
          message: "登录成功！",
          type: "success",
        });
        this.$router.push({ name: "Main", params: { type: 1 } });
      }
    },
    //登录错误提示
    LoginFail() {
      if (this.loginForm.isCode == false)
        this.$message({
          message: "id或密码错误，请重新输入！",
          type: "error",
        });
      else if (this.loginForm.isCode == true)
        this.$message({
          message: "code或密码错误，请重新输入！",
          type: "error",
        });
      this.refreshCode()
      this.loginForm.input_code=""
    },

    //跳转注册
    register() {
      this.$router.push({
        name: "Register",
      });
    },
    //切换登录模式
    changeWay() {
      this.loginForm.isCode = !this.loginForm.isCode;
    },

    //验证码相关
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
  },

  mounted() {
    const self = this;
    self.dphone = localStorage.user;
    self.dpass = localStorage.password;
    self.identifyCode = "";
    self.makeCode(this.identifyCodes, 4);
    console.log(this.identifyCode);
  },
  created() {
    this.refreshCode();
  },
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