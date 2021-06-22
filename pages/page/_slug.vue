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

    created() {
        this.getPage();
    },

    methods: {
        async getPage() {
            try {
                const response = await APINews.getPage(this.slug);
                const {title, content} = response[0];
                this.title = title.rendered;
                this.body = content.rendered;
                this.isLoading = false;
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
    margin: 80px 0;

    .wrapper {
        margin: 0 auto;
        max-width: 780px;
    }

    &__title {
        @include main-font;
        font-size: 65px;
        color: $dark;
        line-height: 1.1;
        letter-spacing: -2.5px;
        text-transform: uppercase;
        text-align: center;
        margin: 20px 0 40px;
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
            font-size: 16px;
            line-height: 2;

            a {
                color: $fucsia;
                text-decoration: underline;

                &:hover {
                    text-decoration: none;
                }
            }
        }
    }

    // **** MEDIA **** //
    @media screen and (max-width: 1000px) {
        &__title {
            font-size: 45px;
            letter-spacing: -0.5px;
            color: $dark;
        }
    }

    @media screen and (max-width: 768px) {
        margin-top: 40px;

        &__top {
            margin: 20px 0;
        }

        &__title {
            font-size: 35px;
            margin: 10px 0 20px;
        }

        &__body {
            p {
                font-size: 14px;
            }
        }
    }

    @media screen and (max-width: 480px) {
        &__title {
            font-size: 28px;
        }
    }
    // **** .MEDIA **** //
}

// DARK //
    .dark-mode {
        .page-detail {
            &__title,
            &__date {
                color: $white;
            }
        }
    }
// .DARK //
</style>