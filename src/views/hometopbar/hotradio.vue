<template>
	<div class="hotradio"   
		v-infinite-scroll="gethotradiolist"
		infinite-scroll-disabled="loading"
		infinite-scroll-distance="10">
		<li v-for="(data,index) in hotdata" @click="selectradio(data)" :key='index'>
			<img style="width: 130px;height: 130px;border-radius: 8px;float: left;" :src="data.picUrl" alt="">
			<div class="hotradio_text">
				<div style="font-size: 14px;font-weight: 600;margin-top: 20px;">{{data.name}}</div>
				<div style="color: #B2B2B2;font-size: 12px;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-top: 10px;">{{data.rcmdtext}}</div>
				<div style="margin-top: 4px; color: #B2B2B2;font-size: 12px;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">节目:{{data.programCount}} 订阅:{{data.subCount}}</div>
			</div>
		</li>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				num:-1,
				hotdata:[],
				loading:false,
			}
		},
		
		computed:{
			radioID(){
				return this.$store.state.users.radioID
			}
		},
		
		watch:{
			radioID(newval,oldval){
				this.num = -1;
				this.hotdata = []
			}
		},
		
		methods:{
			// 获得热门电台列表
			gethotradiolist(){
				this.loading = true;
				this.num++;
				this.$axios.get(`/dj/radio/hot?cateId=${this.$store.state.users.radioID}&offset=${this.num*30}`).then(resp=>{
					this.hotdata = [...this.hotdata,...resp.data.djRadios]
					this.loading = false;
				})
			},
			
			// 选择电台
			selectradio(data){
				this.$axios.get(`/dj/detail?rid=${data.id}`).then(resp=>{
					// 选择电台 存在电台id
					this.$store.commit('users/radioID2',resp.data.data.id)
					this.$router.push('/detailradio');
				})
			}
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 获得热门电台列表
				vm.gethotradiolist();
			})
		}
	}
</script>

<style scoped="scoped">
	.hotradio {
		width: 100%;
		height: 85vh;
		overflow: auto;
	}
	
	.hotradio li {
		width: 94%;
		margin: auto;
		margin-bottom: 7px;
		overflow: hidden;
	}
	
	.hotradio_text {
		float: left;
		margin-left: 10px;
		width: calc(100% - 140px);
		height: 120px;
	}
</style>
