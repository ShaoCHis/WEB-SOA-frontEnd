<template>
  <div class="mainContainer">
    <myheader></myheader>

    <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from '../layout/myfooter'
import Myfooter from '../layout/myfooter.vue';
import myheader from '../layout/myheader.vue';

export default {
  components: { myheader,myfooter, Myfooter },
  name: "Main",
  data: {
    loginTemp: {
      position: "absolute",
      top: "18px",
      right: "5.5%",
    },
    avatarHos: {
      position: "absolute",
      top: "18px",
      right: "2%",
    },
    searchInput: {
      width: "66%",
      top: "3%",
      left: "18%",
      position: "absolute",
    },
    searchBtn: {
      position: "absolute",
      top: "18px",
      right: "12%",
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
</style>