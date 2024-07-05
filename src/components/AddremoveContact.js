import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Config/firebase'
import { toast } from 'react-toastify'
import * as yup from "yup"

const contactVAlidationSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    Email: yup.string().email("invalid Email").required("Email is required")
}

)

function AddremoveContact({ isupdate, isOpen, openModal, closeModal, contact }) {

    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts")
            await addDoc(contactRef, contact)
            closeModal()
            toast.success("contact added succesfully")

        } catch (error) {
            console.log(error);
        }

    }
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id)
            await updateDoc(contactRef, contact)
            closeModal()
            toast.success("contact updated succesfully")
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <Modal
                isopen={isOpen}
                openModal={openModal}
                closeModal={closeModal}

            >

                <Formik
                    validationSchema={contactVAlidationSchema}
                    initialValues={isupdate ? {
                        name: contact.name,
                        Email: contact.Email,

                    }
                        :
                        {
                            name: "",
                            Email: ""
                        }}
                    onSubmit={(values) => {
                        console.log(values);
                        isupdate ?
                            updateContact(values, contact.id)
                            :
                            addContact(values)
                    }}
                >
                    <Form>
                        <div className='flex flex-col gap-1'>
                            <label className='font-bold' htmlFor='name'>Name</label>
                            <Field className='border h-10' name="name" />

                            <div className='text-red-500'>
                                <ErrorMessage
                                    name="name"
                                />
                            </div>
                            <label className='font-bold' htmlFor='Email'>Email</label>
                            <Field className='border h-10' name="Email" />
                            <div className='text-red-500'>
                                <ErrorMessage
                                    name="Email"
                                />
                            </div>


                            <button className=' font-bold mt-1 rounded-lg bg-orange px-4 py-1 border self-end'>{isupdate ? "update" : "add"} Contact</button>
                        </div>

                    </Form>
                </Formik>
            </Modal >
        </div>
    )
}

export default AddremoveContact
