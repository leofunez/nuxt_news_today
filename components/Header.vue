<template>
    <header class="header" :class="{'header--is-dark' : isDark}">
        <nuxt-link :to="'/'" class="logo" :class="{'logo--is-dark' : isDark}"></nuxt-link>
        
        <Menu :items="menu" :isDark="isDark" :isHeader="true" />
    </header>
</template>

<script>
import APINews from "~/api/api";
import Menu from "@/components/Menu";

export default {
    components: {
        Menu
    },

    props: {
        isDark: {
            type: Boolean
        }
    },

    data() {
        return {
            menu: []
        }
    },

    created() {
		this.getHeaderMenu();
	},

	methods: {
		async getHeaderMenu() {
            const response = await APINews.getHeaderMenu();
            response.forEach(item => {
                this.menu = [...this.menu, {title: item.title, url: item.url.replace("http://localhost:8888/news/category/", "/")}]
            });
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";

.header {
    display: grid;
    grid-template-columns: 100px 1fr 35px 65px;
    grid-gap: 10px;
    position: relative;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    color: $white;

    @media screen and (max-width: 1000px) {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        background-color: $white;
        padding: 0 0 0 15px;
        height: 80px;
        z-index: 2;
        grid-template-columns: 1fr 35px 94px 60px;
        border-bottom: 2px solid $light;
        
        &.dark-mode {
            background-color: $darkest;
            border-color: $darker;
        }
    }
}
</style>