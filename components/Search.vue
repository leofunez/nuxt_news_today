<template>
    <h1>Search form</h1>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_colors.scss";

.search {
    &-form {
        position: relative;
        width: 100%;

        .screen-reader-text {
            display: none;
        }
    }

    &-field {
        width: 100%;
        border-radius: 4px;
        padding: 10px 50px 10px 15px;
        border: 2px solid rgba($dark, 0.2);

        .dark-mode & {
            background-color: $darker;
            color: $white;
        }
    }

    &-submit {
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