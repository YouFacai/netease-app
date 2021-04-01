<template>
	<div class="mvdetail">
		<div style="width: 100%;height: auto;">
			<video ref='video' style="z-index: 1000; width: 100%;height: auto; position: fixed;top: 0;" autoplay="autoplay" controls="controls" :src="mvdata.musicURL" ></video>
		</div>
		<!-- 踮脚 -->
		<div style="width: 100%;height: 400px;" ref='tiptoe'></div>
		<!-- mv的基本信息 -->
		<div class="mvmsg" v-if="setheight">
			<div style="font-weight: 600;width: 90%;white-space: normal;">{{mvdata.name||11}}</div>
			<div style="position: relative;float: right;top: -20px;" @click="isdownward=!isdownward">
				<i v-if="isdownward" class="iconfont">&#xe62a;</i>
				<i v-else class="iconfont">&#xe629;</i>
			</div>
			<!-- 标签 和观看次数的渲染 -->
			<div style="width: 90%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;margin-top: 10px;">
				<span style="color: #999999;font-size: 14px;margin-right: 10px;">{{mvdata.playCount | playfilter}}次观看</span>
				<span style="
					display: inline-block;
					width: auto;
					padding: 1px 2px;
					background-color: #F3F3F3;
					font-size: 14px;
					border-radius: 20px;
					margin-right: 5px;
				" v-for="(data,index) in mvdata.videoGroup" :key='index' >{{data.name}}</span>
				<!-- 隐藏的内容框 -->
				<div class="Hidden_content" v-if="!isdownward">
					<!-- 发布时间 -->
					<div>{{mvdata.publishTime}}</div>
					<div>{{mvdata.artistName}}</div>
				</div>
			</div>
			<!-- 一群iconfont -->
			<div class="iconfontlist">
				<li>
					<i class="iconfont" style="font-size: 23px;">&#xe610;</i>
					<div style="font-size: 12px;">{{mvdata.subCount}}</div>
				</li>
				<li>
					<i class="iconfont" style="font-size: 23px;">&#xe672;</i>
					<div style="font-size: 12px;">{{mvdata.shareCount}}</div>
				</li>
				<li> 
					<i class="iconfont" style="font-size: 23px;">&#xe63f;</i>
					<div style="font-size: 12px;">{{mvdata.commentCount}}</div>
				</li>
				<li>
					<i class="iconfont" style="font-size: 23px;">&#xe623;</i>
					<div style="font-size: 12px;">{{mvdata.shareCount}}</div>
				</li>
			</div>
			<!-- 歌手img 和收藏 -->
			<div class="author" ref='author'>
				<li style="width: 100%;height: 50px;" >
					<img style="width: 30px;height: 30px;border-radius: 50%;margin-top: 5px;" :src="mvdata.artists[0].img1v1Url" alt="">
					<span style="position: relative;top: -10px;margin-left: 10px;font-size: 14px;">{{mvdata.artists[0].name}}</span>
					<div style="float: right;position: relative;top: 13px; width: 60px;height: 20px;background-color: red;text-align: center;line-height: 20px;color: white;border-radius: 18px;">
						<i class="iconfont">&#xe783;</i>
						<span style="font-size: 13px;letter-spacing: 3px;position: relative;top: -1px;">收藏</span>
					</div>
				</li>
			</div>
		</div>
		
		<!-- 相关视频 -->
		<hr style="border: none; width: 100%;height: 10px;background-color: red;position: relative;background-color: #F5F5F5;">
		<div class="Related_video">
			<div style="margin-bottom: 10px;margin-top: 10px;font-weight: 600;">相关视频</div>
			<div class="Related_video_content">
				<li v-for="(data,index) in Related_video" :key='index' @click="selectvideo(data)">
					<!-- 图片 -->
					<img :src="data.coverUrl" style="width: 120px;height:70px;border-radius: 5px;float: left;" alt="">
					<!-- 播放量 -->
					<div class="playcount">
						<i class="iconfont">&#xe615;</i>
						<span style="position: relative;top: -2px;">{{ data.playTime | playfilter}}</span>
					</div>
					<div class="Related_video_text">
						<div style="position: relative;top: -10px;">	
							<span style="
								overflow : hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							">
							<span style=" border-radius: 2px; display:inline-block;color: red;padding: 0px 1px;border: 1px solid red;font-size: 10px;">MV</span>
							{{data.title}}</span>
							<div style="color: #828282;font-size: 12px;margin-top: 2px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
								<span v-if="data.creator" v-for="(item,i) in data.creator" :key='i'>
									{{item.userName}}
								</span>
							</div>
						</div>
					</div>
				</li>
			</div>
			
			
		</div>
		
		<!-- 分割线 -->
		<hr style="border: none; width: 100%;height: 10px;background-color: red;position: relative;background-color: #F5F5F5;">
		
		<!-- 精彩评论 -->
		<div class="comment">
			<div style="font-size: 16px;font-weight: 600;margin-top: 10px;margin-bottom: 10px;">精彩评论</div>
			<div class="comment_content">
				<li v-for="(data,index) in commentdata" :key='index'>
					<!-- 作者信息和点赞数 -->
					<div style="width: 100%;height:35px;overflow: hidden;">
						<img style="width: 30px;height: 30px;border-radius: 50%;float: left;" :src="data.user.avatarUrl" alt="">
						<div style="float: left;margin-left: 10px;">
							<div style="font-size: 14px;">{{data.user.nickname}}</div>
							<div style="font-size: 12px;color: #9B9B9B;">{{data.time | timestamp}}</div>
						</div>
						<!-- 点赞 -->
						<div class="Like">
							<span style="margin-right: 3px;">{{data.likedCount}}</span>
							<i class="iconfont">&#xe612;</i>
						</div>
					</div>
					<!-- 主要内容 -->
					<div class="comment_text">
						<div style="font-size: 14px;">{{data.content}}</div>
					</div>
				</li>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
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
	
	// 时间戳换时间
	Vue.filter('timestamp', function (date) {
		  var date = new Date(date);
		  var YY = date.getFullYear() + '-';
		  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		  return YY + MM + DD;
	})      
	
	export default {
		data(){
			return {
				mvdata:[],
				// 三角形方向
				isdownward:true,
				setheight:null,
				Related_video:[],
				commentdata:[],
				currentvid:'',
				isneedtimer:true,
			}
		},
		
		mounted() {
			// 页面监听滚动
			window.addEventListener('scroll', this.roll);
		},
		
		methods:{
			getmvinfo(){
				this.mvdata = this.$store.state.users.musicmv;
				console.log(this.mvdata)
			},
			// 设置内容的高度
			setcontentheight(){
				// setTimeout(()=>{
				// 	var ratio = this.$refs.video.videoHeight/this.$refs.video.videoWidth;
				// 	// 获得当前页面宽度
				// 	var windowwidth = document.body.offsetWidth;
				// 	this.setheight = windowwidth*ratio;
				// 	this.$refs.tiptoe.style.height = windowwidth*ratio + 'px'
				// },1000)
				this.isneedtimer = setInterval(()=>{
					var ratio = this.$refs.video.videoHeight/this.$refs.video.videoWidth;
					if(ratio <=1 && ratio!=0){
						clearInterval(this.isneedtimer)
					}
					// 获得当前页面宽度
					var windowwidth = document.body.offsetWidth;
					this.setheight = windowwidth*ratio;
					this.$refs.tiptoe.style.height = windowwidth*ratio + 'px'
				},10)
			},
			// 相关视频
			Relatedvideo(){
				this.$axios.get(`/related/allvideo?id=${this.mvdata.id}`).then((resp)=>{
					this.Related_video = resp.data.data
				})
			},
			// 精彩品论的数据
			getcomment(){
				this.$axios.get(`/comment/mv?id=${this.mvdata.id}`).then(resp=>{
					this.commentdata = [...resp.data.hotComments,...resp.data.comments]
				})
			},
			// 监听滚动
			roll(){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop>=121){
					this.$refs.author.style.position = 'fixed';
					this.$refs.author.style.zIndex = 700;
					this.$refs.author.style.top = `${this.setheight}px`;
					this.$refs.author.style.width = 92+'%';
					this.$refs.author.style.margin ='auto';
					this.$refs.author.style.background = 'white';
				}else {
					this.$refs.author.style.width = 100+'%';
					this.$refs.author.style.margin ='';
					this.$refs.author.style.background = '';
					this.$refs.author.style.position = '';
					this.$refs.author.style.top = null;
				}
			},
			// 点击视频跳转
			selectvideo(data){
				var temp=[];
				// 作者信息的更换
				this.$axios.get(`/video/detail?id=${data.vid}`).then(resp=>{
					this.currentvid = resp.data.data.vid;
					this.$nextTick(()=>{
						// 相关视频的更换
						this.$axios.get(`/related/allvideo?id=${this.currentvid}`).then(resp=>{
							this.Related_video = resp.data.data
						}),
						
						// 评论的跟换
						this.$axios.get(`/comment/video?id=${this.currentvid}`).then(resp=>{
							this.commentdata = [...resp.data.hotComments,...resp.data.comments]
						})
					})
					temp.name = resp.data.data.title;
					temp.playCount = resp.data.data.playTime;
					temp.videoGroup = resp.data.data.videoGroup;
					temp.artistName = resp.data.data.creator.nickname;
					temp.publishTime = resp.data.data.publishTime;
					temp.commentCount = resp.data.data.commentCount;
					temp.shareCount = resp.data.data.shareCount;
					temp.subCount = resp.data.data.subscribeCount;
					temp.artists = [{img1v1Url:resp.data.data.creator.avatarUrl,name:resp.data.data.creator.nickname}]
					this.mvdata = temp
				}),		
				// 视频的更换
				this.$axios.get(`/video/url?id=${data.vid}`).then(resp=>{
					this.$refs.video.src = resp.data.urls[0].url;
					this.$nextTick(()=>{
						this.setcontentheight();
					})
				})
					
			}
			
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// console.log(from.path)
				// 进入路由就请求视频数据
				vm.getmvinfo();
				// 进来就设置作者内容的高度
				vm.setcontentheight();
				// 获得相关视频的内容
				vm.Relatedvideo();
				// 获得精彩评论的数据
				vm.getcomment();
			})
		}
	}
</script>

<style scoped="scoped">
	.mvdetail {
		width: 100%;
		height: auto;
	}
	
	/* mv的基本信息 */
	.mvmsg {
		width: 92%;
		min-height: 50px;
		margin: auto;
		margin-top: 5px;
	}

	/* 隐藏的内容 */
	.Hidden_content {
		font-size: 14px;
		color: #B3B3B3;
		margin-top: 10px;
	}

	.iconfontlist {
		margin-top: 10px;
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-around;
		padding-bottom: 14px;
		border-bottom: 1px solid #E6E6E6;
	}
	
	.iconfontlist li{
		text-align: center;
	}

	/* 作者 */
	.author {
		width: 100%;
		height: auto;
	}

	/* 相关视频 */
	.Related_video {
		width:92%;
		margin: auto;
		height: auto;
	}

	.Related_video_content {
		height: auto;
		width: 100%;
	}

	.Related_video_content li {
		width: 100%;
		height: 70px;
		margin-bottom: 10px;
		overflow: hidden;
	}

	/* 相关视频的播放量 */
	.playcount {
		color: white;
		font-size: 11px;
		position: relative;
		z-index: 700;
		left: -50px;
		top: 5px;
	}

	.Related_video_text {
		width: calc(100% - 140px);
		margin-left: 130px;
		font-size: 14px;
	}
	
	/* 精彩评论 */
	.comment {
		width: 92%;
		margin: auto;
		height: auto;
	}
	
	/* 评论的大盒子 */
	.comment_content {
		width: 100%;
		height: auto;
	}
	
	.comment_content li {
		width: 100%;
		height: auto;
	}
	
	.Like {
		position: relative;
		float: right;
		color: #9B9B9B;
		font-size: 13px;
	}
	
	/* 文本内容 */
	.comment_text {
		margin-top: 5px;
		margin-left: 40px;
		margin-bottom: 8px;
		padding-bottom: 10px;
		border-bottom: 1px solid #E6E6E6;
	}
	
	
</style>
