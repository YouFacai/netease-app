<template>
	<div class="find">
		<mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" style='width: 100%;' >
			<!-- 轮播图 -->
			<mt-swipe :auto="3000" style='width: 100%;height:134px;border-radius: 8px;'>
				<mt-swipe-item v-for="(data,index) in slideshowdata" :key='index'>
				<img :src="data.pic"  style="width: 100%;" alt="">
				</mt-swipe-item>
			</mt-swipe>
			<!-- 每日推荐 -->
			<div class="everyday">
				<div class="everyday_circle" v-for="(data,index) in topbaricon" :key='index' @click="jumptopbar(data)">
					<img style="width: 40;height: 40px;" :src="data.iconUrl" alt="">
					<div style="font-size: 10px;text-align: center;">{{data.name}}</div>
					<div style="
						position: relative;
						color: red;
						top: -42px;
						left:10px;
						float: left;
						font-size: 13px;
						width: 20px;
						text-align: center;
					" v-if="data.name=='每日推荐'">{{day}}</div>				
				</div>
			</div>
			<!-- 推荐歌单 -->
			<div class="Recommend_playlist">
				<div style="font-weight: 600;font-size: 16px;">推荐歌单</div>
				<!-- 查看更多 -->
				<div class="selectmore" @click="$router.push('/musicplaza')">
					查看更多
				</div>
			<!-- swiper核心 -->
			<div class="swiper-container" style="width:100%;position: relative;left: -5px;" v-if="Recommend_playlist[this.num]">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(data,index) in Recommend_playlist[this.num].creatives" :key='index' @click="selectRecommend_playlist(data)">
						<li class="swiper-slide_li" >
							<img style="width: 100px;height: 100px;border-radius: 10px;" :src="data.resources[0].uiElement.image.imageUrl" alt="">
							<!-- 播放次数 -->
							<div class="Recommend_playlist_playcount">
								<i class="iconfont">&#xe615;</i>
								<span style="font-size: 12px;">{{data.resources[0].resourceExtInfo.playCount | playfilter}}</span>
							</div>
							<div style="font-size: 12px;position: relative;top: -20px;">{{data.resources[0].uiElement.mainTitle.title}}</div>
						</li>
					</div>
				</div>
			</div>
			
			<!-- 私人定制 -->
			<div class="customize">
				<div style="color: #B3B3B3;font-size: 13px;margin-top: 20px;">私人定制</div>
				<div class="customize_title">
					<span style="font-weight: 600;">{{Recommend_playlist[1].uiElement.subTitle.title}}</span>
					<span style="float: right;margin-right: 20px; line-height: 20px; text-align: center; width: 75px;height: 20px;border: 1px solid #E8E8E8;display: inline-block;border-radius: 20px;">
						<i class="iconfont" style="font-size: 10px;position: relative;top: -1px;">&#xe60e;</i>
						<span style="font-size: 12px;">播放全部</span>
					</span>
				</div>
				<!-- 私人定制的主要内容 -->
				<div class="swiper-container-customize" >
				    <div class="swiper-wrapper">
				        <div class="swiper-slide"  v-for="(data,index) in Recommend_playlist[1].creatives" :key='index'>
							<li v-for="(item,i) in data.resources" :key='i' @click="selectcustomizeli(item,index,i)">
								<img v-if="item" style="float: left; width: 70px;height: 70px;border-radius: 7px;" :src="item.uiElement.image.imageUrl" alt="">
								<!-- 私人定制的主要内容 -->
								<div class="swiper-container-customize-text">
									<!-- 作者 -->
									<div style="margin-top: 15px;width: 90%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
										<span style="font-size: 16px;font-weight: 500;" v-if="item.uiElement">{{item.uiElement.mainTitle.title}}</span>
										<span style="margin-left:5px;font-size: 14px;color: #A6A6A6;">-{{item.resourceExtInfo.artists[0].name}}</span>
									</div>
									<!-- 播放消息 -->
									<div>
										<span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis; display: inline-block;width: 80%; color: #808080; font-size: 12px;font-weight: 500;" v-if="item.resourceExtInfo.commentSimpleData">{{item.resourceExtInfo.commentSimpleData.content}}</span> 
										<div style="
											width: 20px;
											height: 20px;
											text-align: center;
											line-height: 20px;
											position: relative;
											float: right;
											top: -20px;
										">
											<i v-if="!isshowcustomizeicon && currenticon==i+index*3" class="iconfont" style="color: red;">&#xe61c;</i>
											<div v-else  style="width: 20px;height: 20px;border: 1px solid red;border-radius: 50%;">
												<i class="iconfont" style="font-size: 10px;position: relative;top: -2px;left: 1px;">&#xe60e;</i>
											</div>
										</div>
									</div>
								</div>
							</li>
						</div>
				    </div>
				</div>
			</div>
			<!-- 音乐日历 -->
			<div class="musiccalendar">
				<div style="margin-left: 10px;position: relative;top: 5px;">
					<svg class="icon" aria-hidden="true" style="width: 25px;height: 25px;">
					    <use xlink:href="#icon-yinle"></use>
					</svg>
					<span style="font-size: 14;color: red;position: relative;top: -5px;font-weight: 600;margin-left: 5px;">音乐日历</span>
				</div>
				<transition name="fade">
					<div v-for="(data,index) in musiccalendar" :key='index' v-if="currentmusiccalendar == index" class="musiccalendar_content">
						<!-- 图片 -->
						<div class="musiccalendar_img">
							<img style="border-radius: 5px; width: 60px;height: 60px;position: relative;" :src="data.imgUrl" alt="">
						</div>
						<!-- 日期 -->
						<div style="margin-left: 10px;margin-top: 5px; width: 100%;height: 20px;">{{format(data.offlineTime)}}</div>
						<!-- 预告简介 -->
						<div style="color:#6B6B6B;margin-left: 10px;width: 60%;font-size: 14px;display: -webkit-box;text-overflow: ellipsis;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">
							预告-{{data.title}}
						</div>                                                                                                                                                                                                                                                                                                                                     
					</div>
				</transition>
			</div>
			
			<!-- 专属歌单 -->
			<div style="margin-top: 40px;">
				<!-- 专属歌单的title -->
				<div style="font-weight: 600;" v-if="Recommend_playlist[2].uiElement">{{Recommend_playlist[2].uiElement.subTitle.title}}</div>
				<!-- 查看更多 -->
				<div class="selectmore" @click="$router.push('/musicplaza')">
					查看更多
				</div>
				<!-- swiper核心 -->
				<div class="swiper-container-exclusive" style="width:100%;position: relative;left: -5px;">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(data,index) in Recommend_playlist[2].creatives" :key='index' @click="selectRecommend_playlist(data)">
							<li class="swiper-slide_li">
								<img v-if="data.resources[0]" style="width: 100px;height: 100px;border-radius: 10px;" :src="data.resources[0].uiElement.image.imageUrl" alt="">
								<!-- 播放次数 -->
								<div class="Recommend_playlist_playcount">
									<i class="iconfont">&#xe615;</i>
									<span style="font-size: 12px;">{{data.resources[0].resourceExtInfo.playCount | playfilter}}</span>
								</div>
								<div v-if="data.resources[0]" style="font-size: 12px;position: relative;top: -20px;">{{data.resources[0].uiElement.mainTitle.title}}</div>
							</li>
						</div>
					</div>
				</div>
			</div>
			<!-- 语音直播 -->
			<div class="Voice_broadcast" v-if="Recommend_playlist[3].uiElement">
				<img style="width: 24px;height: 20px;" src="@/assets/img/streaming.png" alt="">
				<span style="font-weight: 600;font-size: 17px;margin-left: 5px;position: relative;top: -2px;">{{Recommend_playlist[3].uiElement.subTitle.title}}</span>
				<!-- 查看更多 -->
				<div class="selectmore" style="position: relative;top: 0px;margin-bottom: 5px;"> 
					查看更多
				</div>
				<!-- 语音直播核心swiper -->
				<div class="swiper-container-streaming" style="width:100%;position: relative;left: -5px;">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(data,index) in Recommend_playlist[3].extInfo" :key='index' >
							<li class="swiper-slide_li">
								<img style="width: 100px;height: 100px;border-radius: 10px;" :src="data.verticalCover" alt="">
								<!-- 播放次数 -->
								<div class="playcount">
									<svg class="icon" aria-hidden="true" style="width: 10px;height: 10px;margin:0px 2px;">
									    <use xlink:href="#icon-redu1"></use>
									</svg>
									<span>{{data.popularity}}</span>
									<span> · {{data.privateTag}}</span>
								</div>
								<div style="font-size: 12px;position: relative;top: 0px;">{{data.title}}</div>
							</li>
						</div>
					</div>
				</div>
			</div>
			</div>
			
		</mt-loadmore>
	</div>
	
	
</template>

<script>
	import Vue from 'vue'
	import Swiper2 from 'swiper';
	import { Swipe, SwipeItem } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import Mlogo from '@/components/Mlogo/'
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	
	// 过滤播放次数
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
			Mlogo
		},
		
		data(){
			return {
				slideshowdata:[],
				topbaricon:[],
				Recommend_playlist:[{creatives:''},{creatives:'resources:{resourceExtInfo:{commentSimpleData:{content:""}}',uiElement:{subTitle:{title:{}}}},{creatives:''},{creatives:''}],
				allLoaded:false,
				num:0,
				mySwiper1:null,
				mySwiper2:null,
				mySwiper3:null,
				mySwiper4:null,
				that:this,
				numtemp:1,
				namedata:[],
				isshowcustomizeicon:true,
				// 当前焦点iconfont
				currenticon:-1, 
				// 音乐日历内容
				musiccalendar:[],
				// 当前的音乐日历
				currentmusiccalendar:0,
				backwards:1,   //背后的图片
			}
		},
		
		computed:{
			day(){
				var myDate = new Date();
				return myDate.getDate(); 
			},
			// 获得audio dom节点
			audiodomended(){
				return this.$store.state.users.audiodom;
			},
			
			isplay(){
				return this.$store.state.users.isplay;
			},
			
			// 获得时间搓
			timestamp(){
				var timestamp=new Date().getTime();
				return timestamp
			}
		},
		
		mounted(){
			  
		},
		
		methods:{
			jumptopbar(data){
				// 每日推荐的跳转
				if(data.id==-1){
					this.$router.push('/everydaycircle')
				}
				// 歌单的跳转
				if(data.id==-2){
					this.$router.push('/musicplaza')
				}
				// 排行榜的跳转
				if(data.id==-3){
					this.$router.push('/ranking')
				}
				// 电台的跳转
				if(data.id==10000){
					this.$router.push('/radio')
				}
			},
			
			// 选择推荐歌单
			selectRecommend_playlist(data){
				// 获得歌单信息存VueX
				this.$axios.get(`/playlist/detail?id=${data.creativeId}`).then(resp=>{
					// console.log(resp.data.playlist.tracks)
					this.$store.commit('users/selectsonglist',resp.data);
					this.$nextTick(()=>{
						this.$router.push('/songlistdetail');
					})
				})
			},
			
			// 上拉刷新
			loadTop(){
				if(this.Recommend_playlist.length-2 !=this.num){
					this.num++;
				}else{
					this.num=0;
				}
				this.$nextTick(()=>{
					// 从新更新swiper长度
					this.mySwiper1.update()
					this.mySwiper2.update()
					this.mySwiper3.update()
					this.mySwiper4.update()
				})
				this.$refs.loadmore.onTopLoaded();
			},
			
			// 点击私人定制的歌曲
			selectcustomizeli(data,index,i){
				this.currenticon = index*3+i;
				// 通过id获得url
				// 切换iconfont
				this.isshowcustomizeicon = false;
				// 需要踮脚
				this.$store.commit('users/needbottom',true);
				this.$axios.get(`/song/url?id=${data.resourceId}`).then(resp=>{
					this.$store.commit('users/currentmusicurl',resp.data.data[0].url);
				}),
				// 获取歌曲msg
				this.$axios.get(`/song/detail?ids=${data.resourceId}`).then(resp=>{
					// 跳出控制台
					this.$store.commit('users/currentmusic',resp.data.songs[0]);
				})
			},
			
			// 时间戳变日期
			add0(m){return m<10?'0'+m:m },
			format(shijianchuo){
				var time = new Date(shijianchuo);
				var m = time.getMonth()+1;
				var d = time.getDate();
				return this.add0(m)+'-'+this.add0(d);
			},
			
			// 音乐日历的定时器
			musiccalendar_timing(){
				this.musiccalendar = setInterval(()=>{
					if(this.musiccalendar.length-1 == this.currentmusiccalendar){
						this.currentmusiccalendar=0;
					}else{
						this.currentmusiccalendar++;
					}
					
				},3000)
			},
			
			
		},
		
		watch:{
			isplay(newval,oldval){
				if(newval == false){
					this.isshowcustomizeicon = !this.isshowcustomizeicon;
				}
			}
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 轮播图
				vm.$axios.get('/banner?type=1').then(resp=>{
					vm.slideshowdata = resp.data.banners;
				})
				
				// 每日推荐等小图标
				vm.$axios.get('/homepage/dragon/ball').then(resp=>{
					vm.topbaricon = resp.data.data; 
				})
				
				//推荐歌单				
				vm.$axios.get('/homepage/block/page').then(resp=>{
					vm.Recommend_playlist = resp.data.data.blocks; 
					vm.$nextTick(()=>{
						// 推荐歌单的swiper
						vm.mySwiper1 = new Swiper2 ('.swiper-container', {
						      slidesPerView: 3.2,
						      spaceBetween: 5,
						      pagination: {
						        el: '.swiper-pagination',
						        clickable: true,
						      },
						})  
						// 私人定制的swiper
						vm.mySwiper2 = new Swiper2 ('.swiper-container-customize', {
						      slidesPerView: 1,
						      spaceBetween: 10,
						      pagination: {
						        el: '.swiper-pagination',
						        clickable: true,
						      },
						}),
						// 专属场景歌单swiper
						vm.mySwiper3 = new Swiper2 ('.swiper-container-exclusive', {
						      slidesPerView: 3,
						      spaceBetween: 10,
						      pagination: {
						        el: '.swiper-pagination',
						        clickable: true,
						      },
						}),
						//  语音直播swiper
						vm.mySwiper4 = new Swiper2 ('.swiper-container-streaming', {
						      slidesPerView: 3.2,
						      spaceBetween: 5,
						      pagination: {
						        el: '.swiper-pagination',
						        clickable: true,
						      },
						})  
					})
				}),
				
				// 获得音乐日历
				vm.$axios.get(`/calendar?startTime=${vm.timestamp}&endTime=${vm.timestamp+2678399999}`).then(resp=>{
					vm.musiccalendar = resp.data.data.calendarEvents
				}),
				
				// 进入find路由就开启定时器
				vm.musiccalendar_timing();
			})
		}
	}
</script>

<style scoped="scoped">
	.find {
		width: 100%;
		height: 100%;
	}
	
	.everyday {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
	
	/* 圆圈 */
	.everyday_circle {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: red;
	}
	
	/* 推荐歌单 */
	.Recommend_playlist {
		width: 100%;
		margin-top: 40px;
		margin-left: 10px;
	}
	
	/* 查看更多 */
	.selectmore {
		font-size: 14px;
		text-align: center;
		border-radius: 20px;
		float: right;
		position: relative;
		top: -18px;
		margin-right: 10px;
		width: 60px;
		padding: 2px 4px;
		border: 1px solid #E6E6E6;
	}

	/* 推荐歌单下面的li */
	.swiper-slide_li {
		width: 100px;
		height: 136px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	/* 推荐歌单下面的li */
	.swiper-slide_li_last {
		width: 100px;
		height: 136px;
		overflow : hidden;
		margin-right: 20px;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.Recommend_playlist_playcount {
		color: white;
		position: relative;
		float: right;
		top: -100px;
		margin-right: 6px;
	}

	.customize {
		width: 100%;
		/* margin-bottom: 10px; */
	}

	/* 私人电台的title */
	.customize_title{
		margin-bottom: 10px;
	}

	/* 私人电台下面的li标签 */
	.swiper-container-customize li {
		height: 70px;
		width: 100%;
		margin-bottom: 5px;
		overflow: hidden;
	}

	.swiper-container-customize-text {
		width: calc(100% - 120px);
		height: 70px;
		float: left;
		margin-left: 15px;
	}
	
	/* 音乐日历 */
	.musiccalendar {
		width: 93%;
		border-radius: 10px;
		top: 20px;
		height: 110px;
		position: relative;
		border: 1px solid #E3E3E3;
		box-shadow: 0 -2px 3px 1px  #E3E3E3;
	}
	
	/* 音乐日历中的内容 */
	.musiccalendar_content {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .8s;
	  position: absolute;
	  /* width: 100%; */
	  height: 20px;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
	/* 图潘框框 */
	.musiccalendar_img {
		width: 70px;
		height: 70px;
		position: relative;
		float: right;
		top: 5px;
		margin-right: 5px;
	}
	
	/* 语音直播 */
	.Voice_broadcast {
		width: 100%;
		height: auto;
		margin-top: 40px;
	}
	
	/* 语音直播的人气和而直播类型 */
	.playcount {
		float: left;
		max-width: 90%;
		position: absolute;
		top: 0px;
		background-color: rgba(179,179,179,0.6);
		height: 15px;
		line-height: 15px;
		width: auto;
		font-size: 12px;
		color: white;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	
	
</style>
