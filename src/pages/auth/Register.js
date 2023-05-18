import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert } from "../../components";
import { useNavigate , Navigate } from 'react-router-dom';
import APIAuth from '../../api/auth';

const Register = () => {
  const [showAfterRegister,setShowAfterRegister] = useState(false);
  const [registerForm,setRegisterForm] = useState({
     username:"",
     email:"",
     password:"",
     confirm:""
  });
  const [registerFormError,setRegisterFormError] = useState({
      username:false,
      email:false, 
      password:false, 
      confirm:false
  });
  const [alert,setAlert] = useState({
    message:"",
    variant:"",
    textVariant:"",
    open:false 
  });

  const changeHandler = (e) => {
    e.preventDefault();

    return setRegisterForm({
      ...registerForm,
      [e.target.name]:e.target.value
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    //validasi form register
    if(registerForm.email === "" && registerForm.username === "" && registerForm.confirm === "" && registerForm.password === "") {
       return setRegisterFormError({
           ...registerFormError,
           username:true, 
           email:true,
           password:true,
           confirm:true
       });
    }

    if(registerForm.username !== "" && registerForm.email === "" && registerForm.password === "" && registerForm.confirm === "") {
      return setRegisterFormError({
        ...registerFormError,
        username:false,
        email:true,
        password:true,
        confirm:true
    });
    }

    if(registerForm.username !== "" && registerForm.email !== "" && registerForm.password === "" && registerForm.confirm === "") {
      return setRegisterFormError({
        ...registerFormError,
        username:false,
        email:false,
        password:true,
        confirm:true
    });
    }

    if(registerForm.username !== "" && registerForm.email !== "" && registerForm.password !== "" && registerForm.confirm === "") {
      return setRegisterFormError({
        ...registerFormError,
        username:false,
        email:false,
        password:false,
        confirm:true
    });
    }
   

    setAlert({
      open:true,
      message:"Creating user...",
      textVariant:"text-blue-500",
      variant:"bg-blue-50"
    });

    try {
      const { data } = await APIAuth.post("/register"  , registerForm);
      if(data.statusCode === 200) {
          setShowAfterRegister(true);
      }

    } catch(err) {
       setShowAfterRegister(false);
       const { response:{ data } } = err;
       setAlert({
        open:true,
        message:data.message,
        textVariant:"text-red-500",
        variant:"bg-red-50"
      });

    }

    setTimeout(() => setAlert({open:false}) , 3500);
  }

  if(showAfterRegister) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
          <div className="bg-white w-[500px] rounded-md py-4 px-5 border-t-[5px] border-blue-400">
              <h2 className="text-center text-[24px] text-blue-400  font-extrabold uppercase">Chattera</h2>
              <div className="mt-5 bg-green-50 text-green-500 py-5 px-3 rounded-md">
                <p className='text-[15px] text-center font-medium'>Check your email for make your account active</p>
              </div>
          </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-[500px] rounded-md py-4 px-5 border-t-[5px] border-blue-400">
       {alert.open && <div className="mb-3"><Alert alert={alert} setAlert={setAlert}/></div>}
      <h2 className="text-center text-[24px] text-blue-400  font-extrabold uppercase">Chattera</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-2">
            <label className='text-gray-600 font-medium text-[14px]'>Username</label>
            <input onChange={changeHandler} className={`border ${registerFormError.username ? "border-red-400" : "border-gray-300"} py-2 px-2 rounded-md outline-none`} type="text" name="username" value={registerForm.username}/>
            {registerFormError.username && <p className='text-[15px] text-red-400 font-semibold mt-1 text-sm'>Username field is required</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <label className='text-gray-600 font-medium text-[14px]'>Email</label>
            <input onChange={changeHandler} className={`border ${registerFormError.email ? "border-red-400" : "border-gray-300"} py-2 px-2 rounded-md outline-none`} type="email" name="email" value={registerForm.email}/>
            {registerFormError.email && <p className='text-[15px] text-red-400 font-semibold mt-1 text-sm'>Email field is required</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <label className='text-gray-600 font-medium text-[14px]'>Password</label>
            <input onChange={changeHandler} className={`border ${registerFormError.password ? "border-red-400" : "border-gray-300"} py-2 px-2 rounded-md outline-none`} type="password" name="password" value={registerForm.password}/>
            {registerFormError.password && <p className='text-[15px] text-red-400 font-semibold mt-1 text-sm'>Password field is required</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <label className='text-gray-600 font-medium text-[14px]'>Confirm</label>
            <input onChange={changeHandler} className={`border ${registerFormError.confirm ? "border-red-400" : "border-gray-300"} py-2 px-2 rounded-md outline-none`} type="password" name="confirm" value={registerForm.confirm}/>
            {registerFormError.confirm && <p className='text-[15px] text-red-400 font-semibold mt-1 text-sm'>Confirm field is required</p>}

          </div>
          <button disabled={alert.open} type="submit" className="mt-4 bg-blue-400 font-semibold text-[15px] text-white rounded-full py-2">Sign Up</button>
          <p className='text-center text-gray-400 text-sm font-medium'>
            Already have account? <Link to="/auth/login"><span className='text-blue-400 font-semibold'>Login</span></Link>
          </p>
      </form>
      </div>
    </div>
  )
}

export default Register