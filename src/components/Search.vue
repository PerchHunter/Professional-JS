<template>
  <form action="#" method="get">
    <input
      class="header_search"
      placeholder="Искать здесь..."
      type="text"
      v-model="searchLine"
    />
    <button type="submit" class="button_search" v-on:click="onClick">
      Поиск
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchLine: "",
    };
  },
  methods: {
    onClick() {
      this.$store.dispatch("search", this.searchLine);
    },
  },
};
</script>