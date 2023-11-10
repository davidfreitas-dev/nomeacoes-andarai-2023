<template>
  <div
    role="status"
    class="max-w-md space-y-4 divide-y divide-gray-200 animate-pulse dark:divide-zinc-800 md:p-6 dark:border-zinc-800"
  >
    <div
      v-for="(n, index) in 10"
      :key="index"
      class="flex items-center justify-between pt-6"
    >
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-zinc-800 w-40" />
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-zinc-800 w-12" />
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>