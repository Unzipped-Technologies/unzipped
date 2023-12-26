import { createContext, useState, useContext } from 'react'

const ModalContext = createContext({
  isModalOpen: false,
  rowId: undefined,
  openModal: () => {},
  closeModal: () => {}
})

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = id => {
    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false)

  return <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>{children}</ModalContext.Provider>
}

const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export default useModal
