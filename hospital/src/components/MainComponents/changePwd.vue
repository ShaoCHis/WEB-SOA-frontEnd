<template>
  <div>
    <el-form
      ref="changeForm"
      :model="changeForm"
      :rules="changeRules"
      label-width="80px"
    >
      <el-form-item prop="oldPwd" label="旧密码">
        <el-input
          placeholder="请输入旧密码"
          v-model="changeForm.oldPwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="newPwd" label="新密码">
        <el-input
          placeholder="请输入新密码"
          v-model="changeForm.newPwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="ensurePwd" label="确认密码">
        <el-input
          placeholder="请确认新密码"
          v-model="changeForm.ensurePwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="commit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { isPassword } from "../../utils/validator";
import { hospModifyPassword } from "../../api/hospital";
export default {
  name: "ChangePwd",
  data() {
    const pwdAgainCheck = async (rule, value, callback) => {
      if (this.changeForm.newPwd != this.changeForm.ensurePwd) {
        return callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      changeForm: {
        oldPwd: "",
        newPwd: "",
        ensurePwd: "",
      },
      changeRules: {
        oldPwd: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur",
            min: 1,
          },
        ],
        newPwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
            min: 1,
          },
          { required: true, trigger: "change", validator: isPassword },
          { required: true, trigger: "blur", validator: isPassword },
        ],
        ensurePwd: [
          {
            required: true,
            message: "请确认新密码",
            trigger: "blur",
            min: 1,
          },
          {
            required: true,
            message: "与新密码不一致",
            trigger: "blur",
            validator: pwdAgainCheck,
          },
        ],
      },
    };
  },
  methods: {
    commit() {
      if (
        this.changeForm.newPwd.length < 6 ||
        this.changeForm.newPwd.length > 16 ||
        this.changeForm.ensurePwd.length < 6 ||
        this.changeForm.ensurePwd.length > 16
      )
        return;
      hospModifyPassword(
        sessionStorage.getItem("HospitalID"),
        this.changeForm.newPwd
      )
        .then((response) => {
          console.log(response);
          if (response.success == true) {
            this.$message({
              message: "密码修改成功",
              type: "success",
            });
            this.$refs.changeForm.resetFields();
          } else {
            this.$message({
              message: "密码修改失败",
              type: "error",
            });
            this.$refs.changeForm.resetFields();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.el-form-item {
  padding-top: 15px;
}
</style>