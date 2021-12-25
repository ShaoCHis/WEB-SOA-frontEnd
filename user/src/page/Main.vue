<template>
  <div class="mainContainer">
    <myheader></myheader>

    <myfooter></myfooter>
  </div>
</template>

<script>
import Myfooter from '../layout/myfooter.vue';
import myheader from '../layout/myheader.vue';
import "@/style/css/main.css";

export default {
  components: { myheader, Myfooter },
  name: "Main",
  data: {
   
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
</style>