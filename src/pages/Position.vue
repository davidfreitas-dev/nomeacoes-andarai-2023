<template>
  <h1 class="text-2xl text-zinc-700 font-bold p-4">
    {{ position.name }}
  </h1>


  <form class="px-4">
    <div class="flex items-center gap-3">
      <Input
        v-model="candidate"
        placeholder="Nome do candidato"
        :on-keyup-enter="insert"
      />
    
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        :disabled="!candidate"
        @click="insert"
      >
        <svg
          class="w-4 h-4"
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
  </form>

  <div
    v-if="position.options && position.options.length"
    class="flex flex-col gap-3 p-4"
  >
    <template
      v-for="option in position.options"
      :key="option.id"
    >
      <span>{{ option.name }}</span>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import Input from '@/components/Input.vue';

const route = useRoute();
const position = ref({});
const idposition = ref(route.params.id);

const getPosition = async () => { 
  const docRef = doc(db, 'positions', idposition.value);
  const docSnap = await getDoc(docRef);
  position.value = docSnap.data();
};

onMounted(async () => {
  await getPosition();
  console.log('Position: ', position.value);
});

const candidate = ref('');

const insert = async () => {
  position.value.options.unshift({
    id: position.value.options.length + 1,
    name: candidate.value,
  });

  const docRef = doc(db, 'positions', idposition.value);

  await updateDoc(docRef, {
    options: position.value.options
  });

  candidate.value = '';
};
</script>