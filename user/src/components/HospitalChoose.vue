<template>
  <div class="hospital-choose">
    <el-tabs type="border-card">
      <el-tab-pane v-for="(item, index) in sortType" :key="index" :label="item.name">
        <div class="department-choose-hospital" v-for="(item, index) in currentHospital" :key="index">
          <div class="inner-choose">
            <el-divider></el-divider>
            <div class="hospital-image">
              <img :src="item.image" style="width: 100%; height: 100%" />
            </div>
            <div class="hospital-content">
              <div class="hospital-name">{{ item.name }}</div>
              <div class="hospital-level">{{ item.level }}</div>
            </div>
            <div class="enter-hospital">
              <div class="inner-enter" @click="goToHospitalPage()">
                <a style="text-decoration: none" href="https://ak.hypergryph.com/index" target="_blank">选择医院</a>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <div class="block">
        <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          layout="total,prev, pager, next, jumper"
          :total="hospital.length">
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import {getHospListInfo} from "@/api/hospital.js"
export default {
  components:{getHospListInfo},
  name: "DepartmentChoose",
  mounted() {
    this.currentHospital = [];
    for (var i = 0; i < this.pageSize; i++) {
      if (this.hospital[this.pageSize * (this.currentPage - 1) + i] != null)
        this.currentHospital[i] =
          this.hospital[this.pageSize * (this.currentPage - 1) + i];
    }
  },
  methods: {
    goToHospitalPage() {},
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.currentHospital = [];
      for (var i = 0; i < this.pageSize; i++) {
        if (this.hospital[this.pageSize * (this.currentPage - 1) + i] != null)
          this.currentHospital[i] =
            this.hospital[this.pageSize * (this.currentPage - 1) + i];
      }
    },
  },
  data() {
    return {
      currentHospital: [],
      pageSize: 2,
      currentPage: 1,
      hospital: [
        {
          name: "北京协和医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
        {
          name: "柳州人民医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
        {
          name: "重庆人民医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
        {
          name: "金华人民医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
        {
          name: "南宁人民医院",
          level: "三甲",
          image: require("../assets/back.jpeg"),
          attribute4: "",
          attribute5: "",
        },
      ],
       sortType: [
        // 筛选方法
        {
          id: "1",
          name: "综合",
        },
        {
          id: "2",
          name: "距离远近",
        },
        {
          id: "3",
          name: "医院等级",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
@import "../style/css/HospitalChoose.less";
</style>