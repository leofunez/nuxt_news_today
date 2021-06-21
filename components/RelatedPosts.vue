<template>
    <section class="related-posts">
        <h3 class="related-posts__title">Related posts</h3>
        <div class="loading-posts" v-if="isLoading" v-text="'Loading posts...'"></div>
        <div class="list-block list-block--medium" v-if="!isLoading">
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
    </section>
</template>

<script>
import APINews from "@/api/api";
import PostCard from "@/components/PostCard";

export default {
    components: {
        PostCard
    },

    props: {
        category: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            isLoading: true,
            posts: []
        }
    },

    created() {
        this.getPosts();
    },

    methods: {
        async getPosts() {
            try {
                const response = await APINews.getCategoryPosts(this.category, 4);
                response.forEach(async post => {
                    const category = await APINews.getCategoryById(post.categories[0]);
                    const imageObj = post._embedded["wp:featuredmedia"][0];
                    const newPost = {
                        id: post.id,
                        link: `/${category.slug}/${post.slug}`,
                        title: post.title.rendered,
                        category: category.name,
                        category_slug: category.slug,
                        thumbnail: imageObj.media_details.sizes["medium-thumbnail"].source_url || imageObj.source_url
                    };
                    
                    this.posts = [...this.posts, newPost];
                });
                this.isLoading = false;
            } catch( err) {
                console.log(err)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.related-posts {
    margin-top: 100px;

    &__title {
        @include main-font;
        font-size: 18px;
        letter-spacing: -0.7px;
        margin: 0 0 20px;
    }
}
</style>