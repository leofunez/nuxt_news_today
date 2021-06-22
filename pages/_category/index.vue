<template>
<!-- **** CATEGORY **** -->
    <section class="category-page category-page--is-loading">
        <h2 class="category-page__name" v-text="name"></h2>
        
        <LoaderString v-if="name && isLoading" text="Loading posts..." />
        
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
<!-- **** .CATEGORY **** -->
</template>

<script>
import { mapActions } from "vuex";
import APINews from "@/api/api";
import PostCard from "@/components/PostCard";
import LoaderString from "@/components/LoaderString";
import Button from "@/components/Button";

export default {
    components: {
        PostCard,
        LoaderString,
        Button
    },

    data() {
        return {
            category: this.$route.params.category,
            id: "",
            name: "",
            posts: [],
            isLoading: true
        }
    },

    created() {
        this.getCategoryInfo(this.category);
    },

    methods: {
        ...mapActions(["SET_IS_LOADING"]),
        
        async getCategoryInfo(category) {
            try {
                const response = await APINews.getCategoryInfo(category);
                this.id = response[0].id;
                this.name = response[0].name;

                this.getCategoryPosts(response[0].id);
            } catch(err) {
				console.log(err)
			}
        },

        async getCategoryPosts(id) {
            try {
                const response = await APINews.getCategoryPosts(id, 8);
                
                response.forEach(post => {
                    const imageObj = post._embedded["wp:featuredmedia"][0];
                    const newPost = {
                        id: post.id,
                        link: `/${this.category}/${post.slug}`,
                        title: post.title.rendered,
                        category: this.name,
                        category_slug: this.category,
                        thumbnail: imageObj.media_details.sizes["medium-thumbnail"].source_url || imageObj.source_url
                    };
                    
                    this.posts = [...this.posts, newPost];
                });

                setTimeout(() => this.SET_IS_LOADING(false), 500);
                this.isLoading = false;
            } catch(err) {
				console.log(err)
			}
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.category-page {
    &__name {
        text-align: center;
        font-size: 75px;
        letter-spacing: -3.5px;
        margin: 20px 0 40px;
        @include main-font;
        text-transform: capitalize;

        @media screen and (max-width: 768px) {
            font-size: 55px;
        }

        @media screen and (max-width: 480px) {
            font-size: 45px;
            letter-spacing: -2.5px;
        }
    }
}
</style>