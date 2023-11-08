<template>
  <div class="flex flex-col p-4 gap-3">
    <button
      v-if="route.path != '/'"
      @click="handleBack"
    >
      <svg
        class="w-6 h-6 text-gray-800"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 5H1m0 0 4 4M1 5l4-4"
        />
      </svg>
    </button>
    
    <h1 class="text-2xl text-zinc-700 font-bold">
      {{ title }}
    </h1>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});

const route = useRoute();
const router = useRouter();

const handleBack = () => {
  router.go(-1);
};
</script>