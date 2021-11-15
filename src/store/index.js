import { json } from 'express';
import Vue from 'vue'
import Vuex from 'vuex'

const API_URL = 'http://127.0.0.1:8080';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: [],
    filteredGoods: [],
    cartList: [],
    sumPrice: 0,
  },
  getters: {
    goods: (state) => state.filteredGoods,
    cart: (state) => state.cartList,
  },
  mutations: {
    loadGoods: (state, payload) => {
      console.log(payload)
      state.goodsList = payload;
      state.filteredGoods = payload;
    },
    loadingCart: (state, payload) => {
      state.cartList = payload;
    },
    add: (state, product) => {
      state.cartList.push(product);
    },
    remove: (state, product) => {
      const index = state.cartList.findIndex((item) => item.id_product === product.id_product);
      state.cartList.splice(index, 1);
    },
    filter: (state, payload) => {
      state.filteredGoods = payload;
    },
    cartPrice(state) {
      state.sumPrice = 0;

      for (let item of state.cartList) {
        state.sumPrice += item.price;
      }
    },
  },
  actions: {
    loadGoods({ commit }) {
      fetch(`${API_URL}/catalogData`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          commit('loadGoods', data);
        })
    },

    loadCart({ commit }) {
      fetch(`${API_URL}/getBasket`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('loadingCart', data);
          commit('cartPrice');
        })
    },

    deleteFromCart(product) {
      fetch(`${API_URL}/deleteFromBasket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(product),
      })
      // .then(() => {
      //   this.$root.loadCart();
      // })
    },

    addToCart(product) {
      fetch(`${API_URL}/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(product),
      })
      // .then(() => {
      //   this.$root.loadCart();
      // });
    },

    search({ commit, state }, searchString) {
      const regex = new RegExp(searchString, 'i');
      commit('filter', state.goods.filter((good) => regex.test(good.product_name)))
    },
  }
})
