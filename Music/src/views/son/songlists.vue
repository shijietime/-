<template>
	<div class="songmusic">
		<!-- {{this.$route.query.h}} -->
		<!-- 简介部分 -->
		<div class="songmusic-top">
			<div class="left">
				<img :src="songlists.coverImgUrl" >
			</div>
			<div class="right">
				<p>{{songlists.name}}</p>
				
				<div>
					<img :src="songlists.creator.avatarUrl" >&nbsp;
					<span>{{songlists.creator.nickname}}</span><span>{{new Date(songlists.createTime).toLocaleDateString()}}创建</span>
				</div>
				
				<div @click="Playall">
					<span class="fa fa-play-circle-o" aria-hidden="true"></span>
					<span>播放全部</span>
				</div>
				
				<div>
					<span>标签:</span>
					<span v-if="songlists.tags.length != 0">
						<span v-for="(item,index) in songlists.tags":key="index">{{item}}</span>
					</span>
				</div>
				
				<div class="late">
					<span>简介:<span>{{songlists.description}}</span></span>
				</div>
				
			</div>
		</div>
		<!-- 歌单列表部分 -->
		<el-tabs v-model="activeName">
		    <el-tab-pane label="歌曲列表" name="first" class="hao">
					<table border="0" cellspacing="0" cellpadding="">
						<thead>
							<th></th>
							<th></th>
							<th>音乐标题</th>
							<th>歌手</th>
							<th>专辑</th>
							<th>时长</th>
						</thead>
						<tbody>
							<tr v-for="(item,index) in songlists.tracks":key="item.id">
								<td class="box-one">{{index+1}}</td>
								<td>
									<div class="box-one-img"@click="getmusic(item.id)">
										<img :src="item.al.picUrl" alt="图">
										<span class="box-one-img-hao"><i class="fa fa-play"></i></span>
									</div>
								</td>
								<td>
									<span>{{item.name}}</span>&nbsp;
									<span v-if="item.mv != 0" @click="goMV(item.mv)" class="getto"><i class="fa fa-youtube-play"></i></span>
								</td>
								<td>{{item.ar[0].name}}</td>
								<td>{{item.al.name}}</td>
								<td>{{item.dt}}</td>
							</tr>
						</tbody>
					</table>
				</el-tab-pane>
		    <el-tab-pane label="评论()" name="second">
					<div class="comment">开发中...</div>
				</el-tab-pane>
		  </el-tabs>
		
	</div>
</template>

<script>
	import Bus from '@/views/zhuti/EventBus.js'
	
	export default{
		name:'songlists',
		data(){
			return{
				id:this.$route.query.h,
				songlists:{
					//由于是异步请求,页面初步渲染的时候获取不到
					creator:{},
					tags:{},
				},
				activeName: 'first'
			}
		},
		created() {
			this.getlist()
		},
		methods:{
			getlist(){
				this.axios.get('/playlist/detail',{
					params:{
						id:this.id
					}
				}).then(res=>{
					// console.log(res)
					this.songlists = res.data.playlist
					// console.log(this.songlists)
					for(var i = 0;i<this.songlists.tracks.length;i++){
						var time = new Date(this.songlists.tracks[i].dt)
						var m = time.getMinutes()
						if(m<10){ m = '0' + m}
						var s = time.getSeconds()
						if(s<10){ s = '0' + s}
						this.songlists.tracks[i].dt = m+':'+s
					}
				})
			},
			// 跳转视频
			goMV(mv){
				this.$router.push('/index/mv?h='+mv)
			},
			//播放音乐
			getmusic(id){
				this.axios.get('/song/url',{
					params:{
						id
					}
				}).then(res=>{
					// console.log(res)
					var musicUrl = res.data.data[0].url
					Bus.$emit('two',musicUrl)
				})
			},
			// 点击播放全部歌曲
			Playall(){
				// this.axios.get('/playlist/detail',{
				// 	params:{
				// 		id:this.id
				// 	}
				// }).then(res=>{
				// 	console.log(res)
				// 	var all = res.data.playlist.tracks
				// 	for(var i = 0;i<all.length;i++){
				// 		console.log(all[i].id)
				// 		var music = res.data.data[i].url
				// 	}
					
				// 	Bus.$emit('two',{
						
				// 	})
					
				// })
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.songmusic-top{
		width:100%;
		display: flex;
		.left{
			width:230px;
			height:230px;
			margin-right:30px;
			overflow: hidden;
			img{
				width:230px;
				height:230px;
			}
		}
		.right{
			display: flex;
			flex:1;
			flex-direction: column;
			justify-content:space-around;
			div:nth-child(2){
				display: flex;
				align-items: center;
				img{
					width:40px;
					border-radius: 150px;
				}
				span:last-child{
					padding-top:5px;
					font-size: 12px;
					margin-left:5px;
				}
			}
			div:nth-child(3){
				width:110px;
				background-color: red;
				color:white;
				padding:5px 10px;
				border-radius:5px;
				cursor: pointer;
				span:first-child{
					margin-right:5px;
				}
			}
			div:nth-child(4)>span>span:not(:last-child):after{
				content:"/";
				margin:0 4px;
			}
		}
	}
	/deep/.el-tabs__item.is-active{
		color:#c8161d;
	}
	/deep/.el-tabs__active-bar{
		background-color: #c8161d;
	}
	/deep/.el-tabs__item:hover {
    color: #c8161d;
    cursor: pointer;
}
// songlists组件滚轮,可去掉
.hao{
	// border:1px solid;
	overflow: auto;
	height:450px;
}
table{
	width:100%;
}
.box-one{
	height:80px;
	width:80px;
	padding-left:20px;
}
th:nth-child(3),th:nth-child(4),th:nth-child(5){
	height:45px;
	width:25%;
	text-align: left;
}

th:last-child,td:last-child{
	text-align: center;
	width:8%;
}
.box-one-img{
	position: relative;
	width:60px;
	border-radius: 5px;
	overflow: hidden;
	margin-right:20px;
	height:60px;
	margin:5px;
}
.box-one-img>img{
	width:60px;
	height:60px;
}
.box-one-img span{
	width:28px;
	height:28px;
	background-color: #D3DCE6;
	border-radius: 50%;
	position: absolute;
	top:50%;
	left:50%;
	color:orange;
	transform: translate(-50%,-50%);
}
.active{
	background-color: #efefef;
}
tr:hover{
	background-color: #efefef;
}
.box-one-img-hao{
	text-align: center;
	line-height:30px;
}
.getto{
	color:#8e44ad ;
	cursor: pointer;
}
//评论
.comment{
	width:100%;
	// border:1px solid ;
	// height:1000px;
}
</style>
