<template>
	<div class="selectdetail">
		<selecttop :proptitle='proptitle' :defaulttext='defaulttext' returnurl='/selectmusic'></selecttop>
		<div style="height: 40px;width: 100%;"></div>
		<div class="topbar">
			<router-link to="/selectdetail/synthesize" tag="li" active-class="focus">
				<span>综合</span>
			</router-link>
			<router-link to="/selectdetail/single" tag="li" active-class="focus">
				<span>单曲</span>
			</router-link>
			<router-link to="/selectdetail/spruce" tag="li" active-class="focus">
				<span>云村</span>
			</router-link>
			<router-link to="/selectdetail/video" tag="li" active-class="focus">
				<span>视频</span>
			</router-link>
			<router-link to="/selectdetail/singer" tag="li" active-class="focus">
				<span>歌手</span>
			</router-link>
		</div>
		<!-- 踮脚 -->
		<div style="width: 100%;height: 40px;"></div>
		<!-- 播放全部和多选 -->
		<div style="width: 100%;margin: auto;position: relative;top: 10px;">
			<i class="iconfont" style="font-size: 25px;position: relative;top: 2px;">&#xe65c;</i>
			<span style="margin-left: 5px;font-size: 16px;position: relative;top: -1px;">播放全部</span>
			<span style="float: right;position: relative;top: 6px;">多选</span>	
			<i class="iconfont" style="margin-right: 5px; float: right;position: relative;top: 8px;">&#xe614;</i>
		</div>
		
		<!-- 搜索到的歌曲渲染 -->
		<div class="musiclist">
			<li v-for="(data,index) in datalist" :key='index' @click="selectmusic(data)">
				<div style="
					width: 70%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				">{{data.name}}</div>
				<div style="color: #858585;font-size: 14px;width: 70%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
					<span v-for="(item,i) in data.artists" :key='i'>
						<span>{{item.name}}</span>
						<span v-if="i!=data.artists.length-1">/</span>
					</span>
					<span>-{{data.album.name}}</span>
				</div>
				<!-- 视频播放 和更多 -->
				<div class="more">
					<i v-if="data.mvid" @click.stop="playmv(data)" class="iconfont" style="font-size: 20px;">&#xe637;</i>
					<i class="iconfont" style="font-size: 20px;">&#xe60f;</i>
				</div>
			</li>
		</div>
	</div>
</template>

<script>
	import selecttop from '@/components/publictop/selecttop.vue'
	export default {
		components:{
			selecttop,
		},
		
		data(){
			return {
				proptitle:'',
			}
		},
		
		methods:{
			selecttitle(){
				var timer = setInterval(()=>{
					if(this.$store.state.users.selecttitle){
						clearInterval(timer)
						this.proptitle = this.$store.state.users.selecttitle
					}
				},10)
			},
			
			// 选择歌曲
			selectmusic(data){
				this.$axios.get(`/song/url?id=${data.id}`).then(resp=>{
					// 获取id更改播放
					this.audiodom.src = resp.data.data[0].url
				})
				this.$axios.get(`/song/detail?ids=${data.id}`).then(resp=>{
					this.$store.commit('users/currentmusic',resp.data.songs[0]);
				})
				this.$store.commit('users/needbottom',true);
			},
			
			// 选择mv
			playmv(data){
				// 歌曲的url
				var musicurl;
				var musicmv = []
				this.$axios.get(`/mv/url?id=${data.mvid}`).then(resp=>{
					musicurl = resp.data.data.url
					this.$nextTick(()=>{
						// 歌曲信息
						this.$axios.get(`/mv/detail?mvid=${data.mvid}`).then(resp=>{
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
		
		computed:{
			defaulttext(){
				return this.$store.state.users.defaulttext
			},
			// 从vueX 获得需要渲染的数据
			datalist(){
				return this.$store.state.users.selectmusic
			},
			// audiodom
			audiodom(){
				return this.$store.state.users.audiodom 
			}
			
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.selecttitle()
			})
		}
	}
</script>

<style scoped="scoped">
	.selectdetail {
		width: 92%;
		height: auto;
		margin: auto;
	}
	
	/* 顶部导航栏 */
	.topbar {
		width: 92%;
		position: fixed;
		top: 40px;
		line-height: 40px;
		margin: auto;
		height: 40px;
		display: flex;
		border-bottom: 1px solid #E6E6E6;
		justify-content: space-around;
		z-index: 800;
		background-color: white;
	}
	
	.focus {
		display: inline-block;
		height: 40px;
		color: red;
		border-bottom: 2px solid red;
	}
	
	/* 歌曲列表渲染 */
	.musiclist {
		width: 100%;
		height: auto;
		margin-top: 30px;
	}
	
	.musiclist li {
		width: 100%;
		height: 50px;
		overflow: hidden;
		margin-bottom: 10px;
	}

	.more {
		width: auto;
		height: 20px;
		float: right;
		position: relative;
		top: -40px;
	}





</style>
