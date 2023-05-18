import { AiOutlineHeart,AiTwotoneHeart } from 'react-icons/ai';
import { FaRegCommentAlt,FaUserMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const PostCard = ({ post,onDelete,onLike }) => {
    const { user } = useAuthStore(state=>state);
    const checkLiked = post.likes.find(likePost=>likePost.user_id === user._id && likePost.post_id === post._id);

    return (
        <div className="w-full bg-white rounded-lg py-4 px-4 shadow-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
               <Link to={user._id === post?.user_id?._id ? `/profile/${post?.user_id?._id}` : `/user/${post?.user_id?._id}`}>
               {post?.user_id?.avatar ? (
                    <img src={`${process.env.REACT_APP_BASE_IMAGE_AVATAR_URI}/${post?.user_id?.avatar}`} className="w-[46px] h-[46px] rounded-full" />
                ) : (
                    <span className="rounded-full font-bold text-lg w-[46px] h-[46px] bg-blue-400 flex items-center justify-center uppercase text-white">{post?.user_id?.username?.charAt(0)}</span>
                )}
               </Link>

                <div>
                    <h4 className="text-[16px] text-gray-500 font-semibold">{post?.user_id?.username}</h4>
                    <p className="font-medium text-[13px] text-gray-400">{post?.user_id?.email}</p>
                </div>
                </div>
                {user?._id === post?.user_id?._id && (
                     <button onClick={() => onDelete(post._id)} className='text-lg text-red-400 cursor-pointer'>
                        <FaUserMinus/>
                     </button>
                )}
            </div>
            <p className="text-gray-500 font-medium  text-[14px] mt-5">{post?.caption}</p>
            <img src={`${process.env.REACT_APP_BASE_IMAGE_POST_URI}/${post?.image}`} className="w-full h-[300px] mt-3 rounded-md" />
            <div className='flex items-center gap-x-5 mt-5'>
                {checkLiked ? (
                    <button onClick={()=>onLike(checkLiked,checkLiked._id)} className='flex items-center text-gray-500 text-md gap-x-2'>
                       <AiTwotoneHeart className='text-xl text-red-500'/>
                       {post?.likes?.length} Likes
                   </button>
                ) : (
                <button onClick={()=>onLike(checkLiked,post._id)} className='flex items-center text-gray-500 text-md gap-x-2'>
                    <AiOutlineHeart className='text-xl'/>
                    {post?.likes?.length} Likes
                </button>
                )}
                <Link to={`/post/${post._id}`}>
                <button className='flex items-center text-gray-500 text-md gap-x-2'>
                    <FaRegCommentAlt className='text-[16px]'/>
                </button>
                </Link>
            </div>
        </div>
    )
}

export default PostCard;