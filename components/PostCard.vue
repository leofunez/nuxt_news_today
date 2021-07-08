<template>
    <article class="post-card" :class="type && `post-card--${type}`">
        <nuxt-link :to="link" class="post-card__thumbnail">
            <div class="post-card__play-button" v-if="video_field"></div>
            <figure class="post-card__thumbnail-bg" :style="{background: 'url('+ thumbnail +') no-repeat center / cover'}"></figure>
        </nuxt-link>

        <div class='post-card__info'>
            <nuxt-link class='post-card__category' :to="category_slug" v-text="category" v-if="category && category_slug"></nuxt-link>
            <h2 class='post-card__title'>
                <nuxt-link :to="link" v-text="title"></nuxt-link>
            </h2>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        link: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        type: {
            type: String
        },
        category: {
            type: String
        },
        category_slug: {
            type: String
        },
        video_field: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";
@import "@/assets/scss/_mixins.scss";

.post-card {
    display: grid;
    grid-template-columns: [photo]35% [info]1fr;
    grid-gap: 15px;
    align-items: center;

    &__thumbnail {
        position: relative;
        padding-bottom: 70%;
        height: 0;
        display: block;
        overflow: hidden;

        &-bg {
            margin: 0;
            position: absolute;
            height: 100%;
            width: 100%;
            transform: scale(1);
            transition: all 0.2s ease-in-out;

            &:hover {
                transform: scale(1.05);
            }
        }
    }

    &__play-button {
        position: absolute;
        height: 30px;
        width: 30px;
        background: url("../assets/images/play_white.svg") no-repeat center / 10px $dark;
        z-index: 1;
        right: 0;
        bottom: 0;

        .dark-mode & {
            background-color: $fucsia;
        }
    }

    &__info {
        position: relative;
    }

    &__category {
        @include main-font;
        font-weight: 500;
        font-size: 10px;
        color: $fucsia;
        position: relative;
        background-color: $white;
        text-transform: uppercase;
        letter-spacing: 0.2px;
        margin-bottom: 5px;
        display: block;

        .dark-mode & {
            background-color: $darkest;
        }
    }

    &__title {
        font-size: 14px;
        line-height: 1.3;
        font-weight: 400;
        letter-spacing: -0.05px;
        text-transform: uppercase;

        a {
            color: $dark;
            transition: all 0.2s ease-in-out;

            background-image: linear-gradient(to right, $fucsia 0%, $fucsia 100%);
            background-size: 0% 3px;
            background-position: 0px 95%;
            transition: background-size 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
            background-repeat: no-repeat;

            &:hover {
                background-size: 100% 3px;
            }

            .dark-mode & {
                color: $white;
            }
        }
    }

    &__desc {
        margin: 0;
    }

    &--featured {
        display: block;

        .post-card {
            &__thumbnail {
                padding-bottom: 50%;
            }

            &__info {
                padding: 15px 0 0;
            }
            
            &__category {
                padding-left: 0;
                padding-bottom: 5px;
            }

            &__title {
                font-size: 16px;
                letter-spacing: normal;
                font-weight: 500;
            }

            &__play-button {
                height: 40px;
                width: 40px;
                background-size: 12px;
            }
        }

        &-main {
            .post-card {
                &__title {
                    font-size: 18px;
                }
            }
        }
    }
    
    // **** MEDIA **** //
    @media screen and (min-width: 480px) {
        &--featured {
            .post-card {
                &__category {
                    padding: 10px 15px 8px;
                    font-size: 12px;
                    position: absolute;
                    left: 0;
                    top: -34px;
                }

                &__info {
                    padding: 15px 15px 0;
                }
            }
            
            &-main {
                .post-card {
                    &__title {
                        font-size: 25px;
                        line-height: 1.2;
                        font-weight: 500;
                    }
                }
            }
            
            &-list {
                .post-card {
                    &__title {
                        font-size: 20px;
                    }
                }
            }
        }

        &--small {
            .post-card {
                &__title {
                    font-size: 12px;
                    font-weight: 700;
                }
            }
        }
    }

    @media screen and (min-width: 580px) {
        &__title {
            font-weight: 500;
        }

        &:is(.post-card--medium) {
            display: block;
            
            .post-card {
                &__thumbnail {
                    padding-bottom: 50%;
                }

                &__play-button {
                    height: 40px;
                    width: 40px;
                    background-size: 12px;
                }

                &__info {
                    padding: 15px 15px 0;
                }

                &__title {
                    font-size: 16px;
                }

                &__category {
                    padding: 10px 15px 8px;
                    font-size: 12px;
                    position: absolute;
                    left: 0;
                    top: -34px;
                }
            }
        }
    }

    @media screen and (min-width: 680px) {
        &--featured {
            &-main {
                grid-column: 1/-1;
                grid-row: main-post;

                .post-card {
                    &__title {
                        font-size: 35px;
                    }

                    &__play-button {
                        height: 60px;
                        width: 60px;
                        background-size: 18px;
                    }
                }
            }

            &-list {
                grid-row: list-posts;
            }
        }
    }

    @media screen and (min-width: 1000px) {
        &--featured {
            grid-row: 1;

            .post-card {
                &__title {
                    a {
                        color: $white;
                    }
                }

                &__category {
                    background-color: $dark;
                    color: $white;
                }

                &__play-button {
                    background-color: $fucsia;
                }
            }

            &-main {
                grid-column: 1;
            }

            &-list {
                grid-column: 2;

                &:last-of-type {
                    grid-column: 3;
                }

                .post-card {
                    &__thumbnail {
                        padding-bottom: 115%;
                    }
                }
            }
        }
    }
    // **** .MEDIA **** //
}
</style>