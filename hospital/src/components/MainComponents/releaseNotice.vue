<template>
  <div>
      <!-- <el-button>这里是公告板信息</el-button> -->
      <el-row :gutter="20">
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="font-size:18px;">致上海市民的一封信</span>
                    <el-button style="float: right; padding: 3px 0;" type="text" @click="deleteNotice">删除</el-button>
                </div>
                <div class="text item" style="text-align:left;">
                    亲爱的市民朋友，您好！<br/>
                    2021年全国消费者满意度测评来啦，一个赞、一个好评，助力上海放心消费创建。
                    届时将会有工作人员在社区向您开展问卷调查，恳请您积极配合、建言献策。
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="font-size:18px;">院内采购结果公示</span>
                    <el-button style="float: right; padding: 3px 0;" type="text" @click="deleteNotice">删除</el-button>
                </div>
                <div class="text item" style="text-align:left;">
                    根据我院业务发展需要，经评审小组评审，现将院内加装视频监控、门禁等设备及备件等一批采购项目采购结果公布如下：<br/>
                    项目名称<br/>
                    医院加装视频监控设备采购<br/>
                    佛山安盛科技有限公司<br/>
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="box-card">
                <el-button type="text" style="font-size:20px;margin-top:25%;" @click="addNotice">
                    +新增公告
                </el-button>
            </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
name:'Notice',

created(){
//   console.log(123)
},
methods:{
    addNotice(){
        alert("添加通知!");
    },
    deleteNotice(){
        alert("删除通知!");
    },
}

}


</script>

<style>
.text {
    font-size: 18px;
  }

  .item {
    margin-bottom: 18px;
    font-size:16px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card{
      height:250px;
  }
</style>