<template>
    <section class="error-page" :class="'error-page__'+errorCode">
        <h1 class="error-page__title" v-text="'Error '+errorCode"></h1>
        
        <div class="error-page__image"></div>
        
        <p class="error-page__description" v-text="'It looks like nothing was found at this location. Maybe try a search?'"></p>
    </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ["error"],
    
    data(){
        return{
            errorCode: this.error.statusCode || ""
        }
    },

    created() {
        setTimeout(() => this.SET_IS_LOADING(false), 500);
        console.log(this.error.statusCode)
    },

    methods: {
        ...mapActions(["SET_IS_LOADING"]),
    }
};
</script>

<style lang="scss" scoped>
.error-page {
    display: grid;
    justify-content: center;
    text-align: center;
    padding: 60px 0 0;

    &__404 {
        
    }

    &__title {
        display: none;
        font-size: 0;
        color: transparent;
    }

    &__image {
        background-position: center;
        background-size: 100% auto;
        background-repeat: no-repeat;

        .error-page__404 & {
            background-image: url("../assets/images/404.svg");
            padding-bottom: 60%;
        }
    }

    &__description {
        font-weight: 600;
        font-size: 16px;
        letter-spacing: -.5px;
        margin: 20px 0;
    }

    .search-form {
        max-width: 500px;
        margin: 0 auto;
    }

    @media screen and (min-width: 480px) {
        &__description {
            font-size: 20px;
            margin-top: 60px;
        }
    }
}
</style>