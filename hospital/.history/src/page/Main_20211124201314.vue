<template>
  <div>
    <el-container>

      <el-header>
        <el-container class="Main">
          <div class="topic">
            <el-button type="text" @click="showHospitalInfo" class="topic">济病通 医院端</el-button><br />
            <!-- <h1>济病通 医院端</h1> -->
          </div>
          <el-input
            class="search-hospital"
            :style="searchInput"
            v-model="hospitalName"
            placeholder="请输入....."
          ></el-input>
          <el-button
            @click="search()"
            type="primary"
            icon="el-icon-search"
            :style="searchBtn"
            circle
            ></el-button>
          <el-button
            class="btns"
            type="primary"
            @click="login()"
            style="position: fixed; right: 20%;"
            >登录/注册
          </el-button>
          <el-avatar
            icon="el-icon-user-solid"
            @click.native="showHos()"
            class="hosInfo"
          ></el-avatar>
        </el-container>
      </el-header>

      <el-container class="hospital">
          <el-aside >
            <div>
              <div v-if="this.form.focus==='notice'">
              <el-button type="text" icon="el-icon-caret-right" class="text-css">发布公告</el-button><br />
            </div>
              <div v-else>
                <el-button type="text" @click="showNotice()" class="text-css">发布公告</el-button><br />
              </div>
            </div>
            <div>
              <div v-if="this.form.focus==='room'">
                <el-button type="text" icon="el-icon-caret-right" class="text-css">医院科室</el-button><br />
            </div>
              <div v-else>
                <el-button type="text" @click="showRoom()" class="text-css">医院科室</el-button><br />
              </div>
            </div>
           <div>
              <div v-if="this.form.focus==='res'">
                <el-button type="text" icon="el-icon-caret-right" class="text-css">预约情况</el-button><br />
            </div>
              <div v-else>
                <el-button type="text" @click="showRes()" class="text-css">预约情况</el-button><br />
              </div>
            </div>
            <div>
              <div v-if="this.form.focus==='suspend'">
                <el-button type="text" icon="el-icon-caret-right" class="text-css">停诊信息</el-button><br />
            </div>
              <div v-else>
                <el-button type="text" @click="showSuspend()" class="text-css">停诊信息</el-button><br />
              </div>
            </div>
            <div>
              <div v-if="this.form.focus==='money'">
                <el-button type="text" icon="el-icon-caret-right" class="text-css">平台流水</el-button><br />
            </div>
              <div v-else>
                <el-button type="text" @click="showMoney()" class="text-css">平台流水</el-button><br />
              </div>
            </div>
        </el-aside>
        
        <el-container>
          <el-header>
            <div class="name-head">
              <h3>xx市人民医院</h3>
              <h5>三甲医院</h5>
            </div>
          </el-header>

          <el-main>
            <!-- 医院信息 -->
            <el-dialog
              title="医院基本信息"
              :visible.sync="hosDataVisible"
              width="40%"
              :before-close="handleCloseHos"
            >
              <div style="height: 320px" :data="hosData">
                <div>
                  <el-image
                    class="hosPic"
                    :src="hosData.image"
                    :fit="fit"
                  ></el-image>
                </div>
                <!-- <el-descriptions :column="1" border class="description"> -->
                    <el-descriptions  border class="description">
                  <el-descriptions-item
                    label="医院名称"
                    class="hosInfo"
                    prop="name"
                    >{{ hosData.name }}</el-descriptions-item
                  >
                  <el-descriptions-item
                    label="医院地址"
                    class="hosInfo"
                    prop="location"
                    >{{ hosData.location }}</el-descriptions-item
                  >
                  <el-descriptions-item
                    label="医院简介"
                    class="hosInfo"
                    prop="introduction"
                    >{{ hosData.introduction }}</el-descriptions-item
                  >
                </el-descriptions>
              </div>
            </el-dialog>
            <!-- 发布公告 -->
            <el-card
              title="发布公告"
              v-if="this.hosNotice.dialogVisible"
              width="40%"
            >
              <div style="height: 320px" :data="hosNotice">
                这里是公告板信息
              </div>
            </el-card>

            <!-- 查看科室情况 -->
            <el-card
              title="科室情况"
              v-if="this.hosRoom.dialogVisible"
              width="40%"
            >
              <div style="height: 320px" :data="hosRoom">这里是科室信息</div>
            </el-card>
            <!-- 查看预约情况 -->
            <el-card
              title="查看预约情况"
              v-if="this.hosRes.dialogVisible"
              width="40%"
            >
              <div style="height: 320px" :data="hosRes">查看预约情况</div>
            </el-card>
            <!-- 停诊信息 -->
            <el-card
              title="查看停诊情况"
              v-if="this.hosSuspend.dialogVisible"
              width="40%"
            >
              <div style="height: 320px" :data="hosSuspend">查看停诊情况</div>
            </el-card>
            <!-- 平台流水 -->
            <el-card
              title="平台流水"
              v-if="this.hosMoney.dialogVisible"
              width="40%"
            >
              <div style="height: 320px" :data="hosMoney">平台流水</div>
            </el-card>
          </el-main>
          
          <el-footer>联系我们</el-footer>
        
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import identify from '../components/identify.vue';
export default {
  components: { identify },
  name: "Main",
  data() {
    return {
      //公告 bulletin 科室 department 预约 reservation 停诊 suspend 流水 flow
      // bulletin:false,
      // department:false,
      // reservation:false,
      // suspend:false,
      // flow:false,
      form:{focus:''},
      searchInput:{
        width: "50%", 
        left: "20%",
        position:"fixed"
      },
      searchBtn:{
        position: "fixed",
        top:"3%",
        right: "27%",
      },
      //医院信息
      hosDataVisible: false, //控制el-card是否显示
      hosData: {
        id: 1,
      },
      hosNotice: {
        dialogVisible: true,
        content: "",
      },
      hosRoom: {
        dialogVisible: false,
        name: "",
      },
      hosRes: {
        dialogVisible: false,
      },
      hosSuspend: {
        dialogVisible: false,
      },
      hosMoney: {
        dialogVisible: false,
      },
    };
  },
  methods: {
    register() {
      this.$router.push({
        name: "Register",
      });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    //医院图标跳转
    showHospitalInfo(){

    },
    //查询按钮
    search(){

    },
    //医院头像处信息
    showHos() {
      //目前这个接口调过一次数据库就会不让调，state变为1，认为本地应该已存储医院数据
      this.$axios
        .get("http://139.196.194.51:18080/api/hospitals/" + this.hosData.id)
        .then((response) => {
          console.log(response.data.data);
          this.hosData = response.data.data;
          console.log(hosData);
        });
      this.hosDataVisible = true;
    },
    handleCloseHos(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
      hosDataVisible = false;
    },
    //公告板
    showNotice() {
      this.form.focus='notice';
      this.hosNotice.dialogVisible = true; //控制el-card是否显示
      this.hosRoom.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //科室信息
    showRoom() {
      this.form.focus='room';
      this.hosRoom.dialogVisible = true;
      this.hosNotice.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //预约信息
    showRes() {
      this.form.focus='res';
      this.hosRoom.dialogVisible = false;
      this.hosNotice.dialogVisible = false;
      this.hosRes.dialogVisible = true;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //停诊信息
    showSuspend() {
      this.form.focus='suspend';
      this.hosRoom.dialogVisible = false;
      this.hosNotice.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = true;
      this.hosMoney.dialogVisible = false;
    },
    //平台流水
    showMoney() {
      this.form.focus='money';
      this.hosRoom.dialogVisible = false;
      this.hosNotice.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
/* 医院信息弹窗中内容 */
.hosInfo {
  position: fixed;
  font-size: 17px;
  right: 5%;
}
.Main{
  position:fixed
}

.topic {
  color: cornflowerblue;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  padding-top:3.5%;
  padding-left: 2%;
}
.btns {
  display: flex;
  justify-content: center;
  height: 5%;
}
.el-header{
  line-height: 10%;
}
// .name-head{
//   color: cornflowerblue;
// }

.el-footer {
  background-color: #ffffffe7;
  color: #333;
  text-align: center;
  line-height: 30px;
}

.el-aside {
  background-color: #ffffffe7;
  color:black;
  text-align: center;
  width: 200px;
  margin-top: 30px;
  line-height: 60px;
  font-size:70px;

}
.search-hospital{
  padding-top:1%;
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

.hospital{
  font-size: 30px;
}

.text-css{
  font-size:20px;
  color:black;
}

.text-css:focus{
  font-size:20px;
  color:cornflowerblue;
  font-weight:bold;
  list-style-type: style;
  
}

.search-btn{
 position:relative;
 padding-top:2%;
  // font-size: 20px;
 right: 20%
}
</style>