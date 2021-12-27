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
        v-for="item in depData"
        :key="item"
        :label="item.name"
        stripe
        height="300"
      >
        <div>
          {{ item.name }}医生列表
          <el-divider></el-divider>
          <el-table :data="doctors" style="width: 100%">
            <el-table-column width="100" type="index" label="医生ID">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="年龄">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.age }}</span>
              </template>
            </el-table-column>
            <el-table-column label="职位">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="简介">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.introduction
                }}</span>
              </template></el-table-column
            >
            <el-table-column label="预约费用">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.cost }}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  @click="checkRes(scope.$index, scope.row)"
                  type="primary"
                  >查看预约</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-card class="showRes" v-show="showRes">
      <el-table :data="resData" style="width: 100%">
        <el-table-column width="200" prop="patientID" label="病人编号"> </el-table-column>
        <el-table-column width="100" prop="patientName" label="病人姓名"> </el-table-column>
        <el-table-column width="100" prop="reserveDate" label="预约时间"> </el-table-column>
        <el-table-column width="100" prop="reserveTime" label="时间段"> </el-table-column>
        <el-table-column width="100" prop="number" label="预约号码"></el-table-column>
      </el-table>
      <el-button
        @click="closeRes"
        circle
        class="close"
        icon="el-icon-close"
      ></el-button>
    </el-card>
  </div>
</template>

<script>
import { getDepartListById } from "../../api/department";
import { getDepartById } from "../../api/department";
import { getDocListByHosRoom } from "../../api/doctor";
import { getResByDocID } from "../../api/reservation";

export default {
  name: "RoomInfo",

  data() {
    return {
      depData: [],
      doctors: [],
      resData: [],
      showRes: false,
    };
  },

  created() {},

  mounted() {
    return new Promise((resolve, reject) => {
      getDepartListById({
        id: sessionStorage.getItem("HospitalID"),
      })
        .then((response) => {
          this.depData = response.data;
          //console.log(this.depData);
          this.updateDoctor(response.data[0].id);
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
      var roomId = this.depData[index].id;
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
          //console.log(this.doctors[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkRes(index, row) {
      getResByDocID(row.id)
        .then((response) => {
          this.resData = response.data;
          //console.log(this.resData);
          this.showRes = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeRes() {
      this.showRes = false;
    },
  },
};
</script>

<style lang="less" scope>
.tab {
  display: inline-block;
  height: 400px;
  width: 1100px;
}
.showRes {
  position: fixed;
  left: 400px;
  top: 200px;
  z-index: 1;
  .close {
    margin-top: 15px;
  }
}
</style>