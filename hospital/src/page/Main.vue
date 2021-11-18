<template>
  <div>
    <el-container>
      <el-header>
          <el-container>
              
              <div class="tip">
                <h1>济病通 预约挂号统一平台</h1>
              </div>
              <el-input style="width:50%;margin-left:15px;margin-right:15px;"
              v-model="hospitalName"
              placeholder="请输入医院名称"
            ></el-input>
                <el-button class="btns" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button class="btns" type="primary" @click="login">登录/注册 </el-button>
          </el-container>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu>
                <el-submenu index="00">
                    <template slot="title">
                    <span>预约挂号</span>
                    </template>
                </el-submenu>
                <el-submenu index="01">
                    <template slot="title">
                    <span>医院详情</span>
                    </template>
                </el-submenu>
                <el-submenu index="02">
                    <template slot="title">
                    <span>预约须知</span>
                    </template>
                </el-submenu>
                <el-submenu index="03">
                    <template slot="title">
                    <span>停诊信息</span>
                    </template>
                </el-submenu>
                <el-submenu index="04">
                    <template slot="title">
                    <span>查询/取消</span>
                    </template>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
          <el-main>北京协和医院 </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
        hospitalName:'',
    };
  },
  methods:{
    register(){
        this.$router.push({
        name: "Register",
      });
    },
    login(){
          this.$router.push({name:'Login'})
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
}
.btns {
  display: flex;
  justify-content: center;
  margin-bottom:45px;
}
.el-header,
.el-footer {
  background-color: #ffffffe7;
  color: #333;
  text-align: center;
  line-height: 30px;
}

.el-aside {
  background-color: #ffffffe7;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffffe7;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>