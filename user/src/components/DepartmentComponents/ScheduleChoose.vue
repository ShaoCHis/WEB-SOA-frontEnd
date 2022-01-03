<template>
  <div class="hospital-choose">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in departmentClass"
        :key="item"
        :label="item.name"
      >
        <template>
          <div
            v-for="index in currentHospital"
            :key="index"
            class="department-choose-hospital"
            @click.native="goToReservationPage(schedule[index])"
          >
            <div class="doctor-info">
              <div class="hospital-image">
                <img
                  src="../../assets/unknown_user.png"
                  style="width: 100px; height: 100px"
                />
              </div>
              <div class="hospital-content">
                <div class="hospital-name">{{ schedule[index].name }}</div>
                <div class="hospital-title-cost">
                  <div class="hospital-title">
                    {{ schedule[index].title }}
                  </div>
                  <div class="hospital-cost">
                    费用: {{ schedule[index].cost }}元
                  </div>
                </div>
                <div class="hospital-info">
                  {{ schedule[index].introduction }}
                </div>
              </div>
            </div>
            <el-divider></el-divider>

            <div class="schedule">
              <div
                v-for="(reservation, index3) in DoctorSchedule[index]"
                :key="index3"
              >
                <el-checkbox v-model="checked[index][index3]"
                  >预约日期：<el-input v-model="reservation.date"></el-input
                ></el-checkbox>

                <!-- {{reservation.date}} -->
                开始时间：<el-input
                  diabled
                  v-model="reservation.startTime"
                ></el-input>
                截止时间：<el-input
                  diabled
                  v-model="reservation.endTime"
                ></el-input>
                已被预约容量：<el-input
                  diabled
                  v-model="reservation.reservedNumber"
                ></el-input>
                剩余容量：<el-input
                  diabled
                  v-model="reservation.availableNumber"
                ></el-input>
              </div>
              <el-button type="primary" @click="jump(index)"
                >点击预约</el-button
              >
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
          :total="Length"
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
    this.currentHospital = [];
    this.INDEX = 0;
    this.initPage();
    // console.log(this.DoctorSchedule);
    // this.init();
    // console.log(1);
    // console.log(this.currentHospital);
    // this.currentPage=1;
  },
  methods: {
    jump(t) {
      // console.log(t);
      var idx = 0;
      // console.log(this.checked[t]);
      this.checked[t].forEach((element, index) => {
        if (element == true) idx = index;
      });
      // console.log(idx);
      var data = JSON.stringify({
        hospital: sessionStorage.getItem("selectedHosID"),
        hospitalName: sessionStorage.getItem("selectedName"),
        department: sessionStorage.getItem("selectedDepartmentName"),
        doctor: this.schedule[t].name,
        date: this.DoctorSchedule[t][idx].date,
        money: this.schedule[t].cost,
        userName: sessionStorage.getItem("userName"),
        time:
          this.DoctorSchedule[t][idx].startTime +
          "-" +
          this.DoctorSchedule[t][idx].endTime,
      });
      sessionStorage.setItem("reservationData", data);
      // console.log(JSON.parse(sessionStorage.getItem("reservationData")));
      this.$router.push({ path: "/reservation" });
    },
    getDoctorSchedule(doctorid, index) {
      getSchedule({
        doctorId: doctorid,
      }).then((response) => {
        // console.log(response);
        this.DoctorSchedule[index] = response.data;
        response.data.forEach((element) => {
          this.checked[index].push(false);
        });
        // this.docTemp = response.data;
        // console.log(this.docTemp);
      });
    },
    init() {
      // console.log(this.currentHospital);
      // console.log(this.schedule);
      // console.log(this.DoctorSchedule);
      // console.log(this.departmentClass[this.INDEX].name );
      this.currentHospital = [];
      this.Length = 0;
      this.Length = this.schedule.length;
      if (this.INDEX == 0) {
        for (var i = 0; i < this.pageSize; i++) {
          if (this.schedule[this.pageSize * (this.currentPage - 1) + i] != null)
            this.currentHospital.push(
              this.pageSize * (this.currentPage - 1) + i
            );
        }
        // console.log(this.currentHospital);
        return;
      }
      this.Length = 0;
      this.schedule.forEach((element) => {
        if (element.title == this.departmentClass[this.INDEX].name)
          this.Length++;
      });
      var t = this.pageSize * (this.currentPage - 1);
      for (var i = 0; i < this.pageSize && t < this.schedule.length; t++) {
        if (
          this.schedule[t] != null &&
          this.schedule[t].title == this.departmentClass[this.INDEX].name
        ) {
          i++;
          this.currentHospital.push(t);
        }
      }
    },
    handleClick(tab) {
      console.log(this.DoctorSchedule);
      // console.log(tab.paneName);
      this.currentPage = 1;
      this.INDEX = tab.paneName;
      // console.log(this.INDEX);
      this.init();
      // console.log(this.Length);
      // console.log(this.currentHospital);
    },
    goToReservationPage(item) {
      // console.log(item);
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
          // console.log(response.data);
          // this.hospital=[],
          this.schedule = response.data;
          this.currentHospital = [];
          for (var i = 0; i < this.pageSize; i++) {
            if (
              this.schedule[this.pageSize * (this.currentPage - 1) + i] != null
            )
              this.currentHospital.push(
                this.pageSize * (this.currentPage - 1) + i
              );
          }
          // console.log(this.currentHospital);
          // console.log(this.schedule);
          this.schedule.forEach((element, index) => {
            this.getDoctorSchedule(element.id, index);
            this.checked.push([false]);
          });
          this.Length = 0;
          this.Length = this.schedule.length;
          // console.log(this.Length);
          // console.log(this.currentHospital);
          // console.log(this.DoctorSchedule);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
      this.currentHospital = [];
      for (var i = 0; i < this.pageSize; i++) {
        if (
          this.schedule[this.pageSize * (this.currentPage - 1) + i] != null &&
          this.schedule[this.pageSize * (this.currentPage - 1) + i].title !=
            this.departmentClass[this.INDEX].name
        )
          this.currentHospital[i] =
            this.schedule[this.pageSize * (this.currentPage - 1) + i];
      }
    },
  },
  data() {
    return {
      checked: [],
      DoctorSchedule: [],
      schedule: [],
      currentHospital: [],
      pageSize: 3,
      currentPage: 1,
      allHospital: [],
      department: [],
      docTemp: [],
      INDEX: 0,
      Length: 0,
      departmentClass: [
        // 筛选方法
        {
          name: "全部",
        },
        {
          name: "普通",
        },
        {
          name: "副主任",
        },
        {
          name: "主任",
        },
        {
          name: "见习",
        },
        {
          name: "医师",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
@import "../../style/css/ScheduleChoose.less";
.el-input {
  width: 120px;
}
</style>