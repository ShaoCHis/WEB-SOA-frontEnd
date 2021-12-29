<template>
  <div class="mainContainer">
    <myheader></myheader>

    <div class="contentContainer">

      <!-- 科室列表 -->
      <div class="label">
        <div class="label-left"></div>
        <div class="label-name">科室列表</div>
      </div>


    </div>
    <myfooter></myfooter>
  </div>
</template>

<script>
import Myfooter from '../layout/myfooter.vue';
import myheader from "../layout/myheader.vue";

export default {
  components: { myheader, Myfooter },
  name: "Reservation",
  data() {
    return {
      registerForm:{
        // 先前步骤已经确定的信息
        hospital:"",
        department:"",
        doctor:"",
        time:"",
        userId:"",
        // 预约步骤需要填写的信息
      },
    };
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/reservation.less";
</style>