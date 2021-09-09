<template>
    <header class="header" :class="{'header--is-dark': isDark}">
        <nuxt-link :to="'/'" class="logo" :class="{'logo--is-dark': renderDarkLogo}"></nuxt-link>
        
        <Menu :items="menu" :isDark="isDark" :isHeader="true" :isOpen="menuState" />

        <DarkModeTrigger :isLight="renderDarkLogo" />

        <nuxt-link :to="'/search'" class="header__search">
            <button class="header__search-button">        
                <SearchIcon :color="`${renderDarkLogo ? '#000000' : '#ffffff'}`" size="18" />
            </button>
        </nuxt-link>

        <nuxt-link class="button-live" title="Live NOW" to="/">
            Live <span class="button-live__now" v-text="'now'"></span>
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
import SearchForm from "@/components/SearchForm";
import SearchIcon from "@/components/icons/SearchIcon";

export default {
    components: {
        Menu,
        DarkModeTrigger,
        SearchForm,
        SearchIcon
    },

    props: {
        isDark: {
            type: Boolean
        }
    },

    data() {
        return {
            menu: [],
            menuState: false,
            logoIsDark: false
        }
    },

    created() {
		this.getHeaderMenu();
	},

	methods: {
		async getHeaderMenu() {
            const response = await APINews.getHeaderMenu();
            response.forEach(item => {
                this.menu = [...this.menu, {title: item.title, url: item.url.replace("https://dev-today-news.pantheonsite.io/category/", "/")}]
            });
		},

        openMenu() {
            this.menuState = !this.menuState;
        }
	},

    computed: {
        ...mapGetters(["GET_DARK_MODE"]),

        renderDarkLogo() {
            let logoIsDark;
            
            if (this.GET_DARK_MODE) {
                logoIsDark = false;
            } else {
                logoIsDark = !this.isDark;
            }
            
            return logoIsDark
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";

.header {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 35px 35px 68px 60px;
    background-color: $white;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    border-bottom: 2px solid $light;
    padding: 0 0 0 15px;
    z-index: 3;

    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    color: $white;

    .dark-mode & {
        background-color: $darkest;
        border-color: $darker;
    }

    &__search {
        position: relative;
        
        &-button {
            border: 0;
            cursor: pointer;
            height: 40px;
            width: 40px;
            border-radius: 6px;
            transition: all 0.2s ease-in-out;
            background: none;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    .search {
        &__form{
            position: absolute;
            z-index: 1;
            display: none;
            width: calc(100vw - 36px);
            right: -130px;

            &--active {
                display: block;
            }
        }
    }
    
    @media screen and (min-width: 480px) {
        .search {
            &__form{
                right: -10px;
                top: -1px;
                width: 180px;
            }
        }
    }

    @media screen and (min-width: 1000px) {
        grid-template-columns: 100px 1fr 35px 35px 65px;
        position: relative;
        border-bottom: none;
        height: 100px;
        background-color: $white;
        padding: 0;

        &--is-dark {
            background-color: $dark;
        }

        .dark-mode & {
            background-color: transparent;
            border-color: transparent;
        }
    }

    .menu-button {
        display: block;
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

        @media screen and (min-width: 1000px) {
            display: none;
        }
    }
}
</style>