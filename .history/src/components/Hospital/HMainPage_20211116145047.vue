<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
       <el-header>
           <div class="logo">
               <!-- <img src="../../assets/back.jpg" height="50" alt=""> -->
               <span>同济大学实验教学系统</span>
           </div>
           <div class="user">
              <el-avatar :style="`background:${extractColorByName(name)}`">{{name.slice(0,1)}}</el-avatar>
           <span>
           <el-dropdown> 
              <span class="el-dropdown-link" >
             <span>{{name}},同学好~</span> 
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
           <el-container class="courselist">
           <el-card class="coursecard" :style="`background-color:${extractColorByName(course1)}`">
            <div class="course_link" @click="coursemain"> 2021001<br>{{course1}}</div>
              <div style="float:right">{{teacher1}}</div><br>
              <div style="position:absolute;bottom:15%">
                <span class="el-icon-chat-line-round" @click="messagelist"></span>
                <span class="el-icon-folder" @click="sourcelist"></span>
              <span class="el-icon-document" @click="experimentlist"></span>
              <span class="el-icon-user" @click="memberlist"></span>
              </div>
             </el-card>
              <el-card class="coursecard" :style="`background-color:${extractColorByName(course2)}`">
             <div class="course_link">2021002<br>{{course2}}</div>
            <div style="float:right">{{teacher2}}</div><br>
            <div style="position:absolute;bottom:15%">
            <span class="el-icon-chat-line-round"></span>
                <span class="el-icon-folder"></span>
              <span class="el-icon-document"></span>
              <span class="el-icon-user"></span></div>
             </el-card>
              <el-card class="coursecard" :style="`background-color:${extractColorByName(course3)}`">
             <div class="course_link">2021003<br>{{course3}}</div>
            <div style="float:right">{{teacher3}}</div><br>
            <div style="position:absolute;bottom:15%">
              <span class="el-icon-chat-line-round"></span>
                <span class="el-icon-folder"></span>
              <span class="el-icon-document"></span>
              <span class="el-icon-user"></span></div>
             </el-card>
              <el-card class="coursecard" :style="`background-color:${extractColorByName(course4)}`">
             <div class="course_link">2021004<br>{{course4}}</div>
            <div style="float:right">{{teacher4}}</div><br>
            <div style="position:absolute;bottom:15%">
            <span class="el-icon-chat-line-round"></span>
                <span class="el-icon-folder"></span>
              <span class="el-icon-document"></span>
              <span class="el-icon-user"></span></div>
             </el-card>
           </el-container>
            <el-card  class="messagelist">
              <div style="font-size:22px">学习通知</div>
              <el-divider class="eldivider"></el-divider>
              <div> 
                <div class="message">            
              <!-- <img src="../../assets/message.png" alt="" height="20"> -->
              <a style="color:#6495ED;font-size:19px" text-decoration:none >来作业了</a></div>
              <div style="margin-left:35px;margin-top:5px;font-size:15px">软件工程课程设计</div>
              <div style="margin-left:35px">2021年12月28日</div>
              <el-divider class="divider"></el-divider>
              </div>

               <div class="message">
              <!-- <img src="../../assets/message.png" alt="" height="20"> -->
              <a style="color:#6495ED;font-size:19px" text-decoration:none >帧中继实验</a></div>
              <div style="margin-left:35px;margin-top:5px;font-size:15px">计网实验</div>
              <div style="margin-left:35px">2021年11月11日18:00</div>
              <el-divider class="divider"></el-divider>

              <div class="message">
              <!-- <img src="../../assets/message.png" alt="" height="20"> -->
              <a style="color:#6495ED;font-size:19px" text-decoration:none >SOA大项目</a></div>
              <div style="margin-left:35px;margin-top:5px;font-size:15px">Web服务与SOA</div>
               <div style="margin-left:35px">2021年11月4日18:59</div> 
              <el-divider class="divider"></el-divider> 
          
     </el-card>
         
           
         </div>
        
    </el-container>
</template>

<script> 
import MyAvatar from 'vue-avatar';
export default {
  components:{MyAvatar},
    data(){
        return{
    name:"曹",
    course1:"计算机网络",
    course2:"软件工程课程设计",
    course3:"Web服务与SOA",
    course4:"设计模式",
    teacher1:"夏波涌",
    teacher2:"黄杰",
    teacher3:"刘岩",
    teacher4:"湾湾老师"
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
      coursemain(){
        this.$router.push('/coursemain');
      },
      messagelist(){
        this.$router.push('/messagelist');
      },
      sourcelist(){
        this.$router.push('/sourcelist');
      },
      memberlist(){
        this.$router.push('/memberlist');
      },
      experimentlist(){
        this.$router.push('/experimentlist');
      },

    }  
};
</script>

<style lang="less" scoped>
.el-icon-chat-line-round{
   margin-left: 8px;
  margin-right: 20px;
  font-size: 20px;
}
.el-icon-chat-line-round:hover{
  color: #6495ED;
}
.el-icon-folder{
  margin-right: 20px;
  font-size: 20px;
}
.el-icon-folder:hover{
  color: #6495ED;
}
.el-icon-document{
  margin-right: 20px;
  font-size: 20px;
}
.el-icon-document:hover{
  color: #6495ED;
}
.el-icon-user{

  font-size: 20px;
}
.el-icon-user:hover{
  color: #6495ED;
}
.eldivider{
    margin: 8px 0;
    background: 0 0;
    border-top: 1px solid #0d0d0e;
}
.divider{
  width: 85%;
    margin: 8px 5%;
    background: 0 0;
    border-top: 1px solid #0d0d0e;
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
.messagelist{
width: 20%;
  height: 85%;
 position:absolute;
 right:2%;
 .message{
   display:flex;
  //  justify-content:space-between;
   align-items: center;
   a{margin-left: 15px;
   color:#6495ED};
   a:hover{
text-decoration:underline ;
//border-bottom: solid #6495ED;
}
}
 }
.courselist{
margin-left: 2%;
width: 100%;
height: 100%; position:absolute;
.coursecard{
  width: 200px;
  height: 25%;
  margin-right: 60px;
  position: relative;
.course_link{font-size: 18px;}
   .course_link:hover{
text-decoration:underline ;
text-decoration-color:#6495ED;
   }
   

}
}


</style>