
#  uniApp  yt-tabbar 底部凸出tabbar



## 使用说明 （图片请使用自己项目的指定图片）

在 template 中：

```vue
<template>
	<view>
		<yt-tabbar :tabArr="tabArr" activeColor="#ce352a" @tabChange="tabChange"></yt-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabArr: [{
						id: 1,
						name: '我要请假',
						icon: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/e9713023ed2543d1e4c0f089eb44518edbfb654902924123787fcc6348196f84.png',
						activeImg: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/87718d09768e2f2e397de1bbbb07f342006ec3e5a5abb7408e62e7679569f90f.png'
					}, {
						id: 2,
						name: '添加',
						icon: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/4874ed995278926609a3abeb69ab41d3e130b21478343eb4ff2b09f9d247d092.png',
						activeImg: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/4ca77fd1088e9738d23b2cc53ed9acb2705c372f50c95ebcd65f385c95c6b64e.png',
					},
					{
						id: 3,
						name: '请假记录',
						icon: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/4874ed995278926609a3abeb69ab41d3e130b21478343eb4ff2b09f9d247d092.png',
						activeImg: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/4ca77fd1088e9738d23b2cc53ed9acb2705c372f50c95ebcd65f385c95c6b64e.png',
						bigType: true //是否凸起显示
					},
					{
						id: 4,
						name: '请假记录',
						icon: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/e4c2d208cc654e51757ac55ee4d1c701535be0ce45649fbd54213d42eaff8911.png',
						activeImg: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/5c5921ab91bc12943cf0313afaddc7f2b27c453a5869b1fc120d518f7c01ef9b.png',
					},
					{
						id: 5,
						name: '请假记录',
						icon: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/e4c2d208cc654e51757ac55ee4d1c701535be0ce45649fbd54213d42eaff8911.png',
						activeImg: 'http://172.16.11.230:48080/admin-api/infra/file/4/get/5c5921ab91bc12943cf0313afaddc7f2b27c453a5869b1fc120d518f7c01ef9b.png',
					}
				]
			}
		},
		methods: {
			//切换tabbar
			tabChange(e) {
				this.activeIndex = e.id
				console.log('点击:', e)


			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f3f3f3;
	}
</style>

```


## 属性说明

| 属性		| 是否必填	|  值类型	| 默认值	| 说明			|
| --------- | -------- 	| -----: 	| --: 	| :------------:|
| tabArr    |	是  		| Array 	| () =>[]	| 选项卡数组	|
| index    |	否  		| Number 	| 2 	| 当前选项卡索引	|
| color    |	否  		| String 	| #272822	| 文字默认颜色	|
| activeColor  |	否  		| String 	| #c73a47	| 激活状态下的文字颜色	|
| setNavTitle    |	否  		| Boolean 	| false	| 是否设置导航标题	|
| @tabChange    |	是  		| Function 	| --	| tabbar的点击事件	|
 
| `QQ交流群(906392632)`  |

|<p><img align=top src="https://7072-prod-4gapv4gl33a8a0ff-1305990777.tcb.qcloud.la/%E9%87%8D%E8%A6%81%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/Snipaste_2023-11-06_16-50-56.png?sign=ed27f09cfeabb33e24835fecdd4108db&t=1699260686" width="500px" height="auto"></p>|
| QQ群号：906392632      |

## 温馨提示
	
* 文件上传
0. 如说明表达还不够清楚，不清楚怎么使用可加入群聊一起交流	
1. 若能帮到你还请点亮5颗小星星以作鼓励哈~
2. 若能帮到你还请点亮5颗小星星以作鼓励哈~
3. 若能帮到你还请点亮5颗小星星以作鼓励哈~