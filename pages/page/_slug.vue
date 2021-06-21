<template>
    <section class="page-detail">
		<div class="wrapper">
			<h1 class="page-detail__title" v-text="title"></h1>
            <div class="loading-posts" v-if="title && isLoading" v-text="'Loading page...'"></div>
            
            <div class="page-detail__body" v-html="body"></div>
        </div>
	</section>
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

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";

.page-detail {
    margin: 80px 0;

    .wrapper {
        margin: 0 auto;
        max-width: 780px;
    }

    &__title {
        font-size: 65px;
        margin-bottom: 80px;
        color: $dark;
    }
}
</style>