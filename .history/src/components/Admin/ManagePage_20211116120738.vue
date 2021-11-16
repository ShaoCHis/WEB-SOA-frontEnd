<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
       <el-header>
           <div class="logo">
               <img src="../../assets/back.jpg" height="50" alt="">
               <span>同济大学实验教学管理系统</span>
           </div>
           <div class="user">
              <el-avatar :style="`background:${extractColorByName(name)}`">{{name.slice(0,1)}}</el-avatar>
           <span>
           <el-dropdown> 
              <span class="el-dropdown-link" >
             <span>{{name}}你好~</span> 
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-tools">设置
              
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" divided >退出
                    </el-dropdown-item> 
              </el-dropdown-menu>
            </el-dropdown>
           </span>
           </div>
       </el-header>
    
        <div style="margin-bottom=10px">  
           <el-card class="managelist"  >
               <el-tabs type="border-card">
                  <el-tab-pane label="用户管理" >
                     <el-radio v-model="radio" label="1">学生</el-radio>
                     <el-radio v-model="radio" label="2">教师</el-radio>
                     <el-button type="primary" icon="el-icon-plus" circle  @click="dialogFormVisible = true" style="float:right" size="small"></el-button>
                       <el-dialog title="新建用户" :visible.sync="dialogFormVisible" append-to-body="false" width="35%">
                          <el-form :v-model="form" label-width="60px" >
                           <!-- 用户名 -->
                               <el-form-item  label="姓名">
                               <el-input v-model="form.name" ></el-input>
                               </el-form-item>                     
                               <el-form-item label="身份" prop="role">
                          <el-select v-model="form.role" @change="searchSelect(form.role)"  style="width:100%" prefix>
                      <el-option v-for="item in options"
                      :key="item.role"
                       :label="item.label"
                       :value="item.role">
                       </el-option> 
                  </el-select>                         
                        </el-form-item> 
                        </el-form>
                       <div slot="footer" class="dialog-footer">
                         <el-button @click="dialogFormVisible = false">取消</el-button>
                         <el-button type="primary" >保存</el-button>
                       </div>
                       </el-dialog>
                     <el-table ref="multipleTable"  tooltip-effect="dark"  @selection-change="handleSelectionChange"
                     :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%;margin-bottom:10px">
                       <el-table-column type="selection" width="55"></el-table-column>
                       <el-table-column prop="id" label="ID" width="150">
                       </el-table-column>
                       <el-table-column prop="name" label="姓名" width="150">
                       </el-table-column>
                       <el-table-column prop="status" label="状态" width="150">
                       </el-table-column>
                        <el-table-column prop="role" label="角色" width="150">
                       </el-table-column>
                        <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
                       </el-table-column>
                       <el-table-column   align="right">
                         <template slot="header" >
                            <el-input v-model="search" style="width=20px"  placeholder="输入关键字搜索">
                                <el-button slot="append" icon="el-icon-search"></el-button></el-input>
                         </template>
                         <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="primary" @click="handleJihuo(scope.$index,scope.row)">激活</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">注销</el-button>
                         </template>
                        </el-table-column>
                     </el-table>
                     <el-button size="mini" type="primary" @click="handleJihuo(scope.$index,scope.row)">激活</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">注销</el-button>
                    </el-tab-pane>
                  <el-tab-pane label="课程管理">
                     <el-table 
                     :data="tableCourse.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%;margin-bottom:10px">
                       <el-table-column prop="courseid" label="课程ID" width="150"></el-table-column>
                       <el-table-column prop="coursename" label="课程名称" width="200"></el-table-column>
                       <el-table-column prop="responsible" label="责任教师" width="150"></el-table-column>
                       <el-table-column prop="teacher" label="授课教师" width="150"> </el-table-column>
                       <el-table-column prop="assistant" label="助教" show-overflow-tooltip> </el-table-column>
                       <el-table-column   align="right">
                         <template slot="header">
                            <el-input v-model="search" style="width=20px"  placeholder="输入关键字搜索">
                                <el-button slot="append" icon="el-icon-search"></el-button></el-input>
                         </template>
                         <template slot-scope="scope">
                            <el-button size="mini" @click="handleMore(scope.$index, scope.row)">查看更多</el-button>
                         </template>
                       </el-table-column>
                     </el-table>
                </el-tab-pane>
              </el-tabs>
        </el-card>
    </div>
  </el-container>      
</template>

<script> 

export default {
  
    data(){
        return{
          dialogFormVisible: false,
          name:"管理员",
          radio:'1',
         form: { name: "", role: "", id: "",},
       options: [
         {label:"学生",role:'Student'},
         { label:"教师" ,role:"Teacher"},
         {label:"管理员", role:"Admin"}],  
       tableData: [{
          id: '1950000',
          name: '王22',
          status: '未激活',
          role:'普通学生',
          email:'1481298167@qq.com', 
        }, {
          id: '1950001',
          name: '王2222',
          status: '已激活',
          role:'助教',
          email:'1950984@tongji.edu.cn'
        }],
         tableCourse: [{
          courseid: '20212001',
          coursename: '计算机组成原理',
          responsible: '无名氏',
          teacher:'无名氏',
          assistant:'肖杨', 
        }, {
          courseid: '20212002',
          coursename: '数据结构',
          responsible: '张颖',
          teacher:'张颖',
          assistant:'肖杨'
        },{
           courseid: '20211003',
          coursename: '计算机系统结构',
          responsible: '张晨曦',
          teacher:'翟晨昊',
          assistant:'张颖'
        }],
        search: ''
 
    }},
    methods:{
       extractColorByName(name) {
	      var temp = [];
	      temp.push("#");
	      for (let index = 0; index < name.length; index++) {
	        temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16));
	      }
	      return temp.slice(0, 5).join('').slice(0, 4);
	    },
         handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleJihuo(index,row){
          console.log(index,row);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleMore(index,row){
         console.log(index,row);
      },
	
    }
  
};
</script>

<style lang="less" scoped>

.eldivider{
    margin: 8px 0;
    background: 0 0;
    border-top: 1px solid #0d0d0e;
}
.managelist{
  margin-left: 5%;
width: 88%;

position:absolute;
}
.home-container{
    height: 100%;
    width: 100%;
     background-size: 100%,100%;
     position:fixed;
     background-image: url(../../assets/Sakura.jpg);
}
.el-header{
    display:flex;
    justify-content:space-between;
    //padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20ox;
    margin-bottom: 1%;
    .logo{
        display:flex;
        align-items: center;
        span{margin-left: 15px;}
    }
    .user{
      float:right;
      display:flex;
      align-items: center;
      span{margin-left: 5px;}
    }
    img{
       border-radius:50%;
    }
    .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }
  .el-icon-s-tools {
    font-size: 10px;
  }
.el-dropdown-menu{
  align-items: center;
}
}


</style>