<template>
  <div class="hospitalInfoCard">
    <el-card style="height: 250px; margin-bottom: 40px; margin-top: 10px">
      <div class="hospital-image">
        <img src="../../assets/department.png" style="height: 200px;width:200px;" />
      </div>
      <div class="hospital-content">
        <div class="hospital-name">{{ department.name }}</div>
        <!-- <div class="hospital-level">
          {{ hospital.level }}
        </div> -->
        <!-- <div class="hospital-location">地址:{{ hospital.location }}</div> -->
        <div class="hospital-description">简介: {{ department.introduction }}</div>
      </div>
      <div class="outer-reserve" onmouseover="changeColor">
        <el-button
        type="text"
        class="reserve-button"
        @click="goToReservation('destination')"
        > <i class="el-icon-thumb"> </i> 前往挂号</el-button
      >
      </div>
    </el-card>
    <!-- 挂号科室&特色科室 -->
    <div class="label" ref="destination">
      <div class="label-left"></div>
      <div class="label-name">专家门诊</div>
    </div>
  </div>
</template>

<script>
// import { getHospInfo } from "../../api/hospital";
import { getDepartById } from "../../api/department";
// import { getMap } from "../../utils/map";
export default {
    name:"DepartmentInfoCard",
    data(){
        return{
            hosID:sessionStorage.getItem("selectedHosID"),
            hospital:[],
            depID:sessionStorage.getItem("selectedDepartmentID"),
            department:[],
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    //   实现页面内点击跳转到指定位置
    goToReservation(val) {
      this.$refs[val].scrollIntoView(true);
    },
    async initPage() {
      console.log(this.depID);
      getDepartById({
          id:this.depID,
      }).then(response=>{
          console.log(this.department);
          this.department=response.data;
      })
    //   getHospInfo({ id: this.hosID })
    //     .then((response) => {
    //       // this.hospital=[],
    //       this.hospital = response.data;
    //       this.hospital.level = getMap(this.hospital.level);
    //       console.log(this.hospital);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/css/DepartmentInfoCard.less";
</style>