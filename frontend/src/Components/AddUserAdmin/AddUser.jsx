import React , { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import axios from 'axios';



import validateRegister from '../register/validateRegister';
import { usersDataUpdate } from '../../features/admin/adminSlice';
import './addUser.css';




const INTIAL_STATE = {
  firstname:'',
  lastname:'',
  email:'',
  phoneNumber:'',
  password:''
}


const UserRegisterAdmin = ({setIsOpen}) => {

    const [ registerData, setRegisterData ] = useState(INTIAL_STATE);
    const [ errors, setErrors ] = useState(INTIAL_STATE);
    const dispatch = useDispatch();

    const { firstname, lastname, email, phoneNumber, password } = registerData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]:value
        });
        validateRegister(name, value, errors, setErrors)
    }


    const handleRegister = async(e) => {
        e.preventDefault();
        
        try{
            const isFormValid = Object.values(errors).every(error => error == '' && firstname && lastname && email && phoneNumber && password);

            if(!isFormValid){
                toast.error('Please Enter All Fields.')
            }else{
                const response = await axios.post('/api/api/admin/adduser',registerData);
                const data = response.data;
                dispatch(usersDataUpdate(data.usersData));
                toast.success('User Register Successfully');
                setTimeout(() => {
                    setIsOpen(false);
                },2000)
            }
        }catch(error) {
            toast.error(error.response.data.message)
        }

    }

    return (
        <div  className='add-user'>
            <form onSubmit={handleRegister}>
                <h1 className='text-center tracking-wider font-bold py-4 text-xl'>User Registration</h1>
                <p className='adduser-label'>Firstname</p>
                <input type="text" className={errors.firstname ? 'error-input' : 'adduser-input'} name="firstname" placeholder='firstname' value={firstname} onChange={handleChange}/>
                <p className='adduser-error'>{errors.firstname}</p>

                <p className='adduser-label'>Lastname</p>
                <input type="text" className={errors.lastname ? 'error-input' : 'adduser-input'} name="lastname" placeholder='lastname' value={lastname} onChange={handleChange}/>
                <p className='adduser-error'>{errors.lastname}</p>


                <p className='adduser-label'>Email</p>
                <input type="text" className={errors.email ? 'error-input' : 'adduser-input'} name="email" placeholder='email' value={email} onChange={handleChange} />
                <p className='adduser-error'>{errors.email}</p>


                <p className='adduser-label'>PhoneNumber</p>
                <input type="text" className={errors.phoneNumber ? 'error-input' : 'adduser-input'} name="phoneNumber" placeholder='phone number' value={phoneNumber} onChange={handleChange} />
                <p className='adduser-error'>{errors.phoneNumber}</p>


                <p className='adduser-label'>Password</p>
                <input type="text" className={errors.password ? 'error-input' : 'adduser-input'} name="password" placeholder='password' value={password} onChange={handleChange}/>
                <p className='adduser-error'>{errors.password}</p>


                <button className='w-[100%] py-1 mt-3 bg-black text-white font-lg font-[600] tracking-[2px] rounded'>Register</button>
            </form>
        </div>
    )
}

export default UserRegisterAdmin
