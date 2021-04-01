<template>
	<div style="width: 100%;height: calc(100% - 180px);position: absolute;top: 70px;overflow: hidden;">
		<!-- 进度条-->
		<div style="height: 30px;position: relative;z-index: 800;top: -2px;ba">
			<div class="progress" @click.stop="progress()" ref='progress'>
				<div class="currentprogress" ref='currentprogress'>
					<div class="circle" @touchmove='touchMove()'  ref='circle'></div>
				</div>
			</div>
			<i class="iconfont" style="font-size: 20px;color:#9FA1A0 ;margin-left: 7%;">&#xe61c;</i>
		</div>
		
		<!-- 渲染歌词 -->
		<div class="bigbox" ref='bigbox'>
			<ul class="bigbox_ul" ref='bigbox_ul' @touchstart='clickmusic()' @touchmove='Determinelyrics()' @touchend="release()">
				<li v-for="(data,index) in lyric" :key='index' style="margin-bottom: 7.5px;margin-top: 7.5px;">
					<div :class="currentindex==index?'focus1':'focus2'" v-if="data.content">{{data.content}}</div>
					<div v-else style="width: 100%;height: 20px;"></div>
				</li>
			</ul>
		</div>
		
		<!-- C位线 表示当前选中的歌词 -->
		<div class="standard" v-if="isshowC">
			<i class="iconfont" @click.stop="jumpmusic()" style="
				position: relative;
				top: 35px;
				margin-left: 3%;
				color: #6F6C73;
			">&#xe615;</i>
			<div class="standard_hr"></div>
			<div style="
				position: relative;
				float: right;
				font-size: 10px;
				top: -15px;
				margin-right: 3%;
			">{{Cminute}}:{{Csecond}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				percent:1,
				lyricarr:[],
				currentindex:Number,
				temp:[{index:0}],
				startY:Number,
				starttop:Number,
				// 更改后的高度
				changingTop:Number,
				Cminute:"00",
				Csecond:"00",
				// 是否显示C位条
				isshowC:false,	
			}
		},
		
		
		computed:{
			lyric(){
				return this.$store.state.users.lyric
			},
			
			// 返回audiodom
			audiodom(){
				return this.$store.state.users.audiodom
			}, 
			
			currenttime(){
				return this.$store.state.users.currenttime
			}
		},
		
		watch:{
			lyric(newval,oldval){
				this.$refs.bigbox_ul.style.height =newval.length*35 +'px'
			},

			currenttime(newval,oldval){
				this.isshowC = false;
				this.temp = this.lyric.filter((item,index)=>{
					return newval.minute+newval.second==item.minute+item.second
				})
				// 歌词上移
				if(this.temp[0]){
					this.moveup(this.temp[0].index);
				}
			},
		},
		
		methods:{
			// 拖动小圆圈
			touchMove(event){
				// 暂停播放音乐
				const e = event || window.event
				const progressWidth = this.$refs.progress.offsetWidth // 进度条总宽度
				let moveX = e.touches[0].pageX -this.$refs.progress.offsetLeft // 83是进度条距离浏览器的距离
				if (moveX >= progressWidth) moveX = progressWidth // 边界值判断
				this.$store.state.users.audiodom.volume = (moveX / progressWidth) // 实时更新播放时间
				this.percent =(moveX/progressWidth)*100;
				this.$refs.currentprogress.style.width = `${this.percent}%`
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
				this.percent =(position/progressWidth);
				this.$refs.currentprogress.style.width = `${this.percent*100}%`
				this.$store.state.users.audiodom.volume = this.percent;
			},
					
			//	点击切换圆盘和歌词
			Switchbetween(){
				console.log(11)
				this.isshowlyric = !this.isshowlyric;
			},
			
			// 歌词上移
			moveup(index){
				this.currentindex = index;
				this.$refs.bigbox_ul.style.top = -index*(27.4)+document.documentElement.clientHeight*0.4+'px'
 			},
			
			// 点下歌词
			clickmusic(event){
				const e = event || window.event;
				this.startY = e.touches[0].clientY;
				this.starttop = Number(e.currentTarget.style.top.split('px')[0]);
			},
			
			// 拖动歌词
			Determinelyrics(event){
				this.audiodom.pause();
				this.isshowC = true;
				this.$store.state.users.isplay = false;
				const e = event || window.event;
				const currentY = e.touches[0].clientY;
				var moveY = currentY - this.startY;
				// 更改后的 高度
				this.changingTop = this.starttop +Number(moveY);
				this.currentindex = Math.floor(Math.abs(this.changingTop - document.documentElement.clientHeight*0.4)/27.5);
				this.$refs.bigbox_ul.style.top = this.starttop +Number(moveY) +'px'
			},
			
			// 释放歌词
			release(){
				// 记下高光
				// this.currentindex = Math.floor(Math.abs(this.changingTop - document.documentElement.clientHeight*0.4)/27.5);
				this.Cminute = this.lyric[this.currentindex].minute;
				this.Csecond = this.lyric[this.currentindex].second;
			},
			
			// 点击C位条  的播放  跳转 
			jumpmusic(){
				// 隐藏C位条
				this.isshowC = false;
				this.audiodom.play();
				this.$store.state.users.isplay = true;
				this.audiodom.currentTime = Number(this.Cminute) * 60 + Number(this.Csecond);
			}
		},
		
	}
</script>

<style scoped="scoped">
	.progress {
		width: 68%;
		height: 1px;
		background-color: #A19669;
		margin-left: -34%;
		position: absolute;
		left: 50%;
		top: 10px;
	}
	
	/* 当前进度条 */
	.currentprogress {
		width: 100%;
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
	
	/* 歌词外的大盒子 */
	.bigbox {
		width: 90%;
		margin: auto;
		height: 95%;
		overflow: hidden;
		text-align: center;
	}
	
	.bigbox_ul {
		width: 100%;
		position: relative;
		transition: .7s;
		height: auto;
		top:calc(40% + 82.2px);
	}
	
	.bigbox_ul li{
		height: 20px;
	}
	
	.focus1 {
		color: #F8F9FD;
		height: 20px;
	}
	
	.focus2 {
		color: #757A7A;
		height: 20px;
	}
	
	/* C位基准线 */
	.standard {
		width: 100%;
		height: 30px;
		position: absolute;
		top:calc(40% + 70.6px);
		line-height: 30px;
	}
	
	.standard_hr {
		width: 80%;
		margin: auto;
		height: 1px;
		background-color: #462F56;
		position: relative;
		margin-top: 20px;
	}
	
	
	
	
	
	
	
	
	
	
</style>
