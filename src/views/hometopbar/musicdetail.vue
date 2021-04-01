<template>
	<div class="musicdetail" v-if="musicdata">
		<!-- 顶部导航栏 -->
		<div class="bgimg" ref='musicdetail'></div>
		<div class="topbar">
			<i class="iconfont" style="font-size: 24px;margin-left: 20px;" @click="jumpsuperior()">&#xe65d;</i>
			<div style="position: relative;top: -35px;left: 60px;font-size: 20px;">
				<span v-text="musicdata.name"></span>
				<div style="font-size: 14px;color: #A9A69B;">
					<span v-for="(data,index) in musicdata.ar" :key='index'>{{data.name}}</span>
					<i class="iconfont">&#xe62d;</i>
				</div>
			</div>
			<i class="iconfont" style="float: right;position: relative;top: -75px;margin-right: 20px;font-size: 28px;">&#xe623;</i>
		</div>
		<!-- 中间的内容 -->
			<!-- 圆盘 -->
		<div v-show="!isshowlyric" @click.stop='Switchbetween()'>
			<musicdetail ></musicdetail>
		</div>
			<!-- 歌词-->
		<div v-show="isshowlyric" @click.stop='Switchbetween()'>
			<lyric ></lyric>
		</div>
		<!-- 进度条 和两端的时间 -->
		<div class="progress" @click="progress()" ref='progress'>
			<div class="currentprogress" ref='currentprogress'>
				<div class="circle" @touchmove='touchMove()' @touchend='touchEnd()' ref='circle'></div>
			</div>
		</div>
		<!-- 左边时间 -->
		<div class="currenttime">{{currenttime}}</div>

		<!-- 右边时间 -->
		<div class="sumtime">{{sumtime}}</div>
		
		<!-- 下面的播放组件 -->
		<bottombar ></bottombar>
	</div>
</template>

<script>
	import bottombar from '@/components/musicdetail/bottombar.vue'
	import musicdetail from '@/components/musicdetail/Circleplate.vue'
	import lyric from '@/components/musicdetail/lyric.vue'
	export default {
		components:{
			musicdetail,
			bottombar,
			lyric,
		},
		
		data(){
			return {
				musicdata:{},
				sumtime:'',
				currenttime:'',
				// 进度条百分比
				percent:Number,
				isshowlyric:false,
				lyrica:null,
				lyricArr:[]
			}
		},
		
		computed:{
		},
		
		watch:{
		
		},
		
		methods:{
			jumpsuperior(){
				this.$router.back(-1);
			},
			
			//更新时间 
			updatetime(){
				// 总时间
				var minute1 = Math.floor(this.$store.state.users.audiodom.duration/60);
				var second1 = Math.floor(this.$store.state.users.audiodom.duration-(minute1*60));
				this.$nextTick(()=>{
					if(minute1<10){
						minute1 = '0'+minute1
					}
					if(second1<10){
						second1 = '0'+second1
					}
					this.sumtime = minute1+':'+second1
				})
				
				
				
				// 当前时间
				var minute2 = Math.floor(this.$store.state.users.audiodom.currentTime/60);
				var second2 = Math.floor(this.$store.state.users.audiodom.currentTime-(minute2*60));
				this.$nextTick(()=>{
					if(minute2<10){
						minute2 = '0'+minute2
					}
					if(second2<10){
						second2 = '0'+second2
					}
					this.currenttime = minute2+':'+second2
					// 将当前时间存vueX 
					this.$store.commit('users/currenttime',{minute:minute2,second:second2})
				})
				
				// 进度条更新
				this.percent = (this.$store.state.users.audiodom.currentTime/this.$store.state.users.audiodom.duration)*100;
				this.$refs.currentprogress.style.width = `${this.percent}%`
			},
			
			// 拖动小圆圈
			touchMove(event){
				// 暂停播放音乐
				this.$store.state.users.audiodom.pause()
				const e = event || window.event
				const progressWidth = this.$refs.progress.offsetWidth // 进度条总宽度
				let moveX = e.touches[0].pageX -this.$refs.progress.offsetLeft // 83是进度条距离浏览器的距离
				if (moveX >= progressWidth) moveX = progressWidth // 边界值判断
				this.$store.state.users.audiodom.currentTime = ((moveX / progressWidth) * this.$store.state.users.audiodom.duration) // 实时更新播放时间
				this.percent =(moveX/progressWidth)*100;
			},
			
			// 释放
			touchEnd(e) {
				if(this.$store.state.users.isplay){
					this.$store.state.users.audiodom.play();
				}
			},
			
			// 点击进度条进行更新进度
			progress(event){
				const e = event || window.event
				const position = e.clientX - e.currentTarget.offsetLeft // 当前点击的位置
				const progressWidth = this.$refs.progress.offsetWidth // 进度条总宽度
				this.percent =(position/progressWidth)*100;
				this.$refs.currentprogress.style.width = `${this.percent}%`
				this.$store.state.users.audiodom.currentTime = (this.percent/100) * this.$store.state.users.audiodom.duration;
			},
		
			//	点击切换圆盘和歌词
			Switchbetween(){
				this.isshowlyric = !this.isshowlyric;
			},
			
			// 获取歌词
			// /\[(\d{2}):(\d{2})\.(?:\d+)\](.*)/g
			lyric(id){
				this.$axios.get(`/lyric?id=${id}`).then(resp=>{
					var i=0;
					resp.data.lrc.lyric.replace(/\[(\d{2}):(\d{2})\.(?:\d+)\](.*)/g,(_,hour,minute,content)=>{
						this.lyricArr.push({
							index:`${i++}`,
							minute:hour,
							second:minute,
							content,
						})
					})
					// 将歌词传vueX
					this.$store.commit('users/lyric',this.lyricArr);
				})
			},
			
			
		},
		
		// 进入路由
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.lyricArr = [];
				// 进入路由就隐藏底部播放器
				vm.$store.commit('users/needbottom',false);
				vm.musicdata = vm.$store.state.users.currentmusic;
				// 进入路由就更新背景图片
				vm.$refs.musicdetail.style.backgroundImage=`url(${vm.$store.state.users.currentmusic.al.picUrl})`
				// 监听时间的变化
				vm.$store.state.users.audiodom.ontimeupdate = vm.updatetime;
				// 获取歌词
				vm.lyric(vm.musicdata.id);
				// 进入路由就设置需要踮脚
				// 不需要踮脚
				vm.$store.commit('users/needbottom',false);
			})
		},
		
		// 退出路由
		beforeRouteLeave (to, from, next) {
			this.$store.commit('users/needbottom',true);
			next();
		}
		
	}
</script>

<style scoped="scoped">
	.musicdetail {
		width: 100%;
		height: 100%;
		color: white;
		overflow: hidden;
	}
	
	/* 背景图片的盒子 */
	.bgimg {
		/* background-image: url(http://p3.music.126.net/PcJq6i7zMcPgudejdn1yeg==/109951163256302356.jpg); */
		width: 100%;
		height: 100%;
		background-color: #161824;
		background-position: 0 0;
		background-repeat: no-repeat;
		background-size: auto 100%;
		transform-origin: center top;
		transition: opacity .3s linear;
		z-index: 1;
		/* -webkit-filter: blur(10px); */
	}
	
	.bgimg::before{
		content:  "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0,0,0,0.8);
	}

	.topbar {
		width: 100%;
		margin: auto;
		height: 50px;
		position: fixed;
		top: 25px;
	}

	.progress {
		width: 68%;
		height: 1px;
		background-color: #A19669;
		margin-left: -34%;
		position: absolute;
		left: 50%;
		bottom: 90px;
	}
	
	.currenttime {
		color: rgb(169, 166, 155);
		font-size: 10px;
		position: absolute;
		bottom: 83px;
		left: 22px;
	}
	
	.sumtime {
		color: #7F7F7D;
		font-size: 10px;
		position: absolute;
		bottom: 83px;
		right: 22px;
	}
	
	/* 当前进度条 */
	.currentprogress {
		width: 0%;
		height: 1px;
		background-color: #BCB696;
	}
	
	/* 进度条中的圆圈 */
	.circle {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: #FFFFFF;
		float: right;
		position: relative;
		top: -2px;
	}
	
	
</style>
