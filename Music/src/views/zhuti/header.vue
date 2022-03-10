<template>
	<div class="head">
		<h2>Musicovery</h2>
		<!-- 历史记录按钮 -->
		<el-row class="head-button">
			<el-button icon="el-icon-caret-left" circle size="medium" @click="$router.back()"></el-button>
			<el-button icon="el-icon-caret-right" circle size="medium"@click="$router.forward()"></el-button>
		</el-row>
		<!-- 搜索框 -->
		<div class="demo-input-suffix">
			<el-input
		    placeholder="请输入内容"
		    prefix-icon="el-icon-search"
		    v-model="input2"
				maxlength="100"
				@keyup.enter.native="change()">
		  </el-input>
		</div>
		<!-- 退出登录,并删除token的登陆凭证 -->
		<div @click="tui" class="tui">退出登录</div>
	</div>
</template>

<script>
	// import Bus from './EventBus.js'
	
	export default{
		data(){
			return{
				input2:''
			}
		},
		methods:{
			change(){
				if(this.input2 === ''){
					this.$message({
						message: '请输入内容',
						type: 'warning'
					});
				}else{
					// console.log(this.input2)
					// this.one()
					this.$router.push('/index/sousuo?h='+this.input2)
					// this.$router.push('/index/sousuo')
				}
			},
			//推出登录
			tui(){
				//删除登录凭证
				localStorage.removeItem('token')
				this.$router.replace('/login')
				
			},
			
			//发送数据
			// one(){
			// 	Bus.$emit('two',this.input2)
			// }
		}
	}
</script>

<style scoped="scoped">
	.head{
		z-index: 10;
		position: fixed;
		background-color: #ff6430;
		/* position: relative; */
		display: flex;
		width:100%;
		min-width:800px;
		align-items: center;
		height:60px;
	}
	h2{
		padding-left:80px;
	}
	.head-button{
		padding-left: 50px;
	}
	.demo-input-suffix{
		padding-left: 20px;
	}
	.tui{
		position: absolute;
		right:5%;
		cursor: pointer;
		color:white;
		font-weight:bold;
	}
</style>
