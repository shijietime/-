<template>
	<div>
		<!-- 轮播图 -->
		<el-carousel :interval="4000" type="card" height="250px">
		    <el-carousel-item v-for="item in banners">
					<img :src="item.imageUrl" :key="item.targetId" style="width:100%;height:250px;border-radius: 10px;">
		    </el-carousel-item>
		  </el-carousel>
			
			<!-- 推荐歌单 -->
			<div class="music-recommended">
				<h2>推荐歌单</h2>
				<div class="music-recommended-he">
					<div class="music-recommended-he-min" v-for="(item,index) in recommended":key="item.id" @click="gosong(item.id)">
						<div class="music-recommended-he-img">
							<img :src="item.picUrl" >
						</div>
						<p>{{item.name}}</p>
						<!-- 下拉特效 -->
						<div class="music-recommended-he-la">{{item.copywriter}}</div>
						<div class="music-recommended-he-la1"><i class="fa fa-play fa-2x"></i></div>
					</div>
				</div>
			</div>
			
			<!--  -->
			<div style="height: 1200px;"></div>
			
			
	</div>
</template>

<script>
	export default{
		data(){
			return{
				//轮播图列表
				banners:[],
				//推荐歌单
				recommended:[],
				limit:10
			}
		},
		created() {
			this.getlist()
			this.getrecommended()
		},
		methods:{
			// 跳转歌单页面
			gosong(id){
				this.$router.push('/index/songlists?h='+id)
			},
			//轮播图的接口
			getlist(){
				this.axios.get('/banner').then(res => {
					// console.log(res)
					this.banners = res.data.banners
				})
			},
			//推荐歌单的接口
			getrecommended(){
				this.axios.get('/personalized',{
					params:{
						limit:this.limit
					}
				}).then(res => {
					// console.log(res)
					this.recommended = res.data.result
				})
			}
		}
	}
</script>

<style scoped>
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 200px;
	    margin: 0;
	  }
	  .el-carousel__item:nth-child(2n) {
	    background-color: #99a9bf;
	  }
	  .el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
	  }
		.music-recommended{
			margin-top:30px;
			/* border: 1px solid; */
		}
		.music-recommended-he{
			/* max-width:1200px; */
			/* min-width:100%; */
			padding:5px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
		.music-recommended-he-min{
			overflow: hidden;
			border-radius: 5px;
			position:relative;
			margin-top:10px;
		}
		.music-recommended h2{
			margin-bottom: 20px;
		}
		.music-recommended-he-min>.music-recommended-he-img{
			border-radius: 5px;
			overflow: hidden;
			width:200px;
			height:200px;
		}
		.music-recommended-he-min>.music-recommended-he-img>img{
			border-radius: 5px;
			width:200px;
		}
		.music-recommended-he-min>p{
			width:200px;
			height:45px;
			/* border:1px solid; */
		}
		.music-recommended-he-la{
			width:100%;
			height:30px;
			display: flex;
			align-items: center;
			color:white;
			padding-left:5px;
			background-color:rgba(0,0,0,.5);
			position:absolute;
			top:0;
			transform: translateY(-100%);
		}
		.music-recommended-he-min:hover>.music-recommended-he-la{
			transform: translateY(0);
		}
		.music-recommended-he-la1{
			text-align: center;
			display: flex;
			padding-left: 6px;
			justify-content: center;
			align-items: center;
			z-index: 10;
			opacity:0;
			position:absolute;
			right:10px;
			bottom:60px;
			width:45px;
			border-radius: 50%;
			height:45px;
			color:orange;
			background-color:#D3DCE6;
		}
		.music-recommended-he-min:hover .music-recommended-he-img{
			transform: translateY(-10px);
		}
		.music-recommended-he-min:hover>.music-recommended-he-la1{
			opacity:1
		}
</style>
