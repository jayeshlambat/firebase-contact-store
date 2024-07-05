import { useState } from 'react'

function useDisclose() {
    const [isOpen, setisOpen] = useState(false)
    const openModal = () => {
        setisOpen(true)
    }
    const closeModal = () => {
        setisOpen(false)
    }
    return (
        { isOpen, openModal, closeModal }
    )


}

export default useDisclose
