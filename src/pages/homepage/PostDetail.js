import { useEffect, useState } from "react";
import { Navbar , LoadingSpinner } from "../../components";
import { useParams } from "react-router-dom";
import APIPost from "../../api/post";
import {WrapperProfile} from "../../components";
import useAuthStore from "../../store/authStore";
import APIComment from "../../api/comment";
import { Link } from "react-router-dom";
import { FaTrash,FaUserMinus } from "react-icons/fa";


const PostDetail = () => {
    const { user } = useAuthStore(state=>state);
    const { postId } = useParams();

    const [loadComment,setLoadComment] = useState(false);
    const [commentTerm,setCommentTerm] = useState("");
    const [comments,setComments] = useState([]);
    const [post,setPost] = useState(null);

    const fetchPost = async () => {
        try {
           const { data } = await APIPost.get(`/post/${postId}`);
           setPost(data.data);
        } catch(err) {
           return err;
        }
    }

    const fetchComments = async () => {
        setLoadComment(true);
        try {
            const { data } = await APIComment.get(`/all/${postId}`);
            if(data.statusCode === 200) {
                setComments(data.data);
                setLoadComment(false);
            }

        } catch(err) {
           return err;
        }
    }

    const deletePosts = async (id) => {
        try {
  
           const { data:{ statusCode,message } } = await APIPost.delete(`/delete/${id}`);
           if(statusCode === 200) {
               fetchPost();
           }

        } catch(err) {
           const { response:{ data } } = err;
           return data;
        }
   }

   const deleteComment = async (id) => {
       try {
        const { data } = await APIComment.delete(`/delete/${id}`);
        if(data.statusCode === 200) {
            fetchComments();
        }

       }catch(err) {
         return err;
       }
   }

   const postComment = async () => {
      try {
        const { data } = await APIComment.post(`/create`, { comment:commentTerm,user_id:user._id,post_id:post._id });
        if(data.statusCode === 200) {
            fetchComments();
            setCommentTerm("");
        }

      } catch(err) {
          return err;
      }
   }

    useEffect(() => {

        if(postId){
            fetchComments();
            fetchPost();
        }

    },[postId]);

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <Navbar/>
            <section className="w-full flex items-center justify-center py-12">
              <div className="w-[70%] mx-auto bg-white py-4 px-4 flex items-start shadow-gray-200 shadow-lg rounded-md">
                 <img src={`${process.env.REACT_APP_BASE_IMAGE_POST_URI}/${post?.image}`} className="w-[400px] rounded-md h-[500px]" />
                 <div className="flex-1 px-5 py-1">
                 <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
               <Link to={`/profile/${post?.user_id?._id}`}>
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
                     <button onClick={() => deletePosts(post._id)} className='text-lg text-red-400 cursor-pointer'>
                        <FaUserMinus/>
                     </button>
                )}
            </div>
            <p className="text-gray-400 text-[13px] mt-3">Posted at {new Date(post?.createdAt).toDateString()}</p>
            <p className="text-gray-500 text-[15px] font-semibold mt-2">{post?.caption}</p>
            <div className="w-full">
                <h4 className="text-[17px] mt-5 font-semibold text-gray-800">{comments.length} comments</h4>
                <div className="relative mt-5 h-[320px]">
                    {loadComment ? (
                        <div className="flex justify-center items-center w-full mt-7">
                            <LoadingSpinner/>
                        </div>
                    ) : (
                        <div className="h-[250px] overflow-y-scroll flex flex-col gap-y-4">
                            {Array.isArray(comments) && comments.map((comment,idx) => (
                                <div className="w-full" key={idx}>
                                    <div className="w-full flex items-start gap-x-5">
                                        {comment?.user?.avatar ? (
                                          <img src={`${process.env.REACT_APP_BASE_IMAGE_AVATAR_URI}/${comment?.user?.avatar}`} className="w-[46px] h-[46px] rounded-full"/>
                                        ) : (
                                            <span className="rounded-full font-bold text-lg w-[46px] h-[46px] bg-blue-400 flex items-center justify-center uppercase text-white">{comment?.user?.username?.charAt(0)}</span>

                                        )}
                                        <div className="flex-1 flex items-center justify-between mb-4">
                                            <div>
                                                <h5 className="text-gray-800 text-[15px] font-semibold">{comment?.user?.username}</h5>
                                                <p className="text-gray-500 text-[13px] font-medium">{comment?.user?.email}</p>
                                            </div>
                                         {comment?.user?._id === user._id && <button onClick={()=>deleteComment(comment?._id)} className="text-sm text-red-500 font-semibold cursor-pointer"><FaTrash/></button>}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">{comment?.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="w-full absolute bottom-0 left-0 flex items-center mt-4 gap-x-3">
                        <input value={commentTerm} onChange={(e)=>setCommentTerm(e.target.value)} type="text" className="py-2 px-3 flex-1 border border-gray-200 outline-none"/>
                        <button disabled={commentTerm === "" ? true : false} onClick={postComment} className="bg-blue-400 rounded-md text-white font-semibold text-md py-[7px] px-5">Post</button>
                    </div>
                </div>
            </div>
                 </div>
              </div>
            </section>
        </div>
    )
}

export default PostDetail;