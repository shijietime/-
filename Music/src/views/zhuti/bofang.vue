<template>
	<div class="movic">
		<audio :src="urlmusic" controls="" autoplay="" loop>
			当前浏览器不支持audio
		</audio>
	</div>
</template>

<script>
	import Bus from './EventBus.js'
	
	export default{
		data(){
			return{
				urlmusic:'http://m701.music.126.net/20220304172914/15c576022aaf90a2330db881a197b30d/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12463957847/7532/0a5f/70bf/d8c22cbf2b51824fe795e135ab67c701.mp3'
			}
		},
		created(val) {
			Bus.$on('two',val=>{
				this.urlmusic = val
			})
		},
		methods: {
		  // changeMusicUrl(url){ 
		  //   this.musicUrl = url 
		  // }
		},
	}
</script>

<style>
	.movic{
		width:100%;
		height:60px;
		position: fixed;
		bottom: 0;
		background-color: #f1f3f4;
	}
	audio{
		width:100%;
		outline:none;
	}
</style>
