import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from 'react-icons/bi';
import { BsFillChatRightTextFill,BsFillQuestionCircleFill } from 'react-icons/bs';
import { IoIosSunny,IoMdLogOut } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import { shallow } from 'zustand';
import useProfileStore from "../store/profileStore";

const Navbar = () => {
  const { logoutHandler, user } = useAuthStore(state=>state);
  const { data } = useProfileStore(state=>state);

   const logoutButtonHandler = () => {
     localStorage.setItem('user' , JSON.stringify(null));
     logoutHandler();
   }

    return (
        <nav className="w-full bg-white shadow-lg shadow-gray-300 py-4  lg:px-12 px-5 flex justify-between items-center">
        <div className="flex items-center gap-x-7">
        <Link to="/">
            <span className="text-[22px] font-extrabold text-blue-400">Chattera</span>
          </Link>
          <div className="w-[300px] relative lg:d-block hidden">
            <input type="text" class="bg-gray-200 w-full pl-7 rounded-md py-[6px] px-2 outline-none border-none"/>
            <BiSearch className="absolute top-[10px] text-[18px] left-2 text-gray-600" />
          </div>
        </div>
        <div className="flex items-center gap-x-6">
            <button className="text-lg"><IoIosSunny/></button>
            <button className="text-md"><FaBell/></button>
            <button className="text-md"><BsFillQuestionCircleFill/></button>
            <button onClick={logoutButtonHandler} className="text-lg hover:text-blue-400 cursor-pointer"><IoMdLogOut/></button>
            {data && (
               <Link to={`/profile/${user._id}`}>
               {data?.avatar ? <img src={`${process.env.REACT_APP_BASE_IMAGE_AVATAR_URI}/${data?.avatar}`} className="w-[46px] h-[46px] rounded-full" /> : <span className="rounded-full font-bold text-lg w-[46px] h-[46px] bg-blue-400 flex items-center justify-center uppercase text-white">{data?.username?.charAt(0)}</span>}
               </Link>
            )}
        </div>
        </nav>
    )
}

export default Navbar;