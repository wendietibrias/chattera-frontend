import React from 'react';
import ReactLoading from 'react-loading';


const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <ReactLoading type="spin" width={40} height={40} color={`#54a0ff`}/>
    </div>
  )
}

export default LoadingSpinner