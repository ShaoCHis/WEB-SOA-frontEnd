<template>
  <div class="mainContainer">
    <!-- <myheader></myheader> -->
    <div class="header-container">
      <div class="wrapper">
        <!-- logo -->
        <div class="left-wrapper v-link" @click="goToMainPage">
          <img
            style="width: 50px"
            width="50"
            height="50"
            src="../../static/images/logo.png"
          />
          <span class="text">医济达预约挂号平台</span>
        </div>

        <!-- 导航栏 -->
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1"
            ><router-link style="text-decoration: none" to="/"
              >首页</router-link
            ></el-menu-item
          >
          <el-menu-item index="2"
            ><router-link style="text-decoration: none" to="/reservation"
              >挂号</router-link
            ></el-menu-item
          >
        </el-menu>
        <el-input class="search" placeholder="请输入医院名称" />
        <el-button circle icon="el-icon-search" type="primary"></el-button>
        <div class="right" v-show="this.ifLogin == '0'">
          <el-button class="loginBtn" type="primary" @click="login()"
            >登录/注册</el-button
          >
        </div>
        <div class="right" v-show="this.ifLogin == '1'">
          <el-avatar class="avatar" size="large" fit="fit" :src="avatar">
          </el-avatar>
          <el-dropdown
            placement="bottom"
            style="float: right; margin-top: -5px; margin-left: -44px"
            v-show="this.ifLogin == '1'"
          >
            <span class="el-dropdown-link">
              <span>⚪</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-tools" @click="goToInfoPage">
                <!-- <div class="right" @click="goToInfoPage"> -->
                <span style="width: 100px" @click="goToInfoPage">我的</span>
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-switch-button"
                @click="goToLoginPage"
              >
                <span @click="goToLoginPage">退出当前用户</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 右侧 -->
        <div class="right-wrapper"></div>
      </div>
    </div>

    <div class="contentContainer">
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

      <!-- 卡信息 -->
      <!-- <el-card class="card-info">
        <el-descriptions class="margin-top"
                         title="卡信息"
                         :column="2"
                         :size="size"
                         border>
          <template slot="extra">
            <el-button v-if="isUpdating == false"
                       type="primary"
                       size="small"
                       @click="updateUserInfo">修改信息</el-button>
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

        <el-form v-if="isUpdating == true"
                 ref="form"
                 :model="form"
                 label-width="80px"
                 style="margin-left: -5%">
          <el-form-item label="">
            <i class="el-icon-user"
               style="color: grey"> 用户名</i>
            <el-input v-model="form.name"
                      style="width: 85%; margin-left: 5%">{{
              this.form.name
            }}</el-input>
          </el-form-item>
          <el-form-item label="">
            <i class="el-icon-mobile-phone"
               style="color: grey"> 手机号</i>
            <el-input v-model="form.phone"
                      style="width: 85%; margin-left: 5%">{{ this.form.phone }}</el-input>
          </el-form-item>
          <el-form-item label="">
            <i class="el-icon-message"
               style="color: grey"> 邮箱</i>
            <el-input v-model="form.email"
                      style="width: 85%; margin-left: 6.2%">{{ this.form.email }}</el-input>
          </el-form-item>
        </el-form>

        <el-button v-if="isUpdating == true"
                   style="margin-left: 45%; margin-top: 5px"
                   type="success"
                   size="small"
                   @click="confirmUpdate">确认</el-button>
        <el-button v-if="isUpdating == true"
                   type="danger"
                   size="small"
                   @click="cancelUpdate">取消</el-button>
      </el-card> -->

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
              v-if="isUpdating == false && dialogFormVisible2 == false"
              style="margin-right: 10px"
              type="success"
              size="small"
              @click="dialogFormVisible1 = true"
              >添加患者</el-button
            >
            <el-button
              v-if="dialogFormVisible2 == true"
              style="margin-right: 10px"
              type="danger"
              size="small"
              @click="confirmDelete"
              >确认删除</el-button
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
                <el-form-item label="手机号" prop="phoneNumber">
                  <el-input
                    style="width: 90%"
                    v-model="addForm.phoneNumber"
                  ></el-input>
                </el-form-item>
                <el-form-item label="保险" prop="isInsure">
                  <el-select
                    v-model="addForm.isInsure"
                    placeholder="请选择是否购买保险"
                    prefix
                  >
                    <el-option
                      :label="options2[0].label"
                      :value="options2[0].role"
                    >
                    </el-option>
                    <el-option
                      :label="options2[1].label"
                      :value="options2[1].role"
                      style="margin-bottom: 15px"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" style="margin-right: 35%">
                <el-button type="success" @click="addPatientById('addForm')"
                  >保存</el-button
                >
                <el-button type="danger" @click="dialogFormVisible1 = false"
                  >取消</el-button
                >
              </div>
            </el-dialog>
            <el-button
              v-if="isUpdating == false && dialogFormVisible2 == false"
              type="danger"
              size="small"
              @click="dialogFormVisible2 = true"
              >删除患者</el-button
            >
            <el-button
              v-if="dialogFormVisible2 == true"
              type="info"
              size="small"
              @click="cancelDelete"
              >取消删除</el-button
            >
            <!-- <el-dialog
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
            </el-dialog> -->
          </template>
        </el-descriptions>

        <el-collapse
          v-model="activeNames"
          v-for="(item, index) in userPatients"
          :key="index"
          accordion
        >
          <el-collapse-item :title="item.index" :name="index">
            <el-descriptions
              class="margin-top1"
              :title="item.index"
              :column="2"
              :size="size"
              border
            >
              <template slot="extra">
                <!-- <el-button
              v-show="item.isUpdating == '0' && dialogFormVisible2 == false"
              type="primary"
              size="small"
              @click="updatePatientsInfo(item)"
              >修改信息</el-button
            > -->
                <el-checkbox
                  v-show="dialogFormVisible2 == true"
                  v-model="isDeleteChosen[index]"
                  >删除该患者</el-checkbox
                >
                <!-- 修改信息 -->
                <!-- <el-dialog
              title="修改信息"
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
                  <el-select
                    v-model="addForm.sex"
                    placeholder="请选择性别"
                    prefix
                  >
                   
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
            </el-dialog> -->
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
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <!-- 预约信息 -->
      <el-card class="reservation-info">
        <el-descriptions
          class="margin-top1"
          title="预约信息"
          :column="2"
          :size="size"
          border
        >
          <template slot="extra">
            <!-- <el-button style="margin-right: 10px"
                       type="success"
                       size="small"
                       @click="addReservationById()">添加预约</el-button> -->
          </template>
        </el-descriptions>
        <el-collapse
          v-model="activeNames1"
          v-for="(item, index) in userReservations"
          :key="index"
          accordion
        >
          <el-collapse-item :title="item.index" :name="index">
            <el-descriptions
              class="margin-top1"
              :title="item.index"
              :column="2"
              :size="size"
              border
            >
              <template slot="extra">
                <el-button
                  v-if="item.state == '0' && item.cardType == '0'"
                  style="margin-right: 10px"
                  type="success"
                  size="small"
                  @click="payByWeiXin(item.id)"
                  >支付费用</el-button
                >
                <el-button
                  v-if="item.state == '0' && item.cardType != '0'"
                  style="margin-right: 10px"
                  type="success"
                  size="small"
                  @click="payByCard(item.id)"
                  >支付费用</el-button
                >
                <el-dialog
                  :visible.sync="dialogPayVisible"
                  style="text-align: left"
                  :append-to-body="true"
                  width="500px"
                  @close="closeDialog"
                >
                  <div
                    class="operate-view"
                    style="height: 350px; margin-left: 10px"
                  >
                    <div class="wrapper wechat">
                      <div>
                        <qriously :value="payObj.codeUrl" :size="220" />
                        <div
                          style="
                            text-align: center;
                            line-height: 25px;
                            margin-bottom: 40px;
                          "
                        >
                          请使用微信扫一扫<br />
                          扫描二维码支付
                        </div>
                      </div>
                    </div>
                  </div>
                </el-dialog>
                <el-button
                  v-if="item.state == '0'"
                  style="margin-right: 10px"
                  type="danger"
                  size="small"
                  @click="cancelReservationById1(item.id)"
                  >取消预约</el-button
                >
                <el-button
                  v-else-if="item.state == '1'"
                  style="margin-right: 10px"
                  type="danger"
                  size="small"
                  @click="cancelReservationById2(item.id)"
                  >取消预约</el-button
                >
              </template>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-document"></i>
                  预约编号
                </template>
                {{ item.id }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-document"></i>
                  预约状态
                </template>
                <el-tag v-if="item.state == 0" size="small" type="success"
                  >已预约</el-tag
                >
                <el-tag v-if="item.state == 1" size="small" type="success"
                  >已支付</el-tag
                >
                <el-tag v-if="item.state == 2" size="small" type="primary"
                  >退款中</el-tag
                >
                <el-tag v-if="item.state == 3" size="small" type="info"
                  >已取消</el-tag
                >
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-date"></i>
                  预约时间
                </template>
                {{ item.reserveDate }}
                {{ item.reserveTime }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-bank-card"></i>
                  身份证号
                </template>
                {{ item.patientID }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  姓名
                </template>
                {{ item.patientName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  医院
                </template>
                {{ item.hospitalName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-house"></i>
                  科室
                </template>
                {{ item.departmentName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  医生
                </template>
                {{ item.doctorName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  职务
                </template>
                {{ item.doctorTitle }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-money"></i>
                  支付费用
                </template>
                {{ item.cost }}元
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-bank-card"></i>
                  支付类型
                </template>
                <el-tag v-if="item.cardType == 0" size="small" type="primary"
                  >微信支付</el-tag
                >
                <el-tag v-if="item.cardType == 1" size="small" type="primary"
                  >就诊卡</el-tag
                >
                <el-tag v-if="item.cardType == 2" size="small" type="primary"
                  >社保卡</el-tag
                >
                <el-tag v-if="item.cardType == 3" size="small" type="primary"
                  >医保卡</el-tag
                >
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-bank-card"></i>
                  支付卡号
                </template>
                {{ item.cardNum }}
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
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <router-view></router-view>

    <myfooter></myfooter>
  </div>
</template>

<script>
import Myfooter from "../layout/myfooter.vue";
import myheader from "../layout/myheader.vue";
import { getUserInfo, setUserInfo } from "../api/user";
import { deletePatient } from "../api/user";
import { addPatient } from "../api/user";
import { getReservationList } from "../api/order";
import { cancelReservation, cancelPaidReservation } from "../api/order";
import { createNative, queryPayStatus } from "../api/pay";
import { submitReservation } from "../api/reservation";

export default {
  components: { myheader, Myfooter },
  name: "UserInfo",
  data() {
    return {
      sid: "20",
      pid: "411422202111207890",
      dialogPayVisible: false,
      payObj: {},
      timer: null, // 定时器名称
      activeNames1: [],
      userReservations: [],
      activeNames: [], //['1'],
      patientsLength: 0,
      isDeleteChosen: [],
      patientIdChosen: "", //被选择要删除的患者
      alterForm: {
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
      options2: [
        { label: "是", role: "1" },
        { label: "否", role: "0" },
      ],
      addForm: {
        patientId: "",
        name: "",
        sex: "",
        birthday: "",
        phoneNumber: "",
        isInsure: "", //int
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
      userId: "",
      userInfo: [],
      userPatients: [],
      avatar: "",
      userName: "",
      userId: "",
      ifLogin: "0", //用户是否已经登录
    };
  },
  mounted() {
    if (sessionStorage.getItem("userId") != null) {
      this.avatar = sessionStorage.getItem("avatar");
      this.ifLogin = "1";
      this.userId = sessionStorage.getItem("userId");
      this.getUserInfoById(this.userId);
    } else this.ifLogin = "0";
    this.getUserReservations();
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    goToMainPage() {
      this.$router.push({ name: "Main" });
    },
    goToInfoPage() {
      this.$router.push({ name: "UserInfo" });
    },
    goToLoginPage() {
      sessionStorage.removeItem("userId");
      this.$router.push({ name: "Login" });
    },
    getUserInfoById(userid) {
      getUserInfo({ id: userid })
        .then((response) => {
          this.userInfo = response.data;
          this.userPatients = this.userInfo.patients;
          this.patientsLength = this.userPatients.length;
          this.userPatients.forEach((element, index) => {
            element.index = "患者" + (index + 1);
            element.isUpdating = "0";
            element.isDeleteChosen = false;
            this.isDeleteChosen[index] = element.isDeleteChosen;
          });
          console.log(this.isDeleteChosen);
          console.log(this.userPatients);
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
      // console.log(this.userPatients.length);
    },
    addPatientById(addForm) {
      console.log(this.addForm);
      this.$refs[addForm].validate(async (valid) => {
        if (valid) {
          addPatient(
            this.addForm.patientId,
            this.addForm.name,
            this.addForm.sex,
            this.addForm.birthday,
            this.addForm.phoneNumber,
            parseInt(this.addForm.isInsure),
            { userId: this.userId }
          )
            .then((response) => {
              console.log(response);
              this.$message({
                message: "添加患者成功！",
                type: "success",
              });
              // this.getUserInfoById(this.userId);
              console.log(this.userPatients);
              console.log(this.addForm);
              // 实时更新
              window.location.reload();
              this.addForm = [];
              this.dialogFormVisible1 = false;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deletePatientById(patientid) {
      // deletePatient(patientid)
      deletePatient({ patientId: patientid })
        // var param = { patientId: patientid };
        // this.$axios
        //   .delete(`/user/patients/deletePatient/${params.patientId}`, { params: param })
        // var url = `/user/patients/deletePatient/${patientId}`;
        // var id = patientid;
        // this.$axios
        // .delete(url, id)
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
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
    confirmDelete() {
      this.userPatients.forEach((element, index) => {
        element.isDeleteChosen = this.isDeleteChosen[index];
      });
      console.log(this.userPatients);
      this.$confirm("该操作将删除患者, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 对每一个患者,调用删除患者接口
          this.userPatients.forEach((element, index) => {
            if (element.isDeleteChosen == true) {
              console.log(element.patientId);
              this.deletePatientById(element.patientId);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    cancelDelete() {
      this.dialogFormVisible2 = false;
    },
    choosePatient(val, index) {
      console.log(index);
      this.userPatients[index].isDeleteChosen = val;
      console.log(this.userPatients);
    },
    getUserReservations() {
      getReservationList({ userId: this.userId })
        .then((response) => {
          this.userReservations = response.data;
          this.userReservations.forEach((element, index) => {
            element.index = "预约" + (index + 1);
            // element.isDeleteChosen = false;
            // this.isDeleteChosen[index] = element.isDeleteChosen;
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //取消未付款的预约
    cancelReservationById1(reservationid) {
      this.$confirm("该操作将取消预约, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cancelReservation({ reservationId: reservationid })
            .then((response) => {
              console.log(response);
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "取消预约成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    //取消已付款的预约，并退款
    cancelReservationById2(reservationid) {
      this.$confirm("该操作将执行退款, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cancelPaidReservation({ reservationId: reservationid })
            .then((response) => {
              console.log(response);
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "退款申请成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退款",
          });
        });
    },
    // 微信支付
    payByWeiXin(reservationid) {
      this.dialogPayVisible = true;
      createNative({ reservationId: reservationid })
        .then((response) => {
          this.payObj = response.data;
          if (this.payObj.codeUrl == "") {
            this.dialogPayVisible = false;
            this.$message.error("支付错误");
          } else {
            this.timer = setInterval(() => {
              this.queryPayStatusById(reservationid);
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    queryPayStatusById(reservationid) {
      queryPayStatus({ reservationId: reservationid })
        .then((response) => {
          console.log(response);
          if (response.message == "支付中") {
            return;
          } else {
            this.$message({
              type: "success",
              message: "支付成功!",
            });
            this.dialogPayVisible = false;
          }
          clearInterval(this.timer);
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDialog() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    // 卡支付
    payByCard(reservationid) {},
    // 添加预约，暂时放在这里
    addReservationById() {
      submitReservation({ scheduleId: this.sid, patientId: this.pid })
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

<style lang="less" scoped>
@import "../style/css/UserInfo.less";
</style>
