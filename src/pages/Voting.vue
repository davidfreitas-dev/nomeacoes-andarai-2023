<template>
  <div class="flex flex-col h-screen p-4 text-base dark:bg-background dark:text-white">
    <BackButton />
  
    <Header :title="`Votação ${position.name}`" />

    <div
      v-if="position.options && position.options.length"
      class="options flex flex-col h-screen w-full gap-4 py-3 text-gray-600 dark:text-white"
    >
      <template
        v-for="option in position.options"
        :key="option.id"
      >
        <div
          class="option flex items-center gap-1 px-5 w-full h-16 rounded-lg transition-colors cursor-pointer bg-gray-100 dark:bg-zinc-900"
          :class="{ 'text-green-600 bg-green-100 dark:bg-green-300 dark:bg-opacity-10': option.selected }"
          @click="selectOption(option.id)"
        >
          <svg
            v-if="option.selected"
            class="w-6 h-6 text-green-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>

          <span
            v-else
            class="h-5 w-5 mr-1 rounded-full border-2 border-gray-300 dark:border-zinc-700"
          />

          <label class="ml-2 font-semibold text-base">
            {{ option.name }}
          </label>
        </div>
      </template>

      <Button @handle-click="handleConfirm" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import BackButton from '@/components/BackButton.vue';
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';

const route = useRoute();
const router = useRouter();
const position = ref({});
const idposition = ref(route.params.id);
const isLoading = ref(false);

const getPosition = async () => { 
  const docRef = doc(db, 'positions', idposition.value);
  const docSnap = await getDoc(docRef);
  position.value = {
    ...{ id: idposition.value },
    ...docSnap.data()
  };
};

onMounted(async () => {
  await getPosition();
  console.log('Position: ', position.value);
});

const selectOption = (idoption) => {
  const indexOption = position.value.options.findIndex(option => option.id === idoption);

  position.value.options.forEach(option => {
    option.selected = false;
  });

  position.value.options[indexOption].selected = true;
};

const handleConfirm = async () => {
  const selectedOption = position.value.options.find(option => option.selected === true);

  if (!selectedOption) return;
  
  isLoading.value = true;

  const docRef = doc(collection(db, 'votes'));

  await setDoc(docRef, {
    idposition: position.value.id,
    idoption: selectedOption.id,
    option: selectedOption.name
  });

  isLoading.value = false;

  router.push('/');
};
</script>