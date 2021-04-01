const state = {
	currentmusic:null,
	currentmusicurl:'',
	audiodom:null,
	needbottom:true,
	isplay:false,
	lyric:null,
	// 当前时间
	currenttime:{},
	selectsonglist:null,
	radioID:null,
	radioID2:null,
	// topbar是否需要透明背景
	istopbarbackground:false,
	// 电台详细是否 		overflow: hidden; 变为 auto
	isroll:false,
	// 音乐MV
	musicmv:null,
	// 搜索的音乐
	selectmusic:null,
	// 搜索 input 的默认值
	defaulttext:'',
	// 搜索的关键词
	selecttext:'',
	// 前面搜索过什么 
	selecttitle:null
	
}
 
const mutations = {
	currentmusic(state,data){
		state.currentmusic = data
	},
	// 存音乐地址
	currentmusicurl(state,data){
		state.currentmusicurl = data
	},
	// 存 audio 的dom
	audiodom(state,data){
		state.audiodom = data
	},
	// 是否需要底部栏
	needbottom(state,data){
		state.needbottom = data
	},
	// 是否播放音乐
	isplay(state,data){
		state.isplay = data
	},
	// 存歌词
	lyric(state,data){
		state.lyric = data
	},
	// 存当前时间
	currenttime(state,data){
		state.currenttime = data
	},
	// 选中的歌单
	selectsonglist(state,data){
		state.selectsonglist = data
	},
	// 选择电台类型id
	radioID(state,data){
		state.radioID = data
	},
	// 电台id2 选择电台类型后 再选择电台
	radioID2(state,data){
		state.radioID2 = data
	},
	// topbar是否需要透明背景
	istopbarbackground(state,data){
		state.istopbarbackground = data
	},
	// 是否滚动
	isroll(state,data){
		state.isroll = data
	},
	// 音乐MV信息
	musicmv(state,data){
		state.musicmv = data
	},
	// 搜索的音乐
	selectmusic(state,data){
		state.selectmusic = data
	},
	defaulttext(state,data){
		state.defaulttext = data
	},
	selecttext(state,data){
		state.selecttext = data
	},
	selecttitle(state,data){
		state.selecttitle = data
	},
 }
  
  
module.exports = {
	namespaced:true,
	state,
	mutations
}
 
 
 
 
 
 
 
