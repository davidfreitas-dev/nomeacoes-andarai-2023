import { ref } from 'vue';
import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

export const usePositionsStore = defineStore('positions', () => {
  const positions = ref([]);

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

  return { 
    positions, 
    getPositions 
  };
});