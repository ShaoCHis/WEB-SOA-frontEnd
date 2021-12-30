<template>
  <div>
    <el-card class="reservation">
      <el-table :data="reservation" style="width: 100%;height:360px;overflow-y:auto;" stripe>
        <el-table-column width="200" prop="patientID" label="病人编号">
        </el-table-column>
        <el-table-column width="100" prop="patientName" label="病人姓名">
        </el-table-column>
        <el-table-column
          sortable
          width="100"
          prop="reserveDate"
          label="预约时间"
        >
        </el-table-column>
        <el-table-column sortable width="100" prop="reserveTime" label="时间段">
        </el-table-column>
        <el-table-column width="100" prop="departmentName" label="预约科室">
        </el-table-column>
        <el-table-column width="100" prop="doctorName" label="预约医生">
        </el-table-column>
        <el-table-column
          width="100"
          prop="number"
          label="预约号码"
          sortable
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getResByHosID } from "../../api/reservation";

export default {
  name: "Reservation",
  data() {
    return {
      reservation: [],
    };
  },
  methods: {},

  mounted() {
    getResByHosID(sessionStorage.getItem("HospitalID"))
      .then((response) => {
        this.reservation = response.data;
        console.log(this.reservation);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.reservation {
  margin-left: 100px;
  height: 400px;
}
</style>