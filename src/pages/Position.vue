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
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 text-red-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
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