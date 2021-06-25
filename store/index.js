export const state = () =>({
    is_loading: true,
    dark_mode: false
});

export const getters = {
    GET_IS_LOADING: (state) => state.is_loading,
    GET_DARK_MODE: (state) => state.dark_mode
};

export const actions = {
    SET_IS_LOADING(context, data) {
        context.commit("set_is_loading", data)
    },
    SET_DARK_MODE(context, data) {
        context.commit("set_dark_mode", data)
    }
};

export const mutations = {
    set_is_loading(state, data) {
        state.is_loading = data
    },
    set_dark_mode(state, data) {
        state.dark_mode = data
    }
};