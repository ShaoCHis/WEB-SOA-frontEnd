<template>
  <div class="background">
    <!--登录-->
    <div
      v-if="!loginForm.isLogin"
      id="container"
      class="container right-panel-active"
    >
      <div id="left" class="container_form container--signup">
        <!-- 登录信息 -->
        <form
          :model="loginForm"
          :rules="loginRules"
          action="#"
          class="form"
          id="form1"
        >
          <h2 class="form_title">登录</h2>
          <input
            id="rUser"
            type="text"
            placeholder="Email"
            class="input"
            v-model="loginForm.email"
            porp="email"
          />
          <input
            id="rPwd"
            type="password"
            placeholder="Password"
            class="input"
            v-model="loginForm.password"
            prop="password"
          />
          <input
            id="input_code"
            type="text"
            placeholder="VerifyCode"
            class="input"
            style="width: 40%; margin-left: -60%"
            porp="input_code"
            v-model="loginForm.input_code"
          />
          <s-Identify
            :identifyCode="identifyCode"
            @click.native="refreshCode()"
          ></s-Identify>
          <!-- 登录 -->
          <button class="btn" id="realRegister" @click="Login">Sign Up</button>
          <button type="text" @click="fun3" class="gotoReg">
            没有账号请先注册
          </button>
        </form>
      </div>
    </div>
    <!--注册-->
    <div
      v-if="loginForm.isLogin"
      id="container"
      class="container left-panel-active"
    >
      <div id="right" class="container_form container--signin">
        <!-- 注册信息表 -->
        <form
          :model="registerForm"
          :rules="registerFormRules"
          action="#"
          class="form"
          id="form1"
        >
          <h2 class="form_title">注册</h2>
          <input
            id="rUser"
            type="text"
            placeholder="User"
            class="input"
            v-model="registerForm.name"
          />
          <input
            id="rEmail"
            type="email"
            placeholder="Email"
            class="input"
            v-model="registerForm.email"
          />
          <input
            id="rPwd"
            type="password"
            placeholder="Password"
            class="input"
            v-model="registerForm.password"
          />
          <input
            id="input_code"
            type="text"
            placeholder="Phone"
            class="input"
            v-model="registerForm.phoneNumber"
          />
          <!-- 注册 -->
          <button class="btn" v-show="!this.loginForm.isLogin" id="realRegister" @click="Register">
            Sign in
          </button>
          <button type="text" @click="fun3" class="gotoReg">
            已有账号进行登录
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "@/style/css/login.css";
//导入验证规则和验证码组件
import {
  validdateContact,
  validateNumber,
  isPassword,
  validateEMail,
} from "@/utils/validator";
import SIdentify from "@/components/identify";
import { register,login } from "../api/login";

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
        email: "",
        password: "",
        input_code: "",
        isLogin: false,
      },

      left: document.getElementById("left"),
      right: document.getElementById("right"),

      //登录框输入规则验证
      loginRules: {
        email: [
          { required: true, trigger: "change", validator: validateEMail },
          { required: true, trigger: "blur", validator: validateEMail },
          {
            required: true,
            trigger: "blur",
            min: 1,
            message: "ID不能为空",
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

      registerForm: {
        name: "", //医院名称
        password: "", //密码
        phoneNumber: "", //联系方式
        email: "", //医院等级，int类型
      },
      registerFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "用户名不少于3个字符，不多于20个字符！",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
            min: 1,
          },
        ],
        phoneNumber: [
          {
            required: true,
            validator: validdateContact,
            trigger: "change",
          },
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur",
            min: 1,
          },
        ],
        email: [
          {
            required: true,
            min: 1,
            message: "请输入邮箱",
            trigger: "change",
          },
          {
            required: true,
            min: 1,
            message: "请输入邮箱",
            trigger: "blur",
          },
          { required: true, trigger: "blur", validator: validateEMail },
          { required: true, trigger: "change", validator: validateEMail },
        ],
      },
    };
  },
  //引入验证码组件
  components: {
    "s-Identify": SIdentify,
  },
  methods: {
    fun1() {
      console.log(1);
      this.left.classList.remove("right-panel-active");
      console.log(right);
    },
    fun2() {
      console.log(-1);
      this.right.classList.add("right-panel-active");
      console.log(this.right);
    },
    fun3() {
      this.loginForm.isLogin = !this.loginForm.isLogin;
      //confirm("是否要注册?");
      //   this.$router.push({name: "Main",});
    },
    fun4() {
      confirm("是否要登录?");
      this.$router.push({ name: "Main" });
    },

    //验证验证码是否正确以及账号密码是否为空
    validateInput() {
      if (this.loginForm.email === "") {
        this.$message({
          message: "用户不能为空！",
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
    Login() {
      //this.$router.push({ name: "Main" });
      //return;
      if (!this.validateInput()) {
        return;
      }
      login(this.loginForm.email,this.loginForm.password)
      .then(response=>{
        this.LoginSuccess();
        this.loginForm.isLogin=true
        this.$router.push({ name: "Main" });
      })
      .catch(error=>{
        this.LoginFail();
        console.log(error)
      })
      // //console.log(this.$store.state.user);
      // this.$store
      //   .dispatch("Login", this.loginForm)
      //   .then(() => {
      //     this.LoginSuccess();
      //     this.$router.push({ name: "Main" });
      //     // console.log(1);
      //   })
      //   .catch(() => {
      //     // console.log(2);
      //     //this.LoginFail();
      //     this.LoginFail();
      //   });
    },
    //登录成功提示及跳转
    LoginSuccess() {
      if (
        this.loginForm.email != "" &&
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
      this.$message({
        message: "账号或密码错误，请重新输入！",
        type: "error",
      });
      this.refreshCode();
      this.loginForm.input_code = "";
    },

    judgeInput() {
      if (
        this.registerForm.name == "" ||
        this.registerForm.password == "" ||
        this.registerForm.email == "" ||
        this.registerForm.phoneNumber == ""
      )
        return false;
    },
    Register() {
      if (this.judgeInput() == false) {
        this.$message({
          message: "请输入完整信息",
          type: "error",
        });
        return;
      }
      console.log(this.registerForm);
      register(
        this.registerForm.name,
        this.registerForm.password,
        this.registerForm.password,
        this.registerForm.phoneNumber
      )
        .then((response) => {
          console.log(response.data);
          if (response.success == true) {
            this.$message({
              message: "注册成功,您的用户ID是" + response.data.userId,
              type: "success",
            });
          } else {
            this.$message({
              message: "注册失败，请重新提交！",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(0);
        });
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
    this.refreshCode();
    console.log(left);
    console.log(right);
    const self = this;
    self.dphone = localStorage.user;
    self.dpass = localStorage.password;
    self.identifyCode = "";
    self.makeCode(this.identifyCodes, 4);
    console.log(this.identifyCode);
  },
  created() {
    document.getElementById("left").addEventListener("click", function (e) {
      fun1();
    }),
      document.getElementById("right").addEventListener("click", function (e) {
        fun2();
      });
  },
  update() {},
};
</script>

<style lang="less" scoped>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"; */
@import "../style/css/login.less";
</style>