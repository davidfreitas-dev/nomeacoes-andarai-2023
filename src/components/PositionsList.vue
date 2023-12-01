<template>
  <div
    v-if="positions.length"
    class="flex flex-col h-screen gap-3 py-3 dark:bg-background"
  >
    <template
      v-for="position in positions"
      :key="position.id"
    >
      <router-link
        :to="`/voting/${position.id}`"
        class="flex justify-between items-center pb-3.5 text-lg cursor-pointer border-b dark:border-zinc-900"
      >
        <span>
          {{ position.name }} 

          <span v-if="votes.length">
            (Votos {{ getPositionsVotesCount(position.id) }})
          </span>
        </span>

        <ChevronRightIcon class="w-5 h-5 text-gray-400" />
      </router-link>
    </template>
  </div>

  <div
    v-else
    class="text-center text-lg text-gray-400"
  >
    Não há cargos cadastrados
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

const props = defineProps({
  positions: {
    type: Array,
    default: () => [],
    required: true
  }
});

const votes = ref([]);

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

const getPositionsVotesCount = (idposition) => {
  return votes.value.filter(vote => vote.idposition === idposition).length;
};

onMounted(async () => {
  await getVotes();
});
</script>