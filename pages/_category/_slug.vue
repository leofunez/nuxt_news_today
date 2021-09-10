<template>
<!-- **** POST DETAIL **** -->
    <section class="post-detail">
        <div class="post-detail__wrapper">
            <div class="post-detail__content">
                <div class="post-detail__top">
                    <nuxt-link class="post-detail__category" v-if="category.name && category.link" :to="category.link" v-text="category.name"></nuxt-link>
                    
                    <h1 class="post-detail__title" v-text="title"></h1>

                    <time class="post-detail__date" v-text="date" v-if="date"></time>

                    <div class="social-sharing">
                        <a href="" class="social-sharing__facebook" target="_blank" title="Facebook"></a>
                        <a href="https://twitter.com/intent/tweet?url=<?php print esc_url(get_permalink()); ?>" rel="noopener" class="social-sharing__twitter" target="_blank" title="Twitter"></a>
                        <a href="whatsapp://send?text=<?php the_title(); ?>" data-action="share/whatsapp/share" class="social-sharing__whatsapp" target="_blank" title="Whatsapp"></a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>&summary=<?php the_excerpt(); ?>&source=News" class="social-sharing__linkedin" target="_blank" title="Linkedin"></a>
                    </div>
                </div>

                <figure class="post-detail__image" v-if="image">
                    <iframe class="video-embed__iframe" :src="'//www.youtube.com/embed/' + getVideoEmbedId(video_field)" frameborder="0" allowfullscreen v-if="video_field && video_visible"></iframe>
                    <div class="post-detail__video-play video-embed" :data-video="video_field" v-if="video_field" @click="playVideo"></div>
                    <img :src="image" :alt="title">
                </figure>

                <div class="post-detail__body">
                    <div v-html="body" v-if="body"></div>
                    
                    <div class="post-detail__tags" v-if="tags">
                        <nuxt-link class="post-detail__tag-item" v-for="(tag, index) in tags" :to="`${tag.slug}`" :key="`${tag.slug}-${index}`" v-text="tag.name"></nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <RelatedPosts :category="category.id" v-if="category.id" />
    </section>
<!-- **** POST DETAIL **** -->
</template>

<script>
import { mapActions } from "vuex";
import { APP_TITLE } from "@/constants";
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
            description: "",
            body: "",
            date: "",
            image: "",
            category: {},
            tags: [],
            video_field: "",
            video_visible: false
        }
    },

    head() {
        return {
            title: `${APP_TITLE} | ${this.title}`,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.description
                }
            ]
        }
    },

    created() {
        this.getPost();
    },

    methods: {
        ...mapActions(["SET_IS_LOADING"]),

        getPostDate(date) {
            const postDate = new Date(date);
            const dateYear = postDate.getFullYear();
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const dateMonth = monthNames[postDate.getMonth() + 1];
            const dateDay = postDate.getDay();

            return `${dateMonth} ${dateDay}, ${dateYear}`;
        },

        async getPost() {
            try {
                const response = await APINews.getPost(this.slug);
                const {title, categories, _embedded, content, date, ACF} = response[0];
                const imageObj = _embedded["wp:featuredmedia"][0];
                const tagsObj = _embedded["wp:term"][1];

                this.title = title.rendered;
                this.body = content.rendered;
                this.image = imageObj.media_details.sizes["detail-thumbnail"].source_url || imageObj.source_url;
                this.date = this.getPostDate(date);
                this.video_field = ACF?.video_url;

                this.getCategoryById(categories[0]);
                
                tagsObj.forEach(async tag => {
                    this.tags = [...this.tags, {
                        id: tag.id,
                        name: tag.name,
                        slug: `/tag/${tag.slug}`
                    }];
                });

                setTimeout(() => this.SET_IS_LOADING(false), 500);
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
        },
        
        getVideoEmbedId(video_url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = video_url.match(regExp);

            return (match && match[2].length === 11) ? match[2] : null;
        },

        playVideo() {
            this.video_visible = true;
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_colors.scss";
@import "@/assets/scss/_mixins.scss";

.post-detail {
    margin-bottom: 100px;

    &__wrapper {
        max-width: 1280px;
        margin: 0 auto;
    }

    &__top {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 900px;
        margin: 40px auto 20px;
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

        div {
            > p {
                &:first-of-type::first-letter{
                    color: $fucsia;
                    float: left;
                    font-size: 60px;
                    line-height: 40px;
                    margin: 10px 10px 0 0;
                    font-weight: 700;
                    border: 2px solid $dark;
                    padding: 10px;

                    .dark-mode & {
                        border-color: $white;
                    }
                }
            }
        }
    }

    &__category {
        @include main-font;
        font-size: 16px;
        text-transform: uppercase;
    }

    &__date {
        opacity: 0.7;
        font-weight: 600;
        color: $dark;
        margin-bottom: 20px;

        .dark-mode & {
            color: $white;
        }
    }

    &__image {
        margin: 0 0 20px;
        position: relative;
        @include flex-center;
        display: flex;
        justify-content: center;
        align-items: center;
        
        img {
            width: 100%;
            background-color: $white;
            min-height: 300px;
            height: auto;
            z-index: 1;

            .dark-mode & {
                background-color: $dark;
            }
        }

        &:after {
            content: "";
            box-shadow: 0 0 10px rgba($darkest, 0.4), 0 20px 20px rgba($darkest, 0.7);
            bottom: 17px;
            width: 80%;
            height: 20px;
            border-radius: 50%;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
    
    &__video-play {
        background: url("../../assets/images/play_white.svg") no-repeat center / 16px $fucsia;
        height: 50px;
        width: 50px;
        @include flex-center;
        position: absolute;
        z-index: 2;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

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

        .dark-mode & {
            background-color: rgba($fucsia, 0.2);

            &:hover {
                background-color: rgba($fucsia, 0.3);
            }
        }
    }

    // Social Sharing
        .social-sharing {
            @include flex-center;

            a {
                cursor: pointer;
                display: block;
                height: 40px;
                width: 40px;
                margin: 0 5px;
                background-size: 22px;
                background-position: center;
                background-repeat: no-repeat;
                transition: all .2s ease-in-out;

                &:hover {
                    filter: invert(100%) saturate(0%);
                }
            }

            &__facebook {
                background-image: url("../../assets/images/social/facebook.svg");
            }
            &__twitter {
                background-image: url("../../assets/images/social/twitter.svg");
            }
            &__whatsapp {
                background-image: url("../../assets/images/social/whatsapp.svg");
            }
            &__linkedin {
                background-image: url("../../assets/images/social/linkedin.svg");
            }
        }
    // .Social Sharing
    
    // **** MEDIA **** //
     @media screen and (min-width: 480px) {
        &__category {
            font-size: 14px;
        }

        &__video-play {
            width: 50px;
            height: 50px;
        }

        &__title {
            font-size: 35px;
            letter-spacing: -1.5px;
            margin: 10px 0;
        }

        &__image {
            margin-bottom: 40px;
        }
    }

    @media screen and (min-width: 768px) {
        &__top {
            margin-bottom: 40px;
        }

        &__title {
            font-size: 45px;
            letter-spacing: -2px;
        }

        &__video-play {
            width: 80px;
            height: 80px;
            background-size: 26px;
        }

        &__image {
            &:after {
                bottom: 8px;
            }
        }
        
        &__body {
            p {
                font-size: 16px;
                line-height: 1.8;
            }
        }
    }

    @media screen and (min-width: 1000px) {
        margin-top: 60px;

        &__title {
            font-size: 65px;
            letter-spacing: -2.5px;
            color: $white;
            margin-bottom: 40px;
        }

        &__date {
            color: $white;
        }
    }
    // **** .MEDIA **** //
}
</style>