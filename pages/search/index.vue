<template>
<!-- **** SEARCH **** -->
    <section class="category-page category-page--is-loading">
        <h2 class="category-page__name" v-text="'Search'"></h2>
        
        <LoaderString v-if="isLoading" :text="loadingText" />
        
        <SearchForm />
        
        <div class="list-block list-block--section list-block--medium" v-if="!isLoading">
            <PostCard
                v-for="(post, index) in posts"
                :key="`${post.id}-${index}`"
                :title="post.title"
                :thumbnail="post.thumbnail"
                :link="post.link"
                :category="post.category"
                :category_slug="post.category_slug"
                :video_field="post.video_field"
                type="medium"
            />
        </div>

        <Button v-if="!isLoading && posts.length > 8" text="Load More" />
    </section>
<!-- **** .SEARCH **** -->
</template>

<script>
import { mapActions } from "vuex";
import { APP_TITLE } from "@/constants";
import APINews from "@/api/api";

import SearchForm from "@/components/SearchForm";
import PostCard from "@/components/PostCard";
import LoaderString from "@/components/LoaderString";
import Button from "@/components/Button";

export default {
    components: {
        SearchForm,
        PostCard,
        LoaderString,
        Button
    },

    data() {
        return {
            search_param: this.$route.query?.query,
            posts: [],
            isLoading: true,
            loadingText: "Searching posts..."
        }
    },

    head() {
        return {
            title: `${APP_TITLE} | Search`,
        }
    },

    created() {
        this.getSearchPosts()
    },

    methods: {
        ...mapActions(["SET_IS_LOADING"]),

        async getSearchPosts() {
            try {
                const response = await APINews.getSearchPosts(this.search_param);
                
                if (response.length > 0) {
                    response.forEach(post => {
                        const category = post._embedded["wp:term"][0][0];
                        const imageObj = post._embedded["wp:featuredmedia"][0];
                        const videoField = post?.ACF?.video_url;
                        const newPost = {
                            id: post.id,
                            link: `/${category.slug}/${post.slug}`,
                            title: post.title.rendered,
                            category: category.name,
                            category_slug: category.slug,
                            thumbnail: imageObj.media_details.sizes["medium-thumbnail"].source_url || imageObj.source_url,
                            video_field: videoField
                        };
                        
                        this.posts = [...this.posts, newPost];
                    });
                    
                    this.isLoading = false;
                } else {
                    setTimeout(() => {
                        this.loadingText = this.search_param ? `We couldn't find any matches for <strong>${this.search_param}</strong>.` : "";
                        this.isLoading = true;
                    }, 500);
                }
                
                setTimeout(() => this.SET_IS_LOADING(false), 500);
            } catch(err) {
				console.log(err)
			}
        }
    }
}
</script>