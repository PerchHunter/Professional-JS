<template>
  <div class="goods-list" v-bind="list">
    <template v-if="list.length > 0">
      <GoodCard
        v-for="product of list"
        v-bind:key="product.id_product"
        v-bind:title="product.product_name"
        v-bind:price="product.price"
        v-on:add="onAdd(product)"
      ></GoodCard>
    </template>
    <template v-else>
      <p class="goods_notification">Товаров с таким совпадением не найдено</p>
    </template>
  </div>
</template>

<script>
import GoodCard from "./GoodCard.vue";

export default {
  components: {
    GoodCard, //GoodCard: Goodcard,
  },
  computed: {
    list() {
      return this.$store.getters.goods;
    },
  },
  methods: {
    onAdd(product) {
      this.$store.dispatch("addToCart", product);
    },
  },
};
</script>


