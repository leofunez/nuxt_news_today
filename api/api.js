import axios from 'axios'

const api = axios.create({
  baseURL: '/wp-json/wp/v2/'
})

export default {
  // Menu
  async getHeaderMenu() {
    const res = await api.get('menu-header')
    return res.data
  },

  async getFooterMenu() {
    const res = await api.get('menu-footer')
    return res.data
  },

  // Home
  async getHomePosts() {
    const res = await api.get('posts', { params: { per_page: 43, _embed: true } })
    return res.data
  },

  async getTendingPosts() {
    const res = await api.get('posts', { params: { per_page: 9, _embed: true } })
    return res.data
  },

  // Category
  async getCategoryInfo(slug) {
    const res = await api.get('categories', { params: { slug } })
    return res.data
  },

  async getCategoryById(id) {
    const res = await api.get(`categories/${id}`)
    return res.data
  },

  async getCategoryPosts(id, per_page) {
    const res = await api.get('posts', { params: { categories: id, per_page, _embed: true } })
    return res.data
  },

  // Tag
  async getTagInfo(slug) {
    const res = await api.get('tags', { params: { slug } })
    return res.data
  },

  async getTagInfoById(id) {
    const res = await api.get(`tags/${id}`)
    return res.data
  },

  async getTagPosts(id, per_page) {
    const res = await api.get('posts', { params: { tag: id, per_page, _embed: true } })
    return res.data
  },

  // Post
  async getPost(slug) {
    const res = await api.get('posts', { params: { slug, _embed: true } })
    return res.data
  },

  // Page
  async getPage(slug) {
    const res = await api.get('pages', { params: { slug, _embed: true } })
    return res.data
  },

  // Search
  async getSearchPosts(query) {
    const res = await api.get('posts', { params: { search: query, per_page: 10, _embed: true } })
    return res.data
  }
}