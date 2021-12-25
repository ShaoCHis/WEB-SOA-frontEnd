<template>
  <div>
    <!-- <el-button>这里是公告板信息</el-button> -->
    <el-row :gutter="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px"><b>公告</b></span>
          <el-button
            id="change"
            ref="change"
            style="
              float: right;
              margin-left: 10px;
              font-size: 18px;
              visibility: unset;
            "
            type="text"
            @click="changeNotice"
            >修改</el-button
          >
          <el-button
            id="commit"
            ref="cancel"
            style="
              float: right;
              margin-left: 10px;
              font-size: 18px;
              visibility: hidden;
            "
            type="text"
            @click="cnacelChange"
            >取消</el-button
          >
          <el-button
            id="cancel"
            ref="commit"
            style="
              float: right;
              margin-left: 10px;
              font-size: 18px;
              visibility: hidden;
            "
            type="text"
            @click="commitNotice"
            >确定</el-button
          >
        </div>
        <div class="text item">
          {{ notices }}
        </div>
        <div class="changeNotice" style="visibility: hidden">
          <el-input
            class="changeNotice"
            ref="changeNotice"
            type="textarea"
            v-model="newNotice"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 20, maxRows: 100 }"
          ></el-input>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { getHospInfo, hospModifyNotice } from "@/api/hospital";

export default {
  name: "Notice",
  data() {
    return {
      notices: JSON.parse(sessionStorage.getItem("hospital")).notice,
      newNotice: "",
    };
  },
  mounted() {
    //console.log(this.$store.state.user);
    this.getHospitalInfo();
    this.newNotice = this.notices;
  },
  created() {
    //   console.log(123)
  },
  methods: {
    addNotice() {
      alert("添加通知!");
    },
    deleteNotice() {
      alert("删除通知!");
    },
    //获取医院信息
    getHospitalInfo() {
      var hospital;
      getHospInfo({
        id: this.$store.state.user.id,
      })
        .then((response) => {
          //console.log(response.data);
          hospital = JSON.stringify({
            name: response.data.name,
            image: response.data.image,
            code: response.data.code,
            level: response.data.level,
            location: response.data.location,
            status: response.data.status,
            introduction: response.data.introduction,
            notice: response.data.notice,
          });
          //console.log(hospital);
          sessionStorage.setItem("hospital", hospital);
        })
        .catch((error) => {
          console.log(-1);
        });
    },

    changeNotice() {
      document.getElementsByClassName("changeNotice")[0].style.visibility =
        "unset";
      document.getElementById("commit").style.visibility = "unset";
      document.getElementById("cancel").style.visibility = "unset";
      document.getElementById("change").style.visibility = "hidden";
    },
    commitNotice() {
      document.getElementsByClassName("changeNotice")[0].style.visibility =
        "hidden";
      hospModifyNotice(sessionStorage.getItem("HospitalID"), this.newNotice)
        .then((response) => {
          if (response.success == true) {
            this.getHospitalInfo();
            // window.location.reload()
            this.notices = JSON.parse(
              sessionStorage.getItem("hospital")
            ).notice;
            this.$message({ message: "修改成功", type: "success" });
          } else {
            document.getElementById("commit").style.visibility = "hidden";
            document.getElementById("cancel").style.visibility = "hidden";
            document.getElementById("change").style.visibility = "unset";
            alert("修改失败");
          }
        })
        .catch((error) => {
          console.log(123456);
        });
      document.getElementById("commit").style.visibility = "hidden";
      document.getElementById("cancel").style.visibility = "hidden";
      document.getElementById("change").style.visibility = "unset";
    },
    cnacelChange() {
      document.getElementsByClassName("changeNotice")[0].style.visibility =
        "hidden";
      document.getElementById("commit").style.visibility = "hidden";
      document.getElementById("cancel").style.visibility = "hidden";
      document.getElementById("change").style.visibility = "unset";
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 18px;
}

.item {
  margin-bottom: 18px;
  font-size: 16px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  display: inline-block;
  min-height: 500px;
  width: 1200px;
  margin-left: 50px;
  text-align: center;
}
.text {
  text-align: center;
}
.changeNotice {
  top: -50px;
  //height: 30px;
  .textarea {
    text-align: center;
  }
}
</style>