<template>
  <div>
    <!-- :data="tableData" -->
    <!-- v-for="item in items" :key="item" -->
    <el-tabs
      @tab-click="handleClick"
      class="tab"
      type="border-card"
      tab-position="left"
    >
      <el-tab-pane
        class="roomList"
        v-for="item in resData"
        :key="item"
        :label="item.name"
      >
        <div>
          {{ item.name }}
          <el-divider></el-divider>
          {{ item.introduction }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getDepartListById } from "../../api/department";
import { getDepartById } from "../../api/department";

export default {
  name: "RoomInfo",

  data() {
    return {
      resData: [],
    };
  },

  created() {},

  mounted() {
    return new Promise((resolve, reject) => {
      getDepartListById({
        id: sessionStorage.getItem("HospitalID"),
      })
        .then((response) => {
          this.resData = response.data;
          console.log(response);
          resolve();
        })
        .catch((error) => {
          (this.loading = false),
            this.$message({
              message: "获取失败！",
              type: "error",
            });
          reject(error);
        });
    });
  },
  methods: {
    handleClick(tab, event) {
      var index = tab.index;
      var roomId = this.resData[index].id;
      console.log(roomId);
      getDepartById(roomId)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.tab {
  display: inline-block;
  height: 400px;
  width: 1100px;
}
</style>