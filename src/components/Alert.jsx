import React from 'react';

const Alert = ({ alert,setAlert }) => {
   if(!alert) return;

  return (
    <div className={`w-full shadow-lg py-1 rounded-md px-2 shadow-gray-200 ${alert.variant} flex justify-between items-center`}>
        <h2 className={`font-semibold text-[15px] ${alert.textVariant}`}>{alert.message}</h2>
        <button onClick={()=>setAlert({...alert,open:false})} className={`font-bold ${alert.textVariant} cursor-pointer`}>x</button>
    </div>
  )
}

export default Alert