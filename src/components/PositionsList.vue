<template>
  <div
    v-if="positions.length"
    class="flex flex-col h-screen gap-3 py-3 dark:bg-background"
  >
    <template
      v-for="position in positions"
      :key="position.id"
    >
      <router-link
        :to="`/voting/${position.id}`"
        class="flex justify-between items-center pb-3.5 text-lg cursor-pointer border-b dark:border-zinc-900"
      >
        <span>{{ position.name }}</span>

        <ChevronRightIcon class="w-5 h-5 text-gray-400" />
      </router-link>
    </template>
  </div>

  <div
    v-else
    class="text-center text-lg text-gray-400"
  >
    Não há cargos cadastrados
  </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  positions: {
    type: Array,
    default: () => [],
    required: true
  }
});
</script>