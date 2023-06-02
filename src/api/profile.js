import axios from "axios";

const user = JSON.parse(localStorage.getItem('chattera-token'));

const APIProfile = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}/profile`,
    headers: {
        Authorization:`Bearer ${user}`
    }
});

export default APIProfile;