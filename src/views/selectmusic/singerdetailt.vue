<template>
	<div class="singerdetailt">
		<publictop :isshowselect='true'></publictop>
		<div class="bgimg">
			<!-- <img :src="" alt=""> -->
		</div>
	</div>
</template>

<script>
	import publictop from '@/components/publictop'
	export default {
		components:{
			publictop,
		},
		
		methods:{
			// 获得歌手的数据
			getsingermsg(){
				this.$axios.get("/artist/detail?id=11972054").then(resp=>{
					console.log(resp.data)
				})
			},
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 需要背景透明
				vm.$store.commit('users/istopbarbackground',true);
				// 请求歌手的数据
				 vm.getsingermsg();
			})
		}
		
	}
</script>

<style scoped="scoped">
	
</style>
