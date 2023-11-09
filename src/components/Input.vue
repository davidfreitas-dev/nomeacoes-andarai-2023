<script setup>
const emit = defineEmits(['update:modelValue', 'onKeyupEnter']);

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

<template>
  <div class="flex items-center w-full h-[52px] rounded-lg px-4 text-zinc-700 bg-gray-100 ring-green-600 focus-within:ring-2">
    <input
      type="text"
      class="flex-1 text-font text-base placeholder:text-gray-400 bg-transparent outline-none"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
      @keyup.enter="$emit('onKeyupEnter')"
    >
  </div>
</template>