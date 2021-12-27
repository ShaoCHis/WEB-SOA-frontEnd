<template>
  <div class="hospital-choose">
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="(item, index) in department"
        :key="index"
        :label="item.name"
        @click="initPage(index)"
      >
        <el-row :gutter="20">
          <el-col
            :span="8"
            v-for="(item, index) in hospital"
            :key="index"
            class="department-choose-hospital"
            @click="goToHospitalPage"
          >

              <div class="hospital-image">
              <img :src="item.image" style="width: 100%; height: 100%" />
            </div>
            <div class="hospital-content">
              <div class="hospital-name">{{ item.name }}</div>
</template>
<script>
import {getHospListInfo} from "../api/main"
import {getMap} from "../utils/map"

export default {
  name: "DepartmentChoose",
  mounted() {
        this.initPage(0);
    this.currentHospital = [];
    for (var i = 0; i < this.pageSize; i++) {
      if (this.hospital[this.pageSize * (this.currentPage - 1) + i] != null)
        this.currentHospital[i] =
          this.hospital[this.pageSize * (this.currentPage - 1) + i];
    };
    // this.currentPage=1;
  },
  methods: {
    //根据科室ID获取医院详细信息
    fetchHospitalByDepartment() {
      for (var i = 0; i < this.department.length; i++) {
        getHospListInfo({
          id: this.department[i].id,
        }).then((response) => {
          response.data.forEach((element) => {
            // this.department[i].hosRes.push(element);
            var tmp={}
            tmp=element.data
            console.log(tmp)
          });
          // console.log(this.department[i].hosRes);
          // const {respo nse}=obj;
          // this.department[i].hosRes={response}.map(el=>el);
          // console.log(this.department[i].hosRes);
          // console.log(this.department[0]);
          // console.log(this.department[i]);
          // console.log(response.data);
          // console.log(response.data[0]);
          // console.log(response.data[0].password);
          // this.department[i].hosRes.push({
          //     password:response.data[0].password,
          //     code:response.data[0].code,
          //     name:response.data[0].name,
          //     introduction:response.data[0].introduction,
          //     image:response.data[0].image,
          //     level:response.data[0].level,
          //     location:response.data[0].location,
          //     notice:response.data[0].notice,
          //     id:response.data[0].id,
          // })
          // console.log(this.department[i].hosRes);
        });
      }
    },
    goToHospitalPage() {},
    initPage(index){
      getHospListInfo({id:this.department[index].id,}).then((response)=>{
        // this.hospital=[],
        this.hospital=response.data;
        this.hospital.forEach((element,index) => {
          element.level=getMap(element.level);
        });
      })
      .catch((error)=>{
        console.log(error);
      })
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
      allHospital:[],
      hospital:[],
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
          id:10,
        },
        {
          name: "眼科",
          id:11,
        },
        {
          name: "测试科室",
          id:10000,
        },
        {
          name: "测试科室1",
          id:10001,
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
@import "../style/css/HospitalChoose.less";
</style>