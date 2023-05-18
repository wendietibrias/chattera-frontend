import propTypes from 'prop-types';

const PeopleFollow = ({ following }) => {
   
   return (
    <div className="w-full mt-3 bg-white shadow-lg shadow-gray-200 rounded-lg py-4 px-4">
    <h4 className="text-[14px] font-bold text-gray-600">People you follow</h4>
    {Array.isArray(following) && following?.length > 0 && (
           <div className="mt-4 flex flex-col gap-y-3">
           {Array.isArray(following) && following?.map((user, idx) => (
               <div className="flex items-center" key={idx}>
                 <img src={`${process.env.REACT_APP_BASE_IMAGE_AVATAR_URI}/${user?.avatar}`} alt={user?.username} className="w-[46px] h-[46px] rounded-full"/>
                 <div className="ml-4 mb-2">
                   <h4 className="text-md font-semibold text-gray-800">{user?.username}</h4>
                   <p className="text-[13.5px] text-gray-500">{user?.email}</p>
                 </div>
               </div>
           ))}
       </div>
    )}
</div>
   )
}

PeopleFollow.propTypes = {
    following:propTypes.array 
};

export default PeopleFollow;