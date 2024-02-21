import React, { useState } from 'react';


import Navbar from '../Components/navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';



const UserDashboard = () => {

  const [ prompt,setPrompt ] = useState('');
  const [ imageURL, setImageURL ] = useState('/public/images/BG2.jpg');

  const handleGenerate = async() => {
    if(!prompt.trim() == ''){
        try {
            const response = await axios.post('/api/api/generateimage',{prompt:prompt});
            const data = response.data.url;
            console.log(response.data)
            setImageURL(data);
        } catch (error) {
           toast.error('server error');
        }
    }
  }


  return (
    <>
    
        <Navbar />
        <div className='h-[90vh]   bg-slate-300'>
            <div className='mx-auto py-7'>
                <img className='h-[70vh] mx-auto' src={imageURL} alt="" />  
            </div>
            <div className='flex justify-center mt-3'>
              <input className='border-2 border-solid border-slate-600 rounded-md w-3/6 px-2' type="text" onChange={(e) => setPrompt(e.target.value)} />
              <button onClick={handleGenerate} class="flex justify-center items-center gap-2 ml-4 w-28 h-10 cursor-pointer rounded-md shadow-xl text-white font-semibold bg-gradient-to-r from-[#52d795] via-[#039a40] to-[#1c6025] hover:shadow-md hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#52d795] hover:to-[#039a40]">
                Generate
              </button>
 
            </div>
        </div>
    </>
  )
}

export default UserDashboard
