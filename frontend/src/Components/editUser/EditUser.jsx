import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import validateRegister from '../register/validateRegister';
import { updateDetails } from '../../features/user/useSlice';
import './editUser.css';

const INTIAL_STATE = {
    firstname:'',
    lastname:'',
    phoneNumber:''
}

const EditUser = ({setEditBtn}) => {

    const { user } = useSelector( (state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ editData, setEditData ] = useState({
                                                    firstname:user.firstname,
                                                    lastname:user.lastname,
                                                    phoneNumber:user.phoneNumber
                                                });
    const [ errors , setErrors ] = useState(INTIAL_STATE);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]:value
        });
        validateRegister(name,value,errors,setErrors);
    }

    const handleEditUser = async(e) => {
        e.preventDefault();

        const { firstname , lastname , phoneNumber } = editData;
        const isFormValid = Object.values(errors).every(error => error == '' && firstname && lastname && phoneNumber);

        try {
            if(isFormValid){
                dispatch(updateDetails(editData));
                setTimeout(() => {
                    setEditBtn(false)
                }, 2800);
            }else{
                toast.error('Empty Field to Update is Not Possible')
            }
        } catch (error) {
            toast.error('Edit Failed Please Try Again.')
        }
    }

    return (
        <div className='edit-user'>
        <form onSubmit={handleEditUser}>
            <h6>Firstname </h6>
            <input className='edit-user-input'  type="text" value={editData.firstname} name='firstname' onChange={handleChange} />
            {errors.firstname && <p className='error-edituser'>{errors.firstname}</p>  }
            

            <h6>Lastname </h6>
            <input className='edit-user-input' type="text" value={editData.lastname} name='lastname' onChange={handleChange} />
            {errors.lastname && <p className='error-edituser'>{errors.lastname}</p>  }

            <h6>Phone Number </h6>
            <input className='edit-user-input' type="text" value={editData.phoneNumber} name='phoneNumber' onChange={handleChange} />
            {errors.phoneNumber && <p className='error-edituser'>{errors.phoneNumber}</p>  }

            <button class="relative py-1 w-11/12 mt-5 px-8 text-black text-base font-bold  overflow-hidden bg-gray-400 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0" >
                Edit
            </button> 

            <button onClick={() =>{ setEditBtn(false); navigate('/profile')}} class="cursor-pointer mt-4 rounded-[20px] font-semibold overflow-hidden relative z-100 border border-black  group px-8  w-11/12">
                <span class="relative z-10 text-black group-hover:text-white text-xl duration-500">Back</span>
                <span class="absolute w-11/12 h-full bg-black -left-36 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span class="absolute w-11/12 h-full bg-black -right-36 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>

        </form>
        </div>
    )
}

export default EditUser
