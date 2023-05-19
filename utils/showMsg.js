uni.$showMsg = function(title, duration) {
	uni.showToast({
		title: title,
		duration: duration || 1500,
		icon: 'none'
	})
}