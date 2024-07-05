import React from 'react'
import { createPortal } from 'react-dom';
import { IoMdClose } from "react-icons/io";

function Modal({ isopen, openModal, closeModal, children }) {
    return createPortal(

        <>

            {isopen &&
                <div className='z-40 absolute top-0 backdrop-blur h-screen w-screen  grid place-items-center'>
                    <div className=' rounded-lg p-6 relative z-50  m-auto min-h-[250px] min-w-[35%] bg-white'>
                        <div className='flex justify-end'>
                            <IoMdClose onClick={closeModal} className=' cursor-pointer text-3xl text-black' />
                        </div>
                        {children}
                    </div>

                </div>
            }
        </>,
        document.getElementById("modal-root"))
}

export default Modal
