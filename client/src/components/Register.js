import React from 'react';

import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate=useNavigate();
  const gologin=()=>{
    navigate('/Login')
  }
  return (
    <div className='flex flex-row h-screen'>
      <div className='w-1/2 flex py-10 items-center justify-center bg-gray-100'>
      
        <div className='w-3/5 h-3/4 flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg shadow-xl'>
        
          <p className='text-3xl font-semibold text-gray-800 mb-6'>REGISTER</p>
          <div className="flex items-center mb-4">
            <label>Name</label>
            <input className='p2 border border-slate-500 p-2 w-60 rounded-md' placeholder='Enter your UserName'/>
          </div>
          <div className="flex items-center">
            <label>Hi</label>
            <input className='p2 border border-slate-500 p-2 w-60 rounded-md' type='password' placeholder='Enter your Password'/>
          </div>
          <div className='flex items-center flex-row mt-3'>
            <label>hello</label>
            <select className='border border-slate-500 p-2 w-60 rounded-md'>
              <option value="">Select your role</option>
              <option value="option1">Inventory team</option>
              <option value="option2">Delivery team</option>
            </select>
          </div>
          <div>
          
        </div>

          <button className="w-3/4 h-2/8 rounded-lg p-3 m-5 bg-blue-400 text-white text-lg" onClick={gologin}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
