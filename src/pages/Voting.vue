<template>
  <div class="p-4">
    <BackButton />
  
    <Header :title="`Votação ${position.name}`" />

    <div
      v-if="position.options && position.options.length"
      class="options flex flex-1 flex-col items-start w-full gap-3 p-4"
    >
      <template
        v-for="option in position.options"
        :key="option.id"
      >
        <div
          class="option flex items-center gap-2 px-5 w-full h-14 rounded-xl transition-colors text-dark bg-gray-100"
          :class="{ 'text-blue-700 bg-blue-100': option.selected }"
          @click="selectOption(option.id)"
        >
          <svg
            v-if="option.selected"
            class="w-6 h-6 text-blue-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>

          <span
            v-else
            class="h-5 w-5 mr-1 border-2 border-secondary-light rounded-full"
          />

          <label class="ml-2 text-sm font-semibold">
            {{ option.name }}
          </label>
        </div>
      </template>
    </div>

    <div class="p-4">
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