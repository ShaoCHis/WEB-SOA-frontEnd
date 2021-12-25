<template>
  <div>
    <!-- <el-button>这里是公告板信息</el-button> -->
    <el-row :gutter="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px">致上海市民的一封信</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="deleteNotice"
            >删除</el-button
          >
        </div>
        <div v-bind="notices" class="text item" style="text-align: left">
          {{ notices }}
        </div>
      </el-card>

      <el-card class="box-card">
        <el-button
          type="text"
          style="font-size: 20px; margin-top: 25%"
          @click="addNotice"
        >
          +新增公告
        </el-button>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { getHospInfo } from "@/api/hospital";

export default {
  name: "Notice",
  data() {
    return {
      notices: JSON.parse(sessionStorage.getItem("hospital")).notice,
    };
  },
  mounted() {
    //console.log(this.$store.state.user);
    this.getHospitalInfo();
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
  },
};
</script>

<style>
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
  height: 250px;
  width: 300px;
  margin-left: 50px;
}
</style>