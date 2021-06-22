export const state = () =>({
    is_loading: true
});

export const getters = {
    GET_IS_LOADING: (state) => state.is_loading
};

export const actions = {
    SET_IS_LOADING(context, data) {
        context.commit("set_is_loading", data)
    }
};

export const mutations = {
    set_is_loading(state, data) {
        state.is_loading = data
    }
};