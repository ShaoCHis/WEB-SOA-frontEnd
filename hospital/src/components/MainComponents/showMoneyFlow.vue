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
          style="width: 150px; margin-right: 10px"
        ></el-date-picker>
        - &nbsp;
        <el-date-picker
          v-model="Time[1]"
          type="date"
          placeholder="选择结束时间"
          :picker-options="pickerOptionsEnd"
          style="width: 150px"
        ></el-date-picker>
        <el-button class="select" type="primary" @click="getMoney"
          >筛选</el-button
        >
        <el-card>
          <div id="main" style="width: 500px; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col class="chart2" :span="8">
        <span class="demonstration">请选择年份:&nbsp;</span>
        <el-date-picker
          v-model="Year"
          type="year"
          placeholder="选择开始时间"
          style="width: 150px; margin-right: 10px"
        ></el-date-picker>
        <el-button class="select" type="primary" @click="getStatement"
          >筛选</el-button
        >
        <el-card>
          <div id="main2" style="overflow-y: auto; width: 500px; height: 400px">
            <el-table :data="monthStatement" border stripe>
              <el-table-column width="160" prop="date" label="月份">
              </el-table-column>
              <el-table-column width="160" prop="money" label="流水金额/元">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-descriptions title="今日流水">
          <el-descriptions-item :label="today"
            >{{ todayMondy }} 元</el-descriptions-item
          >
        </el-descriptions>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStatementMonth, getStatementDay } from "../../api/statement";

// 引入 ECharts 主模块
const echarts = require("echarts");

function get(start_time, end_time) {
  var bd = new Date(start_time),
    be = new Date(end_time);
  var bd_time = bd.getTime(),
    be_time = be.getTime(),
    time_diff = be_time - bd_time;
  var d_arr = [];
  for (var i = 0; i <= time_diff; i += 86400000) {
    var ds = new Date(bd_time + i);
    d_arr.push(ds.getMonth() + 1 + "/" + ds.getDate());
  }
  // console.log(d_arr);
  return d_arr;
}
function change(data) {
  return data.substring(5, data.length).replace("-", "/");
}
export default {
  name: "MoneyFlow",
  data() {
    return {
      Time: [
        new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        new Date(Date.now()),
      ],
      statement: {
        date: [],
        money: [],
      },
      Year: new Date(Date.now()),
      monthStatement: [{ date: "", money: null }],
      charts1: "",
      charts2: "",
      today: "",
      todayMondy: 0,
      //时间验证器
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.Time[1]) {
            return (
              //time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() > new Date(this.Time[1]).getTime() ||
              time.getTime() <
                new Date(this.Time[1]).getTime() - 30 * 24 * 60 * 60 * 1000
            );
          }
          //return time.getTime() < Date.now() - 8.64e7;
        },
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.Time[0])
            return (
              //time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(this.Time[0]).getTime() ||
              time.getTime() >
                new Date(this.Time[0]).getTime() + 29 * 24 * 60 * 60 * 1000
            );
        },
      },
    };
  },
  methods: {
    getMoney() {
      getStatementDay(sessionStorage.getItem("HospitalID"), this.Time)
        .then((response) => {
          //console.log(this.Time);
          this.statement.date = get(this.Time[0], this.Time[1]);

          for (var i = 0; i < this.statement.date.length; i++) {
            this.statement.money[i] = 0;
          }
          //console.log(this.statement.date);
          response.data.forEach((element) => {
            // console.log(change(element.date));
            for (var i = 0; i < this.statement.date.length; i++) {
              // console.log(this.statement.date[i]);
              // console.log(change(element.date));
              if (this.statement.date[i] != change(element.date)) {
                this.statement.money[i] = 0;
              } else this.statement[i].money = element.money;
              if (change(this.todyay) == change(element.date))
                this.todayMondy = element.money;
            }
          });
          // console.log(this.statement);
          this.$nextTick(function () {
            this.drawLine("main");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStatement() {
      this.monthStatement = [
        { date: "一月", money: 0 },
        { date: "二月", money: 0 },
        { date: "三月", money: 0 },
        { date: "四月", money: 0 },
        { date: "五月", money: 0 },
        { date: "六月", money: 0 },
        { date: "七月", money: 0 },
        { date: "八月", money: 0 },
        { date: "九月", money: 0 },
        { date: "十月", money: 0 },
        { date: "十一月", money: 0 },
        { date: "十二月", money: 0 },
      ];
      // console.log(this.Year.getFullYear());
      for (var k = 1; k <= 12; k++) {
        getStatementMonth(
          this.Year.getFullYear(),
          k,
          sessionStorage.getItem("HospitalID")
        )
          .then((response) => {
            var tmp = response.data;
            tmp.forEach((element) => {
              var t = 0;
              t = parseInt(element.date.substring(5, 7));
              this.monthStatement[t - 1].money =
                this.monthStatement[t - 1].money + element.money;
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // console.log(this.monthStatement);
      // console.log(Array.from(this.monthStatement));
      // this.$nextTick(function () {
      //   this.drawLine2("main2");
      // });
    },
    //按时间段
    drawLine(id) {
      // 基于准备好的dom，初始化echarts实例
      this.charts1 = echarts.init(document.getElementById(id));
      this.charts1.setOption(
        {
          title: {
            text:
              this.Time[0].getFullYear() +
              "-" +
              this.Time[0].getMonth() +
              "-" +
              this.Time[0].getDate() +
              " " +
              "至" +
              this.Time[1].getFullYear() +
              "-" +
              this.Time[1].getMonth() +
              "-" +
              this.Time[1].getDate() +
              " " +
              "流水",
            textStyle: {
              //文字颜色
              color: "#ccc",
              //字体风格,'normal','italic','oblique'
              fontStyle: "normal",
              //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
              fontWeight: "bold",
              //字体系列
              fontFamily: "sans-serif",
              //字体大小
              fontSize: 12,
            },
          },
          tooltip: {
            // 设置tip提示
            trigger: "axis",
            backgroundColor: "#0dcba3",
          },
          legend: {
            data: ["流水"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },

          toolbox: {
            // feature: {
            //   saveAsImage: {},
            // },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.statement.date,
          },
          yAxis: {
            type: "value",
          },

          series: [
            {
              name: "流水",
              type: "line",
              stack: "总量",
              data: this.statement.money,
            },
          ],
        },
        true
      );
    },
    //   //按月份或年份
    //   drawLine2(id) {
    //     // 基于准备好的dom，初始化echarts实例
    //     this.charts2 = echarts.init(document.getElementById(id));
    //     this.charts2.setOption({
    //       title: {
    //         text: this.Year.getFullYear() + "年流水",
    //         textStyle: {
    //           //文字颜色
    //           color: "#ccc",
    //           //字体风格,'normal','italic','oblique'
    //           fontStyle: "normal",
    //           //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
    //           fontWeight: "bold",
    //           //字体系列
    //           fontFamily: "sans-serif",
    //           //字体大小
    //           fontSize: 12,
    //         },
    //       },
    //       tooltip: {
    //         // 设置tip提示
    //         trigger: "axis",
    //         backgroundColor: "#0dcba3",
    //       },
    //       legend: {
    //         data: ["流水"],
    //       },
    //       grid: {
    //         left: "3%",
    //         right: "4%",
    //         bottom: "3%",
    //         containLabel: true,
    //       },

    //       toolbox: {
    //         // feature: {
    //         //   saveAsImage: {},
    //         // },
    //       },
    //       xAxis: {
    //         type: "category",
    //         boundaryGap: false,
    //         data: [
    //           "1月",
    //           "2月",
    //           "3月",
    //           "4月",
    //           "5月",
    //           "6月",
    //           "7月",
    //           "8月",
    //           "9月",
    //           "10月",
    //           "11月",
    //           "12月",
    //         ],
    //       },
    //       yAxis: {
    //         type: "value",
    //       },

    //       series: [
    //         {
    //           name: "流水",
    //           type: "var",
    //           data: this.monthStatement,
    //         },
    //       ],
    //     });
    //   },
  },
  created() {},
  mounted() {
    var now = new Date(Date.now());
    this.today = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    this.getMoney();
    // this.getStatement();
  },
};
</script>

<style>
.select {
  margin-left: 20px;
}
</style>