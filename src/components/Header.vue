<template>
  <h1 class="text-2xl text-zinc-700 font-bold">
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