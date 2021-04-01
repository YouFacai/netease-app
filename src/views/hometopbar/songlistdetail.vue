<template>
	<div class="songlistdetail">
		<publictop :opacity='opacity' :ismasking='bgimg' class="publictop" :title='title' style="background-color: transparent;margin-top: 10px;margin-bottom: 20px;color: white;" :isshowselect='true'></publictop>
		<!-- 跑马灯 -->
		<marquee class="marquee" v-if="isshowmarquee">{{datalist.playlist.name}}</marquee>
		<div class="topbar" ref='topbar'>
			<img class="bg" :src="bgimg" alt="" >
			<div class="topbar_content">
				<div class="img_add_text">
					<img style="width: 130px;height: 130px;float: left;border-radius: 5px;" :src="bgimg" alt="">
					<!-- 内容文字 -->
					<div class="topbar_text">
						<!-- 歌单标题 -->
						<div style="font-size: 600;margin-bottom: 10px;" >
							{{datalist.playlist.name}}
						</div>
						<!-- 歌单作者 -->
						<div class="author">
							<img v-if="datalist.playlist.creator" style="width: 30px;height: 30px;border-radius: 50%;" :src="datalist.playlist.creator.avatarUrl" alt="">
							<!-- 播放次数 -->
							<div class="playcount">
								<i class="iconfont" style="position: relative;top: 1px;">&#xe615;</i>
								<span>{{Math.ceil(datalist.playlist.playCount/1000)}}万</span>
							</div>
							<span style="position: relative;top: -10px;font-size: 12px;margin-left: 5px;" v-if="datalist.playlist.creator">
								{{datalist.playlist.creator.nickname}}
								<i class="iconfont">&#xe62d;</i>
							</span>
							<!-- 介绍歌单内容 -->
							<div class="introduce" v-if="datalist.playlist.creator">{{datalist.playlist.creator.signature || "暂无介绍"}}</div>
							<i class="iconfont" style="position: relative;float: right;top: -23px;left: 10px;">&#xe62d;</i>
						</div>
					</div>
					<!-- iconlist -->
					<div class="iconlist">
						<li>
							<div>
								<i class="iconfont">&#xe628;</i><br>
								<span>{{datalist.playlist.commentCount || Math.floor(Math.random()*10+10) + "万"}}</span>
							</div>
						</li>
						<li>
							<div>
								<i class="iconfont">&#xe623;</i><br>
								<span>{{datalist.playlist.shareCount || Math.floor(Math.random()*5000+4000)}}</span>
							</div>
						</li>
						<li>
							<div><i class="iconfont" style="font-size: 26px;position: relative;top: -2px;">&#xe856;</i><br>
								<span style="position: relative;top: -5px;">下载</span>
							</div>
						</li>
						<li>
							<div><i class="iconfont">&#xe65f;</i><br>
							<span>多选</span>
							</div>
						</li>
					</div>
					
				</div>
			</div>
		</div>
		
		<!-- 下面 歌曲渲染 -->
		<div class="musiclist" ref='musiclist'>
			<!-- 全部播放 和 多选 -->
			<div style="width: 92%;margin: auto;position: relative;top: 10px;">
				<i class="iconfont" style="font-size: 25px;position: relative;top: 2px;">&#xe65c;</i>
				<span style="margin-left: 5px;">播放全部</span>
				<span v-if="datalist.playlist.tracks" style="font-size: 14px;color: #999999;">(共{{datalist.playlist.tracks.length}}首)</span>	
				<div class="collect">
					<i class="iconfont" style="position: relative;top: 1px;">&#xe783;</i>
					<span>收藏</span>
					<span>({{datalist.playlist.subscribedCount | playfilter}})</span>
				</div>
			</div>
		<!-- 下面歌单渲染 -->
		<publicplaylist :datalist='introduction'></publicplaylist>
		</div>
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import publicplaylist from '@/components/publicplaylist'
	import publictop from '@/components/publictop'
	Vue.filter('playfilter', function (value) {
		if(value>=100000000){
			return (value/10000000).toFixed(2)+'亿';
		}
		if(value>=10000){
			return (value/10000).toFixed(0)+'万';
		}
		return value
	})
	export default {
		components:{
			publictop,
			publicplaylist
		},
		
		data(){
			return {
				datalist:{
					playlist:{tracks:[],name:{},creator:{avatarUrl:{}}}
				},
				bgimg:'',
				opacity:Number,
				title:'歌单',
				isshowmarquee:false,
				introduction:[],
			}
		},
		
		mounted(){
			// 监听滚动
			window.addEventListener('scroll', this.scrollToTop);
		},
		
		methods:{
			updatebg(){
				this.bgimg = this.datalist.playlist.coverImgUrl
			},
			
			// // 点击播放
			// playmusic(data){
			// 	// 开启底部播放器
			// 	this.$store.commit('users/needbottom',true);
			// 	this.$store.commit('users/currentmusic',data);
			// },
			
			scrollToTop(){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				this.$refs.topbar.style.opacity = (270 - scrollTop)/300;
				this.opacity = scrollTop/200;
				if(scrollTop>=140){
					this.isshowmarquee = true
					this.title =''
				}else {
					this.isshowmarquee = false
					this.title ='歌单'
				}
			}
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.datalist = vm.$store.state.users.selectsonglist;
				vm.introduction = vm.datalist.playlist.tracks
				// 进来就换背景
				vm.updatebg();
			})
		}
	}
</script>

<style scoped="scoped">
	.songlistdetail {
		position: relative;
		top: -10px;
	}
	
	.topbar {
		width: 100%;
		height: 320px;
		overflow: hidden;
		position: relative;
	}
	
	.bg {
		background-position: -150px -150px;
		background-repeat: no-repeat;
		background-size: auto 100%;
		transform-origin: center top;
		transform: scale(4);
		filter: blur(10px);
		width: 100%;
		position: relative;
		height: 300px;
	}
	
	.bg::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0,0,0,.8);
	}
	
	/* topbar 的主要内容 */
	.topbar_content {
		width: 92%;
		margin: auto;
		color: white;
		position: relative;
		top: -220px;
	}
	
	/* topbar 中的图片加内容 */
	.img_add_text {
		width: 100%;
		height: 200px;
		overflow: hidden;
	}
	
	/* topbar下面的内容文字 */
	.topbar_text {
		width: calc(100% - 170px);
		float: left;
		margin-left: 20px;
		height: 130px;
	}
	
	/* 作者 */
	.author {
		width: 100%;
		height: 30px;
	}
	
	/* 歌单的播放次数 */
	.playcount {
		position: absolute;
		top: 5px;
		left: 60px;
		color: white;
		font-size: 12px;
	}
	
	/* 歌单的文本介绍 */
	.introduce {
		width: 100%;
		font-size: 12px;
		color: white;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	/* iconlist */
	.iconlist {
		width: 94%;
		height: 40px;
		display: flex;
		justify-content: space-around;
		position: relative;
		top: 20px;
		margin: auto;
		text-align: center;
/* 		line-height: 40px; */
	}
	
	.iconlist li {
		list-style: none;
		color: white;
	}
	
	.iconlist li i {
		font-size: 22px;
	}
	
	.iconlist li span {
	/* 	color:#95908C; */
		font-size: 12px;
	}
	
	/* 歌曲歌单 */
	.musiclist {
		width: 100%;
		height: 200px;
		border-radius: 8px 8px 0 0;
		position: relative;
		z-index: 600px;
		top: -30px;
		background-color: white;
		z-index: 700;
	}
	
	/* 收藏 */
	.collect {
		width: 110px;
		height: 35px;
		background-color:#FE3A3B ;
		border-radius: 20px;
		float: right;
		text-align: center;
		line-height: 35px;
		color: white;
		font-size: 12px;
	}
	
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
