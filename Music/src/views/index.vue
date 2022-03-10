<template>
	<div class="daone">
		<!-- 头部 -->
		<Header></Header>
		<!-- 中间 -->
		<div class="da">
			<!-- 左侧侧边导航栏 -->
			<Tabs></Tabs>
			<!-- 右侧部分 -->
			<div class="da-right">
				<div class="da-right-one">
					<!-- 进行组件缓存,即回退的页面不会被重新渲染 -->
					<keep-alive exclude="songlists,MV"max="4">
						<router-view></router-view>
					</keep-alive>
				</div>
			</div>
			<el-backtop target=".da .da-right":right="two":bottom="one">
				<div style="height: 100%;
        width: 100%;
				border-radius: 25%;
        background-color: #d1d3d4;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #ff5500;">
					<i class="el-icon-arrow-up"></i>
				</div>
			</el-backtop>
		</div>
		<!-- 播放 -->
		<Bofang></Bofang>
	</div>
</template>

<script>
	//导入组件
	import Header from './zhuti/header.vue'
	import Tabs from './zhuti/tabs.vue'
	import Bofang from './zhuti/bofang.vue'
	
	export default{
		data(){
			return{
				one:80,
				two:160
			}
		},
		components:{
			Header,
			Tabs,
			Bofang
		}
	}
</script>

<style scoped>
	.da{
		display: flex;
		padding:60px 0;
		width:100%;
		height:100%;
		z-index: -1;
	}
	head{
		position: fixed;
		top:0;
	}
	.daone{
		height:100%;
	}
	.da-right{
		/* 权重占1,盒子就不会掉下去 */
		flex: 1;
		padding:15px;
		/* background-color: #ffffff; */
		/* width:100%; */
		height:100%;
		overflow: auto;
	}
	.da-right-one{
		max-width: 1200px;
		/* height:1200px; */
		/* border:1px solid red; */
		margin:20px auto;
	}
</style>
