<template>
  <div class="p-4">
    <div class="cards flex flex-wrap gap-3">
      <template
        v-for="position in positions"
        :key="position.id"
      >
        <div class="card flex-1 shrink basis-24 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {{ position.name }}
          </h5>
          <template
            v-for="option in getResults(position)"
            :key="option.id"
          >
            <div class="flex items-center justify-between">
              <p class="font-normal text-gray-700">
                {{ option.name }}
              </p>

              <p class="font-normal text-gray-700">
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

onMounted(() => {
  getPositions();
  getVotes();
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