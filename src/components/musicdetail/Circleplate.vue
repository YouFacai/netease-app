<template>
	<div style="width: 100%;height: calc(100% - 180px);position: absolute;top: 70px;">
		<!-- 大碟指针 -->
		<!-- 等下删除 --><span v-show="false" style="position: absolute;">{{isplay}}</span>
		<div class="pointer" ref='pointer'>
			<img style="
				width: 140px;
			" src="../../assets/img/pointer.psd.png" alt="">
		</div>
		<!-- 圆形磁盘 -->
		<div class="disk" ref='disk'></div>
		<!-- 一些icon图标 -->
		<div class="manyicon">
			<i class="iconfont" style="font-size: 24px;">&#xeca1;</i>
			<i class="iconfont" style="font-size: 24px;">&#xe856;</i>
			<i class="iconfont" style="font-size: 24px;">&#xe60d;</i>
			<i class="iconfont" style="font-size: 24px;">&#xe628;</i>
			<i class="iconfont" style="font-size: 24px;">&#xe605;</i>
		</div>
		<span></span>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				// 定时器
				timer:null,
				rotate:0,
			}
		},
		
		
		computed:{
			// 从Vue获得数据
			musicdata(){
				return this.$store.state.users.currentmusic;
			},
			
			isplay(){
				return this.$store.state.users.isplay;
			}
		},
		
		mounted() {
			// 进入组件清除定时器
			window.clearInterval(this.timer);
			// 进来的第一次单独判断是否播放 是播放就滚动
			if(this.isplay == true){
				this.timer = setInterval(()=>{
					// 修改伪元素图片角度
					document.styleSheets[0].addRule('.disk::before',`transform: rotate(${this.rotate++}deg)`);
					document.styleSheets[0].addRule('.disk::before',`background:url('${this.musicdata.al.picUrl}')`);
				},50)
			}else {
				// 把指针给打开
				this.$refs.pointer.style.transform = `rotate(-10deg)`;
			}
		},
		
		updated() {
			// 进入组件清除定时器
			window.clearInterval(this.timer);
			// 进来的第一次单独判断是否播放 是播放就滚动
			if(this.isplay == true){
				this.timer = setInterval(()=>{
					// 修改伪元素图片角度
					document.styleSheets[0].addRule('.disk::before',`transform: rotate(${this.rotate++}deg)`);
					document.styleSheets[0].addRule('.disk::before',`background:url('${this.musicdata.al.picUrl}')`);
				},50)
				this.$refs.pointer.style.transform = `rotate(17deg)`;
			}else{
				// 把指针给打开
				this.$refs.pointer.style.transform = `rotate(-10deg)`;
				// 没有播放了就清除定时器
				window.clearInterval(this.timer);
			}
		},
		
		watch:{
			isplay(newval,oldval){
				// 进来就清除 定时器
				window.clearInterval(this.timer);
				// 如果音乐在播放 我就开启转动
				if(this.newval == true){
					this.$refs.pointer.style.transform = `rotate(17deg)`;
				}else {
					// 把指针给打开
					this.$refs.pointer.style.transform = `rotate(-10deg)`;
					// 没有播放了就清除定时器
					window.clearInterval(this.timer);
					
				}
			}
		}
		
	}
</script>

<style scoped="scoped">
	/* 打碟指针 */
	.pointer {
		position: absolute;
		top: 0px;
		left: 50%;
		margin-left: -40px;
		transform: rotate(17deg);
		transform-origin: 20px 16px;
		transition: .5s;
		z-index: 700;
	}
	
	/* 磁盘 */
	.disk {
		width: 240px;
		height: 240px;
		border-radius: 50%;
		background-color: #756C5B;
		position: relative;
		/* z-index: 700; */
		top: 90px;
		
		left: 50%;
		margin-left: -120px;
	}
	
	.disk:after {
		position: absolute;
		/* z-index: 600; */
		border-radius: 50%;
		left: 5px;
		top: 5px;
		bottom: 5px;
		right: 5px;
		background-color: black;
		content: '';
	}
	
	.disk::before {
		position: absolute;
		/* z-index: 600; */
		border-radius: 50%;
		left: 35px;
		top: 35px;
		bottom: 35px;
		right: 35px;
		background-size: 100% 100%;
		z-index: 600;
		content: '';
	}

	.manyicon {
		width: 80%;
		height: 50px;
		display: flex;
		justify-content: space-around;
		line-height: 50px;
		position: absolute;
		bottom: 0px;
		left: 50%;
		margin-left: -40%;
		color: rgb(169, 166, 155);
	}
	
</style>
