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
                <el-radio
                  style="margin-left: 1%"
                  v-model="radio[index]"
                  :label="index3"
                  >预约日期：
                  <el-input v-model="reservation.date"></el-input>

                  开始时间：<el-input
                    diabled
                    v-model="reservation.startTime"
                  ></el-input>
                  截止时间：<el-input
                    diabled
                    v-model="reservation.endTime"
                    style="border: none"
                  ></el-input>
                  已被预约容量：<el-input
                    diabled
                    v-model="reservation.reservedNumber"
                  ></el-input>
                  剩余容量：<el-input
                    diabled
                    v-model="reservation.availableNumber"
                  ></el-input
                ></el-radio>
              </div>
              <el-button
                style="margin-left: 2%; margin-top: 20px; margin-bottom: 20px"
                type="primary"
                @click="jump(index)"
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
      <patient-list
        v-on:cancel="cancel"
        v-on:commit="commit"
        :dialogVisible="dialogVisible"
      ></patient-list>
    </el-tabs>
  </div>
</template>
<script>
import { getDoctorList } from "../../api/doctor";
import { getSchedule } from "../../api/schedule";
import { getMap } from "../../utils/map";
import patientList from "../patientList.vue";

export default {
  components: {
    patientList,
  },
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
      // if (sessionStorage.getItem("userId") != null) {
      //   this.patient = null;
      //   this.$router.push({ path: "/reservation" });
      // } else {
      if (sessionStorage.getItem("userId") == null) {
        this.$confirm("您还未登录，无法预约！ 是否前往登录？ ", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push({ name: "Login" });
          })
          .catch(() => {});
          return;
      }
      else{
      if (this.radio[t] == -1) {
        this.$message({
          message: "请先选中排班",
        });
        return;
      }
      // console.log(t);
      var idx = this.radio[t];
      // console.log(this.DoctorSchedule[t][idx]);
      var data = JSON.stringify({
        hospital: sessionStorage.getItem("selectedHosID"),
        hospitalName: sessionStorage.getItem("selectedName"),
        department: sessionStorage.getItem("selectedDepartmentName"),
        doctor: this.schedule[t].name,
        date: this.DoctorSchedule[t][idx].date,
        money: this.schedule[t].cost,
        userName: sessionStorage.getItem("patientName"),
        time:
          this.DoctorSchedule[t][idx].startTime +
          "-" +
          this.DoctorSchedule[t][idx].endTime,
        scheduleID: this.DoctorSchedule[t][idx].id,
      });
      if (this.patient == null) {
        console.log(this.patient);
        this.dialogVisible = true;
        return;
      }
      sessionStorage.setItem("reservationData", data);
      // console.log(JSON.parse(sessionStorage.getItem("reservationData")));
        this.patient = null;
        this.$router.push({ path: "/reservation" });
        // console.log(this.radio);
    }
    },
    getDoctorSchedule(doctorid, index) {
      getSchedule({
        doctorId: doctorid,
      }).then((response) => {
        // console.log(response);
        this.init();
        this.DoctorSchedule[index] = response.data;
      });
    },
    init() {
      this.time = 0;
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
      this.currentPage = 1;
      this.INDEX = tab.paneName;
      this.init();
    },
    goToReservationPage(item) {
      sessionStorage.setItem("selectedDepartmentID", item.id);
      this.$router.push({ path: "/department" });
      this.getDoctorSchedule(item);
    },
    // initPage(index) {
    initPage() {
      this.time = 0;
      getDoctorList({
        hid: sessionStorage.getItem("selectedHosID"),
        did: sessionStorage.getItem("selectedDepartmentID"),
      })
        .then((response) => {
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
          this.radio = [];
          this.schedule.forEach((element, index) => {
            this.getDoctorSchedule(element.id, index);
            this.radio.push(-1);
          });
          this.Length = 0;
          this.Length = this.schedule.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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
    cancel() {
      this.dialogVisible = false;
    },
    commit(data) {
      // console.log(data);
      this.dialogVisible = false;
      this.patient = data;
    },
  },
  data() {
    return {
      // checked: [],
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
      radio: [],
      dialogVisible: false,
      // time: 0,
      patient: null,
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
  width: 110px;
}
</style>