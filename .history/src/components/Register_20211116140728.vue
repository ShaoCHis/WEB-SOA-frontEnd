<template>
<div>
    <div class="login_container" >
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
               <img src="../assets/tongji_logo.jpeg" alt="">
            </div>
            <!-- 登录表单 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="userid">
                     <el-input v-model="loginForm.userid" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                     <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"
                     type="password"></el-input>
                </el-form-item>
                <!-- 身份 -->
                <el-form-item prop="role"  > 
                   <el-select v-model="loginForm.role" @change="searchSelect(loginForm.role)" placeholder="请选择权限"  style="width:100%" prefix>
                      <el-option v-for="item in options"
                       :key="item.role"
                       :label="item.label"
                       :value="item.role">
                       </el-option> 
                  </el-select>  
                </el-form-item>
               
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                     <el-button type="primary" @click="login">注册</el-button>
                     <el-button type="info" @click="resetLoginForm">重置</el-button>
                     <el-button type="text" @click="register">已有账号？点此登录</el-button>
                </el-form-item>
            </el-form>
           
        </div>
    </div>
</div>
</template>

<script>
export default {
 
    data(){ 
        return{
         
           loginForm:{
                userid:'',
                password:'',
                role:'',
            },
            options: [
                {label:"学生",role:'Student'},
                     { label:"教师" ,role:"Teacher"},
                     {label:"管理员", role:"Admin"}],  
           
          
            loginFormRules:{
                userid:[{required: true, message: '请输入登录账号', trigger: "blur" },
                { min: 4, max: 10, message: '长度在 5 到 10 个字符', trigger: "blur"}
                ],
                password:[{required: true, message: '请输入登录密码', trigger: "blur" },
                { min: 3, max: 15, message: '长度在 5 到 15 个字符', trigger: "blur"}]
            },
            searchSelect(val){
                console.log(val)
                this.value = val
                console.log(this.loginForm)
            },
    
        };
        
  },
  methods:{
      //重置按钮
      resetLoginForm(){
         // console.log(this)
          this.$refs.loginFormRef.resetFields();
      },
      login(){
         if(this.value=="Student") this.$router.push('/mainpage');
         if(this.value=="Teacher") this.$router.push('/tmainpage');
         if(this.value=="Admin") this.$router.push('/managepage');
      },
      register(){
          this.$router.push('/Login');
      },
  }
      
};

</script>

<style lang="less" scoped>
.login_container{
    background-color: #5c2c948c;
    background-image:url('../assets/tongji.jpeg');
    background-size: 100%,100%;
    height: 100%;
    width: 100%;
    position: fixed;        
}

.login_box{
    width:450px;
    height:340px;
    background-color: #fff;
    border-radius: 25px;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    .avatar_box{
        height:110px;
        width:110px;
        border:1px solid #eee;
        border-radius:50%;
        padding:5px;
        box-shadow:0 0 2px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img{
            width:100%;
            height:100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form{
    position:absolute;
    bottom:0;
    width: 100%;
    padding:0 20px;
    box-sizing: border-box;
    
}
.btns{
   display:flex;
   justify-content: flex-end;
}
</style>