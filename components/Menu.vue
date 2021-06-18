<template>
    <nav class="menu">
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

        &:hover {
            color: $fucsia;
        }
    }

    .menu {
        .current_page_item,
        .current-menu-item {
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
}
</style>