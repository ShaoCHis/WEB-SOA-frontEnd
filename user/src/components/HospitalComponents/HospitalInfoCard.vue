<template>
  <div class="hospitalInfoCard">
      <el-card style="height:300px;margin-bottom:20px;">
          <el-row>
              <el-col>
                  <div class="hospital-image">
                    <img :src="hospital.image" style="width: 200px; height: 200px" />
                </div>
                <div class="hospital-content">
                    <div class="hospital-name">{{ hospital.name }}</div>
                    <div class="hospital-level">医院等级:{{ hospital.level }}级甲等</div>
                    <div class="hospital-location">地址:{{ hospital.location }}</div>
                    <div class="hospital-description">简介:{{ hospital.introduction }}</div>
                </div>
              </el-col>
              <el-col>
                  <el-button type="primary" style="margin-left:50%">预约挂号</el-button>
              </el-col>
          </el-row>
      </el-card>
  </div>
</template>

<script>
import { getHospInfo } from "../../api/hospital";
// import { getMap } from "../utils/map";
export default {
    name:"HospitalInfoCard",
    data(){
        return{
            hosID:sessionStorage.getItem("selectedHosID"),
            hospital:[],
        };
    },
    mounted(){
        this.initPage();
    },
    methods:{
        initPage() {
            getHospInfo({ id: this.hosID })
                .then((response) => {
                this.hospital = response.data;})
                this.hospital.forEach((element, index) => {
                    element.level = getMap(element.level);
                })
                .catch((error) => {
                console.log(error);
                });
        },
    },
}
</script>

<style lang="less" scoped>
@import "../../style/css/HospitalInfoCard.less";
</style>