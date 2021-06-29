<template>
    <form class="search__form" method="POST" :action="`/search?query=${input_search}`" @submit="searchPosts">
        <input class="search__input" :class="{'search__input--error' : input_error}" type="search" v-model="input_search" :placeholder="placeholder">
        <input class="search__submit" type="submit">
    </form>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            required: false,
            default: "Search..."
        }
    },

    data() {
        return {
            input_search: "",
            input_error: false
        }
    },

    methods: {
        searchPosts(e) {
            console.log(e)
            if (this.input_search) {
                this.input_error = false;
                return true;
            }
            
            this.input_error = true;
            
            e.preventDefault();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";

.search {
    &__form {
        position: relative;
        max-width: 480px;
        margin: 0 auto 40px;

        .screen-reader-text {
            display: none;
        }
    }

    &__input {
        width: 100%;
        border-radius: 4px;
        padding: 10px 50px 10px 15px;
        border: 2px solid rgba($dark, 0.2);

        .dark-mode & {
            background-color: $darker;
            color: $white;
        }


        &--error {
            border-color: rgba($red, 0.5);
        }
    }

    &__submit {
        position: absolute;
        right: 0;
        top: 0;
        background: url("../assets/images/search.svg") no-repeat center / 18px;
        border: 0;
        height: 100%;
        font-size: 0;
        width: 50px;
        opacity: 0.5;
        cursor: pointer;

        .dark-mode & {
            filter: invert(1);
        }
    }
}
</style>