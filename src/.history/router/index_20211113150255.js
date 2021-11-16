import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import MainPage from '../components/student/MainPage'
import Course from '../components/student/Course'
import CourseMain from '../components/student/CourseMain'
import CourseInformation from '../components/student/CourseInformation'
import ExperimentList from '../components/student/ExperimentList'
import SourceList from '../components/student/SourceList'
import MemberList from '../components/student/MemberList'
import MessageList from '../components/student/MessageList'
import ManagePage from '../components/admin/ManagePage'
import TMainPage from '../components/teacher/TMainPage'
import TCourseMain from '../components/teacher/TCourseMain'
import TCourseInformation from '../components/teacher/TCourseInformation'
import TExperimentList from '../components/teacher/TExperimentList'
import TMemberList from '../components/teacher/TMemberList'
import TMessageList from '../components/teacher/TMessageList'
import TSourceList from '../components/teacher/TSourceList'

Vue.use(VueRouter)

const routes = [
  {
   
  },
  {
    
    
    
  }
]
const router = new VueRouter({
  routes: [
      { path: '/', redirect: '/login' },
      { path: '/login', component:Login},
      { path: '/Register', component:Register},
      {path:'/mainpage',component:MainPage},
      {path:'/course',component:Course},
      {path:'/managepage',component:ManagePage},
      {path: '/coursemain', component: CourseMain, redirect:'/courseinformation',
       children:[
         {path:'/courseinformation',component:CourseInformation},
         {path:'/experimentlist',component:ExperimentList},
         {path:'/sourcelist',component:SourceList},
         {path:'/memberlist',component:MemberList},
         {path:'/messagelist',component:MessageList},
      ]},
      {path:'/tmainpage',component:TMainPage},
      {path:'/tcoursemain',component:TCourseMain,redirect:'/tcourseinformation',
    children:[
      {path:'/tcourseinformation',component:TCourseInformation},
      {path:'/texperimentlist',component:TExperimentList},
      {path:'/tsourcelist',component:TSourceList},
      {path:'/tmemberlist',component:TMemberList},
      {path:'/tmessagelist',component:TMessageList},
    ]}
      
         
    ]
 
    
  
  })


export default router
