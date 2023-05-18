import { Outlet,Navigate,useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import APIProfile from '../../api/profile';
import { useState,useEffect } from 'react'; 
import useProfileStore from '../../store/profileStore';

const Main = () => {

    const location = useLocation();
    const [loadPage,setLoadPage] = useState(true);
    const { token,user } = useAuthStore(state=>state);
    const { setupProfile } = useProfileStore(state=>state);
  
    const fetchProfile = async () => {
        const { data } = await APIProfile.get(`/user/${user?._id}`);
        setupProfile(data.data);
    }
  
    useEffect(() => {
     if(document.getElementsByTagName("body")[0] !== undefined) {
        setLoadPage(false);
     }
       
     if(token) {
        fetchProfile();
     }
  
    },[token, user, location.pathname]);

    if(loadPage) {
        return (
            <div className='w-full min-h-screen flex justify-center items-center bg-white'>
                <h2 className='text-3xl font-bold text-blue-500'>Loading...</h2>
            </div>
        )
    }
 
    if(!token) {
       return <Navigate to="/auth/login"/>
    }

    return (
        <Outlet/>
    )
}

export default Main;