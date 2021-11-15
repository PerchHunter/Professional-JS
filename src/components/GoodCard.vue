<template>
  <div class="goods-item">
    <h3>{{ title }}</h3>
    <p>{{ price }} $</p>
    <button class="btn_add_card" v-on:click="$emit('add')">
      Добавить в корзину
    </button>
  </div>
</template>

<script>
export default {
  name: "GoodCard",
  props: {
    title: String,
    price: Number,
  },
};
</script>