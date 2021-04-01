<template>
	<!-- 电台详细下面的内容 -->
	<div class="muiscgather">
		<ul class="muiscgather_ul">
			<router-link to="/detailradio/detail" tag="li" active-class="focus">详细</router-link>
			<router-link to="/detailradio/program" tag="li" active-class="focus">节目<span style="color:#9B9B9B;font-size: 12px;position: relative;top: -1px;left: 3px;">{{programlength}}</span></router-link>
			<router-link to="/detailradio/similarity" tag="li" active-class="focus">相似</router-link>
		</ul>
		<!-- 进行跳转切换的路由 -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		props:{
			programlength:Number,
		}
	}
</script>

<style scoped="scoped">
	/* 大盒子 */
	.muiscgather {
		width: 100%;
		border-radius: 10px 10px 0 0;
		height: 87vh;
		background-color: white;
	}
	
	/* 顶部导航栏 的大盒子*/
	.muiscgather_ul {
		width: 100%;
		height: 35px;
		display: flex;
		justify-content: space-around;
		line-height: 35px;
		border-bottom: 1px solid #E6E6E6;
	}
	
	/* 焦点 */
	.focus {
		color: red;
	}
	
	
	
	
</style>
