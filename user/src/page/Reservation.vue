<template>
  <div>
    <myheader></myheader>
    <el-form>
        
    </el-form>
    <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from "../layout/myfooter";
import Myfooter from "../layout/myfooter.vue";
import myheader from "../layout/myheader.vue";

export default {
  components: { myheader, myfooter, Myfooter },
  name: "Reservation",
  data() {
    return {};
  },
};
</script>

<style>
@import "../style/css/reservation.less";
</style>