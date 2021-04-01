<template>
	<div class="radio">
		<publictop title='电台'></publictop>
		<!-- 轮播图 -->
		<div style="width: 92%;height: 140px;margin: auto;border-radius: 4px;overflow: hidden;position: relative;top: 50px;">
			<mt-swipe :auto="3000" >
			  <mt-swipe-item v-for='(data,index) in slidebannar' :key='index'>
				  <img style="width: 100%;height: 150px;" :src="data.pic" alt="">
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<!-- 电台分类 电台排行 精品付费 -->
		<div class="iconfontlists">
			<li @click="selecticon(1)">
				<img style="width: 50px;height: 50px;" src="@/assets/img/0011.png" alt="">
				<div style="font-size: 12px;margin-top: 2px;">电台分类</div>
			</li>
			<li @click="selecticon(2)">
				<img style="width: 50px;height: 50px;" src="@/assets/img/0022.png" alt="">
				<div style="font-size: 12px;margin-top: 2px;">电台排行</div>
			</li>
			<li @click="selecticon(3)">
				<img style="width: 50px;height: 50px;" src="@/assets/img/0033.png" alt="">
				<div style="font-size: 12px;margin-top: 2px;">付费精品</div>
			</li>
			<li @click="selecticon(4)">
				<img style="width: 50px;height: 50px;" src="@/assets/img/0044.png" alt="">
				<div style="font-size: 12px;margin-top: 2px;">声之剧场</div>
			</li>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Swipe, SwipeItem } from 'mint-ui';
	import publictop from '@/components/publictop'
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	export default {
		components:{
			publictop,
		},
		
		data(){
			return {
				slidebannar:[],
				topbariconurl:['@/assets/img/0011.png','@/assets/img/0022.png','@/assets/img/0033.png','@/assets/img/0044.png'],
				
			}
		},
		
		mounted() {
			// 请求电台首页的数据
			this.getinitdata();
		},
		
		methods:{
			getinitdata(){
				// 电台轮播图数据
				this.$axios.get('/dj/banner').then(resp=>{
					this.slidebannar = resp.data.data;
				})
			},
			
			// 选择icon
			selecticon(index){
				// 电台分类
				if(index == 1){
					this.$router.push('/radioclassify');
				}
				
			}
		}
	}
</script>

<style scoped="scoped">
	.radio {
		width: 100%;
		height: 100%;
	}
	
	/* 电台分类 电台排行 精品付费 */
	.iconfontlists {
		width: 92%;
		height: 70px;
		margin: auto;
		margin-top: 60px;
		display: flex;
		justify-content: space-around;
	}
	
	
	
	
</style>
