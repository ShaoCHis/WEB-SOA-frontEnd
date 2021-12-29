<template>
  <div>
    <div class="block">
      <span class="demonstration">请选择时间段</span>
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
      <el-button @click="test"></el-button>
      <el-card>
        <div id="main" style="width: 600px; height: 400px"></div>
      </el-card>
    </div>
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
      opinionData: ["3", "2", "4", "4", "5"],
      charts: "",
      //时间验证器
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.Time[1]) {
            return (
              //time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() >
              new Date(this.Time[1]).getTime() - 1 * 24 * 60 * 60 * 1000
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
            new Date(this.Time[0]).getTime() + 1 * 24 * 60 * 60 * 1000
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
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      this.drawLine("main");
    });
  },
};
</script>

<style>
</style>