<template>
	<div class="Singerclassification">
		<publictop title='歌手分类'></publictop>
		<!-- 踮脚 -->
		<div style="width: 100%;height: 50px;"></div>
		<!-- 歌手分类栏 -->
		<div class="classifytopbar" ref='classifytopbar'>
			<!-- 语言分 -->
			<div class="classifytopbar_language">
				<li v-for="(data,index) in languagelist" :class="index==languageindex?'languagefocus':''" :key='index' @click="selectlanguage(data,index)">
					{{data.type}}
				</li>
			</div>
			<!-- 性别分 -->
			<div class="classifytopbar_sex">
				<li v-for="(data,index) in sexlist" :key='index' @click="selectsex(data,index)" :class="index==sexindex?'sexfocus':''">
					{{data.type}}
				</li>
			</div>
		</div>
		<!-- 展示全部歌手与 -->
		<div @click="showfiltrate()" style="background-color: white;z-index: 800; width: 100%; height: 30px;line-height: 30px;position: fixed;top: 48px;" v-if="isshowclassifytopbar">
			<span style="font-size: 16px;margin-left: 10px;">全部歌手</span>
			<span style="float: right;margin-right: 15px;">
				<i class="iconfont" style="font-size: 14px;margin-right: 5px;">&#xe6ca;</i>
				<span style="font-size: 14px;">筛选</span>
			</span>
		</div>
		<!-- 踮脚 -->
		<div style="width: 100%;height: 30px;" v-if="isshowclassifytopbar"></div>
		<!-- 热门歌手 -->
		<div class="hotsinger">
			<span style="margin-left: 10px;">热门歌手</span>
		</div>
		
		<!-- 热门歌手的渲染 -->
		<div class="singerlist" @touchmove='packfiltrate()'>
			<li v-for="(data,index) in datalist" :key='index' @click="selectdata(data)">
				<div style="width: 100%;height: 40px;position: relative;top: 10px;">
					<img style="width: 45px;height: 45px;border-radius: 50%;" :src="data.picUrl" alt="">
					<span style="position: relative;top: -15px;left: 10px;">{{data.name}}</span>
				</div>
				<!-- 关注按钮 -->
				<div class="attention">
					<div style="position: relative;top: -20px;left: 8px;">
						<i class="iconfont" style="font-size: 12px;">&#xe783;</i>
						<span style="letter-spacing: 4px;position: relative;font-size: 12px;left: 2px;">关注</span>
					</div>
				</div>
			</li>
		</div>
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
				// 按语言分类
				languagelist:[{type:'华语',num:7},{type:'欧美',num:96},{type:'日本',num:8},{type:'韩国',num:16},{type:'其他',num:0}],
				// 按性别分类
				sexlist:[{type:'男',num:1},{type:'女',num:2},{type:'乐队组合',num:3}],
				currentlanguage:-1,
				currentsex:-1,
				languageindex:-1,
				sexindex:-1,
				// 需要渲染的内容
				datalist:[],
				isshowclassifytopbar:false,
			}
		},
		
		methods:{
			// 选中语言  高光处理
			selectlanguage(data,index){
				if(this.languageindex == -1){
					this.sexindex = 0
				}
				this.languageindex = index 
				this.currentlanguage = data.num
				this.getsingermsg();
			},
			// 选中性别  高光处理
			selectsex(data,index){
				this.sexindex = index 
				this.currentsex = data.num
				this.getsingermsg();
			},
			// 发送axios请求  获得渲染歌手的列表
			getsingermsg(){
				this.$axios.get(`/artist/list?type=${this.currentsex}&area=${this.currentlanguage}&initial=-1`).then(resp=>{
					this.datalist = resp.data.artists
				})
			},
			// 如果滑动就收起  筛选
			packfiltrate(){
				this.$refs.classifytopbar.style.height = 0+'px';
				this.$refs.classifytopbar.style.width = 100+"%";
				this.$refs.classifytopbar.style.top = 48+"px";
				this.$refs.classifytopbar.style.position = 'fixed';
				// 展示筛选
				this.isshowclassifytopbar='true'
			},
			// 展开 筛选
			showfiltrate(){
				this.$refs.classifytopbar.style.height = 60+'px';
				// 收起筛选
				this.isshowclassifytopbar=false
			},
			// 选中歌手进行路由跳转
			selectdata(data){
				this.$router.push(`/singerdetailt/${data.id}`);
			}
			
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.getsingermsg();
			})
		}
	}
</script>

<style scoped="scoped">
	.classifytopbar {
		width: 92%;
		background-color: white;
		margin: auto;
		height: 60px;
		z-index: 800;
		color: #666666;
		/* padding-bottom: 10px; */
		transition: 0.4s;
		font-size: 14px;
		overflow: hidden;
	}
	
	/* 按语言分 */
	.classifytopbar_language {
		width: 100%;
		height: 30px;
		text-align: center;
	}
	
	.classifytopbar_language li {
		min-width: 65px;
		height: 30px;
		float: left;
	}
	
	/* 按性别 */
	.classifytopbar_sex {
		width: 100%;
		height: 30px;
		text-align: center;
	}
	
	.classifytopbar_sex li {
		width: 65px;
		height: 30px;
		float: left;
	}

	.hotsinger {
		width: 100%;
		height: 30px;
		/* margin-top: 30px; */
		line-height: 30px;
		font-size: 13px;
		background-color: #F3F3F3;
	}

	.languagefocus , .sexfocus {
		color: red;
	}

	/* 热门歌手 */
	.singerlist {
		width: 92%;
		margin: auto;
		height: auto;
	}

	.singerlist li {
		width: 100%;
		height: 60px;
		line-height: 60px;
	}

	.attention {
		width: 60px;
		height: 20px;
		border: 1px solid red;
		border-radius: 10px;
		position: relative;
		float: right;
		color: red;
		font-size: 14px;
		top: -20px;
	}


</style>
