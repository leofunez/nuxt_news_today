<template>
	<main>
		<Loader v-if="GET_IS_LOADING" />
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
import { mapGetters } from "vuex";
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

	computed: {
        ...mapGetters(["GET_IS_LOADING"]),
    }
}
</script>

<style lang="scss">
@import "~/assets/css/normalize.css";
@import "~/assets/scss/main.scss";
</style>