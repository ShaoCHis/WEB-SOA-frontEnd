<template>
  <div>
    <div class="register_container">
      <div class="register_box">
        <div class="tip">
          <h1>医院加入申请</h1>
        </div>
        <!-- <el-form
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
          </el-form-item> -->
          <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="auto" class="register_form">
                <!-- 医院名称 -->
                <el-form-item label="医院名称" prop="name" class="item-form">
                    <el-input v-model="registerForm.name"  type="code" ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="code" class="item-form">
                    <el-input v-model="registerForm.code" prefix-icon="el-icon-lock" type="code" ></el-input>
                </el-form-item>
                <!-- 联系方式 -->
                <el-form-item label="联系方式" prop="contact" class="item-form">
                     <el-input v-model="registerForm.contact" prefix-icon="el-icon-lock" type="code" ></el-input>
                </el-form-item>
                <!-- 医院等级 -->
                <el-form-item label="医院等级" prop="role" class="item-form"> 
                   <el-select v-model="registerForm.role" @change="searchSelect(registerForm.role)" placeholder="请选择医院等级"  style="width:100%" prefix>
                      <el-option v-for="item in options" :key="item.role" :label="item.label" :value="item.role">
                      </el-option> 
                  </el-select>  
                </el-form-item> 
               <!-- 按钮区域 -->
                <el-form-item class="btns">
                  <el-button type="primary" @click="register">申请加入</el-button>
                  <el-button type="info" @click="resetRegisterForm">重置</el-button>
                  <el-button type="text" @click="login" >已有账号？点此登录</el-button>
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
        name:"",//医院名称
        code:"",//密码
        contact:"",//联系方式
        description:"",//医院简介
        image:"",//图片
        level:"",//医院等级，int类型
        location:"",//位置
        status:0,//医院状态（是否激活）
        // userid: "",
        // password: "",
      },

       options: [
                {label:"一级甲等", role:1}, {label:"一级乙等", role:2}, {label:"一级丙等", role:3},
                {label:"二级甲等", role:4}, {label:"二级乙等", role:5}, {label:"二级丙等", role:6},
                {label:"三级特等", role:7}, {label:"三级甲等", role:8}, {label:"三级乙等", role:9}, {label:"三级丙等", role:10},
                ], 

      registerFormRules: {
        name: [
          { required: true, message: "请输入医院名称！", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "医院名称不少于3个字符，不多于20个字符！",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入密码！", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在 6 到 15 个字符！",
            trigger: "blur",
          },
        ],
        // userid: [
        //   { required: true, message: "请输入登录账号", trigger: "blur" },
        //   {
        //     min: 5,
        //     max: 10,
        //     message: "长度在 5 到 10 个字符",
        //     trigger: "blur",
        //   },
        // ],
       
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
            name:this.registerForm.name,//医院名称
            code:this.registerForm.code,//密码
            contact:"string",//联系方式
            description:"string",//医院简介
            image:"",//图片
            level:1,//医院等级，int类型
            location:"string",//位置
            status:0,//医院状态（是否激活）
        })
        .then((response) => {
          console.log(1);
          console.log(response.data.success);
          if(response.data.success==true)
          {
          this.$message({
          message: '申请成功！',
          type: 'success'
        });
        this.$router.push("Main");}
        else{
          this.$message({
          message: '申请失败，请重新提交！',
          type: 'error'
          })
        }
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
  // margin-bottom: 30px;
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
  width: 400px;
  height: 450px;
  background-color: #fff;
  border-radius: 25px;
  margin-bottom: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.5);
  
}
.register_form {
  position: absolute;
  top:20%;  
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}

.item-props {
  margin-bottom: 0;
}

.item-form {
    font-weight: bold;
    font-size: 15px;
    bottom:0;
    width: 100%;
    padding:0 15px;
    box-sizing: border-box;
}

//.el-form-item__label: 自动匹配form表单中label的，但需取消scope(注意:中间是连续的两个'_')
.item-form .el-form-item__label{ 
    color: cornflowerblue;
}

.btns {
  display: flex;
  justify-content:center;
  padding:0 15px;
}

</style>