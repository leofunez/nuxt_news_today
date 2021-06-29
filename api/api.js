
const baseURL = `http://localhost:8888/news/wp-json/wp/v2/`;

export default ({
    // Menu
        async getHeaderMenu() {
            return await fetch(`${baseURL}menu-header`).then(async res => await res.json());
        },

        async getFooterMenu() {
            return await fetch(`${baseURL}menu-footer`).then(async res => await res.json());
        },
    // .Menu

    // Home
        async getHomePosts() {
            return await fetch(`${baseURL}posts?per_page=43&_embed`).then(async res => await res.json());
        },

        async getTendingPosts() {
            return await fetch(`${baseURL}posts?per_page=9&_embed`).then(async res => await res.json());
        },
    // .Home

    // Category
        async getCategoryInfo(slug) {
            return await fetch(`${baseURL}categories?slug=${slug}`).then(async res => await res.json());
        },

        async getCategoryById(id) {
            return await fetch(`${baseURL}categories/${id}`).then(async res => await res.json());
        },

        async getCategoryPosts(id, per_page) {
            const perPage = per_page ? `&per_page=${per_page}` : "";
            return await fetch(`${baseURL}posts?categories=${id}${perPage}&_embed`).then(async res => await res.json());
        },
    // .Category

    // Tag
        async getTagInfo(slug) {
            return await fetch(`${baseURL}tags/?slug=${slug}`).then(async res => await res.json());
        },

        async getTagInfoById(id) {
            return await fetch(`${baseURL}tags/${id}`).then(async res => await res.json());
        },

        async getTagPosts(id, per_page) {
            const perPage = per_page ? `&per_page=${per_page}` : "";
            return await fetch(`${baseURL}posts?tag=${id}${perPage}&_embed`).then(async res => await res.json());
        },
    // .Tag

    // Post
        async getPost(slug) {
            return await fetch(`${baseURL}posts?slug=${slug}&_embed`).then(async res => await res.json());
        },
    // .Post

    // Page
        async getPage(slug) {
            return await fetch(`${baseURL}pages?slug=${slug}&_embed`).then(async res => await res.json());
        },
    // .Page

    // Search
        async getSearchPosts(query) {
            return await fetch(`${baseURL}posts?search=${query}&per_page=2&_embed`).then(async res => await res.json());
        }
    // .Search
});