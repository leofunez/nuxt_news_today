<template>
    <button class="dark-mode-trigger" :class="{'dark-mode-trigger--is-light' : isLight, 'dark-mode-trigger--is-on' : isOn}" @click="activateDarkMode"></button>
</template>

<script>
import {mapActions} from "vuex";
export default {
    props: {
        isLight: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            isOn: false
        }
    },

    methods: {
        ...mapActions(["SET_DARK_MODE"]),

        activateDarkMode() {
            this.SET_DARK_MODE(!this.isOn);
            this.isOn = !this.isOn;
            const $bodyApp = document.querySelector("body");
            if ($bodyApp.classList.contains("dark-mode")) {
                $bodyApp.classList.remove("dark-mode");
            } else {
                $bodyApp.classList.add("dark-mode");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.dark-mode-trigger {
    cursor: pointer;
    border: 0;
    height: 35px;
    width: 35px;
    background: url("../assets/images/dark_mode_off.svg") no-repeat center / 22px;

    &--is-light {
        background-image: url("../assets/images/dark_mode_off_dark.svg");
    }

    &--is-on {
        background-image: url("../assets/images/dark_mode_on.svg");
    }

    @media screen and (max-width: 1000px) {
        &:not(.dark-mode-trigger--is-on) {
            background-image: url("../assets/images/dark_mode_off_dark.svg");
        }
    }
}
</style>