import React from 'react';
import Modal from 'react-modal';


import './customModal.css';


const CustomModal = ({children, modalIsOpen ,setIsOpen}) => {

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                className='modal'
                contentLabel="Example Modal"
            >
                <div className='w-[100%] absolute top-1  left-[91%]'>
                    <button onClick={() => setIsOpen(false)}>
                        <svg className="w-7 h-7 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6"/>
                        </svg>
                    </button>
                </div>
                {children}
            </Modal>
        </>
    )
}

export default CustomModal;
