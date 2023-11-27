<script setup lang="ts">
import Product from "~/types/product";

const emptyProduct = {
  title: "",
  description: "",
  price: 0,
  image: "",
};
const product = ref<Product>(emptyProduct);
const file = ref<File>();
const isSaving = ref(false);

const saveButtonEnabled = computed(() => {
  return (
    product.value.title !== "" &&
    product.value.description !== "" &&
    product.value.price > 0 &&
    file.value
  );
});

const submit = async () => {
  isSaving.value = true;

  const formData = new FormData();
  formData.append("file", file.value!);

  const { data: imgUrl, error: error1 } = await useFetch("/api/files", {
    method: "POST",
    body: formData,
  });

  if (error1.value) {
    alert(error1.value?.data.message);
    isSaving.value = false;
    return;
  }

  product.value.image = imgUrl.value;

  const { error: error2 } = await useFetch("/api/products", {
    method: "POST",
    body: product,
  });

  if (error2.value) {
    alert(error2.value?.data.message);
    isSaving.value = false;
    return;
  }

  isSaving.value = false;
  alert("Successful");
};
</script>
<template>
  <AppLoader v-if="isSaving"></AppLoader>
  <div class="new-product">
    <div class="form">
      <h1 class="mb-14 font-semibold">Add new product</h1>
      <form class="space-y-8" @submit.prevent="submit">
        <div>
          <label for="title" class="block mb-3">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            class="form-input"
            v-model="product.title"
          />
        </div>

        <div>
          <label for="description" class="block mb-3">Description</label>
          <textarea
            id="description"
            name="description"
            type="text"
            rows="3"
            class="form-input resize-none"
            v-model="product.description"
          />
        </div>

        <div>
          <label for="price" class="block mb-3">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            class="form-input"
            v-model="product.price"
          />
        </div>

        <AppFileInput
          label="Select product image"
          :accept="['image/png']"
          v-model="file"
          :max-size-in-mb="1"
        />

        <div class="flex justify-center">
          <button :disabled="!saveButtonEnabled" class="form-button">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.new-product {
  @apply h-full flex justify-center items-center;

  .form {
    @apply border rounded shadow p-10 sm:w-9/12 md:w-3/5 lg:w-5/12 xl:w-1/3 2xl:w-1/3;

    &-input {
      @apply block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600;
    }

    &-button {
      @apply mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-20;
    }
  }
}
</style>
