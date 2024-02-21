import React from 'react';

import { useNavigate } from 'react-router-dom';
function Userlogin() {
  const navigate=useNavigate();
  const gouserpg=()=>{
    navigate('/Userpg')
  }  
  return (
    <div className='flex flex-row h-screen w-screen justify-center  bg-gray-100'>
      
      <div className='w-1/2 flex py-10 items-center justify-center'>
      
        <div className='w-3/5 h-3/4 flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg shadow-xl'>
        
          <p className='text-3xl font-semibold text-gray-800 mb-6'>User</p>
          <div className="flex items-center mb-4">
            <label>Name</label>
            <input className='p2 border border-slate-500 p-2 ml-2 w-60 rounded-md' placeholder='Enter your UserName'/>
          </div>
          <div className="flex items-center">
            <label>Password</label>
            <input className='p2 border ml-2 border-slate-500 p-2 w-60 rounded-md' type='password' placeholder='Type your Password'/>
          </div>
          
          <div>
          
        </div>

          <button className="w-3/4 h-2/8 rounded-lg p-3 m-5 bg-blue-400 text-white text-lg" onClick={gouserpg}>LOGIN</button>
        </div>
      </div>
    </div>
  );
}

export default Userlogin;
