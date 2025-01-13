import axios from "axios";
import { stat } from "fs";
import { defineStore  } from "pinia";


export const useUserStatisticsStore = defineStore('userStatisticsStore',{
    state: () => (
        {
            taskStates: [] as any[],
            complitionRates: [] as any[],
            experience_level: '' as string,
            daily_tasks_state: [] as any[]
        }
    ),
    actions:{
        async fetchTaskStates(){
            try{
                const response = 
            }catch(error){
                console.log(`Error at user statistics store, fetch task statistics!' Error: ${error}`)
            }
        }
    }
})