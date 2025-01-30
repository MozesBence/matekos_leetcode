import axios from "axios";
import { defineStore } from "pinia";


export const useCardsStore = defineStore('cardsStore',{
    state: () => ({
        cards: [] as any[],
        completion_rates: [] as any[],
        task_state: [] as any[],
        solved_task_rates: [] as any[],
        allTaskCount: 0 as number,
        randomTaskId: 0 as number,
    }),
    actions:{
        async fetchCards(){
            try{
                const response = await axios.get(`/api/tasks/get-cards-info/${sessionStorage.getItem('offset')}`);
                this.cards = response.data;
            }catch(error){
                console.log(`Error in cards store (cards)! Error: ${error}`)
            }
        },
        async fetchCompletionRate(){
            try{
                const response = await axios.get('/api/task_solution/tasks/task-completion-rates');
                this.completion_rates = response.data;
            }catch(error){
                console.log(`Error in cards store (completionrates)! Error: ${error}`)
            }
        },
        async fetchTaskState(id: Number) {
            try {
                const response = await axios.get(`/api/task_solution/taskState/${id}`);

                this.task_state = response.data;
            } catch (error) {
                console.error('Error fetching task state:', error);
            }
        },
        async fetchSolvedTaskRates(id:Number){
            try{
                const response = await axios.get(`/api/task_solution/solved-tasks-rate/${id}`);
                this.solved_task_rates = response.data;

            }catch(error){
                console.log(`Error fetching  solved task rates! Error: ${error}`)
            }
        },
        async getAllTaskCount(){
            try{
                const response = await axios.get(`/api/tasks/taskCount`);
                this.allTaskCount = response.data;
            }catch(error){
                console.log(`Error fetching all task count! Error: ${error}`)
            }
        },
        async fetchRandomTask(){
            try{
                const response = await axios.get(`/api/tasks/random-task`);
                this.randomTaskId = response.data;
            }catch(error){
                console.log(`Error fetching a random task! Error: ${error}`)
            }
        },
        async fetchTaskWithSearch(characters:string){
            try{
                const response = await axios.get(`/api/tasks/task-with-search/${characters}`);
                this.cards = response.data;
            }catch(error){
                console.log(`Error fetching a random task! Error: ${error}`)
            }
        }        
    },
});