<script setup lang="ts">
import Product from "~/types/product";
const props = defineProps<{ product: Product }>();

const price = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.product.price);
});
</script>

<template>
  <AppCard :img-src="product.image">
    <div class="flex flex-col">
      <div class="font-bold text-xl mb-2">
        {{ product.title }}
      </div>
      <p class="text-base line-clamp-3">{{ product.description }}</p>
      <div class="font-semibold text-xl mt-auto">{{ price }}</div>
    </div>
  </AppCard>
</template>
