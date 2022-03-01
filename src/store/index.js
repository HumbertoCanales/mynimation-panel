/* eslint-disable no-unused-vars */
import { db } from '@/utils/firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api = 'http://localhost:5000/mynimation-panel/us-central1/app/api'

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
      await db.collection('categories').get()
        .then(res => {
          res.forEach(doc => {
            console.log(doc.id)
            console.log(doc.data())
            const category = doc.data()
            category.id = doc.id
            categories.push(category)
          })
          commit('setCategories', categories)
        })
    },
    async addCategory({ commit }, data) {
      await db.collection('categories').add({
        name: data.name,
        description: data.description,
      })
    },
    async editCategory({ commit }, data) {
      await db.collection('categories').doc(data.id).update({
        name: data.name,
        description: data.description,
      })
    },
    async deleteCategory({ commit }, data) {
      await db.collection('categories').doc(data.id).delete()
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
      })
        .catch(error => {
          console.log(error)
        })
    },
    async editMovie({ commit }, data) {
      await axios.put(`${api}/movies/${data.id}`, {
        name: data.name,
        description: data.description,
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
