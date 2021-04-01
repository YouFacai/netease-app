<template>
	<div class="radioclassify">
		<publictop style="width: 70%;" title="电台分类"></publictop>
		<div style="position: absolute;top: 70px;left: 50%;width: 100px;margin-left: -50px;text-align: center;">热门分类</div>
		<!-- 热门分类渲染 -->
		<div class="hotclassify">
			<li class="bigli" v-for="(data,index) in hotdatalist" :key='index' @click="selectclassify(data)">
				<div style="width: 100%;height: 60%;margin-top: 10px;padding-left: 20%;width: 60%;" class="hotclassify_div">
					<img :src="data.pic56x56Url" style="width: 30px;height: 30px;" alt="">
					<span style="position: relative;top: -8px;margin-left: 5px;">{{data.name}}</span>
				</div>
			</li>
		</div>
		<div style="position: absolute;top: 300px;left: 50%;width: 100px;margin-left: -50px;text-align: center;">更多分类</div>
		<!-- 热门分类渲染 -->
		<div class="moredatalist">
			<li class="bigli" v-for="(data,index) in moredatalist" :key='index' @click="selectclassify(data)">
				<div style="width: 100%;height: 60%;margin-top: 10px;padding-left: 20%;width: 60%;" class="hotclassify_div">
					<img :src="data.pic56x56Url" style="width: 30px;height: 30px;" alt="">
					<span style="position: relative;top: -8px;margin-left: 5px;">{{data.name}}</span>
				</div>
			</li>
		</div>
	</div>
</template>

<script>
	import publictop from '@/components/publictop'
	export default {
		components:{
			publictop,
		},
		
		mounted() {
			// 进入路由之后就请求电台分类的分类信息
			this.getinfodata();
		},
		
		data(){
			return {
				hotdatalist:[],
				moredatalist:[],
			}
		},
		
		methods:{
			getinfodata(){
				this.$axios.get('/dj/catelist').then(resp=>{
					this.hotdatalist = resp.data.categories.slice(0,6);
					this.moredatalist = resp.data.categories.slice(6);
				})
			},
			
			// 悬着电台类型
			selectclassify(data){
				// 电台id存在vuex
				this.$store.commit('users/radioID',data.id)
				this.$nextTick(()=>{
					this.$router.push('/rodiolist');
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.radioclassify{
		overflow: hidden;
		width: 100%;
	}
	
	.hotclassify {
		width: 100%;
		position: absolute;
		top: 100px;
	}
	
	.hotclassify li,.moredatalist li {
		line-height: 35px;
		float: left;
		width: 50%;
		height: 50px;
		border-top: 1px solid #E6E6E6;
		border-bottom: 1px solid #E6E6E6;
		border-collapse: collapse;
	}
	
	/* 中间的3 4 去上下边框 */
	.hotclassify li:nth-child(3),.hotclassify li:nth-child(4),.moredatalist li:nth-child(3),.moredatalist li:nth-child(4) {
		border: none;
	}


	.moredatalist {
		width: 100%;
		position: absolute;
		top: 330px;
	}
	
	
</style>
