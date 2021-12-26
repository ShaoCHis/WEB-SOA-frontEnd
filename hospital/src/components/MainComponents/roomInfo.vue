<template>
  <div>
    <!-- :data="tableData" -->
    <!-- v-for="item in items" :key="item" -->
    <el-tabs
      @tab-click="handleClick"
      class="tab"
      type="border-card"
      tab-position="left"
    >
      <el-tab-pane
        class="roomList"
        v-for="item in resData"
        :key="item"
        :label="item.name"
      >
        <div>
          {{ item.name }}医生列表
          <el-divider></el-divider>

          <el-descriptions
            v-for="doctor in doctors"
            :key="doctor"
            direction="vertical"
            :column="6"
            border
          >
            <el-descriptions-item label="医生ID">
              {{ doctor.id }}</el-descriptions-item
            >
            <el-descriptions-item label="姓名">
              <template slot="label">
                <i class="el-icon-user"></i>
                姓名 </template
              >{{ doctor.name }}</el-descriptions-item
            >
            <el-descriptions-item label="年龄">
              {{ doctor.age }}岁</el-descriptions-item
            >
            <el-descriptions-item label="职位">
              {{ doctor.title }}</el-descriptions-item
            >
            <el-descriptions-item label="简介">
              {{ doctor.introduction }}</el-descriptions-item
            >
            <el-descriptions-item label="预约费用">
              {{ doctor.cost }}</el-descriptions-item
            >
          </el-descriptions>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getDepartListById } from "../../api/department";
import { getDepartById } from "../../api/department";
import { getDocListByHosRoom } from "../../api/doctor";

export default {
  name: "RoomInfo",

  data() {
    return {
      resData: [],
      doctors: [],
    };
  },

  created() {},

  mounted() {
    return new Promise((resolve, reject) => {
      getDepartListById({
        id: sessionStorage.getItem("HospitalID"),
      })
        .then((response) => {
          this.resData = response.data;
          //console.log(this.resData);
          this.updateDoctor(this.resData[0].id)
          resolve();
        })
        .catch((error) => {
          (this.loading = false),
            this.$message({
              message: "获取失败！",
              type: "error",
            });
          reject(error);
        });
    });
  },

  methods: {
    handleClick(tab, event) {
      var index = tab.index;
      var roomId = this.resData[index].id;
      // console.log(roomId);
      this.updateDoctor(roomId);
      getDepartById(roomId)
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateDoctor(depid) {
      var hosID = sessionStorage.getItem("HospitalID");
      getDocListByHosRoom(hosID, depid)
        .then((response) => {
          //console.log(response);
          this.doctors = response.data;
          console.log(this.doctors[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.tab {
  display: inline-block;
  height: 400px;
  width: 1100px;
}
</style>