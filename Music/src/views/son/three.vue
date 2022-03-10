<template>
	<div class="new">
		<div class="new-top">
			<span v-bind:class="{yanse:tag==0}"@click="tag=0">全部</span>
			<span v-bind:class="{yanse:tag==7}"@click="tag=7">华语</span>
			<span v-bind:class="{yanse:tag==96}"@click="tag=96">欧美</span>
			<span v-bind:class="{yanse:tag==8}"@click="tag=8">日本</span>
			<span v-bind:class="{yanse:tag==16}"@click="tag=16">韩国</span>
		</div>
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
				<tr v-for="(item,index) in list":key="item.id":class="{active:index%2==0}">
					<td class="box-one">{{index+1}}</td>
					<td>
						<div class="box-one-img">
							<img :src="item.album.blurPicUrl" alt="图">
							<span class="box-one-img-hao"@click="playMusic(item.id)"><i class="fa fa-play"></i></span>
						</div>
					</td>
					<td>{{item.name}}</td>
					<td>{{item.album.artists[0].name}}</td>
					<td>{{item.album.name}}</td>
					<td>{{item.duration}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import Bus from '../zhuti/EventBus.js'
	
	export default{
		data(){
			return{
				tag:0,
				list:[]
			}
		},
		created() {
			this.getlist()
		},
		watch:{
			//点击变换tag也就是type的值
			tag(){
				this.getlist()
			}
		},
		methods:{
			playMusic(id){
				this.axios.get('/song/url',{
					params:{
						id,
					}
				}).then(res=>{
					//单击之后接口才会有用
					// console.log(res)
					// console.log(this)
					var musicUrl = res.data.data[0].url
					if(musicUrl == null){
						this.$message({
							message: '该歌曲已下线',
							type: 'warning'
						});
					}else{
						// console.log(musicUrl)
						Bus.$emit('two',musicUrl)
					}
				})
			},
			getlist(){
				this.axios.get('/top/song',{
					params:{
						type:this.tag,
					}
				}).then(res=>{
					// console.log(res)
					// console.log(this.tag)
					this.list = res.data.data
					this.time()
				})
			},
			// 过滤时间
			time(){
				for(var i = 0;i<this.list.length;i++){
					var time = new Date(this.list[i].duration)
					var h = time.getMinutes()
					if(h<10){h = '0'+h}
					var s = time.getSeconds()
					if(s<10){s = '0'+s}
					this.list[i].duration = h+":"+s
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.new{
		min-width:300px;
		max-width: 1200px;
		/* border:1px solid ; */
		/* height:1200px; */
	}
	.new-top{
		text-align: right;
		margin-bottom: 10px;
	}
	span{
		cursor: pointer;
		color:#6f6f6f;
		padding-left: 10px;
	}
	.yanse{
		color:red;
		font-weight: bolder;
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
		/* opacity:0; */
	}
	/* .box-one-img:hover .box-one-img-hao{
		opacity:1;
	} */
	.active{
		background-color: #efefef;
	}
	tr:hover{
		background-color: #efefef;
	}
</style>
