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
          <el-form-item label="密码" prop="code" class="item-form">
            <el-input
              v-model="registerForm.code"
              prefix-icon="el-icon-lock"
              type="code"
            ></el-input>
          </el-form-item>
          <!-- 联系方式 -->
          <el-form-item label="联系电话" prop="contact" class="item-form">
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
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="register">申请加入</el-button>
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
import { validatePhone, validdateContact } from "@/utils/validator";

export default {
  name: "Register",
  data() {
    return {
      fileList: [],

      registerForm: {
        name: "", //医院名称
        code: "", //密码
        contact: "", //联系方式
        image: "", //图片
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
      },
    };
  },
  methods: {
    getImgBase() {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function (e) {
        _this.imgBase64.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    //删除图片
    delImg(index) {
      this.imgBase64.splice(index, 1);
    },

    //重置按钮
    resetRegisterForm() {
      // console.log(this)
      this.$refs.registerFormRef.resetFields();
    },
    register() {
      this.$axios
        .post("/apply/info", {
          name: this.registerForm.name, //医院名称
          code: this.registerForm.code, //密码
          contact: this.registerForm.contact, //联系方式
          description: "", //医院简介
          image: "", //图片
          level: parseInt(this.registerForm.level), //医院等级，int类型
          location: "", //位置
          status: 0, //医院状态（是否激活）
        })
        .then((response) => {
          console.log(1);
          console.log(response.data.success);
          if (
            response.data.success == true &&
            this.registerForm.name != "" &&
            this.registerForm.code != "" &&
            this.registerForm.contact != "" &&
            this.registerForm.level != ""
          ) {
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

//.el-form-item__label: 自动匹配form表单中label的，但需取消scope(注意:中间是连续的两个'_')
// .item-form .el-form-item__label{
//     color: cornflowerblue;
// }

.btns {
  display: flex;
  justify-content: center;
  padding: 0 5px;
}
</style>