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
            <!-- <el-table-column label="操作">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定要删除这个医院吗"
                  @confirm="remove(scope.row)"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    slot="reference"
                  ></el-button>
                </el-popconfirm> </template
            ></el-table-column> -->
          </el-table>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { getAllHospital } from "../../api/hospital";
import { getMap } from "../../utils/map";

export default {
  name: "HosList",
  data() {
    return {
      hospital: [],
    };
  },
  mounted() {
    //console.log(this.$store.state.user);
    getAllHospital()
      .then((response) => {
        this.hospital = response.data;
        // console.log(this.hospital);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  created() {
    //   console.log(123)
  },
  methods: {
    addNotice() {
      alert("添加通知!");
    },
    deleteNotice() {
      alert("删除通知!");
    },
    //获取医院信息
    getHospitalInfo() {
      var hospital;
    },
    remove(row) {},
  },
};
</script>

<style lang="less" scoped>
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
  overflow: auto;
}
.text {
  font-size: 18px;
  text-align: center;
}
.HosList {
  margin-top: 15px;
}
</style>