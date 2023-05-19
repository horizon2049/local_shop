<template>
	<view>
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-container" :style="{'background-color': bgcolor}">
			<view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="gotoSearch">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			// 背景颜色
			bgcolor: {
				type: String,
				default: '#C00000'
			},
			// 圆角尺寸
			radius: {
				type: Number,
				// 单位是 px
				default: 18
			}
		},
		data() {
			return {
			};
		},
		methods: {
			// 点击搜索框切换搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="less">
	.my-search-container {
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 36px;
		background-color: #ffffff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>