import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'));

const APIProfile = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}/profile`,
    headers: {
        Authorization:`Bearer ${user}`
    }
});

export default APIProfile;