<template>
	<!-- 详细 -->
	<div class="detail">
		<div class="author">
			<div style="font-size: 14px;font-weight: 600;">主播</div>
			<div style="width: 100%;height: 60px;margin-top: 10px;">
				<img v-if="datalist" style="float: left; width: 50px;height: 50px;border-radius: 50%;" :src="datalist.dj.avatarUrl" alt="">
				<div class="author_text">
					<div style="font-weight: 600;">{{datalist.dj.nickname}}</div>
					<div style="margin-top: 6px; color: #898989; font-size: 12px; width: 85%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{datalist.dj.signature}}</div>
				</div>
			</div>
			<div class="reward">
				<div class="reward_btn">打赏</div>
				<div>11次打赏</div>
			</div>
		</div>
		<!-- 电台介绍 -->
		<div class="radiointroduce">
			<div style="font-weight: 600;font-size: 14px;margin-bottom: 10px;">电台内容简介</div>
			<div class="radiointroduce_text">
				分类: <span style="padding: 0px 2px;border-radius: 4px; left: 4px; position: relative;top: -2px; color: red;font-size: 10px;border: 1px solid red;">{{datalist.category}}</span>
				<div style="color: #898989;font-size: 12px;line-height: 20px;">
					{{datalist.desc}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				datalist:[],
			}
		},
		
		methods:{
			getinfodata(){
				this.$axios.get(`/dj/detail?rid=${this.$store.state.users.radioID2}`).then(resp=>{
					this.datalist = resp.data.data;
					console.log(this.datalist)
				})
			},
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 进入路由就获得需要渲染的数据
				vm.getinfodata();
			})
		}
	}
</script>

<style scoped="scoped">
	.detail {
		width: 94%;
		margin: auto;
	}
	
	.author {
		margin-top: 10px;
	}
	
	/* 主播内容 */
	.author_text {
		margin-left: 10px;
		float: left;
		width: calc(100% - 100px);
		height: 50px;
	}
	
	/* 赞赏外的大盒子 */
	.reward {
		width: 62px;
		height: 40px;
		font-size: 10px;
		text-align: center;
		position: relative;
		color: #898989;
		float: right;
		top: -55px;
	}
	
	/* 赞赏按钮 */
	.reward_btn {
		width: 60px;
		height: 20px;
		border: 1px solid red;
		border-radius: 22px;
		text-align: center;
		color: red;
		font-size: 12px;
		line-height: 20px;
	}
	
	/* 电台内容介绍 */
	.radiointroduce {
		margin-top: 20px;
	}
	
	.radiointroduce_text {
		color: #898989;
		font-size: 14px;
	}
</style>
