<template>
  <div class="cart_list" v-on:mouseleave="$emit('show-cart')">
    <template v-if="cart.length > 0">
      <CartItem
        v-for="product of cart"
        v-bind:key="product.id_product"
        v-bind:product="product"
        v-bind:id="product.id_product"
      ></CartItem>
      <div class="sum_price_cart">Общая стоимость: {{ sumPrice }} $</div>
    </template>

    <template v-else>
      <p class="cart_notification">Ваша корзина пуста</p>
    </template>
  </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";

export default {
  components: {
    CartItem,
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
  },
  methods: {
    showCart() {
      this.$store.commit("hideCart");
    },
    sumPrice() {
      commit("cartPrice");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>