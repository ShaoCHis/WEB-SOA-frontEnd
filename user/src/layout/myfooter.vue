<template>
  <div class="footer-container">
     <div class="about">
        <span @click="goToAboutPage()" class="about-item">营业执照</span>
        <el-divider direction="vertical"></el-divider>
        <span class="about-item">增值电信业务经营许可证（互联网信息服务）</span>
        
        <el-divider direction="vertical"></el-divider>
        <span class="about-item">第二类医疗器械经营备案凭证编号：沪食药监械经营备20219573号</span>
        <el-divider direction="vertical"></el-divider>
        <span class="about-item">食品经营许可证</span>
        <el-divider direction="vertical"></el-divider>
        <span class="about-item">医疗器械网络销售备案信息</span>
        <br/>
        <span class="about-item">增值电信业务经营许可证（第二类增值电信业务）</span>
        <el-divider direction="vertical"></el-divider>
        <span class="about-item">互联网药品信息服务资格证编号：（沪）-经营性-2021-2385</span>
        <el-divider direction="vertical"></el-divider>
        <span class="about-item">广播电视节目制作经营许可证</span>
        <el-divider direction="vertical"></el-divider>
        <span class="about-item">网络信息服务信用承诺书</span>
      </div>
    <div class="upper">
      <div class="upper-item" v-for="(item,index) in upper" :key=index>
        {{item.content}}
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-item" v-for="(item,index) in bottom" :key=index >
         {{item.content}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"myfooter",
  data(){
    return {
bottom:[
        {
          content:"版权所有：上海医济达科技有限公司",
        },
        {
          content:"沪ICP备xxxxxxxx号-x    浙公网安备  xxxxxxxxxxxxxx号",
        }
      ],
      upper:[
        {
          content:"网站举报电话：+021 95173759 网站举报邮箱：yijida@wedoctor.com",
        },
        {
          content:"涉未成年人不良信息举报：电话+021 95763856，邮箱 yijida@wedoctor.com",
        }
      ],
    }
  }
};
</script>
<style lang="less" scoped>
.footer-container {
  /* background-color: rgb(218, 218, 218); */
  position: relative;
  // bottom: 0;
  height: 230px;
  text-align:left;
  color:grey;
  font-size:14px;
  padding-top:25px;
  /* border:5px #333; */
  border-top:1px solid rgb(218, 218, 218);
  text-align: center;
}
.upper{
line-height: 150%;
// margin-left:650px;
margin-top: 20px;
}
.bottom{
line-height: 150%;
margin-top: 15px;
}
.el-divider {
  background-color: grey;
}
.about {
  color: grey;
  // font-size: 13px;
  line-height: 200%;
}
.about-item:hover {
    cursor: pointer;
    color:#4990f1;
}
</style>
