<template>
	<main class="main" :class="{'main--is-loading':GET_IS_LOADING}">
		<Loader v-if="GET_IS_LOADING" />
		<div class="bg-layer" v-if="showBgLayer"></div>

		<div class="main__wrapper">
			<Header :isDark="showBgLayer" />
			
			<div class="main__content">
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
			showBgLayer: true,
			pagesToShowBgLayer: ["index", "category-slug"]
		}
	},

	updated() {
		window && window.scrollTo(0, 0)
	},

	created() {
		this.setShowBgLayer()
	},

	methods: {
		setShowBgLayer() {
			this.showBgLayer = this.pagesToShowBgLayer.indexOf(this.$route.name) !== -1 ? true : false;
		}
	},

	computed: {
        ...mapGetters(["GET_IS_LOADING"]),
    },

	watch: {
		$route () {
			this.setShowBgLayer()
		}
	},
}
</script>

<style lang="scss">
@import "~/assets/css/normalize.css";
@import "~/assets/scss/main.scss";
</style>