<template>
<!-- **** TAG **** -->
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
                :category="post.tag"
                :category_slug="post.tag_slug"
                type="medium"
            />
        </div>

        <Button v-if="!isLoading && posts.length > 8" text="Load More" />
    </section>
<!-- **** .TAG **** -->
</template>

<script>
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
            tag: this.$route.params.slug,
            id: "",
            name: "",
            posts: [],
            isLoading: true
        }
    },

    created() {
        this.getTagInfo();
    },

    methods: {
        async getTagInfo() {
            try {
                const response = await APINews.getTagInfo(this.tag);
                const {name,id} = response[0];
                this.name = name;

                this.getTagPosts(id);
            } catch(err) {
                console.log(err);
            }
        },

        async getTagPosts(id) {
            try {
                const response = await APINews.getTagPosts(id);
                response.forEach(post => {
                    const imageObj = post._embedded["wp:featuredmedia"][0];
                    const newPost = {
                        id: post.id,
                        link: `/${this.tag}/${post.slug}`,
                        title: post.title.rendered,
                        tag: this.name,
                        tag_slug: this.tag,
                        thumbnail: imageObj.media_details.sizes["medium-thumbnail"].source_url || imageObj.source_url
                    };
                    
                    this.posts = [...this.posts, newPost];
                });

                this.isLoading = false;
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>