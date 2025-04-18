import axios from "axios";
import { useMutation, useQuery } from '@tanstack/vue-query';
import queryClient from "@/lib/queryClient";
import { renderSlot, type Ref } from "vue";
import axiosClient from "@/lib/axios";



// Fetching Completion Rates
const fetchCompletionRates = async () => {
  try {
    const response = await axios.get('/api/task_solution/tasks/task-completion-rates');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCompletionRates = () => {
  return useQuery({
    queryFn: fetchCompletionRates,
    queryKey:['completionRates']
  });
};

// Fetching Task State
const fetchTaskState = async (id:Ref<number | null, number | null>) => {
  try {
    const response = await axios.get(`/api/task_solution/taskState/${id.value}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Hook to fetch task state based on task ID
export const useTaskState = (id: Ref<number | null, number | null>) => {
  return useQuery({
    queryKey: ['taskState', id.value],
    queryFn: () => fetchTaskState(id),
    enabled:false
  });
};



// Fetching Solved Task Rates
const fetchSolvedTaskRates = async (id: Ref<number | null, number | null>) => {
  try {
    const response = await axios.get(`/api/task_solution/solved-tasks-rate/${id.value}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useSolvedTaskRates = (id: Ref<number | null, number | null>) => {
  return useQuery({
    queryKey:['userId',id],
    queryFn: ()=> fetchSolvedTaskRates(id),
    enabled:false
  });
};

const fetchAllTaskCount = async (filters: { difficulty: string | null; state: string | null; themes: string; search: string; userId: number; offset: number }) => {
 try {
    const filteredParams = NonEmptyFilters(filters);

    const response = await axios.get("/api/tasks/taskCount", {
      params: filteredParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useAllTaskCount = (filters: Ref<{ difficulty: string | null; state: string | null; themes: string; search: string; userId: number; offset: number }>) => {
  return useQuery({
    queryFn: () => fetchAllTaskCount(filters.value),
    queryKey: ['tasksCount', NonEmptyFilters(filters.value)],
  });
};

// Fetching Random Task
const fetchRandomTask = async () => {
  try {
    const response = await axios.get(`/api/tasks/random-task`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useRandomTask = () => {
  return useQuery({
    queryFn: fetchRandomTask,
    queryKey:['randomTaskId'],
    enabled: false,
  });
};


// Fetching Specific Task by Day
const fetchSpecificTask = async (day: Ref<string>) => {
  try {
    const response = await axios.get(`/api/daily_tasks/get-daily-task/${day.value}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useSpecificTask = (day: Ref<string>) => {
  return useQuery({
    queryFn: () => fetchSpecificTask(day),
    queryKey: ["specificDay",day],
    enabled:false,
  });
};


const fetchCardsByThemes = async (themeIds: Ref<string[]>) => {
  try {
    const themesPath = themeIds.value.length > 0 ? themeIds.value.join(';') : 'all';
    const response = await axios.get(`/api/tasks/filter-task-by-themes/${themesPath}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCardsByThemes = (themeIds:  Ref<string[]>) => {
  return useQuery({
    queryFn: () => fetchCardsByThemes(themeIds),
    queryKey: ['filteredByThemes', themeIds.value.join(';')], 
    enabled:false,
  });
};


const fetchCards = async (filters: Ref<{ difficulty: string | null; state: string | null; themes: string; search: string; userId: number; offset: number }>) => {
  try {
    const filteredParams = NonEmptyFilters(filters.value);
    const response = await axios.get("/api/tasks/filteredTasks", {
      params: filteredParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

function NonEmptyFilters(filters: { difficulty: string | null; state: string | null; themes: string; search: string; userId: number; offset: number }) {
  const nonEmptyFilters: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(filters)) {
    if (typeof value === "string" && value.trim().length > 0) {
      nonEmptyFilters[key] = value;
    } else if (typeof value === "number" && !isNaN(value)) {
      nonEmptyFilters[key] = value;
    }
  }

  return nonEmptyFilters;
}

export const UseFetchCards = (filters: Ref<{ difficulty: string | null; state: string | null; themes: string; search: string; userId: number; offset: number }>) => {
  return useQuery({
    queryFn: () => fetchCards(filters),
    queryKey: ['tasks', NonEmptyFilters(filters.value)],
  });
};



const getSimilarCards = async (task_id: Number,themeid: Number) => {
  try{
    const response = await axios.get(`/api/tasks/getsimilarTasks`,{params:{
        taskId:task_id,themeId:themeid
    }});
    return response.data;
  }catch(error){
    throw error;
  }
}

export const UseGetSimilarCards = (task_id: Ref<Number>,themeid: Ref<Number>) => {
  return useQuery({
    queryFn: () => getSimilarCards(task_id.value,themeid.value),
    queryKey:['similarTasks'],

  })
}


const CheckIfDailyTask = async (taskid:Number) => {
  try{
    const response = await axios.get(`/api/daily_tasks/checkIfDailyTask/${taskid}`)
    return response.data;
  }catch(error){
    throw error;
  }
}

export const UseCheckIfDailyTask = (taskId:Number) => {
  return useQuery({
    queryFn: ()=> CheckIfDailyTask(taskId),
    queryKey:['DailyTaskCheck',taskId],
  })
}

const GetSolution = async (id:Number)=> {
  try{
    const response = await axios.get(`/api/tasks/solution/${id}`)
    return response.data;
  }catch(error){
    throw error;
  }
}

export const UseGetSolution = (id:Number) => {
  return useQuery({
    queryFn: () => GetSolution(id),
    queryKey:['solution'],
  })

}

const getSpecificTaskData = async (taskId:Ref<Number | null>) => {
  try{
    const response = await axios.get(`/api/tasks/get-one-card/${taskId.value}`);
    return response.data
  }catch(error){
    throw error;
  }
}

export const UseGetSpecificTaskData = (taskId:Ref<Number | null>) => {
  return useQuery({
    queryFn: () => getSpecificTaskData(taskId),
    queryKey:['specTask',taskId.value],
  })
}