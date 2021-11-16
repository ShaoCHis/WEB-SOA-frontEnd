<template>
<div>
    <div class="login_container" >
        <div class="login_box">
            <!-- 头像区域 -->
            <!-- <div class="avatar_box">
               <img src="../assets/back.jpg" alt="">
            </div> -->
             <!-- 登录表单 -->
        <div class="part login-part">
          <template
          <!-- <template v-if="status === 'login'"> -->
            <h1>Connectez vous</h1>
            <InputElement
              v-model="email"
              type="email"
              placeholder="Email"
              :error="filtredErrors('email')"
            />
            <InputElement
              v-model="password"
              type="password"
              placeholder="Mot de passe"
              :error="filtredErrors('password')"
              @keydown.enter.native="login()"
            />
            <div class="password">
              <span @click="status = 'reset'">Mot de passe oublié ?</span>
            </div>

            <div class="group">
              <CheckboxElement
                id="remember"
                :checked="remember"
                label="Se souvenir de moi"
              />
              <a class="button green sm" @click="login()">Connexion</a>
            </div>
          </template>
        </div>
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
                     {label:"患者", role:'Patient'},
                     {label:"医院" , role:"Hospital"},
                     {label:"管理员", role:"Admin"}
                     ],  

            loginFormRules:{
                userid:[{required: true, message: '请输入登录账号', trigger: "blur"},
                { min: 4, max: 10, message: '长度在 5 到 10 个字符', trigger: "blur"}],
                password:[{required: true, message: '请输入登录密码', trigger: "blur"},
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
          //  this.$axios
          // //查询是否有该电话
          // .post("/api/Canteen/checkCustomerandAdd",{
          //     "phone": this.username
          // })
          // .then(response=> {
          //   id = response.data;
          //   console.log(id);
          //   //以用户id登录
          //   this.$alert('登录成功！', '提示', {
          //     	confirmButtonText: '确定'
          //     });
          //     this.$router.push({
          //       path:'/Reservation/CustomPage',
          //       name:'CustomPage'
          //     });
          //     sessionStorage.setItem("userID",id);
          //     sessionStorage.setItem("customPageTitle","欢迎来到和平饭店");
          // })

         if(this.value=="Patient") this.$router.push('/mainpage');
         if(this.value=="Hospital") this.$router.push('/hmainpage');
         if(this.value=="Admin") this.$router.push('/managepage');
      },
      register(){
          this.$router.push('/register');
      },
     },
}


</script>

<style lang="less" scoped>
.login_container{
    background-color: #5c2c948c;
    background-image:url('../assets/back.jpeg');
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