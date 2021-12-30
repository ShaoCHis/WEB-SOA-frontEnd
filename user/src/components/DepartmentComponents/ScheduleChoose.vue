<template>
  <div class="hospital-choose">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in departmentClass"
        :key="index"
        :label="item.name"
      >
        <template slot-scope="scope">
          <div
            v-for="(item, index) in currentHospital"
            :key="index"
            class="department-choose-hospital"
            @click.native="goToReservationPage(item)"
          > <div v-for="(item2,index2) in DoctorSchedule" :key="index2" >
            <div class="doctor-info">
              <div class="hospital-image">
                <img
                  src="../../assets/unknown_user.png"
                  style="width: 100px; height: 100px"
                />
              </div>
              <div class="hospital-content">
                <div class="hospital-name">{{ item.name }}</div>
                <div class="hospital-title-cost">
                  <div class="hospital-title">{{ item.title }}</div>
                  <div class="hospital-cost">费用: {{ item.cost }}元</div>
                </div>
                <div class="hospital-intro"></div>
                <!-- <div class="hospital-intro">{{ item.introduction }}</div> -->
              </div>
            </div>
            <el-divider></el-divider>
            <div class="schedule">
             
                <div v-for="(item3,index3) in item2" :key="index3" >
                {{item3.id}}
              </div>
              </div>
            </div>

          </div>
        </template>
      </el-tab-pane>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          layout="total,prev, pager, next, jumper"
          :total="schedule.length"
        >
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import { getDoctorList } from "../../api/doctor";
import { getSchedule } from "../../api/schedule";
import { getMap } from "../../utils/map";

export default {
  name: "ScheduleChoose",
  mounted() {
    // this.initPage(0);
    this.initPage();
    this.currentHospital = [];
    for (var i = 0; i < this.pageSize; i++) {
      if (this.schedule[this.pageSize * (this.currentPage - 1) + i] != null)
        this.currentHospital[i] =
          this.schedule[this.pageSize * (this.currentPage - 1) + i];
    }
    // this.currentPage=1;
  },
  methods: {
    getDoctorSchedule(doctorid,index) {
      getSchedule({
        doctorId: doctorid,
      }).then((response) => {
        this.DoctorSchedule[index]=response.data;
        // this.docTemp = response.data;
        // console.log(this.docTemp);
      });
    },
    handleClick(tab) {
      // this.initPage(tab.index);
      this.initPage();
    },
    goToReservationPage(item) {
      console.log(item);
      sessionStorage.setItem("selectedDepartmentID", item.id);
      // console.log(row);
      this.$router.push({ path: "/department" });
      // localStorage.setItem("selectedHosID",10);
      this.getDoctorSchedule(item);
    },
    // initPage(index) {
    initPage() {
      getDoctorList({
        hid: sessionStorage.getItem("selectedHosID"),
        did: sessionStorage.getItem("selectedDepartmentID"),
      })
        .then((response) => {
          console.log(response.data);
          // this.hospital=[],
          this.schedule = response.data;
          console.log(this.schedule);
          this.schedule.forEach((element, index) => {
            this.getDoctorSchedule(element.id,index);
          });
          console.log(this.DoctorSchedule);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.currentHospital = [];
      for (var i = 0; i < this.pageSize; i++) {
        if (this.schedule[this.pageSize * (this.currentPage - 1) + i] != null)
          this.currentHospital[i] =
            this.schedule[this.pageSize * (this.currentPage - 1) + i];
      }
    },
  },
  data() {
    return {
      DoctorSchedule:[],
      schedule: [],
      currentHospital: [],
      pageSize: 3,
      currentPage: 2,
      allHospital: [],
      department: [],
      docTemp: [],
      departmentClass: [
        // 筛选方法
        {
          name: "科室医师",
        },
        {
          name: "特级专家",
        },
        // {
        //   name: "内科",
        // },
        // {
        //   name: "中医科",
        // },
        // {
        //   name: "肿瘤科",
        // },
        // {
        //   name: "儿科",
        // },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
@import "../../style/css/ScheduleChoose.less";
</style>