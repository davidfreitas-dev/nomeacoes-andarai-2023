import { ref } from 'vue';
import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

export const usePositionsStore = defineStore('positions', () => {
  const positions = ref([]);

  const getPositions = async () => {
    const querySnapshot = await getDocs(collection(db, 'positions'));

    querySnapshot.forEach(doc => {
      const product = {
        ...{ id: doc.id },
        ...doc.data()
      };

      positions.value.push(product);
    });

    console.log('All Positions: ', positions.value);
  };

  return { 
    positions, 
    getPositions 
  };
});