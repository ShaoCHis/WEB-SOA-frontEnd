<template>
  <div>
    <el-container>

      <el-header>
        <el-container class="Main">
          <div class="topic">
            <h1>济病通 医院端</h1>
          </div>
          <el-input
            style="width: 50%; margin-left: 250px; margin-right: 10%;position:fixed"
            v-model="hospitalName"
            placeholder="请输入....."
          ></el-input>
          <el-button
            class="btns"
            type="primary"
            icon="el-icon-search"
            style="position: fixed; right: 20%;"
            >搜索</el-button
          >
          <el-button
            class="btns"
            type="primary"
            @click="login"
            style="position: fixed; right: 10%;"
            >登录/注册
          </el-button>
          <el-avatar
            icon="el-icon-user-solid"
            @click.native="showHos()"
            class="hosInfo"
          ></el-avatar>
        </el-container>
      </el-header>

      <el-container>
        <el-aside >
          <el-button type="text" @click="showNotice">发布公告</el-button><br />
          <el-button type="text" @click="showRoom">查看科室情况</el-button
          ><br />
          <el-button type="text" @click="showRes">查看预约情况</el-button><br />
          <el-button type="text" @click="showSuspend">停诊信息</el-button><br />
          <el-button type="text" @click="showMoney">平台流水</el-button><br />
        </el-aside>
        <el-container>
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
      this.hosNotice.dialogVisible = true; //控制el-card是否显示
      this.hosRoom.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //科室信息
    showRoom() {
      this.hosRoom.dialogVisible = true;
      this.hosNotice.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //预约信息
    showRes() {
      this.hosRoom.dialogVisible = false;
      this.hosNotice.dialogVisible = false;
      this.hosRes.dialogVisible = true;
      this.hosSuspend.dialogVisible = false;
      this.hosMoney.dialogVisible = false;
    },
    //停诊信息
    showSuspend() {
      this.hosRoom.dialogVisible = false;
      this.hosNotice.dialogVisible = false;
      this.hosRes.dialogVisible = false;
      this.hosSuspend.dialogVisible = true;
      this.hosMoney.dialogVisible = false;
    },
    //平台流水
    showMoney() {
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
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.btns {
  display: flex;
  justify-content: center;
  height: 5%;
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
  margin-top: 30px;
  line-height: 60px;
  width:400px;
  font-size:40px;
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

// .el-card{
//   line-height: 300px;
// }
.el-descriptions{
  line-height: 300px;
}

// .description{
//  height: 300px; 
// }

</style>