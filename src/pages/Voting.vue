<template>
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
    <button
      type="button"
      class="w-full h-12 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2"
      :disabled="isLoading"
      @click="handleConfirm"
    >
      <svg
        v-if="isLoading"
        aria-hidden="true"
        role="status"
        class="inline w-5 h-5 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      
      <span v-else>
        Confirmar voto
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import Header from '@/components/Header.vue';

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