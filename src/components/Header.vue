<template>
  <h1 class="text-2xl text-gray-900 font-bold my-3">
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