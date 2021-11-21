<template>
  <div>
    <el-container>
      <el-header>
          <el-container>
              
              <div class="tip">
                <h1>济病通 医院端使用平台</h1>
              </div>
              <el-input style="width:50%;margin-left:15px;margin-right:15px;"
              v-model="hospitalName"
              placeholder="请输入....."
            ></el-input>
                <el-button class="btns" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button class="btns" type="primary" @click="login">登录/注册 </el-button>
                <el-avatar icon="el-icon-user-solid" @click.native="showHos()" class="hosInfo"></el-avatar>
          </el-container>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-button type="text" @click="showNotice">发布公告</el-button><br/>
            <el-button type="text" @click="showRoom">查看科室情况</el-button><br/>
            <el-button type="text" @click="showRes">查看预约情况</el-button><br/>
            <el-button type="text" @click="showSuspend">停诊信息</el-button><br/>
            <el-button type="text" @click="showMoney">平台流水</el-button><br/>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 医院信息 -->
            <el-dialog
              title="医院基本信息"
              :visible.sync="hosData.dialogVisible"
              width="40%"
              :before-close="handleCloseHos">
              医院基本信息
            </el-dialog>
            <!-- 发布公告 -->
            <el-card
                title="发布公告"
                v-if="this.hosNotice.dialogVisible"
                width="40%">

                <div style="height:320px;" :data="hosNotice">
                  这里是公告板信息
                </div>
              </el-card>

            <!-- 查看科室情况 -->
            <el-card
                title="科室情况"
                v-if="this.hosRoom.dialogVisible"
                width="40%">

                <div style="height:320px;" :data="hosRoom">
                  这里是科室信息
                </div>
              </el-card>
            <!-- 查看预约情况 -->
            <el-card
              title="查看预约情况"
              v-if="this.hosRes.dialogVisible"
              width="40%">
              <div style="height:320px;" :data="hosRes">
                  查看预约情况
                </div>
            </el-card>
            <!-- 停诊信息 -->
            <el-card
              title="查看停诊情况"
              v-if="this.hosSuspend.dialogVisible"
              width="40%">
              <div style="height:320px;" :data="hosSuspend">
                  查看停诊情况
                </div>
            </el-card>
            <!-- 平台流水 -->
            <el-card
              title="平台流水"
              v-if="this.hosMoney.dialogVisible"
              width="40%">
              <div style="height:320px;" :data="hosMoney">
                  平台流水
                </div>
            </el-card>
          </el-main>
          <el-footer>联系我们</el-footer>
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
      //医院信息
      hosData:{
        dialogVisible:false,  //控制el-card是否显示
        hosName:'',
        hosID:" ",
        hosPhone:" ",
        hosSpecialty:" ",   //医院特长
        hosDate:" ",        //开院日期
      },
      hosNotice:{
        dialogVisible:false,

      },
      hosRoom:{
        dialogVisible:false,

      },
      hosRes:{
        dialogVisible:false,

      },
      hosSuspend:{
        dialogVisible:false,

      },
      hosMoney:{
        dialogVisible:false,

      },
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
    //医院头像处信息
    showHos(){
      this.hosData.dialogVisible=true;
      
    },
    //公告板
    showNotice(){
      this.hosNotice.dialogVisible=true;  //控制el-card是否显示
      this.hosRoom.dialogVisible=false;
      this.hosRes.dialogVisible=false;
      this.hosSuspend.dialogVisible=false;
      this.hosMoney.dialogVisible=false;
    },
    //科室信息
    showRoom(){
      this.hosRoom.dialogVisible=true;
      this.hosNotice.dialogVisible=false;
      this.hosRes.dialogVisible=false;
      this.hosSuspend.dialogVisible=false;
      this.hosMoney.dialogVisible=false;
    },
    //预约信息
    showRes(){
      this.hosRoom.dialogVisible=false;
      this.hosNotice.dialogVisible=false;
      this.hosRes.dialogVisible=true;
      this.hosSuspend.dialogVisible=false;
      this.hosMoney.dialogVisible=false;
    },
    //停诊信息
    showSuspend(){
      this.hosRoom.dialogVisible=false;
      this.hosNotice.dialogVisible=false;
      this.hosRes.dialogVisible=false;
      this.hosSuspend.dialogVisible=true;
      this.hosMoney.dialogVisible=false;
    },
    //平台流水
    showMoney(){
      this.hosRoom.dialogVisible=false;
      this.hosNotice.dialogVisible=false;
      this.hosRes.dialogVisible=false;
      this.hosSuspend.dialogVisible=false;
      this.hosMoney.dialogVisible=true;
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