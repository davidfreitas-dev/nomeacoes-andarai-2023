<template>
  <div class="flex items-center gap-3 my-3">
    <div class="flex items-center w-full h-[52px] px-4 rounded-lg text-zinc-700 dark:text-gray-300 border-2 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 ring-green-600 focus-within:ring-2">
      <input
        type="text"
        class="flex-1 text-font text-base placeholder:text-gray-500 bg-transparent outline-none"
        :value="modelValue"
        :placeholder="placeholder"
        @input="updateValue"
        @keyup.enter="$emit('onKeyupEnter')"
      >
    </div>
  
    <button
      type="button"
      class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm p-3.5 text-center inline-flex items-center"
      :disabled="!modelValue"
      @click="emit('handleInsert')"
    >
      <svg
        class="w-5 h-5"
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
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
      <span class="sr-only">Icon description</span>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'onKeyupEnter', 'handleInsert']);

const props = defineProps({
  placeholder: { 
    type: String, 
    default: '' 
  },
  modelValue: { 
    type: [ String, Number ], 
    default: null 
  }
});

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>