import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
// import Index from '../views/index.vue'
// import Sousuo from '@/views/son/sousuo.vue'
import One from '../views/son/one.vue'
// import Two from '../views/son/two.vue'
// import Three from '../views/son/three.vue'
// import Five from '../views/son/five.vue'
// import Mv from '@/views/son/Mv.vue'

//路由懒加载,提高数据量多时,页面渲染的速度
const Login = () => import('../components/Login.vue')
const Index = () => import('../views/index.vue')
const Sousuo = () => import('@/views/son/sousuo.vue')
// const One = () => import('../views/son/one.vue')
const Two = () => import('../views/son/two.vue')
const Three = () => import('../views/son/three.vue')
const Five = () => import('../views/son/five.vue')
const Mv = () => import('../views/son/Mv.vue')
// const Songlists = () =>import('../views/son/songlists')

import pathArr from '@/router/pathArr.js'

Vue.use(VueRouter)

const routes = [
 {
	 path:'/',redirect:'/login'
 },
 {
	 path:'/login',component:Login
 },
 {
	 path:'/index',
	 component:Index,
	 redirect: '/index/one',
	 children:[
		 {path:'one',component:One},
		 {path:'two',component:Two},
		 {path:'three',component:Three},
		 {path:'five',component:Five},
		 {path:'sousuo',component:Sousuo},
		 {path:'mv',component:Mv},
		 {path:'songlists',component:() =>import('../views/son/songlists')}
	 ]
 },
]
const router = new VueRouter({
  routes
})

//放在router的后面
// 全局前置导航守卫
router.beforeEach(function(to,from,next){
	//检索的字符串没有出现,就返回-1,继续寻找
	//存在就进行下一步
	if(pathArr.indexOf(to.path) !== -1){
		//获取本地储存的值
		const token = localStorage.getItem('token')
		//如果token存在,就进行跳转
		if(token){
			next()
		}else{
			//没有登录,强制跳转到登录的页面
			next('/login')
		}
	}else{
		//如果跳转的不是以上页面,就直接放行
		next()
	}
})





export default router
