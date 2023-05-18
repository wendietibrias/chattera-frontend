import { WrapperProfile,Navbar, PostCard,PeopleFollow, LoadingSpinner, Alert } from '../../components';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { useEffect,useState } from 'react';
import APIProfile from "../../api/profile";
import APIPost from '../../api/post';
import useProfileStore from '../../store/profileStore';
import images from '../../utils/images';

const Profilepage = () => {
    const { user } = useAuthStore(state=>state);
    const { id } = useParams();
    const { data,setupProfile } = useProfileStore(state=>state);

    const [openUpdateProfileModal,setOpenUpdateProfileModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [posts,setPosts] = useState([]);
    const [updateForm,setUpdateForm] = useState({
        username:"",
        email:"",
        address:"",
        job:""
    });
    const [alert,setAlert] = useState({
        open:false,
        message:"",
        variant:"",
        textVariant:""
    });

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

    const fetchProfile = async () => {
         try {
            const { data } = await APIProfile.get(`/user/${id}`);
            if(data.statusCode === 200) {
                setupProfile(data.data);
            }

         } catch(err) {
            return err;
         }
    }

    const deleteUserPost = async (id) => {
        try {
   
            const { data:{ statusCode } } = await APIPost.delete(`/delete/${id}`);
            if(statusCode === 200) {
                fetchUserPosts();
                fetchProfile();
            }

         } catch(err) {
            return err;
         }
    }

    const closeModalHandler = (e) => {
        if(e.target.className.includes("fixed")) {
            setOpenUpdateProfileModal(false);
        }
    }

    const updateProfileHandler = async (el) => {
        el.preventDefault();

        setAlert({
            open:true, 
            message:"Updating...",
            variant:'bg-blue-50',
            textVariant:'text-blue-400'
          });
       try {

        const { data } = await APIProfile.put(`/update/${user._id}`, updateForm);
        if(data.statusCode === 200) {
            fetchProfile();
            setOpenUpdateProfileModal(false);
        }

       } catch(err) {
          const { response:{ data } } = err;
          setAlert({
            open:true, 
            message:data.message,
            variant:'bg-red-50',
            textVariant:'text-red-500'
          });
       }
    }

    const updateUserAvatar = async (e) => {
         try { 
            const files = e.target.files[0];
            const formData = new FormData();

            formData.append('image' , files);
            
            const { data } = await APIProfile.post('/update/avatar/' + user._id, formData);

            if(data.statusCode === 200) {
                setupProfile(data.data);
            }
 

         } catch(err) {
            const { response:{ data } } = err;
            setAlert({
              open:true, 
              message:data.message,
              variant:'bg-red-50',
              textVariant:'text-red-500'
            });
         }
    }

    const changeHandler = (e) => setUpdateForm({...updateForm,[e.target.name]:e.target.value});

    useEffect(() => {
        fetchUserPosts();
        if(data) {
            setUpdateForm({
                username:data.username,
                email:data.email,
                address:data?.address,
                job:data?.job
            });
        }


    },[data]);

    return (
        <div className="w-full bg-gray-100 min-h-screen">
            <Navbar/>
            {openUpdateProfileModal && (
                <div onClick={closeModalHandler} style={{
                    backgroundColor:"rgba(10,10,10,0.4)",
                }} className="fixed top-0 left-0 w-full min-h-screen flex items-center lg:flex-row flex-col justify-center">
                    <div className='bg-white rounded-lg py-4 px-5 w-[450px] shadow shadow-gray-800'>
                        {alert.open && (
                            <div className='mb-4'>
                                <Alert alert={alert} setAlert={setAlert} />
                            </div>
                        )}
                        <h4 className='text-center font-bold text-xl'>Update Profile</h4>
                        <form onSubmit={updateProfileHandler} className='w-full mt-5 flex flex-col gap-y-2'>
                            <input onChange={changeHandler} value={updateForm?.username} type="text" name="username" placeholder='Username' className='text-[14px] outline-none text-gray-500 w-full border border-gray-300 py-2 px-2 rounded-md'/>
                            <input onChange={changeHandler} value={updateForm?.email} type="email" name="email" placeholder='Email' className='text-[14px] outline-none text-gray-500 w-full border border-gray-300 py-2 px-2 rounded-md'/>
                            <input onChange={changeHandler} value={updateForm?.address} type="text" name="address" placeholder='Address' className='text-[14px] outline-none text-gray-500 w-full border border-gray-300 py-2 px-2 rounded-md'/>
                            <input onChange={changeHandler} value={updateForm?.job} type="text" name="job" placeholder='Your job' className='text-[14px] outline-none text-gray-500 w-full border border-gray-300 py-2 px-2 rounded-md'/>
                            <button type="submit" className='w-full bg-blue-500 text-[15px] text-white font-semibold rounded-full py-2 mt-5'>Update</button>
                        </form>
                    </div>
                </div>
            )}
            <section className='w-full py-7 px-12 flex items-start gap-x-5'>
            <div className='w-full lg:w-[27%]'>
                 <WrapperProfile setModal={setOpenUpdateProfileModal} updateAvatar={updateUserAvatar} page="profilepage"/>
            </div>
            <div className='w-full lg:w-[44%]'>
                {Array.isArray(posts) && posts.length > 0 ? (
                    <div className='w-full flex flex-col gap-y-3'>
                    {posts?.map((post,idx) => <PostCard onDelete={deleteUserPost} key={idx} post={post}/>)}
                    </div>
                ) : (
                    <div className="w-full flex justify-center flex-col items-center">
                      <img src={images.notfound} alt="no posts user" className='w-[300px] min-w-[150px] object-cover'/>
                      <h2 className='text-center text-blue-500 text-xl font-bold mt-7'>No recent posts</h2>
                    </div>
                )}
                {loading && <LoadingSpinner/>}
            </div>
            <div className="w-full lg:w-[27%]">
                <PeopleFollow following={data?.following} />
            </div>
            </section>
        </div>
    )
}

export default Profilepage;