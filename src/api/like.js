import axios from "axios";

const user = JSON.parse(localStorage.getItem('chattera-token'));

const APILike = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}/likes`,
    headers: {
        Authorization:`Bearer ${user}`
    }
});

export default APILike;