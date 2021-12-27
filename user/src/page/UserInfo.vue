<template>
  <div class="mainContainer">
    <myheader></myheader>
    <div class="contentContainer">


      <!-- 根据科室选择医院 -->
        <!-- <div class="label">
          <div class="label-left"></div>
          <div class="label-name">根据科室选择医院</div>
        </div> -->

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
  name: "UserInfo",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/UserInfo.less";
</style>