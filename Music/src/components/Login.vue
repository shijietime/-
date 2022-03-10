<template>
	<div class="login_container">
		<div class="login_box">
			<!-- 头像区域 -->
			<div class="avatar_box">
				<img src="https://img.wxcha.com/m00/db/aa/0cceccc0647267bb4ee24c1ea08eaac5.jpg" alt="头像">
			</div>
			<!-- 登录表单区域 -->
			<!-- 这个ref只是一个引用,需要被获取,然后进行重置 -->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
				<!-- 用户名 -->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="fa fa-user-circle fa-lg"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="fa fa-unlock-alt fa-lg"type="password"></el-input>
				</el-form-item>
				<!-- 按钮 -->
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info"@click="resetloginForm">重置</el-button>
				</el-form-item>	
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				// 登陆表单的数据绑定对象
				loginForm:{
					username:'',
					password:''
				},
				// 表单验证规则对象
				loginFormRules:{
					//验证用户名是否合法
					username:[
						 { required: true, message: '请输入登录名称', trigger: 'blur' },
						 { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					//验证密码是否合法
					password:[
						{ required: true, message: '请输入登录密码', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					]
				},
			}
		},
		created(){
			// this.getlist()
		},
		methods:{
			//点击重置按钮
			resetloginForm(){
				// console.log(this)
				//this.$refs获取到组件实例
				this.$refs.loginFormRef.resetFields();
			},
			login(){
				//validate验证成功的回调函数
				this.$refs.loginFormRef.validate((valid) => {//可不写括号
					if(valid){
						//调用axios
						this.getlist()
					}else{
						this.$message.error("登录失败")
					}
				})
			},
			
			
			//封装调用axios函数
			getlist(){
				//axios写在入口文件了,就在前面加一个this
				// this.$http({
				// 	method:'POST',
				// 	//应该搞一个请求根路径
				// 	url:'api/post',
				// 	data:{
				// 		username:this.loginForm.username,
				// 		password:this.loginForm.password
				// 	}
				// }).then(res=>{
				// 	if(status = 200){
				// 		this.$message({
				// 			message: '登录成功',
				// 			type: 'success'
				// 		});
				// 		//没有历史记录的跳转
				// 		this.$router.replace('/index')
				// 		//存一个登录凭证
				// 		localStorage.setItem('token', 'Bearer xxxx')
				// 		console.log(res)
				// 	}else{
				// 		localStorage.removeItem('token')
				// 		this.$message.error("登录失败")
				// 	}
				// })
				
				if(this.loginForm.username === '111'&&this.loginForm.password === '111'){
					this.$message({
						message: '登录成功',
						type: 'success'
					});
					this.$router.replace('/index')
					localStorage.setItem('token', 'Bearer xxxx')
				}else{
					localStorage.removeItem('token')
					this.$message.error("登录失败")
				}
				
				// 极简写法
				// this.$http.post('api/post',{
				// 	username:this.loginForm.username,
				// 	password:this.loginForm.password
				// }).then(res => {
				// 	console.log(res)
				// })
				
				
			}
		}
	}
</script>

<style scoped>
	.login_container{
		background-color: #aaaaff;
		height:100%;
	}
	.login_box{
		width:450px;
		height:300px;
		background-color: #FFF;
		border-radius:3px;
		position:absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
	}
	.avatar_box{
		padding:10px;
		height:130px;
		width:130px;
		border:1px solid #eee;
		border-radius: 50%;
		box-shadow: 1px 1px 10px #ddd;
		position:absolute;
		left:50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
	}
	.avatar_box img{
		background-color: #eee;
		width:100%;
		height:100%;
		border-radius: 50%;
	}
	.btns{
		display: flex;
		justify-content: flex-end;
	}
	.login_form{
		padding:0 20px;
		width:100%;
		box-sizing: border-box;
		position: absolute;
		bottom: 0;
	}
</style>
