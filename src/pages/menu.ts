export interface Ipost {
	id: number
	title: string
	url: string
	width: number
	height: number
	link: string
	desc?: string
}

// <Link to="/clock">clock</Link>
// 		<Link to="/drag">drag</Link>
// 		<Link to="/drag/sort">sort</Link>
// 		<Link to="/css/tabbar">tabbar 背景色</Link>
// 		<Link to="/css/grayscale">grayscale</Link>
// 		<Link to="/css/gallery">gallery</Link>
// 		<Link to="/canvas/ggk">刮刮卡</Link>
// 		<Link to="/canvas/ball">小球</Link>
// 		<Link to="/svg/hotmap">提交次数</Link>
export const menu: Ipost[] = [
	{
		id: 1,
		title: '抖音看见的一个时钟',
		link: '/clock',
		width: 4872,
		height: 3248,
		url: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
	},
	{
		id: 2,
		title: '图片墙：瀑布流&等高布局',
		link: '/css/gallery',
		width: 2400,
		height: 1228,
		url: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
	},
	{
		id: 3,
		title: '图片对比效果',
		link: '/css/grayscale',
		width: 5472,
		height: 2976,
		url: 'https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg',
	},
	{
		id: 4,
		title: '一个tabbar的效果',
		link: '/css/tabbar',
		width: 4000,
		height: 2525,
		url: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg',
	},
	{
		id: 5,
		title: 'canvas 小球',
		link: '/canvas/ball',
		width: 3000,
		height: 2400,
		url: 'https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg',
	},
	{
		id: 6,
		title: 'canvas 刮刮卡',
		link: '/canvas/ggk',
		width: 6000,
		height: 4002,
		url: 'https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg',
	},
	{
		id: 7,
		title: 'svg实现github提交次数的效果',
		link: '/svg/hotmap',
		width: 7020,
		height: 3163,
		url: 'https://images.pexels.com/photos/37403/bora-bora-french-polynesia-sunset-ocean.jpg',
	},
	{
		id: 8,
		title: '简单的拖拽排序',
		link: '/drag/sort',
		width: 2848,
		height: 3560,
		url: 'https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg',
	},
	{
		id: 9,
		title: 'grid 计算器',
		link: '/css/grid/calculator',
		width: 4872,
		height: 3248,
		url: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
	},
	{
		id: 10,
		title: '密码管理器',
		link: '/tools/1password',
		width: 2400,
		height: 1228,
		url: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
	},
	{
		id: 11,
		title: 'Icon组件',
		link: '/my-components/icon',
		width: 5472,
		height: 2976,
		url: 'https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg',
	},
]
