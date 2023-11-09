<template>
  <div class="p-4">
    <Header title="Cargos" />

    <div
      v-if="positions.length"
      class="flex flex-col gap-3 py-3"
    >
      <template
        v-for="position in positions"
        :key="position.id"
      >
        <div
          class="flex justify-between items-center border-b pb-2"
          @click="selectPosition(position.id)"
        >
          {{ position.name }}

          <svg
            class="w-3 h-3 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import Header from '@/components/Header.vue';

const router = useRouter();
const positions  = ref([]);

const getPositions = async () => {
  let data = [];

  const querySnapshot = await getDocs(collection(db, 'positions'));

  querySnapshot.forEach(doc => {
    const product = {
      ...{ id: doc.id },
      ...doc.data()
    };

    data.push(product);
  });

  positions.value = data.sort((a, b) => a.name.localeCompare(b.name));
};

onMounted(() => {
  getPositions();
});

const selectPosition = (idposition) => {
  router.push('/voting/' + idposition);
};
</script>