import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
	redirect: '/find',
    name: 'index',
	children: [
	  {
	    path: '/me',
	    name: 'me',
	    component: () => import('@/views/homepage/me.vue')
	  },
	  {
	    path: '/find',
	    name: 'find',
	    component: () => import('@/views/homepage/find.vue')
	  },
	  {
	    path: '/Cloudvillage',
	    name: 'Cloudvillage',
	    component: () => import('@/views/homepage/Cloudvillage.vue')
	  },
	  {
	    path: '/video',
	    name: 'video',
	    component: () => import('@/views/homepage/video.vue')
	  },
	],
    component: () => import('@/views/homepage/index.vue'),
  },
  // 每日推荐
  {
	 path: '/everydaycircle', 
	 name: 'everydaycircle',
	 component: () => import('@/views/hometopbar/everydaycircle.vue'),
  },
  // 歌单广场
  {
  	 path: '/musicplaza', 
  	 name: 'musicplaza',
  	 component: () => import('@/views/hometopbar/musicplaza.vue'),
  },
  // 歌单详细
  {
  	 path: '/songlistdetail', 
  	 name: 'songlistdetail',
  	 component: () => import('@/views/hometopbar/songlistdetail.vue'),
  },
  // 详细音乐播放
  {
  	 path: '/musicdetail', 
  	 name: 'musicdetail',
  	 component: () => import('@/views/hometopbar/musicdetail.vue'),
  },
  // 排行榜
  {
  	 path: '/ranking', 
  	 name: 'ranking',
  	 component: () => import('@/views/hometopbar/ranking.vue'),
  },
  // 电台
  {
  	 path: '/radio', 
  	 name: 'radio',
  	 component: () => import('@/views/hometopbar/radio.vue'),
  },
  // 电台分类
  {
  	 path: '/radioclassify', 
  	 name: 'radioclassify',
  	 component: () => import('@/views/hometopbar/radioclassify.vue'),
  },
  // 电台详细
  {
  	 path: '/detailradio',
	 redirect: '/detailradio/program',
  	 name: 'detailradio',
	 children: [
	   {
	     path: 'detail',
	     name: 'detail',
	     component: () => import('@/views/hometopbar/detail.vue')
	   },
	   {
	     path: 'program',
	     name: 'program',
	     component: () => import('@/views/hometopbar/program.vue')
	   },
	   {
	     path: 'similarity',
	     name: 'similarity',
	     component: () => import('@/views/hometopbar/similarity.vue')
	   }
	 ],
  	 component: () => import('@/views/hometopbar/detailradio.vue'),
  },
  // 电台列表渲染
  {
  	 path: '/rodiolist',
	 redirect: '/rodiolist/hotprogram',
  	 name: 'rodiolist',
	 children: [
	   {
	     path: 'hotprogram',
	     name: 'hotprogram',
	     component: () => import('@/views/hometopbar/hotprogram.vue')
	   },
	   {
	     path: 'hotradio',
	     name: 'hotradio',
	     component: () => import('@/views/hometopbar/hotradio.vue')
	   }
	 ],
  	 component: () => import('@/views/hometopbar/rodiolist.vue'),
  },
  // MV详细
  {
  	 path: '/mvdetail', 
  	 name: 'mvdetail',
  	 component: () => import('@/views/mv/mvdetail.vue'),
  },
  // 搜索歌曲
  {
  	 path: '/selectmusic', 
  	 name: 'selectmusic',
  	 component: () => import('@/views/selectmusic/selectmusic.vue'),
  },
  // 搜索歌词  后的详细页面 
  {
  	 path: '/selectdetail', 
	 redirect: '/selectdetail/single',
  	 name: 'selectdetail',
	 children: [
	   {
	     path: 'synthesize',
	     name: 'synthesize',
	     component: () => import('@/views/selectmusic/detailtopbar/synthesize.vue')
	   },
	   {
	     path: 'single',
	     name: 'single',
	     component: () => import('@/views/selectmusic/detailtopbar/single.vue')
	   },
	   {
	     path: 'spruce',
	     name: 'spruce',
	     component: () => import('@/views/selectmusic/detailtopbar/spruce.vue')
	   },
	   {
	     path: 'video',
	     name: 'video',
	     component: () => import('@/views/selectmusic/detailtopbar/video.vue')
	   },
	   {
	     path: 'singer',
	     name: 'singer',
	     component: () => import('@/views/selectmusic/detailtopbar/singer.vue')
	   },
	 ],
  	 component: () => import('@/views/selectmusic/selectdetail.vue'),
  },
  // 歌手分类
  {
  	 path: '/Singerclassification', 
  	 name: 'Singerclassification',
  	 component: () => import('@/views/selectmusic/Singerclassification.vue'),
  },
  // 歌手详细
  {
  	 path: '/singerdetailt/:id', 
  	 name: 'singerdetailt',
  	 component: () => import('@/views/selectmusic/singerdetailt.vue'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
