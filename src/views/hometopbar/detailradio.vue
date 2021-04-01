<template>
	<!-- 电台详细 -->
	<div class="detailradio">
		<publictop style="color: white;" :isshowselect='true' :title='title' :isbackground='false'></publictop>
		<div class="topbar_content">
			<img :src="datalist.picUrl" style="width: 100%;height: 300px;" alt="">
			<div class="topbar_content_text">
				<div style="color: white;font-weight: 600;">{{datalist.name}}</div>
				<div style="font-size: 13px;color: #BDB7B5;margin-top: 5px;">{{datalist.subCount}}人已定阅</div>
				<div style="top: -35px; font-size: 13px; position: relative;float: right; color: white;background-color: red;width: 80px;height: 30px;text-align: center;border-radius: 50px;line-height: 30px;">
					<i class="iconfont" style=" font-size: 20px;margin-right: 2px;">&#xe712;</i>
					<span style="position: relative;top: -2px;">订阅</span>
				</div>
			</div>
		</div>
		<div class="mask" ref='mask'></div>
		<!-- 下面部分的内容组件 -->
		<muiscgather :programlength='datalist.programCount' style='position: relative;top: -40px;'></muiscgather>
	</div>
</template>

<script>
	import muiscgather from '@/components/detailradio/muiscgather.vue';
	import publictop from '@/components/publictop';
	export default {
		components:{
			publictop,
			muiscgather,
		},
		
		data(){
			return {
				datalist:[],
				title:'电台'
			}
		},
		
		methods:{
			getinfodata(){
				this.$axios.get(`/dj/detail?rid=${this.$store.state.users.radioID2}`).then(resp=>{
					this.datalist = resp.data.data;
					// topbarbackground不需要背景   需要透明
					this.$store.commit('users/istopbarbackground',true)
				})
			},
			
			// 监听滚动
			handleScroll(){
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
				this.$refs.mask.style.opacity = (Math.floor(scrollTop)/300);
				if(206<scrollTop){
					this.title = this.datalist.name;
					// 下面的内容 		overflow: hidden; 变为auto
					this.$store.commit('users/isroll',true)
				}else {
					this.$store.commit('users/isroll',false)
					this.title = '电台'
				}
			}
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 进入路由就获得需要渲染的数据
				vm.getinfodata();
				window.addEventListener('scroll',vm.handleScroll)
			})
		},
		
		beforeRouteLeave(to,from,next) {
			// topbar 的透明背景就不要了
			this.$store.commit('users/istopbarbackground',false)
			next()
		}
	}
</script>

<style scoped="scoped">
	.detailradio {
		width: 100%;
		height: auto;
	}
	
	/* topbar 的内容 */
	.topbar_content {
		width: 100%;
		height: 300px;
	}
	
	.topbar_content_text {
		width: 94%;
		height: 40px;
		position: relative;
		top: -90px;
		margin: auto;
	}
	
	.mask {
		position: absolute;
		top: 0;
		width: 100%;
		height: 300px;
		background-color: #000000;
		opacity: 0;
	}
	
	
</style>
