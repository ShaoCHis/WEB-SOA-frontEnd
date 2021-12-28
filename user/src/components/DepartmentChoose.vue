<template>
  <div class="hospital-choose">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in department"
        :key="index"
        :label="item.name"
      >
      <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col
                :span="8"
                v-for="(item, index) in hospital"
                :key="index"
                class="department-choose-hospital"
                @click.native="goToHospitalPage(item)"
            >
                <div class="hospital-image">
                <img :src="item.image" style="width: 100%; height: 100%" />
                </div>
                <div class="hospital-content">
                <div class="hospital-name">{{ item.name }}</div>
                <div class="hospital-level">{{ item.level }}</div>
                </div>
            </el-col>
          </el-row>
        </template>
        
      </el-tab-pane>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          layout="total,prev, pager, next, jumper"
          :total="hospital.length"
        >
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import { getHospListInfo } from "../api/main";
import { getMap } from "../utils/map";

export default {
  name: "DepartmentChoose",
  mounted() {
    this.initPage(0);
    this.currentHospital = [];
    for (var i = 0; i < this.pageSize; i++) {
      if (this.hospital[this.pageSize * (this.currentPage - 1) + i] != null)
        this.currentHospital[i] =
          this.hospital[this.pageSize * (this.currentPage - 1) + i];
    }
    // this.currentPage=1;
  },
  methods: {
    handleClick(tab) {
      this.initPage(tab.index);
    },
    goToHospitalPage(item) {
        console.log(item);
        // console.log(row);
        sessionStorage.setItem("selectedHosID",item.id);
        this.$router.push({path: '/hospital',query:{ hosID:item.id}});
        // localStorage.setItem("selectedHosID",10);
    },
    initPage(index) {
      getHospListInfo({ id: this.department[index].id })
        .then((response) => {
          // this.hospital=[],
          this.hospital = response.data;
          this.hospital.forEach((element, index) => {
            element.level = getMap(element.level);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
      pageSize: 3,
      currentPage: 2,
      allHospital: [],
      hospital: [],
      //  [
      //   {
      //     name: "北京协和医院",
      //     level: "三甲",
      //     image: require("../assets/back.jpeg"),
      //     attribute4: "",
      //     attribute5: "",
      //   },
      //   {
      //     name: "柳州人民医院",
      //     level: "三甲",
      //     image: require("../assets/back.jpeg"),
      //     attribute4: "",
      //     attribute5: "",
      //   },
      //   {
      //     name: "重庆人民医院",
      //     level: "三甲",
      //     image: require("../assets/back.jpeg"),
      //     attribute4: "",
      //     attribute5: "",
      //   },
      //   {
      //     name: "金华人民医院",
      //     level: "三甲",
      //     image: require("../assets/back.jpeg"),
      //     attribute4: "",
      //     attribute5: "",
      //   },
      //   {
      //     name: "南宁人民医院",
      //     level: "三甲",
      //     image: require("../assets/back.jpeg"),
      //     attribute4: "",
      //     attribute5: "",
      //   },
      // ],
      department: [
        // 筛选方法
        {
          name: "消化科",
          id: 10,
        },
        {
          name: "眼科",
          id: 11,
        },
        {
          name: "测试科室",
          id: 10000,
        },
        {
          name: "测试科室1",
          id: 10001,
        },
        // {
        //   name: "内科",
        // },
        // {
        //   name: "中医科",
        // },
        // {
        //   name: "肿瘤科",
        // },
        // {
        //   name: "儿科",
        // },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
@import "../style/css/DepartmentChoose.less";
</style>