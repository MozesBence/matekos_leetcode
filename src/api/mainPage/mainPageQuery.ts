import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { type Ref, ref, watch, onMounted } from 'vue';

// Fetch function to get the RollBack token count
const getRollBackTokenCount = async (userId: Number) => {
  console.log("Fetching rollback tokens for userId:", userId);
  try {
    const response = await axios.get('/api/userdata/wayBackTokens', {
      params: { userId },
    });
    console.log('RollBack token count:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching RollBack tokens:', error);
    throw error;
  }
};

// Custom hook to use the query
export const UsegetRollBackTokenCount = (userId: Ref<Number | null>) => {
  // Make sure the userId is set before triggering the query
  return useQuery({
    queryKey: ['rollBackTokenCount', userId.value],
    queryFn: () => {
      if (userId.value !== null) {
        return getRollBackTokenCount(userId.value);
      } else {
        // Return an empty or default value if userId is null
        return Promise.resolve({}); // Return an empty object or appropriate default value
      }
    },
    enabled: !!userId.value, // Only fetch if userId is available
  });
};
