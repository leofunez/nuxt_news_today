<template>
	<main>
		<Loader />
		<div class="bg-layer" v-if="!headerIsDark"></div>

		<div class="main-wrapper">
			<Header :isDark="headerIsDark" />
			
			<div class="main-content">
				<Nuxt :key="$route.fullPath" />
			</div>
		</div>
		
		<Footer />
	</main>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Loader from "~/components/Loader";

export default {
	components: {
		Header,
		Footer,
		Loader
	},

	data() {
		return {
			headerIsDark: this.$route.name === "index" ? false : true
		}
	},

	created() {
		console.log(this.$route.name)
	}
}
</script>

<style lang="scss">
@import "~/assets/css/normalize.css";
@import "~/assets/scss/main.scss";
</style>