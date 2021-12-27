<template>
<div class="department-choose">
        <el-tabs type="border-card">
          <el-tab-pane
            v-for="(item, index) in department"
            :key="index"
            :label="item.name"
          >
            <div
              class="department-choose-hospital"
              v-for="(item, index) in currentHospital"
              :key="index"
            >
              <div class="inner-choose">
                <el-divider></el-divider>
                <div class="hospital-image">
                  <img :src="item.image" style="width: 100%; height: 100%" />
                </div>
                <div class="hospital-content">
                  <div class="hospital-name">{{ item.name }}</div>
                  <div class="hospital-level">
                    <div class="inner-level">
                      {{ item.level }}
                      </div>
                      </div>
                </div>
                <div class="enter-hospital">
                  <div class="inner-enter" @click="goToHospitalPage()">
                    <a
                      style="text-decoration: none"
                      href="https://ak.hypergryph.com/index"
                      target="_blank"
                      >选择医院</a
                    >
                  </div>
                </div>
              </div>
            </div>
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
import {getHospListInfo} from "@/api/hospital.js"
export default{
    components:{getHospListInfo},
    name:"DepartmentChoose",
    mounted() {
    this.currentHospital = [];
    for (var i = 0; i < this.pageSize; i++) {
      if (this.hospital[this.pageSize * (this.currentPage - 1) + i] != null)
        this.currentHospital[i] =
          this.hospital[this.pageSize * (this.currentPage - 1) + i];
    }
    this.fetchHospitalByDepartment();
  },
  methods: {
    //根据科室ID获取医院详细信息
    fetchHospitalByDepartment(){
        for(var i=0;i<this.department.length;i++){
            getHospListInfo({
                id:this.department[i].id,
            }).then(response=>{
                // const {response}=obj;
                // this.department[i].hosRes={response}.map(el=>el);
                // console.log(this.department[i].hosRes);
                // console.log(this.department[0]);
                // console.log(this.department[i]);
                // console.log(response.data);
                // console.log(response.data[0]);
                // console.log(response.data[0].password);
                this.department[i].hosRes.push({
                    password:response.data[0].password,
                    code:response.data[0].code,
                    name:response.data[0].name,
                    introduction:response.data[0].introduction,
                    image:response.data[0].image,
                    level:response.data[0].level,
                    location:response.data[0].location,
                    notice:response.data[0].notice,
                    id:response.data[0].id,
                })
                // console.log(this.department[i].hosRes);
            })
        }
    },
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
        // {
        //   name: "北京协和医院",
        //   level: "三甲",
        //   image: require("../assets/back.jpeg"),
        //   attribute4: "",
        //   attribute5: "",
        // },
        // {
        //   name: "柳州人民医院",
        //   level: "三甲",
        //   image: require("../assets/back.jpeg"),
        //   attribute4: "",
        //   attribute5: "",
        // },
        // {
        //   name: "重庆人民医院",
        //   level: "三甲",
        //   image: require("../assets/back.jpeg"),
        //   attribute4: "",
        //   attribute5: "",
        // },
        // {
        //   name: "金华人民医院",
        //   level: "三甲",
        //   image: require("../assets/back.jpeg"),
        //   attribute4: "",
        //   attribute5: "",
        // },
        // {
        //   name: "南宁人民医院",
        //   level: "三甲",
        //   image: require("../assets/back.jpeg"),
        //   attribute4: "",
        //   attribute5: "",
        // },
      ],
      department: [
        {
          name: "消化科",
          id:10,
          hosRes:[],
        },
        {
          name: "眼科",
          id:11,
          hosRes:[],
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
}
</script>
<style lang="less" scoped>
@import "../style/css/DepartmentChoose.less";

</style>