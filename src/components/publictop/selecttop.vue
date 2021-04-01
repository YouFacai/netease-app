<template>
	<div class="selecttop">
		<!-- 搜索框 -->
		<div class="selecttopbar">
			<i @click="returnwhere()" class="iconfont" style="font-size: 24px;position: relative;top: 3px;color: #323232;">&#xe65d;</i>
			<input :placeholder="defaulttext" type="text" class="selecttopbar_input" v-model="inputtext" @keyup.enter="select()">
			<i @click="inputtext=''" v-if="inputtext" class="iconfont" style="position: relative;float: right;right: 10%;font-size:24px;top: 2px;">&#xe613;</i>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			returnurl:'',
			defaulttext:'',
			proptitle:'',
		},
		
		data(){
			return {
				inputtext:'',
				selecttext:''
			}
		},
		
		methods:{
			// 搜索歌曲
			select(){
				// 发送 请求搜索歌曲
				if(this.inputtext == ''){
					this.selecttext = this.defaulttext;
					this.$axios.get(`/search?keywords=${this.selecttext}`).then(resp=>{
						this.$store.commit('users/selecttitle',this.selecttext);
						//搜索到的数据存vueX 准备渲染
						this.$store.commit('users/selectmusic',resp.data.result.songs)
						this.$store.commit('users/selecttext',this.selecttext)
						// 跳转路由 到搜索详细
						this.$router.push('/selectdetail')
					})
				}else {
					this.selecttext = this.inputtext;
					this.$axios.get(`/search?keywords=${this.selecttext}`).then(resp=>{
						this.$store.commit('users/selecttitle',this.selecttext);
						//搜索到的数据存vueX 准备渲染
						this.$store.commit('users/selectmusic',resp.data.result.songs)
						this.$store.commit('users/selecttext',this.selecttext)
						// 跳转路由 到搜索详细
						this.$router.push('/selectdetail')
					})
				}
			},
		
			// 确定返回的位子
			returnwhere(){
				if(this.returnurl){
					this.$router.push(`${this.returnurl}`)
				}else {
					this.$router.back(-1);
				}
			},
			
			
		},
		watch:{
			inputtext(newval,oldval){
				this.$emit('inputtext',newval);
			},
			
			// 以前搜索过的
			proptitle(newval,oldval){
				this.inputtext = newval;
			}
		}
	}
</script>

<style scoped="scoped">
	.selecttop {
		width: 100%;
		margin: auto;
		background-color: white;
		margin-left: -10px;
		top: 0;
		z-index: 800;
		position: fixed;
	}
	
	/* 搜索框大框 */
	.selecttopbar {
		width: 100%;
		height: 40px;
		background-color: white;
		line-height: 40px;
	}
	
	.selecttopbar_input {
		height: 34px;
		margin-left: 15px;
		font-size: 16px;
		width: calc(100% - 70px);
		border: none;
		outline: none;
		border-bottom: 1px solid #858585;
	}
	
	::-webkit-input-placeholder{
		font-size: 16px;
		color: #B3B3B3;
	}
</style>
