<template>
  <div class="not-found">
    <div class="not-found-inner">
      <div class="not-found-img">
        <img src="../../../static/images/404.png" alt="" />
      </div>
      <h5>404</h5>
      <p>糟糕... 页面被外星人抓走了~</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",

  created() {},
};
</script>

<style lang="less" scoped>
.not-found {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;

  .not-found-inner {
    position: relative;
    top: 200px;
    .not-found-img {
      img {
        min-height: 200px;
        min-width: 200px;
      }
    }
    h5 {       
      line-height: 30px;
      font-size: 40px;
      padding: 10px 0;
      color: skyblue;      
    }
    p {
      color: black;
      color: #999;
      font-size: 30px;
    }
  }
}
</style>