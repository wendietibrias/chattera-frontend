import APIauth from "../../api/auth"; 
import { useState } from 'react';
import { useParams,Navigate,useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components";

const ActivationAccount = () => {
  const navigate = useNavigate();
  const { code } = useParams();

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");

  if(!code) {
    return <Navigate to="/auth/register" />
  }

  const activeAccountHandler = async () => {
  setLoading(true);
      try {
        const { data } = await APIauth.post(`/confirm/${code}`);
        if(data.statusCode === 200) {
             navigate("/auth/login");
        }
      } catch(err) {
          const { response:{ data } } = err;
          setError(true);
          setErrorMsg(data.message);
      }
      setLoading(false);
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <section className="bg-white w-[500px] rounded-md py-4 px-5 border-t-[5px] border-blue-400">
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner/>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="text-center text-[24px] text-blue-400  font-extrabold uppercase">Chattera</h2>
          {error ?  (
             <div className="mt-5 bg-red-50 text-red-500 py-5 px-3 rounded-md">
              <p className='text-[15px] text-center font-medium'>{errorMsg}</p>
              <button className="w-full text-center mt-2">Resend activation</button>
             </div>
          ) : (
              <div className="mt-5 bg-green-50 text-green-500 py-5 px-3 rounded-md">
               <p className='text-[15px] text-center font-medium'>Click button below to make your account active</p>
             </div>
          )}
           <button onClick={activeAccountHandler} className="w-full text-center bg-blue-400 text-white font-semibold rounded-full py-2 mt-7">Active Account</button>
        </div>
      )}
      </section>
    </div>
  )
}

export default ActivationAccount