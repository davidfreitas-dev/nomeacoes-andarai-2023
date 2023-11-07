<template>
  <h1 class="text-2xl text-zinc-700 text-center font-bold p-10">
    Bem-Vindo!
  </h1>

  <div
    v-if="positionsStore.positions.length"
    class="flex flex-col gap-2 px-4"
  >
    <span
      v-for="(position, index) in positionsStore.positions"
      :key="index"
    >
      {{ position.name }}
    </span>
  </div>
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
