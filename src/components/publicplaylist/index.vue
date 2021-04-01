<template>
	<!-- 歌曲渲染 -->
	<div class="musiclistdetail">
		<li v-for="(data,index) in datalist" :key='index' @click="playmusic(data)">
			<div style="color: #999999; margin-left: 10px; width: 40px;height: 50px;float: left;text-align:left;line-height: 40px;">{{index}}</div>
			<div style="width: 85%;white-space: nowrap;text-overflow: ellipsis;">
				<div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{data.name}}</div>
				<div style="color: #999999;font-size: 12px;margin-top: 5px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
					<span v-for="(item,i) in data.ar" :key='i'>
						{{item.name}}
					</span>
					<span>{{data.al.name}}</span>
				</div>
			</div>
			<!-- 每个歌曲的icon -->
			<div class="musiclistdetail_icon">
				<i class="iconfont" style="margin-right: 15px;">&#xe637;</i>
				<i class="iconfont">&#xe60f;</i>
			</div>
		</li>
		<div v-if="$store.state.users.currentmusic" style="width: 100%;height: 50px;"></div>
	</div>
</template>

<script>
	export default{
		props:{
			datalist:{},
		},
		
		data(){
			return {
			
			}
		},
		
		methods:{
			// 点击播放
			playmusic(data){
				// 开启底部播放器
				this.$store.commit('users/needbottom',true);
				this.$store.commit('users/currentmusic',data);
			},
		}
	}
</script>

<style scoped="scoped">
	/* 歌单详细 */
	.musiclistdetail {
		width: 90%;
		height: 80vh;
		overflow: auto;
		margin: auto;
		margin-top: 30px;
	}
	
	/* 每个歌曲栏的li */
	.musiclistdetail li {
		list-style: none;
		width: 100%;
		height: 50px;
		margin-bottom: 10px;
		overflow: hidden;
	}
	
	/* 每个歌曲后面的icon */
	.musiclistdetail_icon {
		width: 60px;
		height: 30px;
		position: relative;
		float: right;
		left: 20px;
		top: -30px;
		color: #B3B3B3;
	}
	
	/* 跑马灯 */
	.marquee {
		position: fixed;
		z-index: 1000;
		top: 21px;
		left: 50px;
		width: 50%;
		height: 50px;
		color: white;
		font-size: 19px;
	}
</style>
