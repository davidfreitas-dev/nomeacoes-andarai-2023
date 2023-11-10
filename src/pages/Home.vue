<template>
  <div class="flex flex-col h-screen p-4 text-base dark:bg-background dark:text-white">
    <Header title="Cargos" />

    <SkeletonList v-if="isLoading" />

    <PositionsList
      v-else
      :positions="positions"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import Header from '@/components/Header.vue';
import SkeletonList from '@/components/SkeletonList.vue';
import PositionsList from '@/components/PositionsList.vue';

const positions  = ref([]);
const isLoading  = ref(true);

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

  isLoading.value = false;
};

onMounted(() => {
  getPositions();
});
</script>