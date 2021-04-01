<template>
	<!-- 节目 -->
	<div class="program">
		<div class="topbar">
			<span style="color: #3B3B3B;font-weight: 600;">共{{datalist.programCount}}期</span>
			<div style="float: right;margin-right: 5px;">
				<span style="margin-right: 20px;" @click="rank()">
					<i v-if="ranktype" class="iconfont" style="color: #3B3B3B;font-weight: 600;margin-right: 3px;">&#xe80e;</i>
					<i v-else class="iconfont" style="color: #3B3B3B;font-weight: 600;margin-right: 3px;">&#xe80f;</i>
					<span>排序</span>
				</span>
				<span>
					<i class="iconfont" style="color: #3B3B3B;font-weight: 600;margin-right: 3px;">&#xe614;</i>
					<span>多选</span>
				</span>
			</div>
		</div>
		<!-- 主体内容渲染 -->
		<div class="musiclist" ref='musiclist'>
			<li v-for="(data,index) in musicdata" :key='index' @click="selectprogram(data)">
				<div style="width: 40px;height: 40px;line-height: 40px;text-align: center;float: left;color: #9B9B9B;">
					<span v-if="!ranktype">{{musicdata.length - index}}</span>
					<span v-else>{{index+1}}</span>
				</div>
				<div class="musiclist_text">
					<div style="font-weight: 500;">{{data.name}}</div>
					<div style="color: #9B9B9B;font-size: 10px;margin-left: 5px;">
						<span>{{getcurrenttime}}</span>
						<span style="margin-left: 10px;">
							<i class="iconfont" style="position: relative;top: 2px;">&#xe615;</i>
							<span>{{Math.floor(data.listenerCount/1000)}}万</span>
						</span>
						<span style="margin-left: 10px;">
							<i class="iconfont" style="position: relative;top: 2px;">&#xeb7d;</i>
							<span style="margin-left: 3px;">{{timestamp(data.mainSong.bMusic.playTime||data.mainSong.hMusic.playTime)}}</span>
						</span>
						<i class="iconfont" style="float: right;position: relative;top: -15px;">&#xe60f;</i>
					</div>
				</div>
			</li>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				datalist:[],
				musicdata:[],
				// false为降序
				ranktype:false,
			}
		},
		
		computed:{
			isroll(){
				return this.$store.state.users.isroll
			},
			// 获得当前日期
			getcurrenttime(){
				var date = new Date();
				return date.getMonth()+1+'-'+date.getDate()
			}

		},
		
		watch:{
			isroll(newval,oldval){
				if(newval == true){
					this.$refs.musiclist.style.overflow = "auto";
				}else{
					this.$refs.musiclist.style.overflow = "hidden";
				}
			}
		},
		
		methods:{
			getinfodata(){
				this.$axios.get(`/dj/detail?rid=${this.$store.state.users.radioID2}`).then(resp=>{
					this.datalist = resp.data.data;
					this.$nextTick(()=>{
						this.$axios.get(`/dj/program?rid=${this.datalist.id}&limit=1000`).then(resp=>{
							this.musicdata = resp.data.programs;
						})
					})
				})
			},
			// 时间戳转时间
			timestamp(micro_second){
				// 总秒数
				var second = Math.floor(micro_second / 1000);
				// 分钟
				var min = Math.floor(second / 60);
				// 秒
				var sec = Math.floor(second % 60);
				if(min<10){
					min = "0" + min
				}
				if(sec<10){
					sec = "0" + sec
				}
				return  min + ':' + sec;
			},
			
			// 点击播放节目
			selectprogram(data){
				this.$axios.get(`/song/url?id=${data.mainTrackId}`).then(resp=>{
					// 音乐播放
					this.$store.commit('users/currentmusicurl',resp.data.data[0].url)
					// 显示publicbottom
					this.$store.commit('users/currentmusic',data);
					this.$store.commit('users/needbottom',true)
				})
				
			},
			
			// 节目排序
			rank(){
				this.ranktype = !this.ranktype;
				this.musicdata.reverse()
				// // 升序
				// if(this.ranktype == true){
				// 	this.musicdata.reverse();
				// }else {
					
				// }
			}
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 进来就请求数据
				vm.getinfodata();
			})
		}
		
	}
</script>

<style scoped="scoped">
	.program {
		width: 100%;
	}
	
	.topbar {
		position: relative;
		top: -35px;
		width: 94%;
		margin: auto;
		height: 30px;
		line-height: 30px;
		overflow: hidden;
	}
	
	/* 主要的歌曲内容渲染 */
	.musiclist {
		width: 94%;
		height: 77vh;
		overflow: hidden;
		margin: auto;
		margin-top: -20px;
	}
	
	.musiclist li {
		width: 100%;
		height: 60px;
		margin-bottom: 5px;
	}
	
	/* 文本内容 */
	.musiclist_text {
		width: calc(100% - 60px);
		height: 60px;
		margin-left: 10px;
		float: left;
	}
</style>
