<template>
  <div>
    <div class="register_container">
      <div class="register_box">
        <div class="tip">
          <h1>医院加入申请</h1>
        </div>

        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerFormRules"
          label-width="auto"
          class="register_form"
        >
          <!-- 医院名称 -->
          <el-form-item label="医院名称" prop="name" class="item-form">
            <el-input v-model="registerForm.name" type="code"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="医院编码" prop="code" class="item-form">
            <el-input
              v-model="registerForm.code"
              prefix-icon="el-icon-lock"
              type="code"
            ></el-input>
          </el-form-item>
          <!-- 联系方式 -->
          <el-form-item label="联系方式" prop="contact" class="item-form">
            <el-input v-model="registerForm.contact" type="code"></el-input>
          </el-form-item>
          <!-- 医院地址 -->
          <el-form-item label="医院地址" prop="location" class="item-form">
            <el-input v-model="registerForm.location" type="text"></el-input>
          </el-form-item>
          <!-- 医院等级 -->
          <el-form-item label="医院等级" prop="level" class="item-form">
            <el-select
              v-model="registerForm.level"
              @change="searchSelect(registerForm.level)"
              placeholder="请选择医院等级"
              style="width: 100%"
              prefix
            >
              <el-option
                v-for="item in options"
                :key="item.level"
                :label="item.label"
                :value="item.level"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!--上传图片-->
          <el-form-item>
            <el-upload
              action="http://localhost:8084/oss/fileoss"
              class="upload"
              :auto-upload="false"
              ref="upload"
              accept=".jpg,.png"
              :limit="1"
              :on-exceed="
                () => {
                  this.$message({
                    message: '最多上传一个文件',
                    type: 'error',
                  });
                }
              "
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="Register">申请加入</el-button>
            <el-button type="info" @click="resetRegisterForm">重置</el-button>
            <el-button type="text" @click="login">
              已拥有账号？点此处登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validdateContact } from "@/utils/validator";
import { register } from "@/api/login";

export default {
  name: "Register",
  data() {
    return {
      fileList: [],

      registerForm: {
        name: "", //医院名称
        code: "", //密码
        contact: "", //联系方式
        level: "", //医院等级，int类型
        location: "", //位置
      },

      options: [
        { label: "一级甲等", level: 1 },
        { label: "一级乙等", level: 2 },
        { label: "一级丙等", level: 3 },
        { label: "二级甲等", level: 4 },
        { label: "二级乙等", level: 5 },
        { label: "二级丙等", level: 6 },
        { label: "三级特等", level: 7 },
        { label: "三级甲等", level: 8 },
        { label: "三级乙等", level: 9 },
        { label: "三级丙等", level: 10 },
      ],

      registerFormRules: {
        name: [
          { required: true, message: "请输入医院名称！", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "医院名称不少于3个字符，不多于20个字符！",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入医院编码",
            trigger: "blur",
            min: 1,
          },
        ],
        contact: [
          {
            required: true,
            validator: validdateContact,
            trigger: "change",
          },
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur",
            min: 1,
          },
        ],
        location: [
          {
            required: true,
            min: 1,
            message: "请输入医院地址",
            trigger: "change",
          },
          {
            required: true,
            min: 1,
            message: "请输入医院地址",
            trigger: "blur",
          },
        ],
        level: [
          {
            required: true,
          },
        ],
      },
    };
  },
  methods: {
    //重置按钮
    resetRegisterForm() {
      // console.log(this)
      this.$refs.registerFormRef.resetFields();
    },
    judgeInput() {
      if (
        this.registerForm.name == "" ||
        this.registerForm.code == "" ||
        this.registerForm.contact == "" ||
        this.registerForm.location == "" ||
        this.registerForm.level == ""
      )
        return false;
    },
    Register() {
      if (this.judgeInput() == false) {
        this.$message({
          message: "请输入完整信息",
          type: "error",
        });
        return;
      }
      register({
        Info: this.registerForm,
      })
        .then((response) => {
          console.log(1);
          console.log(response.data.success);
          if (response.data.success == true) {
            this.$message({
              message: "申请成功！",
              type: "success",
            });
            this.$router.push({ name: "Main" });
          } else {
            this.$message({
              message: "申请失败，请重新提交！",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(0);
        });

      //  if(this.value=="Student") this.$router.push('/mainpage');
      //  if(this.value=="Teacher") this.$router.push('/tmainpage');
      //  if(this.value=="Admin") this.$router.push('/managepage');
    },
    login() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  color: cornflowerblue;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  // margin-bottom: 30px;
}

.register_container {
  background-color: #5c2c948c;
  background-image: url("../assets/back.jpeg");
  background-size: 100%, 100%;
  height: 100%;
  width: 100%;
  position: fixed;
}

.register_box {
  width: 520px;
  height: 650px;
  background-color: #fff;
  border-radius: 25px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.5);
}
.register_form {
  margin-top: 15px;
  position: absolute;
  top: 20%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.item-props {
  margin-bottom: 0;
}

.item-form {
  font-weight: bold;
  font-size: 15px;
  bottom: 0;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
  padding: 0 5px;
}
</style>