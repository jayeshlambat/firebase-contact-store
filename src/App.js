import { CiCirclePlus } from 'react-icons/ci';
import './App.css';
import Navbar from './components/Navbar';
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from './Config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactList from './components/ContactList';
import AddremoveContact from './components/AddremoveContact';
import useDisclose from './hooks/useDisclose';
import NotFoundContact from './components/NotFoundContact';



function App() {
  const [contact, setcontact] = useState([])
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts")

        onSnapshot(contactRef, (snapshot) => {
          const contactlist = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }

          })
          setcontact(contactlist)
          return contactlist
        })

      } catch (error) {
        console.log(error)
      }
    }
    getContacts()
  }, [])

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, "contacts")

    onSnapshot(contactRef, (snapshot) => {
      const contactlist = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }

      })
      const filteredContact = contactlist.filter((contacts) =>
        contacts.name.toLowerCase().includes(value.toLowerCase()
        ));

      setcontact(filteredContact);

      return filteredContact;
    });
  };

  const { isOpen, openModal, closeModal } = useDisclose()


  return (
    <div className="max-w-[30rem] m-auto">
      <Navbar />
      <div className='flex relative items-center'>
        <IoMdSearch className='text-white text-3xl absolute ml-1 ' />
        <input onChange={filterContacts} className='bg-transparent border border-white   text-white rounded-lg flex-grow h-10 pl-10 ' type='text' placeholder='search contact' />
        <CiCirclePlus onClick={openModal} className='text-white text-5xl ml-1 cursor-pointer' />
      </div>
      <div>
        {
          contact.length <= 0 ? <NotFoundContact />
            :
            contact.map((contact) => (
              <ContactList

                key={contact.id}
                contact={contact}
              />
            ))
        }
      </div>
      <AddremoveContact
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}

      />
      <ToastContainer position='bottom-center' />
    </div >
  );
}

export default App;
