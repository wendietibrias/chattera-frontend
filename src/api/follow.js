import axios from 'axios';

const user = JSON.parse(localStorage.getItem('chattera-token'));

const APIFollow = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}/follows`,
    headers: {
        Authorization:`Bearer ${user}`
    }
});

export default APIFollow;