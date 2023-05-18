import useProfileStore from '../store/profileStore';
import useAuthStore from '../store/authStore';
import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { BsBriefcase,BsImage } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';

const WrapperProfile = ({ profile,page,setModal, updateAvatar }) => {
  const { data } = useProfileStore(state=>state);
  const { user } = useAuthStore(state=>state);


  if(page && page === "profilepage") {
    return (
        <div className="w-full shadow-lg  shadow-gray-200 rounded-lg bg-white">
        <header className="flex items-center  py-4 px-5 border-b border-gray-200 justify-between">
            <div className="flex items-start">
            <input onChange={(e) => updateAvatar(e)} type="file" name="image" id="image" className='hidden'/>
            {data && (
               <label for="image" className="cursor-pointer">
               {data?.avatar ? <img src={`${process.env.REACT_APP_BASE_IMAGE_AVATAR_URI}/${data?.avatar}`} className="w-[46px] h-[46px] rounded-full" /> : <span className="rounded-full font-bold text-lg w-[46px] h-[46px] bg-blue-400 flex items-center justify-center uppercase text-white">{data?.username?.charAt(0)}</span>}
               </label>
             )}
             <div className="ml-5">
                <h4 className="text-[18px] font-bold text-gray-800">{data?.username}</h4>
                <div className="flex items-center mt-[2px] gap-x-3">
                    <p className="text-gray-400 text-[13.5px] font-medium">{data?.following?.length} Following</p>
                    <p className="text-gray-400 text-[13.5px] font-medium">{data?.follower?.length} Follower</p>
                </div>
             </div>
            </div>
                <button onClick={()=>setModal(true)} className="text-gray-500 text-xl"><BiEditAlt/></button>
        </header>
        <div className="py-5 px-5">
            <span className="flex items-center gap-x-4 text-gray-500">
                <HiOutlineLocationMarker className="text-xl text-gray-500"/>
                <p className="text-[13.5px] font-semibold">{data?.address ? data.address : "No set"}</p>
            </span>
            <span className="flex mt-3 items-center gap-x-4 text-gray-500">
                <BsBriefcase className="text-xl text-gray-500"/>
                <p className="text-[13.5px] font-semibold">{data?.job ? data.job : "No set"}</p>
            </span>
            <span className="flex mt-3 items-center gap-x-4 text-gray-500">
                <FaUsers className="text-xl text-gray-500"/>
                <p className="text-[13.5px] font-semibold">{data?.email ? data.email : "No set"}</p>
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
        </div>
    </div>
    )
  }

  return (
    <div className="w-full shadow-lg  shadow-gray-200 rounded-lg bg-white">
    <header className="flex items-center  py-4 px-5 border-b border-gray-200 justify-between">
        <div className="flex items-start">
        {data && (
           <div>
            {data?.avatar ? <img src={`${process.env.REACT_APP_BASE_IMAGE_AVATAR_URI}/${data?.avatar}`} className="w-[46px] h-[46px] rounded-full" /> : <span className="rounded-full font-bold text-lg w-[46px] h-[46px] bg-blue-400 flex items-center justify-center uppercase text-white">{data?.username?.charAt(0)}</span>}           </div>
         )}
         <div className="ml-5">
            <h4 className="text-[18px] font-bold text-gray-800">{data?.username}</h4>
            <div className="flex items-center mt-[2px] gap-x-3">
                <p className="text-gray-400 text-[13.5px] font-medium">{data?.following?.length} Following</p>
                <p className="text-gray-400 text-[13.5px] font-medium">{data?.follower?.length} Follower</p>
            </div>
         </div>
        </div>

        <Link to={`/profile/${user._id}`}>
            <button className="text-gray-500 text-xl"><BiEditAlt/></button>
        </Link>
    </header>
    <div className="py-5 px-5">
        <span className="flex items-center gap-x-4 text-gray-500">
            <HiOutlineLocationMarker className="text-xl text-gray-500"/>
            <p className="text-[13.5px] font-semibold">{data?.address ? data.address : "No set"}</p>
        </span>
        <span className="flex mt-3 items-center gap-x-4 text-gray-500">
            <BsBriefcase className="text-xl text-gray-500"/>
            <p className="text-[13.5px] font-semibold">{data?.job ? data.job : "No set"}</p>
        </span>
        <span className="flex mt-3 items-center gap-x-4 text-gray-500">
                <FaUsers className="text-xl text-gray-500"/>
                <p className="text-[13.5px] font-semibold">{data?.email ? data.email : "No set"}</p>
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
    </div>
</div>
  )
}

export default WrapperProfile