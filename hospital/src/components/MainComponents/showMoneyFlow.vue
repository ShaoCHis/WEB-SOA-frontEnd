<template>
  <div>
    <el-row :gutter="12">
      <el-col class="chart2" :span="12">
        <span class="demonstration">请选择时间段:&nbsp;</span>
        <el-date-picker
          v-model="Time[0]"
          type="date"
          placeholder="选择开始时间"
          :picker-options="pickerOptionsStart"
          value-format="yyyy-MM-dd"
          style="width: 150px; margin-right: 10px"
        ></el-date-picker>
        - &nbsp;
        <el-date-picker
          v-model="Time[1]"
          type="date"
          placeholder="选择结束时间"
          :picker-options="pickerOptionsEnd"
          value-format="yyyy-MM-dd"
          style="width: 150px"
        ></el-date-picker>
        <el-button class="select" type="primary" @click="test">筛选</el-button>
        <el-card>
          <div id="main" style="width: 500px; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col class="chart2" :span="12">
        <span class="demonstration">请选择时间段:&nbsp;</span>
        <el-date-picker
          v-model="Day"
          type="date"
          placeholder="选择开始时间"
          :picker-options="pickerOptionsStart"
          value-format="yyyy-MM-dd"
          style="width: 150px; margin-right: 10px"
        ></el-date-picker>
        <el-card>
          <div id="main2" style="width: 500px; height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getStatementMonth,
  getStatementYear,
  getStatementDay,
} from "../../api/statement";

// 引入 ECharts 主模块
const echarts = require("echarts");

export default {
  name: "MoneyFlow",
  data() {
    return {
      Time: [,],
      statement: {
        date: [],
        money: [],
      },
      Day: "",
      opinionData: ["3", "2", "4", "4", "5"],
      charts: "",
      //时间验证器
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.Time[1]) {
            return (
              //time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() >
                new Date(this.Time[1]).getTime() - 1 * 24 * 60 * 60 * 1000 ||
              time.getTime() <
                new Date(this.Time[1]).getTime() - 30 * 24 * 60 * 60 * 1000
            );
          }
          //return time.getTime() < Date.now() - 8.64e7;
        },
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          return (
            //time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() <
              new Date(this.Time[0]).getTime() + 1 * 24 * 60 * 60 * 1000 &&
            time.getTime() >
              new Date(this.Time[0]).getTime() + 30 * 24 * 60 * 60 * 1000
          );
        },
      },
    };
  },
  methods: {
    test() {
      getStatementDay(sessionStorage.getItem("HospitalID"), this.Time)
        .then((response) => {
          console.log(this.Time);
          response.data.forEach((element) => {
            this.statement.date.push(element.date);
            this.statement.money.push(element.money);
          });
          console.log(this.statement);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //按时间段
    drawLine(id) {
      // 基于准备好的dom，初始化echarts实例
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          // 设置tip提示
          trigger: "axis",
          backgroundColor: "#0dcba3",
        },
        legend: {
          data: ["某段时间流水"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1", "2", "3", "4", "5"],
        },
        yAxis: {
          type: "value",
        },

        series: [
          {
            name: "某段时间流水",
            type: "line",
            stack: "总量",
            data: this.opinionData,
          },
        ],
      });
    },
    //按月份或年份
    drawLine2(id) {
      // 基于准备好的dom，初始化echarts实例
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          // 设置tip提示
          trigger: "axis",
          backgroundColor: "#0dcba3",
        },
        legend: {
          data: ["某段时间流水"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1", "2", "3", "4", "5"],
        },
        yAxis: {
          type: "value",
        },

        series: [
          {
            name: "某段时间流水",
            type: "line",
            stack: "总量",
            data: this.opinionData,
          },
        ],
      });
    },
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      this.drawLine("main");
      this.drawLine2("main2");
    });
  },
};
</script>

<style>
.select {
  margin-left: 20px;
}
</style>