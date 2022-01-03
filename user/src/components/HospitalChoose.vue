<template>
  <div class="hospital-choose">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="item in sortType" :key="item" :label="item.name">
        <template v-if="item.type == 0">
          <el-row :gutter="20">
            <el-col
              :span="8"
              v-for="hospital in currentHospital"
              :key="hospital"
              class="department-choose-hospital"
              @click.native="goToHospitalPage(hospital)"
            >
              <div>
                <div class="hospital-image">
                  <img
                    :src="hospital.image"
                    style="width: 100%; height: 100%"
                  />
                </div>
                <div class="hospital-content">
                  <div class="hospital-name">{{ hospital.name }}</div>
                  <div class="level">
                    <div class="hospital-level">{{ hospital.level }}</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
        <template v-if="item.type == 1">
          <el-row :gutter="20">
            <el-col
              :span="8"
              v-for="hospital in currentHospital"
              :key="hospital.level"
              class="department-choose-hospital"
            >
              <div @click="goToHospitalPage(hospital.id)">
                <div class="hospital-image">
                  <img
                    :src="hospital.image"
                    style="width: 100%; height: 100%"
                  />
                </div>
                <div class="hospital-content">
                  <div class="hospital-name">{{ hospital.name }}</div>
                  <div class="level">
                    <div class="hospital-level">{{ hospital.level }}</div>
                  </div>
                </div>
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
import { getHospList } from "../api/main";
import { getMap } from "../utils/map";

export default {
  name: "HospitalChoose",
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
      this.currentPage = 1;
      // console.log(tab.get);
      this.initPage(tab.index);
    },
    goToHospitalPage(item) {
      console.log(item);
      // console.log(row);
      sessionStorage.setItem("selectedHosID", item.id);
      this.$router.push({ path: "/hospital", query: { hosID: item.id } });
      // localStorage.setItem("selectedHosID",10);
    },
    initPage(index) {
      getHospList()
        .then((response) => {
          this.hospital = [];
          // this.hospital = response.data;
          if (index == 1) {
            // console.log(response.data);
            response.data.sort(function (a, b) {
              return a.level - b.level;
            });
            // console.log(response.data);
          }
          response.data.forEach((element) => {
            if (element.level == null || element.level == "") console.log(1);
            else {
              element.level = getMap(element.level);
              this.hospital.push(element);
            }
            /** */
            this.currentHospital = [];
            for (var i = 0; i < this.pageSize; i++) {
              if (
                this.hospital[this.pageSize * (this.currentPage - 1) + i] !=
                null
              )
                this.currentHospital[i] =
                  this.hospital[this.pageSize * (this.currentPage - 1) + i];
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
      // console.log(val)
      this.currentHospital = [];
      for (var i = 0; i < this.pageSize; i++) {
        if (this.hospital[this.pageSize * (this.currentPage - 1) + i] != null)
          this.currentHospital[i] =
            this.hospital[this.pageSize * (this.currentPage - 1) + i];
      }
      // console.log(this.currentHospital)
    },
  },
  data() {
    return {
      currentHospital: [],
      pageSize: 3,
      currentPage: 1,
      allHospital: [],
      hospital: [],
      sortType: [
        // 筛选方法
        {
          id: "1",
          name: "综合",
          type: 0,
        },
        {
          id: "2",
          name: "医院等级",
          type: 1,
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
@import "../style/css/HospitalChoose.less";
</style>