<template>
	<div class="publicbottom">
		<!-- 播放图片 -->
			<div @click="musicdetail()" style="width: 40px;height: 40px;border-radius: 50%;margin: 6px 0 0 6px;float: left;" ref='bottomimg'>
				<img v-if="bottomdata.al" :src="bottomdata.al.picUrl" style="width: 40px;height: 40px;border-radius: 50%;" alt="">
				<img v-else :src="bottomdata.coverUrl" style="width: 40px;height: 40px;border-radius: 50%;" alt="">
			</div>
			<!-- 图片右边的信息 -->
			<div class="publicbottom_content">
				<div v-if="bottomdata" style="font-size: 14px;width: 60%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{bottomdata.name}}</div>
				<!-- 歌词 -->
				<div style="font-size: 14px;color: #8A8A8A;width: 60%;">歌词</div>
				<!-- 开关控件 -->
				<div style="width: 120px;height: 50px;position: relative;top: -35px;float: right;margin-right: 10px;">
					<span style="position: relative;top: 5px;">
						<el-progress color='#f56c6c' :stroke-width='2' :width='30' type="circle" :percentage='percentage' :show-text='false'></el-progress>
					</span>
					<!-- 开 -->
					<i v-if="!isplay" @click="$store.commit('users/isplay',true) " class="iconfont" style=" position: relative;font-size: 22px;position: relative;left: -31px;">
						&#xe615;
					</i>
					<!-- 关 -->
					<i v-else class="iconfont" @click="$store.commit('users/isplay',false)" style="position: relative;font-size: 22px;position: relative;left: -31px;">
						&#xe7af;
					</i>
					<i class="iconfont" style="position: relative;left: -20px;top: -2px;">&#xe614;</i>
				</div>
			</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				// 暂停圆圈 百分比
				percentage:0,
				// 定时器
				timer:null,
				// 旋转
				rotate:0,
			}
		},
		
		methods:{
			musicdetail(){
				// 点旋转图片跳转路由
				this.$router.push('/musicdetail');
			}
		},
		
		computed: {
			// 请求数据并初始化
			bottomdata(){
				this.percentage= 0;
				// 旋转角度也要初始化
				this.rotate = 0;
				if(this.$store.state.users.currentmusic){
					// 解析id 歌曲并存vueX  歌曲地址
					this.$axios.get(`/song/url?id=${this.$store.state.users.currentmusic.id}`).then(resp=>{
					// 数据请求回来  后再干事情
					// 把歌曲地址存vuex
					this.$store.commit('users/currentmusicurl',resp.data.data[0].url)
					this.$store.commit('users/isplay',true)
					})
					// 返回数据渲染页面
					return this.$store.state.users.currentmusic;
					
				}
				// 宝 al  什么未定义就是 刚开始没有初始化
				return {al:{picUrl:null}}
			},
			
			// audiodom
			audiodom(){
				return this.$store.state.users.audiodom;
			},
			
			isplay(){
				return this.$store.state.users.isplay;
			}
		},
		
		watch:{
			bottomdata(newval,oldval){

			},
			
			// 监听是否开始播放
			isplay(newval,oldval){
				// 是否播放  isplay 也存vuex
				this.$store.commit('users/isplay',newval)
				window.clearInterval(this.timer)
				if(this.audiodom.paused){
					this.audiodom.play();
				}
				if(newval==true){
					this.timer = setInterval(()=>{
						// 暂停 按钮的进度情况
						this.percentage = Number((this.audiodom.currentTime/this.audiodom.duration)*100);
						if((this.audiodom.currentTime/this.audiodom.duration)*100>=99.9){
							this.$store.commit('users/isplay',false)
							this.percentage= 0;
							this.$refs.bottomimg.style.transform = `rotate(0deg)`;
							window.clearInterval(this.timer)
						}
						// 图片旋转
						this.$refs.bottomimg.style.transform = `rotate(${this.rotate++}deg)`;
					},100)
				}else {
					this.audiodom.pause();
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.publicbottom {
		width: 100%;
		overflow: hidden;
		height: 55px;
		position: fixed;
		bottom: -9px;
		z-index: 900;
		border-top: 1px solid #EDEDED;
		background-color: white;
	}
	
	/* 内容 */
	.publicbottom_content {
		width: 100%;
		height: 40px;
		margin-top: 5px;
		margin-left: 60px;
	}
</style>
