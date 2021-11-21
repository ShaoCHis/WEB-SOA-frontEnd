<template>
  <div>
    <div class="register_container">
      <div class="register_box">
        <div class="tip">
          <h1>注册</h1>
        </div>
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerFormRules"
          class="register_form"
          label-width="100px"
        >
          <el-form-item label="医院名称">
            <el-input style="width: 45%"></el-input>
          </el-form-item>

          <el-form-item label="医院地址">
            <el-input style="width: 45%"></el-input>
          </el-form-item>

          <el-form-item label="医院编码">
            <el-input style="width: 45%"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input style="width: 45%" type="password"></el-input>
          </el-form-item>

           <el-form-item label="确认密码">
            <el-input style="width: 45%" type="password"></el-input>
          </el-form-item>

          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="register">上传申请</el-button>
            <el-button type="info" @click="resetRegisterForm">重置</el-button>
            <el-button type="text" @click="login">已有账号？点此登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        userid: "",
        password: "",
      },

      registerFormRules: {
        userid: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //重置按钮
    resetRegisterForm() {
      // console.log(this)
      this.$refs.registerFormRef.resetFields();
    },
    register() {
       this.$axios.post("http://localhost:8083/apply/info", {
            name:"string",//医院名称
            code:"string",//密码
            contact:"string",//联系方式
            description:"string",//医院简介
            image:"string",//图片
            level:1,//医院等级，int类型
            location:"string",//位置
            status:0,//医院状态（是否激活）
        })
        .then((response) => {
          console.log(1);
          this.$message({
          message: '申请成功！',
          type: 'success'
        });
        this.$router.push("Main");
        })
         .catch((error) => {
          console.log(0);
          
        });
        
      //  if(this.value=="Student") this.$router.push('/mainpage');
      //  if(this.value=="Teacher") this.$router.push('/tmainpage');
      //  if(this.value=="Admin") this.$router.push('/managepage');
    },
    login() {
      this.$router.push({ name: "Login" });
    },
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

.register_container {
  background-color: #5c2c948c;
  background-image: url("../assets/back.jpeg");
  background-size: 100%, 100%;
  height: 100%;
  width: 100%;
  position: fixed;
}

.register_box {
  width: 450px;
  height: 500px;
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
.register_form {
  position: absolute;
  top:20%;  
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.item-props {
  margin-bottom: 0;
}

.item-name {
  color: cornflowerblue;
  font-size: 13px;
  font-weight: bold;
  //text-align: center;
  // padding:10 ;
  top: auto;
  //margin-bottom: 30px;
}

.btns {
  display: flex;
  justify-content: center;
}
</style>