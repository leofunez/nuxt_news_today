<template>
    <div class="loader"></div>
</template>

<style lang="scss" scoped>
    @import "@/assets/scss/_colors.scss";
    
    .loader {
        background: url("../assets/images/spinner_red.svg") no-repeat center / 30px rgba($darkest, 0.95);
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 3;

        @media screen and (min-width: 480px) {
            background-size: 35px;
        }

        @media screen and (min-width: 780px) {
            background-size: 45px;
        }
    }
</style>