import React, { useEffect, useState } from "react";
import { Navbar,WrapperProfile,PostCard,LoadingSpinner, PeopleFollow } from "../../components";
import useProfileStore from "../../store/profileStore";
import useAuthStore from "../../store/authStore";
import { BsImage } from 'react-icons/bs';
import { IoIosAttach } from 'react-icons/io';
import { AiOutlineVideoCamera,AiOutlineAudio } from 'react-icons/ai';
import APIPost from "../../api/post";
import APILike from "../../api/like";
import mimeTypeChecker from "../../utils/mimeTypeChecker";

const Homepage = () => {
    const { user } = useAuthStore(state=>state);
    const { data } = useProfileStore(state=>state);

    const [currentCount,setCurrentCount] = useState(1);
    const [countData,setCountData] = useState(0);
    const [loading,setLoading] = useState(false);
    const [posts,setPosts] = useState(null);
    const [wrapperAlert,setWrapperAlert] = useState({
        message:"",
        open:false, 
        variant:"",
        textVariant:""
    });
    const [form,setForm] = useState({
        caption:"",
        image:"",
        previewImage:""
    });

    const imageHandler = (e) => {
        const file = e.target.files[0];

        if(file.size > 2000000) {
            return setWrapperAlert({
                open:true,
                message:"image must less than 2mb",
                variant:"bg-red-400",
                textVariant:"text-white"
            });
        }

        if(!mimeTypeChecker(file)) {
            return setWrapperAlert({
                open:true,
                message:"invalid image type",
                variant:"bg-red-400",
                textVariant:"text-white"
            });
        }

        const reader = new FileReader();
        reader.onloadend = function() {
            setForm({
                ...form,
                image:file
            });
        }

        reader.readAsDataURL(file);
    }


    const postHandler = async () => {
 
        if(form.image === "" || form.caption === "") {
            return setWrapperAlert({
                open:true,
                message:"complete all field",
                variant:"bg-red-400",
                textVariant:"text-white"
            });
        }

         try {
            const formData = new FormData();
            formData.append('caption' , form.caption);
            formData.append('image' , form.image);
            formData.append('user_id' , user._id);

            const { data } = await APIPost.post(`/create` , formData);

            if(data.statusCode === 200) {
                setWrapperAlert({
                    open:true,
                    message:data.message,
                    variant:"bg-blue-500",
                    textVariant:"text-white"
                });
                setForm({
                    caption:"",
                    image:""
                });
                fetchPosts();
            }

         } catch(err) {
            const { response:{ data } } = err;
             setWrapperAlert({
                open:true,
                message:data && data.message ? data.message : "Error while creating post",
                variant:"bg-red-400",
                textVariant:"text-white"
            });
         }

         setTimeout(() => {
            setWrapperAlert({
                open:false
            });
         } ,3500);
    }

    const deletePosts = async (id) => {
         try {
   
            const { data:{ statusCode,message } } = await APIPost.delete(`/delete/${id}`);
            if(statusCode === 200) {
                setWrapperAlert({
                    open:true,
                    message:message,
                    variant:"bg-blue-500",
                    textVariant:"text-white"
                });
                fetchPosts();
            }

         } catch(err) {
            const { response:{ data } } = err;
            setWrapperAlert({
               open:true,
               message:data && data.message ? data.message : "Error while creating post",
               variant:"bg-red-500",
               textVariant:"text-white"
           });
         }
    }

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data } = await APIPost.get(`/all?count=${currentCount}`);
            setCountData(data?.totalData);
            setPosts(data.data);
            setLoading(false);
        } catch(err) {
            return err;
        }
    }

    //parameter id bisa jadi itu like_id atau post_id
    const likePostHandler = async (checkLiked , id) => {
        try {

          if(!checkLiked) { 
            const { data } = await APILike.post(`/like/${id}`);
            if(data.statusCode === 200) {
                fetchPosts();
            }
         }

         const { data } = await APILike.delete(`/unlike/${id}`);
         if(data.statusCode === 200) {
            fetchPosts();
        }

        } catch(err) {
            const { response:{ data } } = err;
            setWrapperAlert({
               open:true,
               message:data && data.message ? data.message : "Error while creating post",
               variant:"bg-red-500",
               textVariant:"text-white"
           });
        }
     
    }

    useEffect(() => {
      fetchPosts();
    },[currentCount]);

    return (
        <div className="min-h-screen w-full bg-gray-100 relative">
            <Navbar/>
            {wrapperAlert.open && (
                <span className={`${wrapperAlert.variant} fixed top-10 z-[999] py-3 px-4 left-[50%] -translate-x-[50%] flex items-center justify-between  w-[350px] rounded-full text-white`}>
                    <p className="text-md font-medium">{wrapperAlert.message}</p>
                    <button onClick={()=>setWrapperAlert({open:false})} className="font-bold text-md">x</button>
                </span>
            )}
            <section className="w-full flex-col lg:flex-row  flex items-start justify-between gap-x-5 lg:px-12 px-5 py-7">
 
                {/* Profile */}
                <div className=" lg:w-[27%] hidden lg:block">
                    <WrapperProfile page="homepage"/>
                </div>

                {/* Post tweet && tweet */}
                <div className="w-[full] xl:w-[44%]">
                 <div className="bg-white shadow-lg shadow-gray-200 rounded-lg">
                    <div className="flex items-center py-3 px-3 gap-x-2 border-b border-gray-200">
                    {data && (
                               <div>
                               {data?.avatar ? (
                                 <img src={`${process.env.REACT_APP_BASE_IMAGE_AVATAR_URI}/${data?.avatar}`} alt={data?.username} className="w-[38px] h-[38px] rounded-full"/>
                               ) : (
                                 <span className="rounded-full font-bold text-sm w-[38px] h-[38px] bg-blue-400 flex items-center justify-center uppercase text-white">{data?.username?.charAt(0)}</span>
                               )}
                               </div>
                             )}
                    <input value={form.caption} onChange={(e)=>setForm({...form,caption:e.target.value})} type="text" placeholder="type something.." className="flex-1 text-sm bg-gray-100 text-gray-600 font-medium outline-none py-[10px] px-3 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between flex-wrap py-4 px-8">
                    <button className="cursor-pointer">
                            <input onChange={imageHandler} type="file" name="image" className="hidden" id="image"/>
                            <label className="flex cursor-pointer items-center text-gray-500 font-medium text-[13px] gap-x-2" for="image">
                                <BsImage className="text-[18px]"/>
                                Image 
                            </label>
                        </button>
                        <button className="cursor-pointer">
                            <label className="flex items-center text-gray-500 font-medium text-[13px] gap-x-2">
                                <AiOutlineVideoCamera className="text-[18px]"/>
                                Video 
                            </label>
                        </button>
                        <button className="cursor-pointer">
                            <label className="flex items-center text-gray-500 font-medium text-[13px] gap-x-2">
                                <IoIosAttach className="text-[18px]"/>
                                Attachment 
                            </label>
                        </button>
                        <button className="cursor-pointer">
                            <label className="flex items-center text-gray-500 font-medium text-[13px] gap-x-2">
                                <AiOutlineAudio className="text-[18px]"/>
                                Audio 
                            </label>
                        </button>
                        <button disabled={form?.caption === "" ? true : false} onClick={postHandler} className="bg-blue-400 text-white font-bold text-[12px] uppercase rounded-full py-[4px] px-[12px]">Post</button>
                    </div>
                 </div>
                 <div className="flex flex-col gap-y-4 mt-6">
                   {Array.isArray(posts) && posts.length > 0 ? (
                     posts?.map((post, idx) => <PostCard onLike={likePostHandler} onDelete={deletePosts} post={post} key={idx} />)
                   ) : (
                     <di className="w-full flex justify-center items-center">
                        <h5 className="text-xl font-semibold text-gray-500">No recent posts...</h5>
                     </di>
                   )}
                 </div>
                {loading && <LoadingSpinner/>}
                {!loading  && (
                    <div className="text-center mt-5">
                        <button onClick={()=>setCurrentCount(currentCount + 1)} className="bg-blue-400 text-white capitalize font-semibold py-2 rounded-full px-5 text-[15px]">load more</button>
                    </div>
                )}
                </div>
                
                {/* trending posts */}
                <div className="w-[27%] lg:block hidden">
                    <div className="w-full bg-white shadow-lg shadow-gray-200 rounded-lg py-5 px-4">
                        <h4 className="text-[14px] font-bold text-gray-600">Trending Posts</h4>
                    </div>
                   <PeopleFollow following={data?.following} />
                </div>
            </section>
        </div>
    );
}

export default Homepage;