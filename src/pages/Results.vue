<template>
  <div class="cards flex flex-wrap gap-3 p-4">
    <template
      v-for="position in positions"
      :key="position.id"
    >
      <div class="card flex-1 shrink basis-24 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {{ position.name }}
        </h5>
        <p
          v-for="option in getResults(position)"
          :key="option.id"
          class="mb-3 font-normal text-gray-700"
        >
          {{ option.name }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

const positions  = ref([]);

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

  positions.value = data.sort((a, b) => a.name.localeCompare(b.name));
};

onMounted(() => {
  getPositions();
});

const getResults = (position) => {
  const q = query(collection(db, 'votes'), where('idposition', '==', position.id));
  
  onSnapshot(q, (querySnapshot) => {
    const votes = [];

    querySnapshot.forEach((doc) => {
      votes.push({
        ...{ id: doc.id },
        ...doc.data()
      });
    });

    const counts = {};

    const results = [];

    votes.forEach((obj) => {
      const idoption = obj.idoption;

      if (counts[idoption]) {
        counts[idoption] += 1;
      } else {
        counts[idoption] = 1;
      }
    });

    votes.forEach((obj) => {
      const idoption = obj.idoption;

      if (counts[idoption] > 0) {
        results.push({
          idoption: idoption,
          name: obj.option,
          count: counts[idoption]
        });

        counts[idoption] = 0;
      }
    });
    
    console.log('Resultado', results);    
  });

  return [];
};
</script>