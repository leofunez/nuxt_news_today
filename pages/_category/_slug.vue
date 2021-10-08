<template>
<!-- **** POST DETAIL **** -->
    <section class="post-detail">
        <div class="post-detail__wrapper">
            <div class="post-detail__content">
                <div class="post-detail__top">
                    <nuxt-link class="post-detail__category" v-if="category.name && category.link" :to="category.link" v-text="category.name"></nuxt-link>
                    
                    <h1 class="post-detail__title" v-text="title"></h1>
                    <p class="post-detail__description" v-text="description" v-if="description"></p>

                    <time class="post-detail__date" v-text="date" v-if="date"></time>

                    <div class="social-sharing">
                        <a href="" target="_blank" title="Facebook">
                            <IconFacebook size="40" :color="colors.fucsia" :color_hover="is_mobile ? colors.dark : colors.white" />
                        </a>
                        <a :href="`https://twitter.com/intent/tweet?url=${full_path}`" rel="noopener" target="_blank" title="Twitter">
                            <IconTwitter size="40" :color="colors.fucsia" :color_hover="is_mobile ? colors.dark : colors.white" />
                        </a>
                        <a :href="`whatsapp://send?text=${full_path}`" data-action="share/whatsapp/share" target="_blank" title="Whatsapp">
                            <IconWhatsapp size="40" :color="colors.fucsia" :color_hover="is_mobile ? colors.dark : colors.white" />
                        </a>
                        <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${full_path}&title=${title}&summary=${description}&source=News`" target="_blank" title="Linkedin">
                            <IconLinkedin size="40" :color="colors.fucsia" :color_hover="is_mobile ? colors.dark : colors.white" />
                        </a>
                    </div>
                </div>

                <figure class="post-detail__image" v-if="image">
                    <iframe class="video-embed__iframe" :src="'//www.youtube.com/embed/' + getVideoEmbedId(video_field)" frameborder="0" allowfullscreen v-if="video_field && show_video_player"></iframe>
                    <div class="post-detail__video-play video-embed" v-if="video_field" @click="playVideo"></div>
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
// Vuex
import { mapActions, mapGetters } from "vuex";

// Api
import APINews from "@/api/api";

// Constants
import { SITE_URL, APP_TITLE, COLORS } from "@/constants";

// Utils
import isMobile from "@/utils/is-mobile";

// Components
import RelatedPosts from "@/components/RelatedPosts";
import IconFacebook from "@/components/icons/Facebook";
import IconTwitter from "@/components/icons/Twitter";
import IconWhatsapp from "@/components/icons/Whatsapp";
import IconLinkedin from "@/components/icons/Linkedin";

export default {
    components: {
        RelatedPosts,
        IconFacebook,
        IconTwitter,
        IconWhatsapp,
        IconLinkedin
    },

    data() {
        return {
            slug: this.$route.params.slug,
            full_path: `${SITE_URL}${this.$route.fullPath}`,
            title: "",
            description: "",
            body: "",
            date: "",
            image: "",
            category: {},
            tags: [],
            video_field: "",
            show_video_player: false,
            colors: COLORS || {},
            is_mobile: isMobile()
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
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.title
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.description
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.image
                },
                {
                    hid: 'twitter:image:alt',
                    name: 'twitter:image:alt',
                    content: this.title
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.title
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.description
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.image
                },
                {
                    hid: 'og:image:secure_url',
                    property: 'og:image:secure_url',
                    content: this.image
                },
                {
                    hid: 'og:image:alt',
                    property: 'og:image:alt',
                    content: this.title
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
                const {
                    title, 
                    categories, 
                    _embedded, 
                    content, 
                    date, 
                    ACF: {
                        subtitle, 
                        video_url
                    }
                } = response[0];
                const imageObj = _embedded["wp:featuredmedia"][0];
                const tagsObj = _embedded["wp:term"][1];

                this.title = title.rendered;
                this.description = subtitle;
                this.body = content.rendered;
                this.image = imageObj.media_details.sizes["detail-thumbnail"].source_url || imageObj.source_url;
                this.date = this.getPostDate(date);
                this.video_field = video_url;

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
            this.show_video_player = true;
        }
    },

    computed: {
        ...mapGetters(["GET_DARK_MODE"])
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

    &__description {
        color: $dark;
        text-align: center;
        font-size: 14px;
        line-height: 1.4;
        font-weight: 600;
        margin-top: 0;

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
            }
        }
    // .Social Sharing
    
    // **** MEDIA **** //
     @media screen and (min-width: 480px) {
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
            margin-bottom: 30px;
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

            img {
                min-height: 300px;
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
            margin-bottom: 20px;
        }

        &__description {
            color: $white;
            font-size: 18px;
        }

        &__date {
            color: $white;
        }
    }
    // **** .MEDIA **** //
}
</style>