<script setup lang="ts">
defineProps<{
  imgSrc: string | null;
  imgAlt?: string;
}>();

// imlement if image is null
</script>

<template>
  <div class="app-card">
    <img class="app-card-img" :src="imgSrc!" :alt="imgAlt" />
    <div class="app-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.app-card {
  @apply rounded shadow-lg border;

  &-img {
    @apply object-cover object-center w-full h-[55%];
  }

  &-body {
    @apply p-6 h-[45%];

    > :first-child {
      @apply h-full;
    }
  }
}
</style>
