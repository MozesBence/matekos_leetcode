import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

const fetchStoreItems = async () => {
    console.log('enter')
    try {
        console.log('in req')
        const response = await axios.get('/api/store/getItems');
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const UseFetchStoreItems = () => {
    return useQuery({
        queryFn: fetchStoreItems,
        queryKey: ['storeItems'],
        onSuccess: (data) => {
            console.log('Data fetched successfully:', data);
        },
        onError: (error) => {
            console.log('Error occurred while fetching task data:', error);
        },
    });
}
