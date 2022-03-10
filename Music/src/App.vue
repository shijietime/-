<template>
  <div id="app">
		<!-- 占位符 -->
		<router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
	html,body{
		width:100%;
		height:100%;
	}
	*{
		box-sizing: border-box;
		transition-duration: 0.5s;
		margin:0;
		padding:0;
	}
	a{
		font-size: 20px;
		/* color:#383838; */
		 text-decoration:none;
	}
</style>
