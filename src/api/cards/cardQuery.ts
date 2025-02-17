import axios from "axios";
import { useMutation, useQuery } from '@tanstack/vue-query';
import queryClient from "@/lib/queryClient";

//OSSZES MUTATET query-re atirni

// Fetching Cards
const fetchCards = async (offset:number) => {
  try {
    const response = await axios.get(`/api/tasks/get-cards-info/${offset}`);
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching cards: ${error}`);
  }
};

export const useCards = () => {
  return useQuery({
    queryFn: (offset: number) => fetchCards(offset),
    queryKey:['cards'],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching card data:', error);
    }
  });
};

// Fetching Completion Rates
const fetchCompletionRates = async () => {
  try {
    const response = await axios.get('/api/task_solution/tasks/task-completion-rates');
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching completion rates: ${error}`);
  }
};

export const useCompletionRates = () => {
  return useQuery({
    queryFn: fetchCompletionRates,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching completion rates:', error);
    }
  });
};

// Fetching Task State
const fetchTaskState = async (id) => {
  try {
    const response = await axios.get(`/api/task_solution/taskState/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching task state:', error);
  }
};

export const useTaskState = () => {
  return useQuery({
    queryFn: fetchTaskState,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task state:', error);
    }
  });
};

// Fetching Solved Task Rates
const fetchSolvedTaskRates = async (id) => {
  try {
    const response = await axios.get(`/api/task_solution/solved-tasks-rate/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching solved task rates:', error);
  }
};

export const useSolvedTaskRates = () => {
  return useQuery({
    queryFn: fetchSolvedTaskRates,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching solved task rates:', error);
    }
  });
};

const fetchAllTaskCount = async () => {
  try {
    const response = await axios.get(`/api/tasks/taskCount`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching all task count:', error);
    throw error;
  }
};

export const useAllTaskCount = () => {
  return useQuery({
    queryKey: ['allTaskCount'], // Make sure this is an array
    queryFn: fetchAllTaskCount,
    onSuccess: (data) => {
      console.log('Fetched task count:', data);
    },
    onError: (error) => {
      console.error('Error fetching task count:', error);
    },
  });
};

// Fetching Random Task
const fetchRandomTask = async () => {
  try {
    const response = await axios.get(`/api/tasks/random-task`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching a random task:', error);
  }
};

export const useRandomTask = () => {
  return useQuery({
    queryFn: fetchRandomTask,
    queryKey:['randomTaskId'],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching a random task:', error);
    }
  });
};

const fetchTaskWithSearch = async (characters: string) => {
  try {
    const response = await axios.get(`/api/tasks/task-with-search/${characters}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching task with these characters:', error);
    throw error; // Ensure the error is thrown so Vue Query can handle it
  }
};

export const useTaskWithSearch = (characters: string) => {
  return useQuery({
    ueryKey: ['tasks', characters], // Correct
    queryFn: () => fetchTaskWithSearch(characters),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task with search characters:', error);
    },
  });
};

// Fetching Specific Task by Day
const fetchSpecificTask = async (day) => {
  try {
    const response = await axios.get(`/api/daily_tasks/get-daily-task/${day}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching specific task:', error);
  }
};

export const useSpecificTask = () => {
  return useQuery({
    queryFn: fetchSpecificTask,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching specific task:', error);
    }
  });
};

// Fetching Task by Difficulty
const fetchTaskByDifficulty = async (difficulty_value) => {
  try {
    const response = await axios.get(`/api/tasks/task-with-difficulty/${difficulty_value}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching task with this difficulty:', error);
  }
};

export const useTaskByDifficulty = () => {
  return useQuery({
    queryFn: fetchTaskByDifficulty,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task with difficulty:', error);
    }
  });
};

// Fetching Task by State and User ID
const fetchTaskByState = async (state, user_id) => {
  try {
    const response = await axios.get(`/api/task_solution/task-by-completion-state/${state}/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching task by state:', error);
  }
};

export const useTaskByState = () => {
  return useQuery({
    queryFn: fetchTaskByState,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task by state:', error);
    }
  });
};

const fetchCardsByThemes = async (themeIds: number[]) => {
  //console.log('Selected Theme IDs:', themeIds);

  try {
    const themesPath = themeIds.length > 0 ? themeIds.join(';') : 'all'; // Ensure a valid API parameter
    console.log('Formatted Theme IDs:', themesPath);

    // Send the request with the theme IDs
    const response = await axios.get(`/api/tasks/filter-task-by-themes/${themesPath}`);
   // console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching tasks by themes:', error);
  }
};

export const useCardsByThemes = (themeIds: number[]) => {
  console.log("Fetching with theme IDs:", themeIds);

  return useQuery({
    queryFn: () => fetchCardsByThemes(themeIds),
    queryKey: ['filteredByThemes', themeIds.join(';')], 
    onSuccess: (data) => {
      console.log("Filtered tasks received:", data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching cards by themes:', error);
    }
  });
};






