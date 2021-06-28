<template>
    <header class="header" :class="{'header--is-dark' : isDark}">
        <nuxt-link :to="'/'" class="logo" :class="{'logo--is-dark' : isDark && !GET_DARK_MODE}"></nuxt-link>
        
        <Menu :items="menu" :isDark="isDark" :isHeader="true" :isOpen="menuState" />

        <DarkModeTrigger :isLight="isDark" />

        <nuxt-link class="button-live" title="Live NOW" to="/">
            Live <span class="button-live__now">now</span>
        </nuxt-link>

        <button class="menu-button" :class="{'menu-button--active' :menuState}" @click="openMenu">
            <span class="menu-button__line"></span>
            <span class="menu-button__line"></span>
            <span class="menu-button__line"></span>
        </button>
    </header>
</template>

<script>
import {mapGetters} from "vuex";
import APINews from "~/api/api";
import Menu from "@/components/Menu";
import DarkModeTrigger from "@/components/DarkModeTrigger";

export default {
    components: {
        Menu,
        DarkModeTrigger
    },

    props: {
        isDark: {
            type: Boolean
        }
    },

    data() {
        return {
            menu: [],
            menuState: false
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
		},

        openMenu() {
            this.menuState = !this.menuState;
        }
	},

    computed: {
        ...mapGetters(["GET_DARK_MODE"])
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
        
        .dark-mode & {
            background-color: $darkest;
            border-color: $darker;
        }
    }

    .menu-button {
        display: none;
        cursor: pointer;
        height: 40px;
        width: 40px;
        border: 0;
        background: transparent;
        position: relative;
        margin: 10px;
        padding: 0;

        &__line {
            height: 2px;
            width: 25px;
            background-color: $dark;
            display: block;
            position: absolute;
            left: 8px;
            transition: all 0.2s ease-in-out;

            &:first-of-type {
                top: 15px;
            }
            &:last-of-type {
                top: 25px;
            }

            .dark-mode & {
                background-color: $white;
            }
        }

        &--active {
            .menu-button {
                &__line {
                    &:first-of-type {
                        top: 20px;
                        transform: rotate(45deg);
                    }
                    &:nth-child(2) {
                        height: 0;
                    }
                    &:last-of-type {
                        top: 20px;
                        transform: rotate(-45deg);
                    }
                }
            }
        }

        @media screen and (max-width: 1000px) {
            display: block;
        }
    }
}
</style>