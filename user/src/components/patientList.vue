<template>
  <div>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="42%"
      :before-close="handleClose"
    >
      <el-card class="table">
        <el-table :data="patientList" :key="index" stripe>
          <el-table-column label="病人身份证" width="200">
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.row.patientId"></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="病人姓名" width="180">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="180">
          </el-table-column>
        </el-table>
        <div>
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from "../api/user";
export default {
  name: "patientList",
  mounted() {
    this.getPatientList();
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userID: sessionStorage.getItem("userId"),
      patientList: [],
      radio: 0,
    };
  },
  methods: {
    getPatientList() {
      getUserInfo({ id: this.userID })
        .then((response) => {
        //   console.log(response.data.patients);
          this.patientList = response.data.patients;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submit() {
    //   console.log(this.radio);
      if (this.radio == 0) {
        this.$message({
          message: "请先选择病人",
        });
        return;
      }
      this.patientList.forEach((element) => {
        if (element.patientId == this.radio)
          sessionStorage.setItem("patientName", element.name);
      });
      sessionStorage.setItem("patientID", this.radio);
      this.$emit("commit");
    },
    cancel() {
      this.$emit("cancel");
      //   this.dialogVisible = false;
    },
  },
};
</script>

<style>
/* .table {
  width: 600px;
} */
</style>