<template>
    <button class="button button__load-more" v-text="text"></button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";
@import "@/assets/scss/_mixins.scss";

.button {
    background-color: $fucsia;
    border: 0;
    color: $white;
    @include main-font;
    text-transform: uppercase;
    cursor: pointer;
    padding: 15px 30px 13px;

    &:hover {
        background-color: $fucsia_h;            
    }

    &--loading {
        cursor: default;
        color: transparent;
        background: url("../assets/images/spinner.svg") no-repeat center / 20px $fucsia_h;
    }

    &--hidden {
        opacity: 0;
        visibility: hidden;
    }
}
</style>