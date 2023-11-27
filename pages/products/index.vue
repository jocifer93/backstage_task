<script setup lang="ts">
const {
  data: products,
  pending,
  error,
} = await useFetch("/api/products", {
  lazy: true,
  server: false,
});

watch(error, () => {
  if (error.value) alert(error.value?.data.message);
});
</script>

<template>
  <AppLoader v-if="pending"></AppLoader>
  <div class="products" v-if="products">
    <h1 class="title">Products</h1>
    <div class="list">
      <ProductCard
        class="item"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<style scoped>
.products {
  @apply container mx-auto p-10 sm:p-8;

  .title {
    @apply text-6xl mb-14 font-semibold;
  }

  .list {
    @apply grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5;

    .item {
      @apply h-[26rem] cursor-pointer hover:scale-105 transition duration-150;
    }
  }
}
</style>
