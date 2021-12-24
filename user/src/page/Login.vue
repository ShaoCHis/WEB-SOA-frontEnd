<template>
  <div id="container" class="container right-panel-active">
    <div id="left" class="container_form container--signup">
        <!-- 注册信息表 -->
        <form action="#" class="form" id="form1">
            <h2 class="form_title">Sign Up</h2>
            <input id="rUser" type="text" placeholder="User" class="input" value=""/>
            <input id="rEmail" type="email" placeholder="Email" class="input" value="" />
            <input id="rPwd" type="text" placeholder="Password" class="input" value=""/>
            <!-- 注册 -->
            <button class="btn" id="realRegister" @click="fun3">Sign Up</button>
        </form>
    </div>

    
    <div id="right" class="container_form container--signin">
        <!-- 登陆信息表 -->
        <form action="#" class="form" id="form2">
            <h2 class="form_title">Sign In</h2>
            <input id="lID" type="text" placeholder="userId" class="input" value="" />
            <input id="lPwd" type="text" placeholder="Password" class="input" value="" />
            <!-- 登录 -->
            <button class="btn" id="realSign" @click="fun3">Sign In</button>
        </form>
    </div>

    <!-- 浮层 -->
    <div class="container_overlay">
        <div class="overlay">
            <div class="overlay_panel overlay--left">
                <button class="btn" id="signIn" @click="fun1">Sign In</button>
            </div>
            <div class="overlay_panel overlay--right">
                <button class="btn" id="signUp" @click="fun2">Sign Up</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import "@/style/css/login.css";
export default {
  name: "Login",
  data() {
    return {
        left:document.getElementById("left"),
        right:document.getElementById("right"),
        
    };
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
  },

  mounted() {
      console.log(left);
      console.log(right);
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
@import "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css";
</style>