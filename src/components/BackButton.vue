<template>
  <button
    type="button"
    class="py-2 pr-2"
    @click="router.go(-1)"
  >
    <svg
      class="w-6 h-6"
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
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>