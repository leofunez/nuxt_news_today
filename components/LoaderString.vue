<template>
    <div class="loading-string" v-text="text"></div>
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
    .loading-string {
        text-align: center;
        font-weight: 600;
    }
</style>