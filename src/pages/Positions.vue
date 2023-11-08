<template>
  <Header title="Cargos" />

  <form class="px-4">
    <div class="flex items-center gap-3">
      <Input
        v-model="department"
        placeholder="Nome do cargo"
        :on-keyup-enter="insert"
      />
    
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        :disabled="!department"
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
    v-if="positions.length"
    class="flex flex-col gap-2 p-4"
  >
    <template
      v-for="position in positions"
      :key="position.id"
    >
      <div class="flex items-center justify-between">
        <span @click="selectPosition(position.id)">
          {{ position.name }}
        </span>

        <button
          class="p-2"
          @click="remove(position.id)"
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
import { useRouter } from 'vue-router';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import Header from '@/components/Header.vue';
import Input from '@/components/Input.vue';

const router = useRouter();
const positions  = ref([]);
const department  = ref('');

const getPositions = async () => {
  let data = [];

  const querySnapshot = await getDocs(collection(db, 'positions'));

  querySnapshot.forEach(doc => {
    const position = {
      ...{ id: doc.id },
      ...doc.data()
    };

    data.push(position);
  });

  positions.value = data;
};

onMounted(() => {
  getPositions();
});

const insert = async () => {
  const docRef = doc(collection(db, 'positions'));

  setDoc(docRef, {
    name: department.value,
    options: []
  });

  department.value = '';

  getPositions();
};

const remove = async (idoption) => {
  await deleteDoc(doc(db, 'positions', idoption));
  getPositions();
};

const selectPosition = (idposition) => {
  router.push('/positions/' + idposition);
};
</script>