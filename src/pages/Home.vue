<template>
  <div class="p-4">
    <Header title="Cargos" />

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