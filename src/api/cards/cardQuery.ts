import axios from "axios";
import { useMutation } from '@tanstack/vue-query';

// Fetching Cards
const fetchCards = async () => {
  try {
    const response = await axios.get(`/api/tasks/get-cards-info/${sessionStorage.getItem('offset')}`);
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching cards: ${error}`);
  }
};

export const useCards = () => {
  return useMutation({
    mutationFn: fetchCards,
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
  return useMutation({
    mutationFn: fetchCompletionRates,
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
  return useMutation({
    mutationFn: fetchTaskState,
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
  return useMutation({
    mutationFn: fetchSolvedTaskRates,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching solved task rates:', error);
    }
  });
};

// Fetching All Task Count
const fetchAllTaskCount = async () => {
  try {
    const response = await axios.get(`/api/tasks/taskCount`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching all task count:', error);
  }
};

export const useAllTaskCount = () => {
  return useMutation({
    mutationFn: fetchAllTaskCount,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching all task count:', error);
    }
  });
};

// Fetching Random Task
const fetchRandomTask = async () => {
  try {
    const response = await axios.get(`/api/tasks/random-task`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching a random task:', error);
  }
};

export const useRandomTask = () => {
  return useMutation({
    mutationFn: fetchRandomTask,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching a random task:', error);
    }
  });
};

// Fetching Task with Search Characters
const fetchTaskWithSearch = async (characters) => {
  try {
    const response = await axios.get(`/api/tasks/task-with-search/${characters}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching task with these characters:', error);
  }
};

export const useTaskWithSearch = () => {
  return useMutation({
    mutationFn: fetchTaskWithSearch,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task with search characters:', error);
    }
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
  return useMutation({
    mutationFn: fetchSpecificTask,
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
  return useMutation({
    mutationFn: fetchTaskByDifficulty,
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
  return useMutation({
    mutationFn: fetchTaskByState,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task by state:', error);
    }
  });
};

// Fetching Cards by Themes
const fetchCardsByThemes = async (themes) => {
  try {
    const themesPath = themes.join(';');
    const response = await axios.get(`/api/tasks/filter-task-by-themes/${themesPath}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching tasks by themes:', error);
  }
};

export const useCardsByThemes = () => {
  return useMutation({
    mutationFn: fetchCardsByThemes,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching cards by themes:', error);
    }
  });
};

