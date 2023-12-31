<template>
  <div class="flex flex-col h-screen p-4 text-base dark:bg-background dark:text-white">
    <BackButton />
  
    <Header :title="position.name" />
  
    <Input
      v-model="candidate"
      placeholder="Nome do candidato"
      @on-keyup-enter="insert"
      @handle-insert="insert"
    />

    <SkeletonList v-if="isLoading" />

    <div
      v-if="!isLoading && position.options && position.options.length"
      class="flex flex-col h-screen gap-3 py-3 dark:bg-background"
    >
      <template
        v-for="option in position.options"
        :key="option.id"
      >
        <div class="flex justify-between items-center pb-3.5 text-lg border-b dark:border-zinc-900">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import BackButton from '@/components/BackButton.vue';
import Header from '@/components/Header.vue';
import Input from '@/components/Input.vue';
import SkeletonList from '@/components/SkeletonList.vue';

const route = useRoute();
const position = ref({});
const idposition = ref(route.params.id);
const isLoading = ref(true);

const getPosition = async () => { 
  const docRef = doc(db, 'positions', idposition.value);
  const docSnap = await getDoc(docRef);
  position.value = docSnap.data(); 
  isLoading.value = false;
};

onMounted(() => {
  getPosition();
});

const candidate = ref('');

const insert = async () => {
  position.value.options.push({
    id: getRandomId(),
    name: candidate.value,
  });

  candidate.value = '';

  const docRef = doc(db, 'positions', idposition.value);

  await updateDoc(docRef, {
    options: position.value.options.sort((a, b) => a.name.localeCompare(b.name))
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