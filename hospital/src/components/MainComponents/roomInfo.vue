<template>
  <div>
    <!-- :data="tableData" -->
    <!-- v-for="item in items" :key="item" -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="300"> </el-table-column>
      <el-table-column prop="name" label="名称" width="300"> </el-table-column>
      <el-table-column prop="introduction" label="简介" >
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="see">测试</el-button>
  </div>
</template>

<script>
import {getDepartListById} from "../../api/department";

export default {
  name: "RoomInfo",

  data() {
    return {
      resData: [],

      user_id: this.$route.query.type + "",
      temp_id: "1",

      tableData: [
        this.$store.state.datas.departData[0],
        this.$store.state.datas.departData[1],
        ],
    }
  },

  created() { 
    // for (var i=0;i<=1;i++)
    // this.tableData[i]=this.$store.state.datas.departData[i];
    // this.cleanData[i]=[this.$store.state.datas.departData[i].id,this.$store.state.datas.departData[i].name,this.$store.state.datas.departData[i].introduction]; 
  },
  mounted(){
    getDepartListById({
        id:this.temp_id+"",
      }).then(response=>{
        this.resData=response.data;
        console.log(this.resData);
        this.$store
        .dispatch("setDepart",this.resData)
        .then(()=>{
          console.log(1);
        })
        .catch(err=>{
          consoler.log(0);
        })
        
      }).catch(error=>{
        console.log(0);
      });
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    see(){
      
      console.log(this.tableData);
    },
  },
};
</script>

<style>
</style>