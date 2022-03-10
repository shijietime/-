<template>
	<div class="tabs">
		<ul>
			<router-link to="/index/one"><li><i class="el-icon-headset"></i>Find</li></router-link>
			<router-link to="/index/two"><li><i class="el-icon-finished"></i>Recommend</li></router-link>
			<router-link to="/index/three"><li><i class="el-icon-data-line"></i>Newest</li></router-link>
			<router-link to="/index/five"><li><i class="fa fa-youtube-play"></i>Video</li></router-link>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped>
	.tabs{
		background-color:#555555;
		width:250px;
		border-right:1px solid #353535;
		height:100%;
		/* border: 1px solid; */
		position: relative;
	}
	ul{
		position: absolute;
		width:190px;
		left:30px;
		top:30px;
	}
	ul li{
		border-radius: 5px;
		height:45px;
		display: flex;
		align-items: center;
		padding-left:20px;
		list-style: none;
		margin-bottom: 15px;
	}
	a{
		color:white;
		font-weight: initial;
		font-size: 19px;
	}
	ul li:hover>a{
		color:#AAAAFF;
	}
	ul li:hover{
		background-color: rgba(0,0,0,.5);
	}
	i{
		padding-right:20px;
	}
	/* 自带的一个class */
	a.router-link-active{
		color:#000000;
		text-shadow: 0px 0px 3px #000000;
	}
</style>
