<template>
  <div>
    <el-row :gutter="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px; text-align: center"
            ><b>医院列表</b></span
          >
          <el-table
            class="HosList"
            :data="hospital"
            border
            style="width: 100%"
            stripe
          >
            <el-table-column prop="id" label="医院ID"></el-table-column>
            <el-table-column label="医院ID">
              <template slot-scope="scope">
                <el-avatar shape="circle" :src="scope.row.image"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="医院名称"></el-table-column>
            <el-table-column prop="loaction" label="所在地"></el-table-column>
            <el-table-column prop="level" label="医院等级"></el-table-column>
            <el-table-column prop="code" label="医院编码"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  icon="el-icon-check"
                  circle
                  @click="commit(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-close"
                  circle
                  @click="refuse(scope.row)"
                ></el-button> </template
            ></el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { getAllHospital, hospJoin } from "../../api/hospital";
import { getMap } from "../../utils/map";

export default {
  name: "applyList",
  data() {
    return {
      hospital: [],
    };
  },
  methods: {
    commit(row) {
      console.log(row);
      hospJoin(row.id).then((response) => {
        if (response.success == true)
          this.$message({
            message: "成功",
            type: "success",
          });
        else
          this.$message({
            message: "失败",
            type: "error",
          });
      });
    },
    refuse(row) {
      console.log(row);
    },
  },
  mounted() {
    //console.log(this.$store.state.user);
    getAllHospital()
      .then((response) => {
        response.data.forEach((element) => {
          element.level = getMap(element.level);
          // console.log(element.status)
          if (element.status != 1) this.hospital.push(element);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  created() {},
};
</script>

<style>
.item {
  margin-bottom: 18px;
  font-size: 16px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  display: inline-block;
  min-height: 500px;
  max-height: 500px;
  width: 1100px;
  margin-left: 50px;
  text-align: center;
}
.text {
  font-size: 18px;
  text-align: center;
}
.HosList {
  margin-top: 15px;
}
</style>