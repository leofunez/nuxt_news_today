<template>
    <h2 class="section-title" v-text="text"></h2>
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

.section-title {
    text-transform: uppercase;
    color: $fucsia;
    font-size: 28px;
    margin-bottom: 20px;

    @media screen and (min-width: 480px) {
        .section-title {
            font-size: 34px;
        }
    }

    @media screen and (min-width: 768px) {
        .section-title {
            font-size: 40px;
        }
    }
}
</style>