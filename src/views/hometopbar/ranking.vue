<template>
	<div class="ranking">
		<publictop title='排行榜'></publictop>
		<!-- 榜单推荐 -->
		<div class="recommend">
			<strong>榜单推荐</strong>
			<div class="recommend_content1">
				<li v-for="(data,index) in recommend" :key='index' @click="selectlist(data)">
					<img style="width: 100px;height: 100px;" :src="data.coverImgUrl" alt="">
					<div style="font-size: 12px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{data.name}}</div>
					<div style="font-size: 10px;color: white;position: relative;top: -35px;left: 5px;">{{data.updateFrequency}}</div>
				</li>
			</div>
			<strong style="position: relative;top: 50px;">官方榜</strong>
			<div class="recommend_content2" v-if="count">
				<li v-for="(data,index) in official" :key='index' @click="selectlist(data)">
					<img style="width: 100px;height: 100px;float: left;" :src="data.coverImgUrl" alt="">
					<!-- 更新周期 -->
					<div style="font-size: 10px;color: white;position: relative;top: 78px;left: -90px;">{{data.updateFrequency}}</div>
					<!-- 该榜单的前三首 -->
					<div class="content2_test" >
						<li v-for="(item,i) in data.musicdata" :key='i'>
							<span>{{i+1}}.</span> 
						    <span>{{item.name}}-</span>
							<span v-for="(author,num) in item.ar" :key='num'>
								{{author.name}}
								<span v-if="num+1!=item.ar.length">/</span>
							</span>
						</li>
					</div>
				</li>
			</div>
			<!-- 特色榜 -->
			<strong style="position: relative;top: 90px;">特色榜</strong>
			<div style="width: 100%;margin-top: 10px;position: relative;top: 90px;display: flex;justify-content: space-around;">
				<li v-for="(data,index) in features" :key='index' @click="selectlist(data)">
					<img style="width: 100px;height: 100px;float: left;" :src="data.coverImgUrl" alt="">
					<!-- 更新周期 -->
					<div style="font-size: 10px;color: white;position: relative;top: -20px;left: 10px;">{{data.updateFrequency}}</div>
					<div style="font-size: 12px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;position: relative;top: -10px;">{{data.name}}</div>
				</li>
			</div>
			<strong style="position: relative;top: 140px;">全球榜</strong>
			<div style="width: 100%;display: flex;position: relative;top: 150px;justify-content: space-around;flex-wrap: wrap;">
				<li v-for="(data,index) in world" :key='index' style="margin-bottom: 25px;" @click="selectlist(data)">
					<img style="width: 100px;height: 100px;float: left;" :src="data.coverImgUrl" alt="">
					<!-- 更新周期 -->
					<div style="font-size: 10px;color: white;position: relative;top: -20px;left: 10px;">{{data.updateFrequency}}</div>
					<div style="font-size: 12px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;position: relative;top: -10px;">{{data.name}}</div>
				</li>
			</div>
			<!-- 曲风榜单 -->
			<strong style="position: relative;top: 170px;">曲风榜</strong>
			<div style="width: 100%;display: flex;position: relative;top: 180px;justify-content: space-around;flex-wrap: wrap;">
				<li v-for="(data,index) in Listofstyle" :key='index' style="margin-bottom: 25px;" @click="selectlist(data)">
					<img style="width: 100px;height: 100px;float: left;" :src="data.coverImgUrl" alt="">
					<!-- 更新周期 -->
					<div style="font-size: 10px;color: white;position: relative;top: -20px;left: 10px;">{{data.updateFrequency}}</div>
					<div style="font-size: 12px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;position: relative;top: -10px;">{{data.name}}</div>
				</li>
			</div>
			
			<!-- 更多榜单 -->
			<strong style="position: relative;top: 200px;">更多榜单</strong>
			<div style="width: 100%;display: flex;position: relative;top: 210px;justify-content: space-around;flex-wrap: wrap;">
				<li v-for="(data,index) in Morelist" :key='index' style="margin-bottom: 25px;" @click="selectlist(data)">
					<img style="width: 100px;height: 100px;float: left;" :src="data.coverImgUrl" alt="">
					<!-- 更新周期 -->
					<div style="font-size: 10px;color: white;position: relative;top: -20px;left: 10px;">{{data.updateFrequency}}</div>
					<div style="font-size: 12px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;position: relative;top: -10px;">{{data.name}}</div>
				</li>
			</div>
		</div>
		
		
		
		<!-- 踮脚 -->
		<div style="width: 100%;height: 50px;" v-show="$store.state.users.needbottom" v-if="$store.state.users.currentmusic"></div>
	</div>
</template>

<script>
	import publictop from '@/components/publictop'
	export default {
		components:{
			publictop,
		},
		
		data(){
			return {
				alldata:[],
				// 推荐
				recommend:[],
				// 官方榜
				official:[],
				// 特色榜
				features:[],
				// 全球榜
				world:[],
				// 地区榜
				region:[],
				// 曲风榜
				Listofstyle:[],
				// 更多榜单
				Morelist:[],
				count:0,
			}
		},
		
		
		methods:{
			// 
			getthreemusic(data){
				data.forEach((item,index)=>{
					this.$axios.get(`/top/list?id=${item.id}`).then(resp=>{
						item.musicdata = resp.data.playlist.tracks.slice(0,3);
						this.count++;
					})
				})

			},
			
			// 点击悬着榜单的歌单
			selectlist(data){
				const playlist = {
					playlist:data
				}
				// 把要渲染的歌曲压进去
				this.$axios.get(`/top/list?id=${data.id}`).then(resp=>{
					playlist.playlist.tracks = resp.data.playlist.tracks;
				})
				console.log(playlist)
				this.$store.commit('users/selectsonglist',playlist);
				this.$nextTick(()=>{
					this.$router.push('/songlistdetail');
				})
			}
		},
		
		mounted() {
			// 请求数据
			this.$axios.get('/toplist').then(resp=>{
				this.alldata =  resp.data;
				this.recommend = resp.data.list.slice(0,3);
				this.official = resp.data.list.slice(3,9);
				// 获取每个歌单的前三首
				this.getthreemusic(this.official);
				this.features = resp.data.list.slice(9,12);
				this.world = resp.data.list.slice(12,18);
				this.region = resp.data.list.slice(18,21);
				this.Listofstyle = resp.data.list.slice(21,27);
				this.Morelist = resp.data.list.slice(27,30);
			})
		}
	}
</script>

<style scoped="scoped">
	img {
		border-radius: 8px;
	}
	/* 榜单推荐 */
	.recommend {
		width: 92%;
		height: 200px;
		margin: auto;
		position: relative;
		top: 60px;
		
	}
	
	.recommend_content1 {
		margin-top: 10px;
		display: flex;
		justify-content: space-around;
	}
	
	.recommend li {
		width: 100px;
		height: 100px;
	}
	
	/* 官方榜 */
	.recommend_content2 {
		width: 100%;
		position: relative;
		top: 70px;
	}
	
	.recommend_content2 li {
		margin-bottom: 10px;
		width: 100%;
		height: 100px;
		overflow: hidden;
	}
	
	/* 榜单前三首例子 */
	.content2_test {
		width: calc(100% - 120px);
		float: left;
		margin-left: 10px;
		height: 100px;
		font-size: 14px;
	}
	
	.content2_test li {
		width: 100%;
		height: 20px;
		color: #666666;
	}
	
	
	
</style>
