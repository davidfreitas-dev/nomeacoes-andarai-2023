<template>
  <h1 class="text-2xl text-zinc-700 text-center font-bold p-10">
    Bem-Vindo!
  </h1>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePositionsStore } from '@/stores/positions';

const positionsStore = usePositionsStore();

const isLoading = ref(true);

onMounted(async () => {
  await positionsStore.getPositions();
  
  isLoading.value = false;
});
</script>
