import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


import EditUser from '../editUser/EditUser';
import UserDetails from './UserDetails';
import style from './profile.module.css';
import { changeProfilePicture } from '../../features/user/useSlice';




const Profile = () => {

    const [editBtn, setEditBtn] = useState(false);
    const { user } = useSelector( (state) => state.user);
    const dispatch = useDispatch();

    const [profileImg, setProfileImg] = useState();
    const [profileImgURL, setProfileImgURL] = useState({change:false,url:`http://localhost:5000/images/${user.profile}` ||''});

    const imageUpload = useRef(null);

    const handleImage = (e) => {
        const newURL = URL.createObjectURL(e.target.files[0]);
        const form = new FormData();
        form.append('avatar',e.target.files[0]);
        setProfileImg(form);

        setProfileImgURL({
            ...profileImgURL,
            change:true,
            url:newURL
        });
    }

    const handleProfileUpdate = async(e) => {
        e.preventDefault();

        try {
            dispatch(changeProfilePicture(profileImg));
            setProfileImgURL({
                ...profileImgURL,
                change:false
            });
       } catch (error) {
            toast.error('Profile Update Failed Try Again.')
        }

    }
    

    return (
        <div className={style.main_div}>

            <div className={style.top_part}></div>

                <div className={style.profile_main_container}>

                <div className={style.profile_container}>
                    <div className={style.profile_picture} style={{backgroundImage:`url(${profileImgURL.url})`}}>
                        <input type="file" ref={imageUpload} name='avatar' className='h-[50%] opacity-0 mx-auto' onChange={handleImage} />
                        <div className='bg-gray-700 p-1  mb-[5%] rounded-[50%]' onClick={()=> imageUpload.current.click()}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8c0-.6.4-1 1-1h1.5l1.7-1.7c.2-.2.4-.3.7-.3h6.2c.3 0 .5.1.7.3L17.5 7H19c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Z"/>
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                        </div>
                    </div>
                    {
                        profileImgURL.change &&
                        <button onClick={handleProfileUpdate} className="cursor-pointer ml-3 flex bg-gray-800 px-2 py-1 mt-4  rounded-md text-white tracking-wider shadow-xl animate-pulse hover:animate-none">
                            <svg className="w-5 h-5 rotate-180 mx-auto mr-2" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" stroke-linejoin="round" stroke-linecap="round" ></path>
                            </svg> Upload
                        </button>
                    }
                    


                    <div className={style.profile_name}>
                        <h1>{user.firstname} {user.lastname}</h1>
                        <p>created at {user.createdAt.slice(0,10)}</p>
                    </div>
                    <div className={style.userDetails}>
                        { editBtn ?  <EditUser user={user} setEditBtn={setEditBtn}/> :<UserDetails user={user} setEditBtn={setEditBtn} /> }
                    </div>
                </div>
                
            </div>
        </div>
  )
}

export default Profile
