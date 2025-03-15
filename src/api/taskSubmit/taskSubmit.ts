import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import {type Ref } from "vue";

const submitTask = async (taskData: Ref<{ taskTitle: String, task: String, themeId: Number, solution: String, difficulty: Number, creatorId: Number, experiencePoints: Number, solutionFormat: String, hint1: String, hint2: String, validated: Number }>) => {
    console.log(taskData.value);
    const response = await axios.post(
        'api/tasks/submitTask',
        taskData.value
    );
    return response;
}

export const UseSubmitTask = (taskData:Ref<{taskTitle: String,task: String,themeId:Number,solution:String,difficulty:Number,creatorId:Number,experiencePoints:Number,solutionFormat:String,hint1:String,hint2:String,validated:Number}>) => {
    return useMutation({
        mutationFn: () => submitTask(taskData),
        mutationKey:['submitedTask',taskData.value],
        onSuccess(data){
            console.log(data)
        },
        onError(error){
            console.error(error)
        }
    });
}