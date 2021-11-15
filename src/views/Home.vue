<template>
  <div class="page">
    <header class="head">
      <Search></Search>

      <button class="cart-button" type="button" v-on:mouseover="showCart">
        Корзина
      </button>

      <template v-if="isVisibleCart">
        <Cart v-bind:isvisiblecart="isVisibleCart" v-on:show-cart="showCart">
        </Cart>
      </template>
    </header>

    <GoodsList></GoodsList>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import GoodsList from "../components/GoodsList.vue";
import Cart from "../components/Cart.vue";

export default {
  components: {
    Search,
    GoodsList,
    Cart,
  },
  data() {
    return {
      isVisibleCart: false,
    };
  },

  methods: {
    showCart() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },

  mounted() {
    this.$store.dispatch("loadGoods"), this.$store.dispatch("loadCart");
  },
};
</script>
