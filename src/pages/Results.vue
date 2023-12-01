<template>
  <div class="flex flex-col h-screen p-4 text-base dark:bg-background dark:text-white">
    <div class="cards flex flex-wrap gap-3">
      <template
        v-for="position in positions"
        :key="position.id"
      >
        <div
          v-if="getResults(position).length"
          class="card flex-1 shrink basis-24 max-w-sm p-4 md:p-6 bg-white border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white rounded-lg shadow"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight">
            {{ position.name }}
          </h5>
          <template
            v-for="option in getResults(position)"
            :key="option.id"
          >
            <div class="flex items-center justify-between">
              <p class="font-normal text-gray-600 dark:text-gray-400">
                {{ option.name }}
              </p>

              <p class="font-normal dark:text-white">
                {{ option.count }}
              </p>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
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

const votes  = ref([]);

const getVotes = async () => {
  let data = [];

  const querySnapshot = await getDocs(collection(db, 'votes'));

  querySnapshot.forEach(doc => {
    const votes = {
      ...{ id: doc.id },
      ...doc.data()
    };

    data.push(votes);
  });

  votes.value = data;
};

const loadData = () => {
  getPositions();
  getVotes();
};

onMounted(() => {
  loadData();
  setInterval(() => {
    loadData();
  }, 10000);
});

const getResults = (position) => {
  const filteredVotes = votes.value.filter(vote => vote.idposition === position.id);
  const counts = {};
  const results = [];

  filteredVotes.forEach((obj) => {
    const idoption = obj.idoption;

    if (counts[idoption]) {
      counts[idoption] += 1;
    } else {
      counts[idoption] = 1;
    }
  });

  filteredVotes.forEach((obj) => {
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
  
  return results.sort((a, b) => b.count - a.count);
};
</script>