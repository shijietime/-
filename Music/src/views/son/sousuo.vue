<template>
	<div>
		<div class="search">
			<h2>{{this.$route.query.h}}</h2>
			<span style="color:#99A9BF">找到{{total}}个结果</span>
		</div>
		<el-tabs type="border-card"  v-model="activeName">
			<!-- 歌曲部分 -->
		  <el-tab-pane label="歌曲" name="song">
				<table border="0" cellspacing="0px" cellpadding="0px">
					<thead>
						<th></th>
						<th>音乐标题</th>
						<th>歌手</th>
						<th>专辑</th>
						<th>时长</th>
					</thead>
					<tbody>
						<tr v-for="(item,index) in list" v-bind:class="{hao:index%2==0}" :key="item.id" @dblclick="playMusic(item.id)">
							<td>{{index+1}}</td>
							<td>{{item.name}}</td>
							<td>{{item.artists[0].name}}</td>
							<td>{{item.album.name}}</td>
							<td style="text-align: right;">{{item.duration}}</td>
						</tr>
					</tbody>
				</table>
			</el-tab-pane>
			<!-- 歌单部分 -->
		  <el-tab-pane label="歌单" name="lists">
				<div class="music-lists">
					<div class="music-lists-xiao" v-for="item in musiclist":key="item.id" @click="gosong(item.id)">
						<div class="music-lists-img">
							<img :src="item.coverImgUrl" >
							<div class="music-lists-bo"><i class="fa fa-play fa-2x"></i></div>
						</div>
						<p>{{item.name}}</p>
						
						<span>播放量:{{item.playCount}}</span>
					</div>
				</div>
			</el-tab-pane>
			<!-- MV部分 -->
		  <el-tab-pane label="MV" name="Mv">
				<div class="mvlist">
					<div class="mvlist-xiao"v-for="item in mvlist":key="item.id"@click="goMv(item.id)">
						<div class="mvlist-xiao-img">
							<img :src="item.cover" alt="MV图片">
							<span>播放量:{{item.playCount}}</span>
							<div class="music-lists-bo"><i class="fa fa-play fa-2x"></i></div>
						</div>
						<p>{{item.name}}</p>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		
		<el-pagination
		  @current-change="currentChange"
			:current-page="page"
			background
			class="wei"
		  :page-size="20"
		  :pager-count="9"
		  layout="prev, pager, next"
		  :total="total">
		</el-pagination>
		
		<!-- 回到顶部 -->
		<div class="content">
			 <div class="backtop"></div>
			 <el-backtop target=".content .backtop"></el-backtop>
		 </div>
		
		</div>
		
	</div>
</template>

<script>
	// import axios from 'axios'
	import Bus from '@/views/zhuti/EventBus.js'
	
	export default{
		name:'search',
		data(){
			return{
				// prope:[],
				//歌曲列表
				list:[],
				//歌单列表
				musiclist:[],
				//MV列表
				mvlist:[],
				//接口请求的类型
				type:1,
				activeName: 'song',
				// mingzi:'',
				//请求的条数
				limit:15,
				//总条数
				total:0,
				// 当前页页码
				page:1,
				// musicUrl:''
			}
		},
		
		created() {
			this.getList1()
			
			//异步显示先显示的初始数据，此时还没有数据
			// this.playMusic()
			
			// 为bus绑定自定义事件
			// Bus.$on('two',val=>{
			// 	// console.log('事件被触发了',val)
			// 	this.mingzi = val
			// })
		},
		watch:{
			// 监控器
			activeName(){
				// songs
				if(this.activeName == 'song') {this.type = 1, this.limit = 30;}
				//lists
				else if(this.activeName == 'lists') {this.type = 1000,this.limit = 15;}
				//mv
				else if(this.activeName == 'Mv') {this.type = 1004, this.limit = 12;}
				this.page = 1
				this.getList1()
			}
		},
		methods:{
			//去Mv
			goMv(id){
				this.$router.push('/index/mv?h='+id)
			},
			// 去歌单
			gosong(id){
				this.$router.push('/index/songlists?h='+id)
			},
			// 双击播放音乐
			playMusic(id){
				this.axios.get('/song/url',{
					params:{
						id
					}
				}).then(res=>{
					//双击之后接口才会有用
					// console.log(res.data.data[0].url)
					// console.log(this)
					var musicUrl = res.data.data[0].url
					if(res.data.data[0].url == null){
						this.$message({
							message: '该歌曲已下线',
							type: 'warning'
						});
					}else{
						Bus.$emit('two',musicUrl)
					}
					
				})
			},
			currentChange(val){
				this.page=val
				this.getList1()
			},
			getList1(){
				this.axios.get('/search',{
					params:{
						// 关键字
						keywords:this.$route.query.h,
						//换页之后获取到的数据
						offset:(this.page-1)*this.limit,
						type:this.type,
						limit:this.limit 
					}
				}).then(res=>{
					//请求成功后的回调函数
					if(this.type == 1){
						// console.log(res)
						// console.log(this.limit)
						this.list = res.data.result.songs
						//过滤时间
						for(var i = 0;i<this.list.length;i++){
							var time = new Date(this.list[i].duration)
							var m = time.getMinutes()
							if(m<10){m = '0'+m}
							var hm = time.getSeconds()
							if(hm<10){hm = '0'+hm}
							this.list[i].duration = m+':'+hm
						}
						// 条数
						this.total = res.data.result.songCount
					}else if(this.type == 1000){
						// console.log(res)
						// console.log(this.type)
						this.musiclist = res.data.result.playlists
						//过滤播放量
						for(var i = 0; i<this.musiclist.length;i++){
							if(this.musiclist[i].playCount >= 10000){
								this.musiclist[i].playCount = parseInt(this.musiclist[i].playCount/10000)+"万"
							}
						}
						//页数
						this.total = res.data.result.playlistCount
					}else{
						// console.log(res)
						// console.log(this.type)
						this.mvlist = res.data.result.mvs
						for(var i=0;i<this.mvlist.length;i++){
							if(this.mvlist[i].playCount >= 10000){
								this.mvlist[i].playCount = parseInt(this.mvlist[i].playCount/10000)+"万"
							}
						}
						// if(mvlist.mvs == null){
						// 	this.$message({
						// 		message: '警告哦，这是一条警告消息',
						// 		type: 'warning'
						// 	});
						// }
						
						// 总条数
						this.total = res.data.result.mvCount
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.wei{
		margin:30px;
		margin-left: 30%;
	}
	.hao{
		background-color: #e1e1e1;
	}
	.search{
		margin-bottom: 20px;
	}
	.search h2{
		display: inline-block;
		padding-right: 10px;
	}
	table{
		width:100%;
	}
	table>tbody>tr>td:first-child{
		width:80px;
		padding-left: 20px;
	}
	table>tr,
	table>thead>th{
		height:60px;
		text-align:left;
	}
	table>tr>td:last-child,
	table>thead>th:last-child{
		text-align:right;
	}
	table>tbody>tr{
		cursor: pointer;
		height:60px;
		margin-top:10px;
		border: 1px solid ;
	}
	table>tbody>tr:hover{
		background-color: #e1e1e1;
	}
	th,td{
		padding-right:10px;
	}
	th:nth-child(2),th:nth-child(3){
		width:25%;
	}
	.one{
		height:100vh;
		overflow: hidden;
	}
	/* 歌单部分css */
	.music-lists{
		width:100%;
		display: flex;
		flex-wrap: wrap;
	}
	.music-lists-xiao{
		position: relative;
		margin:5px 15px;
		overflow: hidden;
	}
	.music-lists-img,.music-lists-img>img{border-radius: 5px;
		width:200px;
		position: relative;
		height:200px;
	}
	.music-lists-xiao>p{
		width:200px;
		height:45px;
	}
	.music-lists-xiao span{
		position: absolute;
		top:0px;
		color:#eefff9;
		right:5px;
	}
	.music-lists-bo{
		opacity:0;
		width:45px;
		border-radius: 50%;
		height:45px;
		padding-left: 13px;
		padding-top: 7px;
		/* display: flex;
		justify-content: center;
		align-items: center; */
		position: absolute;
		background-color: #ffffff;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		color:orange;
	}
	.music-lists-xiao:hover .music-lists-bo{
		opacity:1;
	}
	/* MV部分css */
	.mvlist{
		display: flex;
		flex-wrap: wrap;
		width:1100px;
		margin:0 auto;
		overflow: hidden;
	}
	.mvlist-xiao{
		width:250px;
		margin:5px 11px;
		overflow: hidden;
	}
	.mvlist-xiao-img{
		position: relative;
	}
	.mvlist-xiao-img>span{
		position: absolute;
		top:0;
		right:5px;
		color: #ffffff;
	}
	.mvlist-xiao-img,.mvlist-xiao-img>img{
		border-radius: 5px;
		width:250px;
		height:150px;
	}
	.mvlist>p{
		height:45px;
	}
	.mvlist-xiao:hover .music-lists-bo{
		opacity:1;
	}
</style>
