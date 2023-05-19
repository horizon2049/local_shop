<template>
	<view>
		<!-- 搜索框 -->
		<my-search></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<view class="left-scroll-view-item" :class="active == index ? 'active':''" v-for="(item,index) in cateList"
					:key="item.cat_name" @click="changeActive(index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="NavToGoodsList(item3)">
							<!-- 图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 引入购物车标记代码块
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix],
		data() {
			return {
				// 设备高度参数
				wh: 0,
				// 选中分类
				active: 0,
				// 分类数据列表
				cateList: [],
				// 二级分类数据列表
				cateLevel2: [],
				// 右侧滚动条位置
				scrollTop: 0
			};
		},
		onLoad() {
			// 获取设备高度消息
			uni.getSystemInfo({
					success: (res) => {
						this.wh = res.windowHeight - 50
					}
				}),
				// 获取分类列表数据
				this.getCateList()
		},
		methods: {
			async getCateList() {
				// 发起请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 转存数据
				this.cateList = res.message
				// 转存二级数据分类列表
				this.cateLevel2 = res.message[0].children
			},
			// 点击左侧一级分类列表处理方法
			changeActive(index) {
				// 激活选定样式
				this.active = index;
				// 修改二级分类列表数据
				this.cateLevel2 = this.cateList[index].children;
				this.scrollTop = this.scrollTop ? 0 : 0.1
			},
			// 点击三级分类跳转商品列表页面
			NavToGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			}
		}
	}
</script>

<style lang="less">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				line-height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;

	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>