<template>
	<div class="selectmusic">
		<selecttop @inputtext='inputtext' returnurl='/find' :defaulttext='defaulttext' style='margin-bottom: 10px;'></selecttop>
		<!-- 踮脚 -->
		<div style="width: 100%;height: 40px;"></div>
		<!-- 热推荐 搜索 （智能推荐） -->
		<div class="intelligent" v-if="hot_recommend.length">
			<li style="
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 94%;
				line-height: 40px;
				margin: auto;
				color: #5A80AC;
				border-bottom: 1px solid #E7E7E7;
				height: 40px;
			">搜索 “{{inputtext1}}”</li>
			<li v-for="(data,index) in hot_recommend" :key='index' class="intelligent_li" @click="selecthot_recommend(data)">
				<i class="iconfont" style="color: #BCBDBF;">&#xe627;</i>
				<span style="margin-left: 10px;">{{data.keyword}}</span>
			</li>
		</div>
		<!-- 热搜榜 -->
		<div class="hotselectlist">
			<div class="hotselectlist_title">
				<span style="font-weight: 600;">热搜榜</span>
				<div class="allplaybuttom">
					<i class="iconfont" style="font-size: 14spx;position: relative;top: -1px;">&#xe60e;</i>
					<span style="font-size: 14px;margin-left: 4px;">播放全部</span>
				</div>
			</div>
			<!-- 热搜list -->
			<div class="hotselectlist_content" ref='hotselectlist_content'>
				<li :key='index' @click="selecthotselectlist(data)" v-for="(data,index) in hotlistdata" :class="index<3?'hotselectlist_content_li_focus':'hotselectlist_content_li'">
					<span style="
						display: inline-block;
						width: 30px;
						height: 40px;
						position: relative;
						top: -11px;
					" :class="index<3?'highlight':''">{{index+1}}</span>
					<span style=" display: inline-block; max-width: 60%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{data.searchWord}}</span>
					<img style="margin-left: 5px; width: 20px;height: 15px;position: relative;top: -6px;" v-if="data.iconUrl" :src="data.iconUrl" alt="">
				</li>
			</div>
			<!-- 显示更多 -->
			<div style="width: 100%;text-align: center;height: 30px;" @click="pullHotBot()" v-if="isneedmore">
				<span style="font-size: 14px;color: #999999;">展开更多热搜</span>
				<i class="iconfont" style="position: relative;top: 1px;margin-left: 2px;">&#xe617;</i>
			</div>
			<!-- 歌区分类 -->
			<div class="musicclassify" @click="$router.push('/Singerclassification')">
				<img style="width: 100%;height: 100%;" src="../../assets/img/selectmusicimg.png" alt="">
			</div>
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
				// 空值默认请求
				defaulttext:'',
				// 热推荐搜索
				hot_recommend:[],
				inputtext1:'',
				hotlistdata:[],
				// 是否需要下拉更多
				isneedmore:true,
			}
		},
		
		methods:{
			defaultselect(){
				this.$axios.get('/search/default').then(resp=>{
					this.defaulttext = resp.data.data.showKeyword
					this.$store.commit('users/defaulttext',resp.data.data.showKeyword);
				})
			},
			
			// 接受子传来的数据
			inputtext(data){
				this.inputtext1 = data;
				if(data){
					this.$axios.get(`/search/suggest?keywords=${data}&type=mobile`).then(resp=>{
						this.$store.commit('users/selecttitle',data);
						// 打开 热推荐搜索
						this.hot_recommend = resp.data.result.allMatch;
					})
				}else{
					this.hot_recommend = []
				}
			},
			
			// 选择智能推荐（热  推荐）
			selecthot_recommend(data){
				// 清空
				this.hot_recommend = [];
				// 发送请求 获取数据 存VueX 跳转路由
				this.$axios.get(`/search?keywords=${data.keyword}`).then(resp=>{
					this.$store.commit('users/selecttitle',data.keyword);
					//搜索到的数据存vueX 准备渲染
					this.$store.commit('users/selectmusic',resp.data.result.songs)
					// 存下搜索的关键词
					this.$store.commit('users/selecttext',data.keyword)
					// 跳转路由 到搜索详细
					this.$router.push('/selectdetail')
				})
				
			},
			
			// 获得热搜榜
			gethotselectlist(){
				this.$axios.get(`/search/hot/detail`).then(resp=>{
					this.hotlistdata = resp.data.data			
				})
			},
			
			// 下拉热搜榜
			pullHotBot(){
				this.$refs.hotselectlist_content.style.height = 300+'px'
				this.isneedmore = false
			},
			
			// 选择热搜的li
			selecthotselectlist(data){
				// 请求数据
				this.$axios.get(`/search?keywords=${data.searchWord}`).then(resp=>{
					this.$store.commit('users/selecttitle',data.searchWord);
					//搜索到的数据存vueX 准备渲染
					this.$store.commit('users/selectmusic',resp.data.result.songs)
					this.$store.commit('users/selecttext',data.searchWord)
					// 跳转路由 到搜索详细
					this.$router.push('/selectdetail')
				})
			},
			

		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 请求默认搜索数据
				vm.defaultselect();
				// 清空推荐
				vm.hot_recommend = [];
				// 获得热搜榜的内容
				vm.gethotselectlist();
				// 进入路由就收起热门榜
				vm.$refs.hotselectlist_content.style.height = 155+'px'
				vm.isneedmore = true
			})
		}
	}
</script>

<style scoped="scoped">
	.selectmusic {
		width: 92%;
		margin: auto;
		height: auto;
	}
	
	/* 搜索框大框 */
	.selecttopbar {
		width: 100%;
		height: 40px;
		position: fixed;
		top: 0;
		line-height: 40px;
	}
	
	.selecttopbar_input {
		height: 34px;
		margin-left: 15px;
		font-size: 16px;
		width: calc(100% - 70px);
		border: none;
		outline: none;
		border-bottom: 1px solid #858585;
	}
	
	::-webkit-input-placeholder{
		font-size: 16px;
		color: #B3B3B3;
	}
	
	/* 智能推荐 */
	.intelligent {
		width: 96%;
		max-height: 500px;
		margin-top: 80px;
		overflow: auto;
		margin: auto;
		box-shadow:1px 1px 5px #E7E7E7,1px -1px 5px #E7E7E7,-1px 1px 5px #E7E7E7,-1px -1px 5px #E7E7E7;
	}
	
	/* 除了第一个搜索 */
	.intelligent_li {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 94%;
		line-height: 50px;
		margin: auto;
		color: #818181;
		height: 50px;
		border-bottom: 1px solid #E7E7E7;
	}
	
	/* 热搜 */
	.hotselectlist {
		width: 100%;
		height: auto;
		margin-top: 20px;
	}
	
	.allplaybuttom {
		position: relative;
		float: right;
		border: 1px solid #E7E7E7;
		padding: 2px 10px;
		border-radius: 20px;
	}
	
	/* title */
	.hotselectlist_title {
		padding-bottom: 20px;
		/* border-bottom: 1px solid #E7E7E7; */
	}
	
	/* 热搜内容 */
	.hotselectlist_content {
		width: 100%;
		height: 155px;
		min-height:155px;
		max-height:300px;
		overflow: hidden;
		transition: .4s;
	}
	
	.hotselectlist_content_li {
		width: 50%;
		height: 30px;
		line-height: 30px;
		float: left;
		font-size: 14px;
	}
	
	.hotselectlist_content_li_focus {
		width: 50%;
		height: 30px;
		line-height: 30px;
		float: left;
		font-size: 14px;
		font-weight: 600;
	}
	
	.highlight {
		color: red;
	}
	
	/* 歌区分类 */
	.musicclassify {
		width: 100%;
		height: auto;
		margin-top: 10px;
	}
	
	
	
	
	
	
</style>