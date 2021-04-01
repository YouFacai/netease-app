<template>
  <div id="app">
	  <keep-alive>
		 <router-view/>
	  </keep-alive>
	<!-- 音乐 -->
	<audio autoplay="autoplay" :src="$store.state.users.currentmusicurl" ref='autoplay'></audio>
	<!-- 公共底部播放器 -->
	<publicbottom v-show="$store.state.users.needbottom" v-if="$store.state.users.currentmusic" class="publicbottom"></publicbottom>
	<div v-if="$store.state.users.currentmusic && $store.state.users.needbottom" style="width: 100%;height: 50px;"></div>
  </div>
</template>

<script>
	import publicbottom from './components/publicbottom/index.vue'
	export default {
		components:{
			publicbottom,
		},
		
		mounted() {
			// 暂时 做下登录
			this.$axios.get('/login/cellphone?phone=19884687266&password=yzl197543').then(resp=>{
				// console.log(resp.data);
			})
			
			// 把audio 的dom 存 vuex
			this.$store.commit('users/audiodom',this.$refs.autoplay);
			

		},
		
		methods:{
			
		}
	}
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		::-webkit-scrollbar{width:0px}
	}
	
	html,body,#app {
		width: 100%;
		height: 100%;
	}
	
	li {
		list-style: none;
	}
	
	.publicbottom {
		position: fixed;
		bottom: 0px;
		z-index: 900;
	}
</style>
