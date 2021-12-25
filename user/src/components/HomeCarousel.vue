<template>
 <!-- 首页走马灯 -->
      <div class="carousel-container">
        <div class="home-carousel">
          <el-carousel indicator-position="inside" height="400px">
            <el-carousel-item v-for="item in carousel_list" :key="item.img">
              <img :src="item.img" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
</template>

<script>
export default {
  name: "HomeCarousel",
  methods: {
  },
  data() {
    return {
      carousel_list: [
        {
          id: "1",
          img: require("@/assets/carousel3.jpg"),
        },
        {
          id: "2",
          img: require("@/assets/carousel2.jpg"),
        },
        {
          id: "3",
          img: require("@/assets/carousel1.jpg"),
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/HomeCarousel.less";
</style>
