<template>
    <nav class="menu" :class="{'menu--header': isHeader, 'menu--header--active': isHeader && isOpen}">
        <nuxt-link v-for="(item, index) in items" v-text="item.title" :key="`${index}-${item.url}`" :to="item.url" class="menu__item" :class="{'menu__item--dark' : isDark}"></nuxt-link>
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
    justify-content: center;
    padding: 0;
    margin: 0;

    &__item {
        position: relative;
        padding: 10px 25px;
        color: $white;
        font-size: 14px;
        font-weight: 700;
        transition: all 0.2s ease-in-out;

        &--dark {
            color: $dark;
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
    @media screen and (max-width: 1000px) {
        .dark-mode & {
            background-color: $darkest;
            box-shadow: 0 0 24px $darkest;

            .menu__item {
                color: $white;

                &:hover {
                    color: $fucsia;
                }
            }
        }
        
        &--header {
            position: fixed;
            right: -200px;
            top: 80px;
            width: 200px;
            z-index: 1;
            background-color: $white;
            box-shadow: 0 0 24px rgba($dark, 0.3);
            padding: 15px 0;
            transition: all 0.2s ease-in-out;
            flex-direction: column;

            &--active {
                right: 0;
            }

            .menu {
                &__item {
                    text-align: right;
                    padding: 15px 40px;
                    display: block;
                    color: $dark;

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
    }

    @media screen and (max-width: 480px) {
        flex-direction: column;

        &-item {
            a {
                font-size: 12px;
            }
        }
    }
    // **** .MEDIA **** //
}

</style>