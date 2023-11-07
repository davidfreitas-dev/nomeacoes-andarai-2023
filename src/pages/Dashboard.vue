<template>
  <h1 class="text-2xl text-zinc-700 font-bold p-4">
    Cargos
  </h1>

  <div
    v-if="positionsStore.positions.length"
    class="flex flex-col gap-2 px-4"
  >
    <template
      v-for="position in positionsStore.positions"
      :key="position.id"
    >
      <span @click="selectPosition(position.id)">
        {{ position.name }}
      </span>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePositionsStore } from '@/stores/positions';

const router = useRouter();
const positionsStore = usePositionsStore();
const isLoading = ref(true);

onMounted(async () => {
  await positionsStore.getPositions();  
  isLoading.value = false;
});

const selectPosition = (idposition) => {
  router.push('/position/' + idposition);
};
</script>