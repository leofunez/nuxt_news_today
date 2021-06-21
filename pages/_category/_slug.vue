<template>
    <section class="post-detail">
        <div class="post-detail__wrapper">
            <div class="post-detail__content">
                <div class="post-detail__top">
                    <nuxt-link class="post-detail__category" v-if="category.name && category.link" :to="category.link" v-text="category.name"></nuxt-link>
                    
                    <h1 class="post-detail__title" v-text="title"></h1>

                    <time class="post-detail__date" v-text="date"></time>

                    <div class="social-sharing">
                        <a href="" class="social-sharing__facebook" target="_blank" title="Facebook"></a>
                        <a href="https://twitter.com/intent/tweet?url=<?php print esc_url(get_permalink()); ?>" rel="noopener" class="social-sharing__twitter" target="_blank" title="Twitter"></a>
                        <a href="whatsapp://send?text=<?php the_title(); ?>" data-action="share/whatsapp/share" class="social-sharing__whatsapp" target="_blank" title="Whatsapp"></a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>&summary=<?php the_excerpt(); ?>&source=News" class="social-sharing__linkedin" target="_blank" title="Linkedin"></a>
                    </div>
                </div>

                <figure class="post-detail__image" :style="{background: 'url('+ image +') no-repeat center / cover'}">
                    <div class="post-detail__video-play video-embed" :data-video="video_field" v-if="video_field"></div>
                </figure>

                <div class="post-detail__body">
                    <div v-html="body"></div>
                    
                    <div class="post-detail__tags" v-if="tags">
                        <nuxt-link class="post-detail__tag-item" v-for="(tag, index) in tags" :to="`${tag.slug}`" :key="`${tag.slug}-${index}`" v-text="tag.name"></nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <RelatedPosts :category="category.id" v-if="category.id" />
    </section>
</template>

<script>
import APINews from "@/api/api";
import RelatedPosts from "@/components/RelatedPosts";

export default {
    components: {
        RelatedPosts
    },

    async asyncData({ $content, params }) {
        // const article = await $content('articles', params.slug).fetch()
        // console.log(params)

        return { }
    },
    data() {
        return {
            slug: this.$route.params.slug,
            title: "",
            body: "",
            date: "",
            image: "",
            category: {},
            tags: [],
            video_field: ""
        }
    },

    created() {
        this.getPost();
    },

    methods: {
        async getPost() {
            try {
                const response = await APINews.getPost(this.slug);
                const {title, categories, _embedded: featured_image, content, tags} = response[0];
                const imageObj = featured_image["wp:featuredmedia"][0];
                
                this.title = title.rendered;
                this.body = content.rendered;
                this.image = imageObj.media_details.sizes["detail-thumbnail"].source_url || imageObj.source_url;

                this.getCategoryById(categories[0]);
                
                tags.forEach(async tag_id => {
                    const response = await APINews.getTagInfoById(tag_id);
                    this.tags = [...this.tags, {
                        id: response.id,
                        name: response.name,
                        slug: `/tag/${response.slug}`
                    }];
                });
            } catch(err) {
                console.log(err)
            }
        },

        async getCategoryById(id) {
            try {
                const response = await APINews.getCategoryById(id);
                this.category = {
                    id: response.id,
                    link: `/${response.slug}`,
                    name: response.name
                }
            } catch(err) {
                console.log(err)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";
@import "@/assets/scss/_mixins.scss";

.post-detail {
    &__category {
        @include main-font;
        font-size: 16px;
        text-transform: uppercase;
    }

    &__date {
        opacity: 0.7;
        font-weight: 600;
        color: $white;
        margin-bottom: 20px;
    }

    &__image {
        margin: 0 0 40px;
        position: relative;
        padding-bottom: 50%;
        @include flex-center;
        
        &-img {
            width: 100%;
            height: auto;
        }
    }
    
    &__video-play {
        background-color: $fucsia;
        height: 80px;
        width: 80px;
        @include flex-center;
        position: absolute;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        svg {
            width: 46px;
            height: 46px;
        }

        &:hover {
            background-color: $fucsia_h;
        }
    }

    &__tags {
        display: flex;
    }

    &__tag-item {
        padding: 5px 10px;
        margin: 0 5px 0 0;
        text-transform: capitalize;
        text-transform: uppercase;
        @include main-font;
        background-color: rgba($fucsia, 0.05);
        border-radius: 4px;
        display: block;
        font-size: 13px;
        transition: all .2s ease-in-out;

        &:hover {
            background-color: rgba($fucsia, 0.1);
        }
    }
}
</style>