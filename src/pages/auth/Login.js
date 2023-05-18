import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import APIAuth from "../../api/auth";
import { Alert } from '../../components';
import useAuthStore from "../../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { token,setupToken } = useAuthStore(state=>state);

  const [loginForm,setLoginForm] = useState({
     email:"",
     password:""
  });

  const [loginFormError,setLoginFormError] = useState({
    email:false,
    password:false 
  });

  const [alert,setAlert] = useState({
    message:"",
    variant:"",
    textVariant:"",
    open:false 
  });

  const changeHandler = (e) => {
    e.preventDefault();

    return setLoginForm({
      ...loginForm,
      [e.target.name]:e.target.value
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
  
    //validasi form login 

    if(loginForm.email === "" && loginForm.password === "") {
      return setLoginFormError({
         email:true,
         password:true 
      });
    }

    if(loginForm.email === "" && loginForm.password !== "") {
      return setLoginFormError({
        email:true,
        password:false 
     });
    }

    if(loginForm.password === "" && loginForm.email !== "") {
      return setLoginFormError({
        email:false,
        password:true 
     });
    }

    setAlert({
      open:true,
      message:"Redirected...",
      textVariant:"text-blue-500",
      variant:"bg-blue-50"
    });
   
    try {
      const { data } = await APIAuth.post(`/login`, loginForm);
      if(data.statusCode === 200) {
          localStorage.setItem("user" , JSON.stringify(data.token));
           return setupToken(data.token);
      }

    } catch(err) {
       const { response:{ data } } = err;
       setAlert({
        open:true,
        message:data.message,
        textVariant:"text-red-500",
        variant:"bg-red-50"
      });
    }
    
    setTimeout(() => setAlert({ open:false }) ,3500);
  }

  useEffect(() => {
     if(token) {
        window.location.href = "/";
     }
  } , [token]);


  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <section className="bg-white w-[500px] rounded-md py-7 px-5 border-t-[5px] border-blue-400">
        {alert.open && <div className="mb-5"> <Alert alert={alert} setAlert={setAlert} /></div>}
        <h2 className="text-center text-[24px] text-blue-400  font-extrabold uppercase">Chattera</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-y-3 mt-5">
          <div className="flex flex-col gap-y-2">
            <label className='text-gray-600 font-medium text-[14px]'>Email</label>
            <input onChange={changeHandler} className={`border ${loginFormError.email ? "border-red-400" : "border-gray-300"} py-2 px-2 rounded-md outline-none`} type="email" name="email" value={loginForm.email}/>
            {loginFormError.email && <p className='text-[15px] text-red-400 font-semibold mt-1 text-sm'>Email field is required</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <label className='text-gray-600 font-medium text-[14px]'>Password</label>
            <input onChange={changeHandler} className={`border ${loginFormError.password ? "border-red-400" : "border-gray-300"} py-2 px-2 rounded-md outline-none`} type="password" name="password" value={loginForm.password}/>
            {loginFormError.password && <p className='text-[15px] text-red-400 font-semibold mt-1 text-sm'>Password field is required</p>}
          </div>
          <button disabled={alert.open} type="submit" className="mt-4 bg-blue-400 font-semibold text-[15px] text-white rounded-full py-2">Sign In</button>
          <p className='text-center text-gray-400 text-sm font-medium'>
            Don't have account? <Link to="/auth/register"><span className='text-blue-400 font-semibold'>Register</span></Link>
          </p>
        </form>
      </section>
    </div>
  )
}

export default Login