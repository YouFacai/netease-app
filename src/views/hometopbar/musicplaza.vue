<template>
	<!-- 歌词广场 -->
	<div class="musicplaza">
		<div style="width: 92%;margin: auto;height: auto;">
			<publictop  title='歌单广场'></publictop>
			<!-- 歌单分类  华语  日语 -->
			<div class="topbar">
				<li v-for="(data,index) in topbartext"  :key='index' @click="updatetype(index)">
					<span :class="index==currentindex?'focus1':'focus2'">{{data}}</span>
				</li>
				<i class="iconfont" style="color:red;z-index: 600; position: relative; top: 3px;font-size: 20px;color: #5A5550;width: 80px;">&#xe620;</i>
			</div>
			<div class="content">
				<li v-for="(data,index) in datalist" :key='index' @click="selectsonglist(data)">
					<img style="width: 100px;border-radius: 6px;" :src="data.coverImgUrl" alt="">
					<div style="position: relative;top: -100px;color: white;float: right;left: -5px;">
						<i class="iconfont" style="position: relative;top: 1px;">&#xe615;</i>
						<span>{{data.playCount | playfilter}}</span>
					</div>
					<div style="position: relative;top: -10px; width: 100%;clear: both;">{{data.name}}</div>
				</li>
			</div>
		</div>
		<!-- 踮脚 -->
		<div style="width: 100%;height: 50px;" v-show="$store.state.users.needbottom" v-if="$store.state.users.currentmusic"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import publictop from '@/components/publictop'
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
			publictop,
		},
		
		data(){
			return {
				topbartext:['华语','日语','欧美','流行','怀旧'],
				// 当前topbar 的焦点
				currentindex:0,
				datalist:[],
			}
		},
		
		mounted(){
			// 进入歌单广场第一个就是华语的内容
			this.firstdata();
		},
		
		methods:{
			// 进入歌单广场第一个就是华语的内容
			firstdata(){
				this.$axios.get('/top/playlist?limit=50&order=new&cat=%E5%8D%8E%E8%AF%AD').then(resp=>{
					this.datalist = resp.data.playlists;
				})
			},
			
			// 换歌单  的类型
			updatetype(index){
				this.currentindex = index;
				if(index == 0){
					this.$axios.get('/top/playlist?limit=50&order=new&cat=华语').then(resp=>{
						this.datalist = resp.data.playlists;
					})
				}
				if(index == 1){
					this.$axios.get('/top/playlist?limit=50&order=new&cat=日语').then(resp=>{
						this.datalist = resp.data.playlists;
					})
				}
				if(index == 2){
					this.$axios.get('/top/playlist?limit=50&order=new&cat=欧美').then(resp=>{
						this.datalist = resp.data.playlists;
					})
				}
				if(index == 3){
					this.$axios.get('/top/playlist?limit=50&order=new&cat=流行').then(resp=>{
						this.datalist = resp.data.playlists;
					})
				}
				if(index == 4){
					this.$axios.get('/top/playlist?limit=50&order=new&cat=怀旧').then(resp=>{
						this.datalist = resp.data.playlists;
					})
				}
			},
			
			// 选择歌单
			selectsonglist(data){
				// 获得歌单信息存VueX
				this.$axios.get(`/playlist/detail?id=${data.id}`).then(resp=>{
					this.$store.commit('users/selectsonglist',resp.data);
					this.$nextTick(()=>{
						this.$router.push('/songlistdetail');
					})
				})
			}
		},
		
	}
</script>

<style scoped="scoped">
	.musicplaza {
		width: auto;
		height: 100vh;
		overflow-x: hidden;
	}
	
	/* 顶部 华语  日语 */
	.topbar {
		height: 40px;
		width: 100%;
		display: flex;
		color: #5A5756;
		justify-content: space-around;
		position: fixed;
		background-color: white;
		z-index: 600;
		top: 45px;
	}
	
	.topbar li {
		list-style: none;
		width: 80px;
		line-height: 30px;
		color: #61615D;
	}
	
	/* topbartext不是焦点 */
	.focus1 {
		height: 30px;
		width: 32px;
		display: block;
		color: red;
		border-bottom: 1px solid red;
	}
	
	.focus2 {
		height: 30px;
		display: block;
	}
	
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow:row wrap;
		margin-top: 100px;
		justify-content: space-between;
	}
	
	.content li {
		color: #404040;
		font-size: 10px;
		list-style: none;
		width: 100px;
		height: 135px;
		margin-bottom: 10px;
	}
	
	
	
</style>
