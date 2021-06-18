<template>
    <article class="post-card" :class="type && `post-card--${type}`">
        <nuxt-link :to="link" class="post-card__thumbnail">
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";
@import "@/assets/scss/_mixins.scss";

.post-card {
    &__thumbnail {
        position: relative;
        padding-bottom: 50%;
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
        height: 50px;
        width: 50px;
        background: url("../assets/images/play_white.svg") no-repeat center / 14px $dark;
        z-index: 1;
        right: 0;
        bottom: 0;
    }

    &__info {
        position: relative;
        padding: 15px 15px 0;
    }

    &__category {
        @include main-font;
        font-weight: 500;
        font-size: 12px;
        color: $fucsia;
        position: absolute;
        background-color: $white;
        text-transform: uppercase;
        letter-spacing: 0.2px;
        left: 0;
        top: -32px;
        padding: 10px 15px 8px 15px;
    }

    &__title {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.4;
        letter-spacing: -0.3px;
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
        }
    }

    &__desc {
        margin: 0;
    }

    // Featured
        &--featured {
            &-main {
                .post-card {
                    &__title {
                        font-size: 40px;
                        line-height: 1.2;
                        font-weight: 400;
                    }

                    &__play-button {
                        height: 60px;
                        width: 60px;
                        background-size: 18px;
                    }
                }
            }
            
            &-list {
                .post-card {
                    &__thumbnail {
                        padding-bottom: 115%;
                    }

                    &__title {
                        font-weight: 400;
                        letter-spacing: 0.2px;
                    }
                }
            }

            .post-card {
                &__category {
                    background-color: $dark;
                    color: $white;
                    padding-bottom: 10px;
                    top: -34px;
                    letter-spacing: .2px;
                }

                &__title {
                    a {
                        color: $white;
                    }
                }

                &__play-button {
                    background-color: $fucsia;
                }
            }
        }
    // .Featured

    // Medium
        &--medium {
            .post-card {
                &__category {
                    font-size: 11px;
                }

                &__title {
                    font-size: 16px;
                }

                &__play-button {
                    height: 40px;
                    width: 40px;
                    background-size: 12px;
                }
            }
        }
    // .Medium

    // Small
        &--small {
            display: grid;
            grid-template-columns: repeat(2, 50%);
            grid-gap: 15px;
            align-items: start;

            .post-card {
                &__thumbnail {
                    &-bg {
                        &:hover {
                            transform: scale(1);
                        }
                    }
                }
                
                &__info {
                    padding: 0;
                }

                &__category {
                    padding: 0;
                    position: relative;
                    top: 0;
                    font-size: 12px;
                    text-transform: none;
                    margin-bottom: 4px;
                    display: block;
                }
                
                &__title {
                    font-size: 12px;
                    height: 52px;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    letter-spacing: -.1px;
                }

                &__play-button {
                    height: 30px;
                    width: 30px;
                    background-size: 8px;
                }
            }
        }
    // .Small
}
</style>