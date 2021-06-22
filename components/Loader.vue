<template>
    <div class="loader"></div>
</template>

<style lang="scss" scoped>
    @import "@/assets/scss/_colors.scss";
    
    .loader {
        background-color: rgba($white, 0.7);
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 3;
    }
</style>