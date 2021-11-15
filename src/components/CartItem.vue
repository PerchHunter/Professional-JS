<template>
  <div class="cart-item">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price }} $</p>
    <button class="btn_delete_cart" v-on:click="onRemove">
      Удалить из корзины
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    onRemove() {
      this.$store.dispatch("deleteFromCart", this.product);
    },
  },
};
</script>