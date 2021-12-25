<template>
    <div class="background">
        <div id="container" class="container right-panel-active">
            <div id="left" class="container_form container--signup">
                <!-- 注册信息表 -->
                <form action="#" class="form" id="form1">
                    <h2 class="form_title">Sign Up</h2>
                    <input id="rUser" type="text" placeholder="User" class="input" value=""/>
                    <input id="rEmail" type="email" placeholder="Email" class="input" value="" />
                    <input id="rPwd" type="text" placeholder="Password" class="input" value=""/>
                    <input id="input_code" type="text" placeholder="VerifyCode" class="input" style="width:40%;margin-left:-60%;" value="" />
                    <s-Identify
                    :identifyCode="identifyCode"
                    @click.native="refreshCode()"
                    style="position: absolute; width: 30%; right: 0%;"
                    ></s-Identify>
                    <!-- 注册 -->
                    <button class="btn" id="realRegister" @click="fun3">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import "@/style/css/login.css";
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
        
        left:document.getElementById("left"),
        right:document.getElementById("right"),
        
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
      fun1(){
          console.log(1);
          this.left.classList.remove("right-panel-active");
          console.log(right);
      },
      fun2(){
          console.log(-1);
          this.right.classList.add("right-panel-active");
          console.log(this.right);
      },
      fun3(){
          confirm("是否要注册?");
        //   this.$router.push({name: "Main",});
      },
      fun4(){
          confirm("是否要登录?");
          this.$router.push({name: "Main",});
      },

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
            this.LoginFail();
            });
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
        this.refreshCode();
        this.loginForm.input_code = "";
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
      document.getElementById("left").addEventListener("click",function(e){
          fun1();
      }),
      document.getElementById("right").addEventListener("click",function(e){
          fun2();
      })
  },
  update(){
  }
};
</script>

<style lang="css">
/* @import "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"; */
</style>