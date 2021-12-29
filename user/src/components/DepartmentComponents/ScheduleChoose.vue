<template>
  <div class="hospital-choose">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in departmentClass"
        :key="index"
        :label="item.name"
      >
      <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col
                :span="8"
                v-for="(item, index) in department"
                :key="index"
                class="department-choose-hospital"
                @click.native="goToDepartmentPage(item)"
            >
                <div class="hospital-image">
                <img src="../../assets/department_default.png" style="width: 100%; height: 100%" />
                </div>
                <div class="hospital-content">
                <div class="hospital-name">{{ item.name }}</div>
                <div class="hospital-level">{{ item.introduction }}</div>
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
          :total="department.length"
        >
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import { getDepartListById } from "../../api/department";
import { getMap } from "../../utils/map";

export default {
  name: "ScheduleChoose",
  mounted() {
    this.initPage(0);
    this.currentHospital = [];
    for (var i = 0; i < this.pageSize; i++) {
      if (this.department[this.pageSize * (this.currentPage - 1) + i] != null)
        this.currentHospital[i] =
          this.department[this.pageSize * (this.currentPage - 1) + i];
    }
    // this.currentPage=1;
  },
  methods: {
    handleClick(tab) {
      this.initPage(tab.index);
    },
    goToDepartmentPage(item) {
        console.log(item);
        sessionStorage.setItem("selectedDepartmentID",item.id);
        // console.log(row);
        this.$router.push({path: '/department'});
        // localStorage.setItem("selectedHosID",10);
    },
    initPage(index) {
      getDepartListById({ id: sessionStorage.getItem("selectedHosID") })
        .then((response) => {
          // this.hospital=[],
          this.department = response.data;
          this.department.forEach((element, index) => {
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
        if (this.department[this.pageSize * (this.currentPage - 1) + i] != null)
          this.currentHospital[i] =
            this.department[this.pageSize * (this.currentPage - 1) + i];
      }
    },
  },
  data() {
    return {
      currentHospital: [],
      pageSize: 3,
      currentPage: 2,
      allHospital: [],
      department: [],
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
      departmentClass: [
        // 筛选方法
        {
          name: "挂号科室",
        },
        {
          name: "特色科室",
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
@import "../../style/css/ScheduleChoose.less";
</style>