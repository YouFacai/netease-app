<template>
	<div style="margin: 5px;">
		<img style="width: 20px;height: 20px;" src="@/assets/img/Mlogo.png" alt="" ref='IMG'>
		<span style="font-size: 12px;position: relative;left: -15px;top: -5px;">M</span>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				angle:0,
				timeer:null,
			}
		},
		
		mounted() {
			this.timeer = setInterval(()=>{
				this.$refs.IMG.style.transform = `rotate(${this.angle++}deg)`;
			},10)
		}
	}
</script>

<style scoped="scoped">
</style>
