<template>
	<!-- 电台列表渲染 -->
	<div class="rodiolist">
		<publictop v-if="infodata.length" :title="infodata[0].category"></publictop>
		<!-- 导航栏 -->
		<div class="topbanner">
			<router-link to="/rodiolist/hotprogram" tag="li" active-class="focus" >热门节目</router-link>
			<router-link to="/rodiolist/hotradio" tag="li" active-class="focus" >热门电台</router-link>
			<router-link to="/rodiolist/man" tag="li" active-class="focus" >男性向</router-link>
			<router-link to="/rodiolist/woman" tag="li" active-class="focus" >女性向</router-link>
		</div>
		<!-- 切换的路由 -->
		<keep-alive>
			<router-view style="position: absolute;top: 90px;"></router-view>
		</keep-alive>
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
				infodata:[],
			}
		},
		
		
		methods:{
			getinfodata(){
				this.$axios.get(`/dj/recommend/type?type=${this.$store.state.users.radioID}`).then(resp=>{
					this.infodata = resp.data.djRadios
				})
			}
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
	/* topbar 导航栏 */
	.topbanner {
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #E6E6E6;
		position: absolute;
		top: 40px;
		display: flex;
		justify-content: space-around;
		line-height: 40px;
	}
	
	/* 当topbar 获得焦点 */
	.focus {
		color: #FE3A3B;
	}
	
</style>
