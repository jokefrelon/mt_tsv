<template>
	<el-carousel
		height="70px"
		:interval="3000"
	>
		<el-carousel-item v-for="item in items">
			<div class="item-container">
				<div class="left-image">
					<img
						:src="item.imageUrl"
						alt=""
					>
				</div>
				<div class="right-text">
					<h3>{{ item.title }}</h3>
					<p class="desc">{{ item.description }}</p>
					<p class="rmb">{{ item.price }}</p>
				</div>
			</div>
		</el-carousel-item>
	</el-carousel>
</template>

<script setup lang="ts">


type x = {
	imageUrl: string
	title: string
	description: string
	price: string
}
const items: x[] = reactive([
	{
		imageUrl: "http://pics.ip.jokeme.top:6280/2023-02-20/p94n-9gtr-no7x-lcr4.png",
		title: "h的法国",
		description: "nihaoya c速度和覅u和爱看i实力和放大",
		price: "34.98"
	},
	{
		imageUrl: "http://pics.ip.jokeme.top:6280/2023-02-20/p94n-9gtr-no7x-lcr4.png",
		title: "啊o阿斯顿",
		description: "士大夫士大夫皇家空军哈师大卡拉实践活动来看",
		price: "34.98"
	},
	{
		imageUrl: "http://pics.ip.jokeme.top:6280/2023-02-20/p94n-9gtr-no7x-lcr4.png",
		title: "速度丁给",
		description: "自动发给你S离开家跨世纪的政治上的控制世界的官方 c",
		price: "34.98"
	}
])

</script>


<style lang="scss" >
:root {
	--mel-carousel-height: 70px;
}

.item-container {
	display: flex;
	align-items: center;
	height: var(--mel-carousel-height);
	background-color: var(--ep-fill-color-dark);
	user-select: none;
}

.left-image {
	width: 30%;
	display: flex;
	justify-content: flex-end;

	img {
		width: auto;
		height: var(--mel-carousel-height);
		object-fit: contain;
		position: relative;
		z-index: 2;
		transform: scale(1);
    transition: transform 0.5s ease 0s;
	}
	img:hover{
		transform: scale(1.5);
	}
}

.ep-carousel__button{
	background-color: var(--ep-text-color-regular);
}

.right-text {
	height: var(--mel-carousel-height);
	width: 70%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;

	h3 {
		padding: 0;
		margin: 0;
		color: var(--ep-text-color-primary);
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: bolder;

	}

	p {
		padding: 0;
		margin: 0;
	}

	.desc {
		color: var(--ep-text-color-secondary);
		font-size: var(--ep-font-size-extra-small);
	}

	.rmb {
		font-size: var(--ep-font-size-base);
		font-weight: bolder;
		font-style: italic;
		color: var(--ep-color-danger-dark-2);
	}

	.rmb::after {
		content: " ¥";
	}

}
</style>