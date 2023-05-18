import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const APIPost = axios.create({
   baseURL:`${process.env.REACT_APP_BASE_API_URI}/post`,
   headers: {
    Authorization:`Bearer ${user}`
   }
});

export default APIPost;