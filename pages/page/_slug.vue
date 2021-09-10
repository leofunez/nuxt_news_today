<template>
<!-- **** PAGE DETAIL **** -->
    <section class="page-detail">
		<div class="wrapper">
			<h1 class="page-detail__title" v-text="title"></h1>
            <div class="loading-posts" v-if="title && isLoading" v-text="'Loading page...'"></div>
            
            <div class="page-detail__body" v-html="body"></div>
        </div>
	</section>
<!-- **** .PAGE DETAIL **** -->
</template>

<script>
import { mapActions } from "vuex";
import { APP_TITLE } from "@/constants";
import APINews from "@/api/api";

export default {
    data() {
        return {
            slug: this.$route.params.slug,
            title: "",
            body: "",
            isLoading: true
        }
    },

    head() {
        return {
            title: `${APP_TITLE} | ${this.title}`,
        }
    },

    created() {
        this.getPage();
    },

    methods: {
        ...mapActions(["SET_IS_LOADING"]),

        async getPage() {
            try {
                const response = await APINews.getPage(this.slug);
                const {title, content} = response[0];
                this.title = title.rendered;
                this.body = content.rendered;
                this.isLoading = false;

                setTimeout(() => this.SET_IS_LOADING(false), 500);
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_colors.scss";
@import "@/assets/scss/_mixins.scss";

.page-detail {
    margin: 35px 0;

    .wrapper {
        margin: 0 auto;
        max-width: 780px;
    }

    &__title {
        @include main-font;
        font-size: 28px;
        color: $dark;
        line-height: 1.1;
        letter-spacing: -0.5px;
        text-transform: uppercase;
        text-align: center;
        margin: 20px 0;

        .dark-mode & {
            color: $white;
        }
    }

    &__body {
        max-width: 780px;
        margin: 0 auto;

        img {
            height: auto;
        }

        h2 {
            color: $dark;
            font-size: 28px;
        }

        p {
            font-size: 14px;
            line-height: 1.6;

            a {
                color: $fucsia;
                text-decoration: underline;

                &:hover {
                    text-decoration: none;
                }
            }
        }

        iframe {
            position: absolute;
            height: 100%;
            width: 100%;
        }
    }

    // **** MEDIA **** //
    @media screen and (min-width: 480px) {
        &__title {
            font-size: 35px;
            letter-spacing: -1.4px;
        }
    }

    @media screen and (min-width: 768px) {
        &__top {
            margin: 20px 0;
        }

        &__title {
            font-size: 45px;
            margin: 10px 0 20px;
        }

        &__body {
            p {
                font-size: 16px;
                line-height: 1.8;
            }
        }
    }

    @media screen and (min-width: 1000px) {
        &__title {
            font-size: 65px;
            letter-spacing: -2.5px;
            color: $dark;
        }
    }
    // **** .MEDIA **** //
}
</style>