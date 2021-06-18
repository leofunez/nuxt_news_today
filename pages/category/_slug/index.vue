<template >
    <section class="category-page category-page--is-loading">
        <h2 class="category-page__name" v-text="name"></h2>
        <div class="loading-posts" v-if="name && isLoading" v-text="'Loading posts...'"></div>
        
        <div class="list-block list-block--section list-block--medium" v-if="!isLoading">
            <PostCard
                v-for="(post, index) in posts"
                :key="`${post.id}-${index}`"
                :title="post.title"
                :thumbnail="post.thumbnail"
                :link="post.link"
                :category="post.category"
                :category_slug="post.category_slug"
                type="medium"
            />
        </div>

        <Button v-if="!isLoading && posts.length > 8" text="Load More" />
    </section>
</template>

<script>
import APINews from "@/api/api";
import PostCard from "@/components/PostCard";
import Button from "@/components/Button";

export default {
    components: {
        PostCard,
        Button
    },

    data() {
        return {
            slug: this.$route.params.slug,
            id: "",
            name: "",
            posts: [],
            isLoading: true
        }
    },

    created() {
        this.getCategoryInfo(this.slug);
    },

    methods: {
        async getCategoryInfo(slug) {
            const response = await APINews.getCategoryInfo(slug);
            this.id = response[0].id;
            this.name = response[0].name;

            this.getCategoryPosts(response[0].id);
        },

        async getCategoryPosts(id) {
            const response = await APINews.getCategoryPosts(id);
            
            response.forEach(post => {
                const newPost = {
                    id: post.id,
                    link: `/${this.slug}/${post.slug}`,
                    title: post.title.rendered,
                    category: this.name,
                    category_slug: this.slug,
                    thumbnail: post._embedded["wp:featuredmedia"][0].source_url
                };
                
                this.posts = [...this.posts, newPost];
            });

            this.isLoading = false;
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.category-page {
    margin-bottom: 100px;

    &__name {
        text-align: center;
        font-size: 75px;
        letter-spacing: -3.5px;
        margin: 20px 0 40px;
        @include main-font;
        text-transform: capitalize;
    }
}
</style>