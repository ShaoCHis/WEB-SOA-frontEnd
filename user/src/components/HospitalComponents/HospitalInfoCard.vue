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
      <el-button
        type="primary"
        style="margin-left: 30%; margin-top: -200px"
        @click="goToReservation('destination')"
        >预约挂号</el-button
      >
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
  name: "HospitalInfoCard",
  data() {
    return {
      hosID: this.$route.query.hosID,
      hospital: [],
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/css/HospitalInfoCard.less";
</style>