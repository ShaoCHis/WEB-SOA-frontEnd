<template>
  <div class="home page-component">
    <el-form label-width="120px" v-if="flag">
      <el-form-item label="姓名">
        <el-input v-model="patient.patientName" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="patient.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="patient.age" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="patient.phone" />
      </el-form-item>

      <el-form-item label="地址">
        <el-input v-model="patient.address" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import patientSet from "@/api/patientSet";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      userinfo: "",
      patient: "",
      falg: false,
    };
  },

  created() {
    // console.log("11111");
    // console.log("patient", this.patient);
    this.patient = Cookie.get("userinfo");
    if (this.patient != null) {
      if (typeof this.patient !== "object") {
        // console.log(33333333333333);
        this.patient = JSON.parse(this.patient);
        this.flag = true;
      }
    }
  },

  methods: {
    save() {
      patientSet.updatePatient(this.patient).then((response) => {
        this.patientother = JSON.stringify(this.patient);
        // console.log(response);
        // console.log(this.patient);
        this.patient = Cookie.set("userinfo", this.patient, { expires: 7 });
        this.patient = Cookie.get("userinfo");
        if (this.patient != null) {
          this.patient = JSON.parse(this.patient);
        }
        //提示
        this.$message({
          duration: 1000,
          type: "success",
          message: "修改成功!",
        });
      });
    },
  },
};
</script>
