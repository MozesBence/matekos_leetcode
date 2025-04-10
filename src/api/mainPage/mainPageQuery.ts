import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { type Ref, ref, watch, onMounted } from 'vue';

const getRollBackTokenCount = async (userId: Number) => {
  try {
    const response = await axios.get('/api/userdata/wayBackTokens', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching RollBack tokens:', error);
    throw error;
  }
};

// Custom hook to use the query
export const UsegetRollBackTokenCount = (userId: Ref<Number | null>) => {
  return useQuery({
    queryKey: ['rollBackTokenCount', userId.value],
    queryFn: () => {
      if (userId.value !== null) {
        return getRollBackTokenCount(userId.value);
      } else {
        return Promise.resolve({});
      }
    },
    enabled: !!userId.value,
  });
};


const getDailyStreak = async(userId: number) => {
  try {
    const response = await axios.get('/api/task_solution/dailyTaskStreak', {
      params: { userId }
    })
    return response.data;
  } catch(error) {
    throw error;
  }
}

export const UseGetDailyStreak = (userId: Ref<number | null>) => {
  return useQuery({
    queryFn: () => {
      if(userId.value != null) {
        return getDailyStreak(userId.value)
      } else {
        return Promise.resolve({});
      }
    },
    queryKey: ['userStreak', userId.value],
    enabled: !!userId.value,
  })
}