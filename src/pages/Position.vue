<template>
  <h1 class="text-2xl text-zinc-700 font-bold p-4">
    {{ position.name }}
  </h1>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePositionsStore } from '@/stores/positions';

const route = useRoute();
const positionsStore = usePositionsStore();
const position = ref({});

const getPosition = () => {
  position.value = positionsStore.positions.find(position => position.id === route.params.id);
};

onMounted(() => {
  getPosition();
  console.log('Position: ', position.value);
});
</script>