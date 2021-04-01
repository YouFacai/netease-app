<template>
	<div :class="$store.state.users.istopbarbackground?'publictop1':'publictop2'">
		<i class="iconfont" style="font-size: 20px;margin-left: 6px;position: relative;z-index: 700;" @click="$router.back(-1)">&#xe65d;</i>
		<span style="margin-left: 15px;font-size: 19px;position: relative;z-index: 700;">{{title}}</span>
		<div style="float: right;margin-right: 20px;position: relative;z-index: 700;" v-if="isshowselect">
			<i class="iconfont" style="font-size: 24px; margin-right: 20px;">&#xe627;</i>
			<i class="iconfont" style="font-size: 24px;">&#xe60f;</i>
		</div>
		<div class="ismasking" ref='ismasking'></div>
	</div>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'',
			},
			isshowselect:{
				type:Boolean,
				default:false
			},
			ismasking:{
				type:String,
				default:''
			},
			opacity:{
				type:Number,
				default:0
			},
			isbackground:true,
			
		},
		
		watch:{
			ismasking(newval,oldval){
				this.$refs.ismasking.style.backgroundImage=`url("${newval}")`
			},
			
			// 蒙版背景的透明度
			opacity(newval,oldval){
				this.$refs.ismasking.style.opacity=newval
			},
			
		}
	}
</script>

<style scoped="scoped">
	.publictop1 {
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: fixed;
		top: -1px;
		/* left: 10px; */
		z-index: 700;
		background-color: transparent;
	}
	
	.publictop2 {
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: fixed;
		top: -1px;
		/* left: 10px; */
		z-index: 700;
		background-color: white;
		
	}
	
	/* 蒙版 */
	.ismasking {
		width: 100%;
		opacity: 0;
		height: 50px;
		position: absolute;
		top: 0;
		filter: blur(10px);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		transform-origin: center top;
		z-index: 600;
		
	}
	
	
	
</style>
