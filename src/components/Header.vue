<template>
  <h1 class="my-3 font-bold text-3xl dark:text-white">
    {{ title }}
  </h1>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>