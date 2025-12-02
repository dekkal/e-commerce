import axios from "axios";


const url="http://localhost:3000/api/v1";
export const api=axios.create({
    baseURL:url,
});


