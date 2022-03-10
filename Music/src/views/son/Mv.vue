<template>
	<div class="video">
		<div class="video-left">
			<h3>mv详情</h3>
			<!-- MV -->
			<div class="video-left-mv">
				<video :src="mvlist.url"
				controls
				autoplay=""
				></video>
			</div>
			<!-- 歌手信息 -->
			<div class="video-left-Singer">
				<div class="video-left-Singer-top">
					<img :src="MVsingerlist.img1v1Url" >
					<h3>{{MVsingerlist.name}}</h3>
				</div>
				<h1>{{singerlist.name}}</h1>
				<div class="video-left-Singer-bottom">
					<span style="margin-right: 20px;;">发布:&nbsp;{{singerlist.publishTime}}</span>
					<span>播放:&nbsp;{{singerlist.playCount}}次</span>
				</div>
				<p class="desc">
				  {{singerlist.desc}}
				</p>
			</div>
			<!-- 发布评论 -->
			
			<div class="post">
				<h2>评论</h2>
				<textarea rows="" cols=""></textarea>
				<el-row class="button">
				  <el-button type="primary">发布</el-button>
				</el-row>
			</div>
			
			<!-- 精彩评论 -->
			<div class="comment" v-if="hotComments.length != 0">
				<h2>精彩评论({{hotComments.length}})</h2>
				<div class="comment-max">
					<!-- 评论内容 -->
					<div class="comment-min" v-for="item in hotComments":key="item.id">
						<div class="comment-min-left"><img :src="item.user.avatarUrl" alt=""></div>
						<div class="comment-min-right">
							<div>
								<span>{{item.user.nickname}}:&nbsp;</span>
								<span>{{item.content}}</span>
							</div>
							<div class="duo" v-if="item.beReplied.length !=0">
								<span>{{item.beReplied[0].user.nickname}}:</span>
								<span>{{item.beReplied[0].content}}</span>
							</div>
							<div>{{new Date(item.time).toLocaleString()}}</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 最新评论 -->
			<div class="comment">
				<h2>最近评论({{total}})</h2>
				<div class="comment-max">
					<!-- 评论内容 -->
					<div class="comment-min" v-for="item in comments":key="item.id">
						<div class="comment-min-left"><img :src="item.user.avatarUrl" alt=""></div>
						<div class="comment-min-right">
							<div>
								<span>{{item.user.nickname}}:&nbsp;</span>
								<span>{{item.content}}</span>
							</div>
							<div class="duo" v-if="item.beReplied.length != 0">
								<span>{{item.beReplied[0].user.nickname}}:</span>
								<span>{{item.beReplied[0].content}}</span>
							</div>
							<div>{{new Date(item.time).toLocaleString()}}</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 分页器 -->
			<div class="block">
				<el-pagination
					:current-page="page"
					:page-size="limit"
					background=""
					@current-change="currentChange"
					layout="prev, pager, next"
					:total="total"
					></el-pagination>
			</div>
		</div>
		<!-- 相关推荐 -->
		<div class="video-right">
			<h3>相关推荐</h3>
			<div class="video-right-max">
				<!-- 开始部分 -->
				<div class="video-right-min" v-for="item in recommendlist":key="item.id"@click="toMvlist(item.id)">
					<div class="video-right-min-img">
						<img :src="item.cover" alt="">
						<span><i class="fa fa-play fa-2x"></i></span>
						<div class="video-right-min-img-right"><i class="fa fa-play"></i>&nbsp;{{item.playCount}}</div>
						<div class="video-right-min-img-bottom">{{item.duration}}</div>
					</div>
					<div class="video-right-min-text">
						<div>
							<p>{{item.name}}</p>
							<span>{{item.artistName}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Bus from '@/views/zhuti/EventBus.js'
	
	export default{
		name:'MV',
		data(){
			return{
				// 视频接口
				mvlist:[],
				// 传入参数id
				id:this.$route.query.h,
				// Mv的信息
				singerlist:[],
				// Mv歌手的信息
				MVsingerlist:[],
				// 右侧相关推荐
				recommendlist:[],
				// 精彩评论
				hotComments:[],
				//最新评论
				comments:[],
				// 评论的页数
				page:1,
				// 评论总条数
				total:10,
				limit:10
			}
		},
		created() {
			//跳转的视频
			this.MVlist()
			//Mv信息,歌手信息
			this.Singerlist()
			// 相关推荐
			this.recommend()
			// 最新评论
			this.comment()
		},
		watch:{
		  id(){
				// id值变换,其他接口的值都跟着变化
		    this.MVlist()
				this.Singerlist()
				this.recommend()
				this.comment()
		  }
		},
		methods:{
			// 点击换页
			currentChange(val){
				// console.log(val)
				this.page = val
				// 重新调用接口
				this.axios.get('/comment/mv',{
					params:{
						// 当前id的精彩评论
						id:this.id,
						limit:this.limit,
						offset:(this.page -1)*this.limit
					}
				}).then(res=>{
					// this.total = res.data.total
					this.comments = res.data.comments
				})
			},
			//点击跳转视频
			toMvlist(id){
				// 更改这个页面的全局mv的id，然后用watch监听id的变化，有变化则重新加载一次页面
				this.id = id
				this.$router.push('/index/mv?h='+id)
			},
			// 跳转过来的视频接口
			MVlist(){
				this.axios.get('/mv/url',{
					params:{
						id:this.id
					}
				}).then(res=>{
					// 视频的地址
					// console.log(res.data.data.url)
					this.mvlist = res.data.data
					// console.log(this)
				})
			},
			// 歌手信息
			Singerlist(){
				this.axios.get('/mv/detail',{
					params:{
						mvid:this.id
					}
				}).then(res=>{
					// console.log(res)
					this.singerlist = res.data.data
					// 直接写,不用循环,就这一个数据
					// if(this.singerlist.playCount >= 10000){
					// 	this.singerlist.playCount = parseInt(this.singerlist.playCount/10000)+"万"
					// }
					// 获取id值
					var listid = this.singerlist.artists[0].id
					// 获取歌手的头像
					this.axios.get('/artists',{
						params:{
							id:listid
						}
					}).then(res=>{
						// console.log(res)
						this.MVsingerlist = res.data.artist
					})
					
				})
			},
			// 相关推荐
			recommend(){
				this.axios.get('/simi/mv',{
					params:{
						mvid:this.id
					}
				}).then(res=>{
					// console.log(res.data.mvs)
					this.recommendlist = res.data.mvs
					for(var i = 0;i<this.recommendlist.length;i++){
						if(this.recommendlist[i].playCount >= 10000){
							this.recommendlist[i].playCount = parseInt(this.recommendlist[i].playCount/10000)+"万"
						}
						var time = new Date(this.recommendlist[i].duration)
						var h = time.getMinutes()
						if(h<10){h = '0'+h}
						var s = time.getSeconds()
						if(s<10){s = '0'+s}
						this.recommendlist[i].duration = h+":"+s
					}
				})
			},
			// 最新评论
			comment(){
				this.axios.get('/comment/mv',{
					params:{
						// 当前id的精彩评论
						id:this.id,
						limit:this.limit,
						offset:(this.page -1)*this.limit
					}
				}).then(res=>{
					// console.log(res)
					// console.log(res.data.total)
					this.hotComments = res.data.hotComments
					this.total = res.data.total
					this.comments = res.data.comments
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.video{
		max-width: 1100px;
		/* border:1px solid; */
		margin: 0 auto;
		display: flex;
		min-width: 700px;
	}
	.video-left{
		width:100%;
		margin-right:35px;
		height:1000px;
	}
	.video-right{
		/* flex:1; */
		width:600px;
	}
	.video-left-mv{
		margin-top:20px;
		width:100%;
		border-radius: 5px;
		overflow: hidden;
		height:390px;
	}
	.video-left-mv video{
		 outline:none;
		width:100%;
		height:100%;
	}
	/* 歌手信息 */
	.video-left-Singer{
		/* margin-bottom: 40px; */
		margin-top: 20px;
	}
	.video-left-Singer-top{
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}
	.video-left-Singer-bottom{
		margin-top: 20px;
		color:#8d8d8d;
	}
	.video-left-Singer-top img{
		width:80px;
		height:80px;
		border-radius: 50%;
	}
	.video-left-Singer-top>h3{
		display: inline-block;
		margin-left: 20px;
	}
	.desc{
		margin-top:20px;
		font-size:15px;
		color:#646464;
	}
	/* 右侧相关推荐 */
	.video-right-max{
		margin-top:20px;
	}
	.video-right-min{
		padding:10px 0;
		padding-left: 10px;
		display: flex;
	}
	.video-right-min:hover{
		background-color: #f3f3f3;
	}
	.video-right-min-img,.video-right-min-img>img{
		position: relative;
		border-radius: 5px;
		overflow: hidden;
		width:160px;
		height:100px;
		/* border:1px solid red; */
	}
	.video-right-min-img>span{
		position: absolute;
		border-radius: 50%;
		width:40px;
		height:40px;
		padding-left:10px;
		padding-top:5px;
		background-color: #ffffff;
		top:50%;
		left:50%;
		opacity:0;
		transform: translate(-50%,-50%);
		color:orange;
	}
	.video-right-min-img:hover span{
		opacity:1;
	}
	.video-right-min-text{
		display: flex;
		width:150px;
		font-size:15px;
		padding:0px 10px;
		align-items: center;
	}
	.video-right-min-text span{
		color: #888888;
	}
	.video-right-min-img-right{
		position: absolute;
		right:5px;
		top:2px;
		color:white;
	}
	.video-right-min-img-bottom{
		right:5px;
		position:absolute;
		bottom:2px;
		color:white;
	}
	.comment{
		margin-top: 60px;
	}
	.block{
		margin-top:20px;
		width:100%;
		display: flex;
		justify-content: center;
	}
	.comment-max{
		width:100%;
		margin-top: 30px;;
	}
	.comment-min{
		padding: 20px 0;
		display: flex;
		width:100%;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
	}
	.comment-min-left{
		width:60px;
		height:60px;
		margin-right: 20px;
		border-radius: 50%;
		overflow: hidden;
	}
	.comment-min-left>img{
		width:60px;
	}
	.comment-min-right{
		flex: 1;
		min-height:80px;
		font-size: 13px;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
		flex-direction:column;
	}
	.comment-min-right div:first-child span:first-child{
		color:#00aaff;
	}
	.comment-min-right div:last-child{
		color:#919191;
	}
	.comment-min-right>.duo{
		background-color: #d4d4d4;
		padding:5px;
		/* margin:10px 0; */
		border-radius: 5px;
	}
	.comment-min-right>.duo span:first-child{
		color:#00aaff;
	}
	.post{
		height:180px;
		position: relative;
		margin-top:30px;
	}
	.post textarea{
		margin-top:5px;
		width:100%;
		border: 1px solid #bdbdbd;
		height:100px;
		resize: none;
		font-size: 20px;
		font-family: "宋体";
		outline: none;
	}
	.post .button{
		position: absolute;
		right:0px;
		bottom: 0px;
	}
</style>
