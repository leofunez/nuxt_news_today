<template>
    <article class="post-count">
        <span class="post-count__index" v-text="number"></span>
        <h2 class="post-count__title">
            <nuxt-link :to="link" v-text="title"></nuxt-link>
        </h2>
        <nuxt-link :to="link">
            <figure class="post-count__image" :style="{background: 'url('+ thumbnail +') no-repeat center / cover'}"></figure>
        </nuxt-link>
    </article>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";

.post-count {
    display: grid;
    grid-template-columns: 30px 1fr 100px;
    
    &:not(:last-of-type) {
        margin-bottom: 30px;
    }

    &__index {
        font-size: 40px;
        font-family: oswald, sans-serif;
        font-weight: 800;
        text-align: right;
        line-height: 1;
        color: $dark;
        opacity: 0.2;
        left: 0;

        .dark-mode & {
            color: $white;
        }
    }

    &__category {
        grid-column: 2;
    }

    &__title {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
        padding: 4px 10px 0 10px;

        a {
            color: $dark;

            .dark-mode & {
                color: $white;
            }
        }
    }

    &__image {
        margin: 0;
        height: 80px;
        border-radius: 4px;
    }

    @media screen and (min-width: 768px) {
        &__index {
            font-size: 50px;
        }

        &__title {
            font-size: 16px;
            font-weight: 700;
        }
    }
}
</style>