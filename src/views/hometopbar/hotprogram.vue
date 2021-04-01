<template>
	<div class="hotprogram">
		<div class="updatetime">
			更新时间：{{currenttime}}
			<i class="iconfont" style="color: #CCCCCC;">&#xe649;</i>
			<div style="margin-right: 20px; float: right;line-height: 20px;height: 20px; width: 90px;text-align: center; color: black;font-weight: 100;border-radius: 10px;border: 1px solid #E8E8E8;">
				<i class="iconfont">&#xe645;</i>
				播放全部
			</div>
			<!-- 信息渲染 -->
			<div class="hotprogram_content">
				<li v-for="(data,index) in infodata" :key='index' @click="selectprogram(data)">
					<img :src="data.picUrl" style="width: 70px;height: 70px;border-radius: 5px;float: left;" alt="">
					<div class="hotprogram_content_text">
						 <div style="font-weight: 600;font-size: 16px; width: 80%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{data.desc}}</div>
						<div style="margin-top: 10px;">
							<img :src="data.dj.backgroundUrl" style="width: 20px;height: 20px;border-radius: 50%;" alt="">
							<span style="display: inline-block; position: relative;top: -5px;left: 5px;width: 75%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{data.name}} | 
								<i class="iconfont">&#xe60c;</i>
								{{Math.floor(Math.random()*50000+10000)}}
							</span>
						</div>
					</div>
					<i class="iconfont" style="color: #CCCCCC; position: relative;float: right;margin-right: 20px;top: -40px;font-size: 30px;font-weight: 400;">&#xe645;</i>
				</li>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				infodata:[],
			}
		},
		
		methods:{
			getinfodata(){
				this.$axios.get(`/dj/recommend/type?type=${this.$store.state.users.radioID}`).then(resp=>{
					this.infodata = resp.data.djRadios
				})
			},
			
			// 选择节目
			selectprogram(data){
			}
		},
		
		computed:{
			// 获得当前时间
			currenttime(){
				var date = new Date();
				return date.getMonth()+1+'月'+date.getDate()+'日'
			},
			
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 获得推荐电台列表
				vm.getinfodata();
			})
		}
	}
</script>

<style scoped="scoped">
	.hotprogram {
		width: 100%;
		height: calc(100% - 90px);
		overflow: auto;
	}
	
	.updatetime {
		font-size: 14px;
		font-weight: 600;
		width: 100%;
		margin-left: 10px;
	}
	
	/* 主要渲染内容 */
	.hotprogram_content {
		margin-top: 20px;
	}
	
	
	.hotprogram_content li {
		margin-bottom: 5px;
		width: 100%;
		height: 70px;
		overflow: hidden;
	}
	
	/* 内容的文本信息 */
	.hotprogram_content_text {
		font-weight: 400;
		width: calc(100% -100px);
		margin-left: 80px;
		padding-top: 10px;
	}
</style>
