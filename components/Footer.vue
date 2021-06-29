<template>
    <footer class="footer">
        <div class="wrapper">
            <nuxt-link :to="'/'" class="logo"></nuxt-link>

            <Menu :items="menu" :isDark="false" />

            <div class="footer__author">
                Designed on <a href="https://www.figma.com" target="_blank">Figma</a> and built on <a href="https://wordpress.com/" target="_blank">WordPress</a> with <span>❤</span> by <a href="https://www.leonardofunez.com" title="Leonardo Funez">Leonardo Funez</a>
            </div>
        </div>
    </footer>
</template>

<script>
import APINews from "~/api/api";
import Menu from "@/components/Menu";

export default {
    components: {
        Menu
    },

    data() {
        return {
            menu: []
        }
    },

    created() {
		this.getFooterMenu()
	},

	methods: {
		async getFooterMenu() {
            const response = await APINews.getFooterMenu();
            response.forEach(item => {
                this.menu = [...this.menu, {title: item.title, url: item.url}]
            });
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";

.footer {
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    padding: 60px 0 20px;
    height: auto;
    background-color: $darker;
    color: $white;

    .wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 20px 0;
    }

    &__author {
        grid-column: 1;
        grid-row: initial;
        text-align: center;
    }

    .logo {
        margin: 0 auto;
    }

    .menu {
        text-align: center;
    }

    // **** MEDIA **** //
    @media screen and (min-width: 1000px) {
        .wrapper {
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: 100px 1fr 200px;
        }

        &__author {
            grid-row: 2;
            grid-column: 2;
        }
    }
    // **** .MEDIA **** //
}
</style>