<template>
	<div class="everydaycircle">
		<!-- 顶部导航栏 -->
		<div style="width: 94%;height: 40px;margin-top: 20px;position: fixed;margin-left: 3%;color: white;z-index: 800;">
			<i class="iconfont" style="font-size: 22px;float: left;" @click="$router.back(-1)">&#xe65d;</i>
			<span v-if="showtitle" style="color: white;margin-left: 15px;font-size: 20px;">每日推荐</span>
			<i class="iconfont" style="font-size: 22px;float: right;">&#xe682;</i>
		</div>
		<!-- 顶部背景 -->
		<img style="width: 100%;height: 200px;position: relative;" :src="bgimg" alt="" ref='topbarbg'>
		<div style="
			width: 100px;
			height: 45px;
			text-align: center;
			position: relative;
			top: -100px;
			left: 10px;
			color: white;
		">
		<span style="font-size: 30px;">{{month}}</span><span>/{{day}}</span>
		<div style="color: #000000; width: 100%;border-radius: 20px;background-color: #DED5E6;height: 25px;line-height: 25px;font-size: 13px;">
			<span style="position: relative;top: -3px;">历史日推</span>
			<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;position: relative;top: 2px;">
			    <use xlink:href="#icon-VIP"></use>
			</svg>
		</div>
		</div>
		<!-- 播放列表 -->
		<div class="musiclist">
			<!-- 全部播放 和 多选 -->
			<div style="width: 92%;margin: auto;position: relative;top: 10px;">
				<i class="iconfont" style="font-size: 25px;position: relative;top: 2px;">&#xe65c;</i>
				<span style="margin-left: 5px;">播放全部</span>
				<span style="float: right;">多选</span>	
				<i class="iconfont" style="float: right;margin-right: 3px;position: relative;top: 2px;">&#xe614;</i>
			</div>
			<!-- 歌曲渲染 -->
			<div class="musicapply" ref='musicapply'>
				<li v-for="(data,index) in datalist" :key='index' @click="playmusic(data)">
					<img style="width: 50px;height: 50px;float: left;border-radius: 8px;" :src="data.al.picUrl" alt="">
					<div class="musicmsg">
						<div style="width: 70%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{data.name}}</div>
						<div style="font-size: 13px;margin-top: 5px;color: #8A8A8A;width: 70%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{data.ar[0].name}} - {{data.al.name}}</div>
						<span style="float: right;position: relative;top: -40px;">
							<!-- MV -->
							<i v-if="data.mv" @click.stop="getmv(data.mv)" style="font-size: 20px;margin-right: 15px;" class="iconfont">&#xe637;</i>
							<!-- 更多 -->
							<i style="font-size: 20px;" class="iconfont">&#xe60f;</i>
						</span>
					</div>
				</li>
			</div>
		</div>
		
	</div>
</template>

<script>
	
	export default {
		components:{			
		},
		
		data(){
			return {
				datalist:[],
				bgimg:'',
				showtitle:'',
				// 传到底部 的音乐数据
				musicdata:Object,
			}
		},
		
		computed:{
			// 月
			month(){
				var d = new Date();
				var time;
				if(d.getMonth()+1<10){
					time = '0'+d.getMonth()+1;
				}else {
					time = d.getMonth()+1
				}
				return time;
			},
			
			// 日
			day(){
				var d = new Date();
				var time;
				if(d.getDate()<10){
					time = '0'+d.getDate();
				}else {
					time = d.getDate();
				}
				
				return time;
			}
		},
		
		mounted() {
			// 获得每日推荐中的数据
			this.$axios.get('/recommend/songs').then(resp=>{
				this.datalist = resp.data.data.dailySongs
			})
			this.$axios.get('/banner?type=1').then(resp=>{
				this.bgimg = resp.data.banners[4].pic;
			})
			
			// 监听页面的滚动
			 window.addEventListener('scroll', this.scrollToTop);
		},
		
		methods:{
			// 监听滚动
			scrollToTop() {
			  　var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				this.$refs.topbarbg.style.filter='blur'+'('+(3*(scrollTop/120))+'px'+')';
				if(scrollTop>80){
					this.$refs.topbarbg.style.zIndex = 600;
					this.showtitle = true;
					// 如果滑到了顶部  就把 音乐list 设置成可以滚动的
					this.$refs.musicapply.style.overflow = 'auto'
				}else {
					this.$refs.topbarbg.style.zIndex = '';
					this.showtitle = false;
					// 否者就 不然他滚动
					this.$refs.musicapply.style.overflow = 'hidden'
				}
			},
		
			// 点击播放音乐
			playmusic(data){
				console.log(data)
				this.musicdata = data; 
				// 存vueX
				this.$store.commit('users/currentmusic',data);
			},
			
			// 跳转到MV界面  开始播放mv
			getmv(mvid){
				// 歌曲的url
				var musicurl;
				var musicmv = []
				this.$axios.get(`/mv/url?id=${mvid}`).then(resp=>{
					musicurl = resp.data.data.url
					this.$nextTick(()=>{
						// 歌曲信息
						this.$axios.get(`/mv/detail?mvid=${mvid}`).then(resp=>{
							musicmv = resp.data.data
							musicmv.musicURL = musicurl
							// 将musicmv 存入 VueX
							this.$store.commit('users/musicmv',musicmv);
							// 跳转路由
							this.$router.push("/mvdetail");
						})
					})
				})
				
				
			}
		},
		
	}
</script>

<style scoped="scoped">	

	/* 歌曲的渲染列表 */
	.musiclist {
		width: 100%;
		height: 78vh;
		background-color: white;
		position: relative;
		top: -35px;
		z-index: 700;
		border-radius: 20px 20px 0 0 ;
	}

	/* 歌曲信息列表的渲染 */
	.musicapply {
		width: 94%;
		margin: auto;
		height: 100%;
		margin-top: 25px;
		overflow: hidden;
	}
	
	.musicapply li {
		margin-bottom: 5px;
	}
	
	/* 每个音乐的名称和歌手 */
	.musicmsg {
		width: calc(100% - 65px);
		height: 50px;
		margin-left: 65px;
	}
	
	
</style>
