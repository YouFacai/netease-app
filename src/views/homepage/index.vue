<template>
	<div class="homepage">
		<!-- 顶部栏 和轮播图 和 每日推荐那一块 -->
		<div class="topmsg">
			<!-- 首页的topbar -->
			<div class="topbar">
				<i class="iconfont" style="font-size: 24px;float: left;top: 7px;position: relative;">&#xe643;</i>
				<ul class="topbar_ul">
					<router-link to='/me' tag="li" active-class="focusrouter">我的</router-link>
					<router-link to='/find' tag="li" active-class="focusrouter">发现</router-link>
					<router-link to='/Cloudvillage' tag="li" active-class="focusrouter">云村</router-link>
					<router-link to='/video' tag="li" active-class="focusrouter">视频</router-link>
				</ul>
				<i class="iconfont" style="font-size: 20px;float: right;position: relative;top: -8px;margin-right: 14px;" @click="$router.push('/selectmusic')">&#xe627;</i>
			</div>
			<!-- topbar 跳转的 路由视图 -->
			<router-view style="margin-top: 40px;"></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				isplay:'false',
				sumtime:0,
				currenttime:0,
			}
		},
		
		watch:{
			// 监听是否开始播放
			isplay(newval,oldval){
				// window.clearInterval(this.timer);
				if(newval == true){
					// 开始播放音频
					this.$refs.musicaudio.play();
					// 歌曲的总时间
						this.timer = setInterval(()=>{
						this.$refs.bottomimg.style.transform='rotate('+(this.angle++)+'deg)';
						// 计算当前的时间
						this.currenttime = this.$refs.musicaudio.currentTime;
						this.sumtime = this.$refs.musicaudio.duration;
						if(this.currenttime/this.sumtime){
							this.percentage = (this.currenttime/this.sumtime)*100
						}
					},100)
				}else {
					// 暂停音频
					this.$refs.musicaudio.pause();
					window.clearInterval(this.timer);
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.homepage {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
	
	/* 顶部消息 轮播图 加 每日推荐 */
	.topmsg {
		width: 96%;
		margin: auto;
		height: 300px;
	}
	
	/* 顶部导航栏 */
	.topbar {
		/* margin-top: 10px; */
		position: fixed;
		top: 0px;
		z-index: 800;
		width: 100%;
		background-color: white;
	}
	
	/* 顶部导航栏中间的文字 */
	.topbar_ul {
		width: 70%;
		margin: auto;
		overflow: hidden;
		position: relative;
		top: 10px;
		left: -3%;
		display: flex;
		justify-content: space-around;
	}
	
	.topbar_ul li {
		list-style: none;
		color: #818181;
		padding: 0px 8px ;
	}
	
	/* 路由焦点的样式 */
	.focusrouter {
		color: black !important;
		transition: .2s;
	}
</style>
