import axios from 'axios';

const user = JSON.parse(localStorage.getItem('chattera-token'));

const APIComment = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}/comment`,
    headers: {
       Authorization:`Bearer ${user}`
    }
});

export default APIComment;