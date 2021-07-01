<template>
    <nav class="menu" :class="{'menu--header': isHeader, 'menu--header--active': isHeader && isOpen}">
        <nuxt-link v-for="(item, index) in items" v-text="item.title" :key="`${index}-${item.url}`" :to="item.url" class="menu__item" :class="{'menu__item--is-dark' : isDark}"></nuxt-link>
    </nav>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        },
        isDark: {
            type: Boolean,
            required: false,
            default: false
        },
        isHeader: {
            type: Boolean,
            required: false,
            default: false
        },
        isOpen: {
            type: Boolean,
            required: false,
            default: false
        }
    }    
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";

.menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    margin: 0;
    
    &--header {
        position: fixed;
        right: -200px;
        top: 80px;
        width: 200px;
        z-index: 1;
        background-color: $white;
        box-shadow: 0 0 24px rgba($dark, 0.3);
        padding: 15px 0;
        transition: right 0.2s ease-in-out;
        flex-direction: column;

        .dark-mode & {
            background-color: $darkest;
            box-shadow: 0 0 24px $darkest;
        }

        &--active {
            right: 0;
        }

        .menu {
            &__item {
                text-align: right;
                padding: 15px 40px;
                display: block;
                color: $dark;

                .dark-mode & {
                    color: $white;
                    
                    &:hover {
                        color: $fucsia;
                    }
                }

                &.nuxt-link-exact-active {
                    &:after {
                        left: auto;
                        right: 20px;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                    }
                }
            }
        }
    }  

    &__item {
        position: relative;
        padding: 10px 25px;
        color: $white;
        font-size: 14px;
        font-weight: 700;
        transition: all 0.2s ease-in-out;

        a {
            font-size: 12px;
        }

        .dark-mode & {
            color: $white;
        }

        &:hover {
            color: $fucsia;
        }

        &.nuxt-link-exact-active {
            &:after {
                content: "";
                position: absolute;
                background-color: $fucsia;
                border-radius: 50%;
                height: 4px;
                width: 4px;
                left: calc(50% - 2px);
                bottom: -5px;
            }
        }
    }

    // **** MEDIA **** //
    @media screen and (min-width: 1000px) {
        position: relative;
        right: 0;
        top: 0;
        width: 100%;
        box-shadow: none;
        flex-direction: row;
        transition: none;

        &--header {
            flex-direction: row;
            background-color: transparent;

            .dark-mode & {
                box-shadow: none;
                background-color: transparent;
            }

            .menu {
                &__item {
                    padding: 10px 25px;
                    font-size: 14px;
                    
                    &--is-dark {
                        color: $white;
                    }

                    &.nuxt-link-exact-active {
                        &:after {
                            left: calc(50% - 2px);
                            right: auto;
                            bottom: -30px;
                        }
                    }
                }
            }
        }
    }
    // **** .MEDIA **** //
}

</style>