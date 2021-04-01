<template>
	<div class="bottombar">
		<i @click="resetmusic()" class="iconfont">&#xe61f;</i>
		<i class="iconfont">&#xe78a;</i>
		<i @click="updateisplay()" v-if="$store.state.users.isplay" class="iconfont" style="font-size: 40px;font-weight: 100;position: relative;top: -5px;">&#xe616;</i>
		<i @click="updateisplay()" v-else class="iconfont" style="font-size: 40px;font-weight: 100;position: relative;top: -5px;">&#xe645;</i>
		<i class="iconfont">&#xe7a5;</i>
		<i class="iconfont">&#xe643;</i>
	</div>
</template>

<script>
	export default {
		computed:{
			// 返回audiodom
			audiodom(){
				return this.$store.state.users.audiodom
			}, 
		},
		
		methods:{
			// 歌曲暂停
			updateisplay(){
				this.$store.commit('users/isplay',!this.$store.state.users.isplay)
			},
			
			// 重新播放
			resetmusic(){
				this.audiodom.load()
			}
		}
	}
</script>

<style scoped="scoped">
	.bottombar {
		position: absolute;
		bottom: 0px;
		height: 60px;
		width: 80%;
		left: 50%;
		margin-left: -40%;
		display: flex;
		justify-content: space-around;
	}
	
	.bottombar i {
		color: #D9D8D4;
		font-size: 25px;
	}
</style>
