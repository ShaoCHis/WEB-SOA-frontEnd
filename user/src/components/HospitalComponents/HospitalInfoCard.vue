<template>
  <div class="hospitalInfoCard">
    <el-card style="height: 250px; margin-bottom: 40px; margin-top: 10px">
      <div class="hospital-image">
        <img :src="hospital.image" style="height: 200px" />
      </div>
      <div class="hospital-content">
        <div class="hospital-name">{{ hospital.name }}</div>
        <div class="hospital-level">
          {{ hospital.level }}
        </div>
        <div class="hospital-location">地址:{{ hospital.location }}</div>
        <div class="hospital-description">简介:{{ hospital.introduction }}</div>
      </div>
      <div class="outer-reserve" onmouseover="changeColor">
        <el-button
        type="text"
        class="reserve-button"
        @click="goToReservation('destination')"
        > <i class="el-icon-thumb"> </i> 预约挂号</el-button
      >
      </div>
    </el-card>
    <!-- 挂号科室&特色科室 -->
    <div class="label" ref="destination">
      <div class="label-left"></div>
      <div class="label-name">医院科室</div>
    </div>
  </div>
</template>

<script>
import { getHospInfo } from "../../api/hospital";
import { getMap } from "../../utils/map";
export default {
    name:"HospitalInfoCard",
    data(){
        return{
            hosID:sessionStorage.getItem("selectedHosID"),
            hospital:[],
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
    initPage() {
      getHospInfo({ id: this.hosID })
        .then((response) => {
          // this.hospital=[],
          this.hospital = response.data;
          this.hospital.level = getMap(this.hospital.level);
          console.log(this.hospital);
          this.$alert(this.hospital.notice, '温馨提示', {
          confirmButtonText: '我知道了',
        });
        })
        .catch((error) => {
          console.log(error);
        });
        console.log(this.hospital.notice);
   
        
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/css/HospitalInfoCard.less";
</style>