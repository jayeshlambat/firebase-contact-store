import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import { db } from '../Config/firebase'
import useDisclose from '../hooks/useDisclose'
import AddremoveContact from './AddremoveContact'
import { toast } from 'react-toastify'

function ContactList({ contact }) {


    const deleteContact = async (id) => {

        try {

            await deleteDoc(doc(db, "contacts", id))
            toast.success("contact deleted succesfully")
        } catch (error) {
            console.log(error);
        }
    }
    const { isOpen, openModal, closeModal } = useDisclose()
    return (
        <>
            <div key={contact.id}
                className='flex items-center flex-row bg-blue-200 justify-between p-3 rounded-lg mt-3'>
                <div className='flex gap-1'>  {/*  flex-row */}
                    <CgProfile className='text-blue-800 text-4xl  ' />{  /* items-center */}
                    <div className='ml-2'> {/*  ml-2 */}
                        <h1 className='text-black font-medium'> {contact.name}</h1>
                        <p className='text-black'> {contact.Email}</p>
                    </div>



                </div>
                <div className='flex text-3xl'> {/*  flex-row */}
                    <RiEditCircleLine onClick={openModal} className='text-black text-4xl cursor-pointer ' />
                    <IoMdTrash onClick={() => deleteContact(contact.id)} className='text-blue-800 text-4xl cursor-pointer ' />
                </div>
            </div>


            <AddremoveContact contact={contact}
                isupdate
                isOpen={isOpen}
                closeModal={closeModal}
            />




        </>
    )
}

export default ContactList
