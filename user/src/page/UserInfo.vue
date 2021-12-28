<template>
  <div class="mainContainer">
    <myheader></myheader>
    <div class="contentContainer">
      <!-- 根据科室选择医院 -->
      <!-- <div class="label">
          <div class="label-left"></div>
          <div class="label-name">根据科室选择医院</div>
        </div> -->

      <!-- 科室列表 -->
      <!-- <div class="label">
        <div class="label-left"></div>
        <div class="label-name">科室列表</div>
      </div> -->

      <!-- 用户信息 -->
      <el-card class="user-info">
        <el-descriptions
          class="margin-top"
          title="用户信息"
          :column="2"
          :size="size"
          border
        >
          <template slot="extra">
            <el-button
              v-if="isUpdating == false"
              type="primary"
              size="small"
              @click="updateUserInfo"
              >修改信息</el-button
            >
          </template>
          <el-descriptions-item v-if="isUpdating == false">
            <template slot="label">
              <i class="el-icon-user"></i>
              用户编号
            </template>
            {{ this.userInfo.userId }}
          </el-descriptions-item>
          <el-descriptions-item v-if="isUpdating == false">
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            {{ this.userInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item v-if="isUpdating == false">
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            {{ this.userInfo.phoneNumber }}
          </el-descriptions-item>
          <el-descriptions-item v-if="isUpdating == false">
            <template slot="label">
              <i class="el-icon-message"></i>
              邮箱
            </template>
            {{ this.userInfo.email }}
          </el-descriptions-item>
        </el-descriptions>

        <el-form
          v-if="isUpdating == true"
          ref="form"
          :model="form"
          label-width="80px"
          style="margin-left: -5%"
        >
          <el-form-item label="">
            <i class="el-icon-user" style="color: grey"> 用户名</i>
            <el-input v-model="form.name" style="width: 85%; margin-left: 5%">{{
              this.form.name
            }}</el-input>
          </el-form-item>
          <el-form-item label="">
            <i class="el-icon-mobile-phone" style="color: grey"> 手机号</i>
            <el-input
              v-model="form.phone"
              style="width: 85%; margin-left: 5%"
              >{{ this.form.phone }}</el-input
            >
          </el-form-item>
          <el-form-item label="">
            <i class="el-icon-message" style="color: grey"> 邮箱</i>
            <el-input
              v-model="form.email"
              style="width: 85%; margin-left: 6.2%"
              >{{ this.form.email }}</el-input
            >
          </el-form-item>
        </el-form>

        <el-button
          v-if="isUpdating == true"
          style="margin-left: 45%; margin-top: 5px"
          type="success"
          size="small"
          @click="confirmUpdate"
          >确认</el-button
        >
        <el-button
          v-if="isUpdating == true"
          type="danger"
          size="small"
          @click="cancelUpdate"
          >取消</el-button
        >
      </el-card>

      <!-- 患者信息 -->
      <el-card class="patients-info">
        <el-descriptions
          class="margin-top1"
          title="患者信息"
          :column="2"
          :size="size"
          border
        >
          <template slot="extra">
            <el-button
              v-if="isUpdating == false"
              style="margin-right:10px;"
              type="success"
              size="small"
              @click="addPatient"
              >添加患者</el-button
            >
            <el-dialog
              title="添加患者"
              :visible.sync="dialogFormVisible1"
              append-to-body="false"
              width="35%"
            >
              <el-form
                :model="addForm"
                label-width="90px"
                :rules="formrules"
                hide-required-asterisk="true"
                ref="addForm"
              >
                <el-form-item label="身份证号" prop="patientId">
                  <el-input
                    style="width: 90%"
                    v-model="addForm.patientId"
                  ></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="patientName">
                  <el-input
                    style="width: 90%"
                    v-model="addForm.name"
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="patientSex">
                  <!-- @change="searchSelect1(addForm.sex)" -->
                  <el-select
                    v-model="addForm.sex"
                    placeholder="请选择性别"
                    prefix
                  >
                    <!-- style="width: 90%" -->
                    <!-- <el-option
                      v-for="item in options1"
                      :key="item.role"
                      :label="item.label"
                      :value="item.role"
                       style="margin-bottom:15px;"
                    >
                    </el-option> -->
                    <el-option
                      :label="options1[0].label"
                      :value="options1[0].role"
                    >
                    </el-option>
                    <el-option
                      :label="options1[1].label"
                      :value="options1[1].role"
                      style="margin-bottom: 15px"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                  <el-date-picker
                    v-model="addForm.birthday"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-form>
              <div slot="footer" style="margin-right: 35%">
                <el-button type="success" @click="addPatient('addForm')"
                  >保存</el-button
                >
                <el-button type="danger" @click="dialogFormVisible1 = false"
                  >取消</el-button
                >
              </div>
            </el-dialog>
            <el-button
              v-if="isUpdating == false"
              type="danger"
              size="small"
              @click="deletePatient"
              >删除患者</el-button
            >
            <el-dialog
              title="删除患者"
              :visible.sync="dialogFormVisible2"
              append-to-body="false"
              width="35%"
            >
              <el-form
                :model="deleteForm"
                label-width="70px"
                :rules="formrules"
                hide-required-asterisk="true"
                ref="deleteForm"
              >
              </el-form>
              <div slot="footer" style="margin-right: 35%">
                <el-button type="success" @click="deletePatient('deleteForm')"
                  >保存</el-button
                >
                <el-button type="danger" @click="dialogFormVisible2 = false"
                  >取消</el-button
                >
              </div>
            </el-dialog>
          </template>
        </el-descriptions>

        <el-descriptions
          v-for="(item, index) in userPatients"
          :key="index"
          class="margin-top1"
          :title="item.index"
          :column="2"
          :size="size"
          border
        >
          <template slot="extra">
            <el-button
              v-show="item.isUpdating == '0'"
              type="primary"
              size="small"
              @click="updatePatientsInfo(item)"
              >修改信息</el-button
            >
          
            <el-dialog
              title="添加患者"
              :visible.sync="dialogFormVisible1"
              append-to-body="false"
              width="35%"
            >
              <el-form
                :model="addForm"
                label-width="90px"
                :rules="formrules"
                hide-required-asterisk="true"
                ref="addForm"
              >
                <el-form-item label="身份证号" prop="patientId">
                  <el-input
                    style="width: 90%"
                    v-model="addForm.patientId"
                  ></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="patientName">
                  <el-input
                    style="width: 90%"
                    v-model="addForm.name"
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="patientSex">
                  <!-- @change="searchSelect1(addForm.sex)" -->
                  <el-select
                    v-model="addForm.sex"
                    placeholder="请选择性别"
                    prefix
                  >
                    <!-- style="width: 90%" -->
                    <!-- <el-option
                      v-for="item in options1"
                      :key="item.role"
                      :label="item.label"
                      :value="item.role"
                       style="margin-bottom:15px;"
                    >
                    </el-option> -->
                    <el-option
                      :label="options1[0].label"
                      :value="options1[0].role"
                    >
                    </el-option>
                    <el-option
                      :label="options1[1].label"
                      :value="options1[1].role"
                      style="margin-bottom: 15px"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                  <el-date-picker
                    v-model="addForm.birthday"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-form>
              <div slot="footer" style="margin-right: 35%">
                <el-button type="success" @click="addPatient('addForm')"
                  >保存</el-button
                >
                <el-button type="danger" @click="dialogFormVisible1 = false"
                  >取消</el-button
                >
              </div>
            </el-dialog>

          </template>
          <el-descriptions-item v-show="item.isUpdating == '0'">
            <template slot="label">
              <i class="el-icon-user"></i>
              身份证号
            </template>
            {{ item.patientId }}
          </el-descriptions-item>
          <el-descriptions-item v-show="item.isUpdating == '0'">
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            {{ item.name }}
          </el-descriptions-item>
          <el-descriptions-item v-show="item.isUpdating == '0'">
            <template slot="label">
              <i class="el-icon-male"></i> /
              <i class="el-icon-female"></i>
              性别
            </template>
            {{ item.sex }}
          </el-descriptions-item>
          <el-descriptions-item v-show="item.isUpdating == '0'">
            <template slot="label">
              <i class="el-icon-date"></i>
              生日
            </template>
            {{ item.birthday }}
          </el-descriptions-item>
          <el-descriptions-item v-show="item.isUpdating == '0'">
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            {{ item.phoneNumber }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              是否有保险
            </template>
            <el-tag v-if="item.isInsure == 1" size="small" type="success"
              >有</el-tag
            >
            <el-tag v-if="item.isInsure == 0" size="small" type="danger"
              >无</el-tag
            >
          </el-descriptions-item>
          <el-descriptions-item v-show="item.isUpdating == '0'">
            <template slot="label">
              <i class="el-icon-bank-card"></i>
              就诊卡卡号
            </template>
            <!-- {{ item.phoneNumber }} -->
          </el-descriptions-item>
          <el-descriptions-item v-show="item.isUpdating == '0'">
            <template slot="label">
              <i class="el-icon-bank-card"></i>
              就诊卡类型
            </template>
            <el-tag v-if="item.isInsure == 1" size="small" type="primary"
              >医保卡</el-tag
            >
          </el-descriptions-item>

          <el-button
            v-if="item.isUpdating == '1'"
            style="margin-left: 45%; margin-top: 5px"
            type="success"
            size="small"
            @click="confirmUpdate"
            >确认</el-button
          >
          <el-button
            v-if="item.isUpdating == '1'"
            type="danger"
            size="small"
            @click="cancelUpdate"
            >取消</el-button
          >
        </el-descriptions>
      </el-card>
    </div>
    <myfooter></myfooter>
  </div>
</template>

<script>
import Myfooter from "../layout/myfooter.vue";
import myheader from "../layout/myheader.vue";
import { getUserInfo, setUserInfo } from "../api/user";

export default {
  components: { myheader, Myfooter },
  name: "UserInfo",
  data() {
    return {
      alterForm:{
        patientId: "",
        name: "",
        sex: "",
        birthday: "",
      },
      index: 0,
      options1: [
        { label: "男", role: "男" },
        { label: "女", role: "女" },
      ],
      addForm: {
        patientId: "",
        name: "",
        sex: "",
        birthday: "",
      },
      deleteForm: {},
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        phone: "",
        email: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      isUpdating: false,
      userId: "1234765400",
      userInfo: [],
      userPatients: [],
    };
  },
  mounted() {
    this.getUserInfoById(this.userId);
  },
  methods: {
    getUserInfoById(userid) {
      getUserInfo({ id: userid })
        .then((response) => {
          this.userInfo = response.data;
          this.userPatients = this.userInfo.patients;
          this.userPatients.forEach((element, index) => {
            // element.level = getMap(element.level);
            // element+=element.index;
            element.index = "患者" + (index + 1);
            element.isUpdating = "0";
          });
          // console.log(this.userInfo);
          console.log(this.userPatients[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUserInfo() {
      this.form.name = this.userInfo.name;
      this.form.phone = this.userInfo.phoneNumber;
      this.form.email = this.userInfo.email;
      this.isUpdating = true;
    },
    updateUserInfoById(userid) {
      setUserInfo(
        userid,
        this.form.name,
        // openId:this.userInfo.openId,
        // password:this.userInfo.password,
        this.form.phone,
        this.form.email
        // salt:this.userInfo.salt,
      )
        .then((response) => {
          console.log(response);
          this.$message({
            message: "修改成功！",
            type: "success",
          });
          this.userInfo.name = this.form.name;
          this.userInfo.phoneNumber = this.form.phone;
          this.userInfo.email = this.form.email;
          this.isUpdating = false;
        })
        .catch((error) => {
          this.$message({
            message: "修改失败！",
            type: "error",
          });
        });
    },
    confirmUpdate() {
      this.updateUserInfoById(this.userInfo.userId);
    },
    cancelUpdate() {
      this.isUpdating = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    updatePatientsInfo(item) {
      this.userPatients.forEach((element, index) => {
        element.isUpdating = "0";
      });
      item.isUpdating = "1";
      console.log(this.userPatients);
    },
    addPatient() {
      console.log(this.addForm);
      this.dialogFormVisible1 = true;
      //      this.$refs[formName].validate(async (valid) => {
      //       if (valid) {
      //   let url = "/api/teacher/course";
      //         let data = {
      //           coursename: this.form.coursename,
      //           introduction: this.form.introduction
      //         };
      //       this.$axios
      //           .post(url, data)
      //           .then((res) => {
      //             console.log("请求成功");
      //             console.log(res);
      //             if (res.data.data.msg == true) {
      //               this.$alert("新建课程成功！", "提示", {confirmButtonText: "确定",});
      //               this.dialogFormVisible=false;
      //             }
      //           })
      //           .catch((err) => {
      //             console.log("请求失败");
      //             console.log(err);
      //           })
      //  }
      //   else {
      //         console.log("error submit!!");
      //         return false;
      //       }
      //     });
    },
    deletePatient() {
      this.dialogFormVisible2 = true;
    },
    updateChange() {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [
          h("span", null, "内容可以是 "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      });
    },
    cancelChange() {
      this.userPatients.forEach((element, index) => {
        element.isUpdating = "0";
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/css/UserInfo.less";
</style>