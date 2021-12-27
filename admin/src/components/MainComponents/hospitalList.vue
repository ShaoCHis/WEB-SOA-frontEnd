<template>
  <div>
    <!-- <el-button>这里是公告板信息</el-button> -->
    <el-row :gutter="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px; text-align: center"
            ><b>医院列表</b></span
          >
        </div>
        
        
      </el-card>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "HosList",
  data() {
    return {
      
    };
  },
  mounted() {
    //console.log(this.$store.state.user);
    this.getHospitalInfo();
  },
  created() {
    //   console.log(123)
  },
  methods: {
    addNotice() {
      alert("添加通知!");
    },
    deleteNotice() {
      alert("删除通知!");
    },
    //获取医院信息
    getHospitalInfo() {
      var hospital;
     
    },

  },
};
</script>

<style lang="less" scoped>
.item {
  margin-bottom: 18px;
  font-size: 16px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  display: inline-block;
  min-height: 500px;
  width: 1100px;
  margin-left: 50px;
  text-align: center;
}
.text {
  font-size: 18px;
  text-align: center;
}
</style>