<template>
  <h1 class="text-2xl text-zinc-700 font-bold p-4">
    Cargos
  </h1>

  <div
    v-if="positions.length"
    class="flex flex-col gap-2 px-4"
  >
    <template
      v-for="position in positions"
      :key="position.id"
    >
      <span @click="selectPosition(position.id)">
        {{ position.name }}
      </span>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

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

  positions.value = data;
};

onMounted(() => {
  getPositions();
});

const selectPosition = (idposition) => {
  router.push('/position/' + idposition);
};
</script>