<template>
	<div class="tui">
		<!-- 测试keep-alive缓存组件 -->
		<!-- <input type="text" name="" id="" value="" /> -->
		<!-- 精品歌单 -->
		<div class="tui-top">
			<div class="img"><img :src="list.coverImgUrl" ></div>
			<div class="right">
				<p>精品歌单</p>
				<p>{{list.name}}</p>
				<p>{{list.description}}</p>
			</div>
			<img :src="list.coverImgUrl" >
			<div class="Mask"></div>
		</div>
		<!-- 导航列表 -->
		<div class="Navigation">
			<span v-bind:class="{active:tag == '全部'}"@click="tag='全部'">全部</span>
			<span v-bind:class="{active:tag == '欧美'}"@click="tag='欧美'">欧美</span>
			<span v-bind:class="{active:tag == '华语'}"@click="tag='华语'">华语</span>
			<span v-bind:class="{active:tag == '流行'}"@click="tag='流行'">流行</span>
			<span v-bind:class="{active:tag == '说唱'}"@click="tag='说唱'">说唱</span>
			<span v-bind:class="{active:tag == '摇滚'}"@click="tag='摇滚'">摇滚</span>
			<span v-bind:class="{active:tag == '民谣'}"@click="tag='民谣'">民谣</span>
			<span v-bind:class="{active:tag == '电子'}"@click="tag='电子'">电子</span>
			<span v-bind:class="{active:tag == '轻音乐'}"@click="tag='轻音乐'">轻音乐</span>
			<span v-bind:class="{active:tag == '影视原声'}"@click="tag='影视原声'">影视原声</span>
			<span v-bind:class="{active:tag == 'ACG'}"@click="tag='ACG'">ACG</span>
			<span v-bind:class="{active:tag == '怀旧'}"@click="tag='怀旧'">怀旧</span>
			<span v-bind:class="{active:tag == '治愈'}"@click="tag='治愈'">治愈</span>
			<span v-bind:class="{active:tag == '旅行'}"@click="tag='旅行'">旅行</span>
		</div>
		<!-- 歌单列表 -->
		<div class="song">
			<div class="song-box" v-for="item in songlist":key="item.id" @click="gosonglist(item.id)">
				<div>
					<p>播放量:{{item.playCount}}</p>
					<span><i class="fa fa-play fa-2x"></i></span>
					<img :src="item.coverImgUrl" >
				</div>
				<p>{{item.name}}</p>
			</div>
		</div>
		<!-- 分页栏 -->
		<div class="block">
		  <el-pagination
			 @current-change="currentchange"
				background=""
		    layout="prev, pager, next"
				:page-size="10"
		    :total="total">
		  </el-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		name:'song',
		data(){
			return{
				// 条数
				total:0,
				list:[],
				tag:"全部",
				songlist:[],
				page:1
			}
		},
		watch:{
			tag(){
				this.getlist()
				this.getsonglist()
				this.page=1
			}
		},
		created() {
			this.getlist()
			this.getsonglist()
		},
		methods:{
			// 跳转页面
			gosonglist(id){
				this.$router.push('/index/songlists?h='+id)
			},
			// 换页
			currentchange(val){
				// console.log(`当前页: ${val}`);
				// console.log(this.total)
				// console.log(this.page)
				this.page = val
				this.getsonglist()
			},
			// 精品歌单
			getlist(){
				this.axios.get('/top/playlist/highquality',{
					params:{
						limit:13,
						cat:this.tag
					}
				}).then(res=>{
					// console.log(res)
					this.list = res.data.playlists[0]
				})
			},
			// 列表歌单
			getsonglist(){
				this.axios.get('/top/playlist',{
					params:{
						limit:10,
						cat:this.tag,
						offset:(this.page-1)*10
					}
				}).then(res=>{
					// console.log(res)
					this.total = res.data.total
					this.songlist = res.data.playlists
				})
			}
			
		}
	}
</script>

<style lang="less" scoped="scoped">
	// 变量
	@font-size:15px;
	@color:#ffa502;
	@background-color:rgba(0,0,0,.5);
	.tui{
		width:100%;
	}
	// 精品歌单
	.tui-top{
		border-radius: 5px;
		overflow: hidden;
		position: relative;
		display: flex;
		padding:15px;
		.img{
			overflow: hidden;
			width:200px;
			height:200px;
			img{
				width:200px;
				height:200px;
			}
		}
		&>img{
			position: absolute;
			width:100%;
			z-index: -1;
			top:0;
			left: 0;
			filter: blur(10px);
		}
		// 遮罩
		.Mask{
			width:100%;
			height:100%;
			z-index: -1;
			position: absolute;
			top:0;
			background-color:@background-color;
			left:0;
		}
		// 右侧内容
		.right{
			display: flex;
			flex-direction:column;
			flex:1;
			margin-left:20px;
			height:200px;
			p:first-child{
				width:100px;
				height:30px;
				border:1px solid;
				text-align: center;
				line-height:30px;
				border-radius:5px;
				color:@color;
			}
			p:nth-child(2){
				color: #ffffff;
				margin:7px 0;
				font-size:18px;
			}
			p:nth-child(3){
				width:100%;
				height:auto;
				overflow: hidden;
				display:-webkit-box;
				color:#adadad;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:6;
			}
		}
	}
	// 变色
	.active{
		color:red;
	}
	// 导航列表
	.Navigation{
		justify-content: flex-end;
		display: flex;
		margin:15px 0;
		span{
			margin-left:15px;
			font-size: 20px;
			cursor:pointer;
		}
	}
	// 歌单列表
	.song{
		// border: 1px solid red;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.song-box{
			// 特效
			&:hover>div{
					transform: translateY(-15px);
			}
			&:hover>div>p{
				transform: translateY(0);
			}
			&:hover>div>span{
				opacity: 1;
			}
			width:200px;
			margin:5px;
			// 图片区域
			div{
				border-radius: 5px;
				overflow: hidden;
				position: relative;
				width:200px;
				height:200px;	
				// 图标
				span{
					position: absolute;
					right:10px;
					bottom:10px;
					opacity:0;
					color:#ffaa00;
					background-color:#fff;
					border-radius: 50%;
					width:50px;
					height:50px;
					text-align: center;
					line-height: 60px;
					padding-left:7px;
				}
				img{
					width:100%;
					height:100%;
				}
				p{
					position: absolute;
					padding:5px;
					top:0;
					left:0;
					width:100%;
					background-color:rgba(0,0,0,.5);
					height:30px;
					color:white;
					transform: translateY(-100%);
				}
			}
			p{
				height:auto;
				padding:5px 0; 
				overflow: hidden;
				display:-webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
			}
		}
	}
	// 分页栏
	.block{
		text-align: center;
		margin:20px auto;
		
	}
</style>
