/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// const api = 'https://us-central1-mynimation-panel.cloudfunctions.net/app/api'
const api = 'http://localhost:5001/mynimation-panel/us-central1/app/api'

export default new Vuex.Store({
  state: {
    categories: [],
    movies: [],
    studios: [],
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload
    },
    setMovies(state, payload) {
      state.movies = payload
    },
    setStudios(state, payload) {
      state.studios = payload
    },
  },
  actions: {
    // Categories
    async getCategories({ commit }) {
      const categories = []
      await axios.get(`${api}/categories`)
        .then(res => {
          res.data.forEach(category => {
            categories.push(category)
          })
          commit('setCategories', categories)
        })
    },
    async addCategory({ commit }, data) {
      await axios.post(`${api}/categories`, {
        name: data.name,
        description: data.description,
      })
        .catch(error => {
          console.log(error)
        })
    },
    async editCategory({ commit }, data) {
      await axios.put(`${api}/categories/${data.id}`, {
        name: data.name,
        description: data.description,
      })
        .catch(error => {
          console.log(error)
        })
    },
    async deleteCategory({ commit }, data) {
      await axios.delete(`${api}/categories/${data.id}`)
    },

    // Movies
    async getMovies({ commit }) {
      const movies = []
      await axios.get(`${api}/movies`)
        .then(res => {
          res.data.forEach(movie => {
            movies.push(movie)
          })
          commit('setMovies', movies)
        })
    },
    async addMovie({ commit }, data) {
      await axios.post(`${api}/movies`, {
        name: data.name,
        description: data.description,
        category: data.category,
        studio: data.studio,
        url: data.url,
        img: data.img
      })
        .catch(error => {
          console.log(error)
        })
    },
    async editMovie({ commit }, data) {
      await axios.put(`${api}/movies/${data.id}`, {
        name: data.name,
        description: data.description,
        category: data.category,
        studio: data.studio,
        url: data.url,
        img: data.img
      })
        .catch(error => {
          console.log(error)
        })
    },
    async deleteMovie({ commit }, data) {
      await axios.delete(`${api}/movies/${data.id}`)
    },

    // Studios
    async getStudios({ commit }) {
      const studios = []
      await axios.get(`${api}/studios`)
        .then(res => {
          res.data.forEach(studio => {
            studios.push(studio)
          })
          commit('setStudios', studios)
        })
    },
    async addStudio({ commit }, data) {
      await axios.post(`${api}/studios`, {
        name: data.name,
        description: data.description,
      })
        .catch(error => {
          console.log(error)
        })
    },
    async editStudio({ commit }, data) {
      await axios.put(`${api}/studios/${data.id}`, {
        name: data.name,
        description: data.description,
      })
        .catch(error => {
          console.log(error)
        })
    },
    async deleteStudio({ commit }, data) {
      await axios.delete(`${api}/studios/${data.id}`)
    },
  },
  modules: {},
})
