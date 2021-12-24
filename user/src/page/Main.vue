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
   
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/main.less";
</style>