import { useState,useEffect,useRef } from "react";
import APIProfile from "../../api/profile";
import { useParams, Navigate } from "react-router-dom";
import { Navbar, PostCard,LoadingSpinner } from "../../components";
import { BsBriefcase,BsImage } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineLocationMarker } from "react-icons/hi";
import APIFollow from "../../api/follow";
import useAuthStore from "../../store/authStore";

const OtherUserProfile = () => {
    const { user } = useAuthStore(state=>state);
    const { id } = useParams();

    const [checkFollow,setCheckFollow] = useState(null);
    const [loading,setLoading]  = useState(false);
    const [profile,setProfile] = useState(null);
    const [posts,setPosts] = useState([]);

    const fetchProfile = async () => {
        try {
            if(id) {
                const { data } = await APIProfile.get(`/user/${id}`);
                if(data.statusCode === 200) {
                    setCheckFollow(data.data.follower.find((post)=>post._id.toString() === user._id?.toString()))
                    setProfile(data.data);
                    
                }
            }
        } catch(err) {
            return err;
        }
    }

    const fetchUserPosts = async () => {
        setLoading(true);
        try {
            const { data } = await APIProfile.get(`/user/post/${id}`);
            setPosts(data.data);
            setLoading(false);

        } catch(err) {
            return err;
        }
    }

    const followHandler = async (id) => {
         try {
            const { data } = await APIFollow.post(`/follow/${id}`, {
                user_id:user._id
            });

            if(data.statusCode === 200) {
                fetchProfile();
            }

         } catch(err) {
            return err;
         }
    }

    const unfollowHandler = async (id) => {
        try {

            const { data } = await APIFollow.post(`/unfollow/${id}`, {
                user_id:user._id
            });

            if(data.statusCode === 200) {
                fetchProfile();
            }

        } catch(err) {
            return err;
        }
    }

    useEffect(() => {
       fetchUserPosts();
       fetchProfile();
    },[]);

    if(!id) {
        return (
            <Navigate to="/"/>
        )
    }

    return (
        <div className="w-full min-h-screen bg-gray-100">
           <Navbar/>
           <section className="flex items-start gap-x-5 py-10 px-12">
            <div className="w-[27%]">
            <div className="w-full shadow-lg  shadow-gray-200 rounded-lg bg-white">
        <header className="flex items-center  py-4 px-5 border-b border-gray-200 justify-between">
            <div className="flex items-start">
            <input  type="file" name="image" id="image" className='hidden'/>
            {profile && (
               <label for="image" className="cursor-pointer">
               {profile?.avatar ? <img src={`${process.env.REACT_APP_BASE_IMAGE_AVATAR_URI}/${profile?.avatar}`} className="w-[46px] h-[46px] rounded-full" /> : <span className="rounded-full font-bold text-lg w-[46px] h-[46px] bg-blue-400 flex items-center justify-center uppercase text-white">{profile?.username?.charAt(0)}</span>}
               </label>
             )}
             <div className="ml-5">
                <h4 className="text-[18px] font-bold text-gray-800">{profile?.username}</h4>
                <div className="flex items-center mt-[2px] gap-x-3">
                    <p className="text-gray-400 text-[13.5px] font-medium">{profile?.following?.length} Following</p>
                    <p className="text-gray-400 text-[13.5px] font-medium">{profile?.follower?.length} Follower</p>
                </div>
             </div>
            </div>
        </header>
        <div className="py-5 px-5">
            <span className="flex items-center gap-x-4 text-gray-500">
                <HiOutlineLocationMarker className="text-xl text-gray-500"/>
                <p className="text-[13.5px] font-semibold">{profile?.address ? profile.address : "No set"}</p>
            </span>
            <span className="flex mt-3 items-center gap-x-4 text-gray-500">
                <BsBriefcase className="text-xl text-gray-500"/>
                <p className="text-[13.5px] font-semibold">{profile?.job ? profile.job : "No set"}</p>
            </span>
            <span className="flex mt-3 items-center gap-x-4 text-gray-500">
                <FaUsers className="text-xl text-gray-500"/>
                <p className="text-[13.5px] font-semibold">{profile?.email ? profile.email : "No set"}</p>
            </span>
            <div className="mt-7 flex flex-col gap-y-2">
                <span className="flex items-center justify-between text-gray-500">
                    <p className="text-[13.5px] font-medium">Profile Viewer</p>
                    <p className="text-[13.5px] font-medium">0</p>
                </span>
                <span className="flex items-center justify-between text-gray-500">
                    <p className="text-[13.5px] font-medium">Posts Viewer</p>
                    <p className="text-[13.5px] font-medium">0</p>
                </span>
            </div>
            {checkFollow ? (
                 <button onClick={()=>unfollowHandler(profile?._id)} className="w-full bg-blue-400 text-white font-semibold py-2 rounded-md mt-7">Unfollow</button>
            ) : (
                <button onClick={()=>followHandler(profile?._id)} className="w-full bg-blue-400 text-white font-semibold py-2 rounded-md mt-7">Follow</button>

            )}
        </div>
    </div>
            </div>
            <div className="w-[44%]">
                <div className="flex flex-col gap-y-4">
                    {Array.isArray(posts) && posts.map((post,idx) => <PostCard key={idx} post={post}/>)}
                </div>
                {loading && (
                    <div className="flex items-center justify-center w-full mt-5">
                        <LoadingSpinner/>
                    </div>
                )}
            </div>
           </section>
        </div>
    )
}

export default OtherUserProfile;