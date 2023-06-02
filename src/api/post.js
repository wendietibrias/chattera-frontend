import axios from 'axios';

const user = JSON.parse(localStorage.getItem('chattera-token'));

const APIPost = axios.create({
   baseURL:`${process.env.REACT_APP_BASE_API_URI}/post`,
   headers: {
    Authorization:`Bearer ${user}`
   }
});

export default APIPost;