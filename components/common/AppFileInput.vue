<script setup lang="ts">
const props = defineProps<{
  label: string;
  accept: string[];
  maxSizeInMb: number;
  modelValue: File | undefined;
}>();

const emit =
  defineEmits<(e: "update:modelValue", value: File | undefined) => void>();

const { files, open, onChange, reset } = useFileDialog({
  multiple: false,
  accept: props.accept.join(","),
});

onChange((files) => {
  resetFile();

  if (!files || files.length === 0) return;

  const file = files.item(0)!;

  if (!props.accept.includes(file.type))
    fileValidation.value.invalidFileType = true;

  if (file.size > 1024 * 1024 * props.maxSizeInMb) {
    fileValidation.value.fileSizeExceeded = true;
  }

  if (isFileValid.value) {
    emit("update:modelValue", file);
  }
});

const fileValidation = ref({
  invalidFileType: false,
  fileSizeExceeded: false,
});

const resetFile = () => {
  fileValidation.value.invalidFileType = false;
  fileValidation.value.fileSizeExceeded = false;
  emit("update:modelValue", undefined);
};

const isFileValid = computed(() => {
  return (
    !fileValidation.value.invalidFileType &&
    !fileValidation.value.fileSizeExceeded
  );
});
</script>

<template>
  <div class="app-file-input">
    <label @click="open()" class="file-input">
      {{ label }}
    </label>
    <ul v-if="files" class="text-sm">
      <li v-for="file in files" :key="file.name">
        {{ file.name }}
      </li>
    </ul>
    <label class="validation-label" v-if="fileValidation.invalidFileType"
      >Allowed file types: {{ accept.join(", ") }}</label
    >
    <label class="validation-label" v-if="fileValidation.fileSizeExceeded"
      >Maximum file size: {{ maxSizeInMb }} MB</label
    >
  </div>
</template>

<style lang="scss" scoped>
.file-input {
  @apply block mt-10 cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500;
}
.validation-label {
  @apply block text-xs text-red-500 mt-1;
}
</style>
