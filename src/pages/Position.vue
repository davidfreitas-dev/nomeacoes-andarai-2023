<template>
  <Header :title="position.name" />
  
  <form class="px-4">
    <div class="flex items-center gap-3">
      <Input
        v-model="candidate"
        placeholder="Nome do candidato"
        :on-keyup-enter="insert"
      />
    
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      <div class="flex items-center justify-between">
        <span>{{ option.name }}</span>

        <button
          class="p-2"
          @click="remove(option.id)"
        >
          <svg
            class="w-4 h-4 text-red-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import Header from '@/components/Header.vue';
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
    id: getRandomId(),
    name: candidate.value,
  });

  candidate.value = '';

  const docRef = doc(db, 'positions', idposition.value);

  await updateDoc(docRef, {
    options: position.value.options
  });
};

const remove = async (idoption) => {
  position.value.options = position.value.options.filter(option => option.id != idoption);

  const docRef = doc(db, 'positions', idposition.value);

  await updateDoc(docRef, {
    options: position.value.options
  });
};

const getRandomId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  const hash = Math.random().toString(36).substring(2);
  return `${timestamp}${random}${hash}`;
};
</script>