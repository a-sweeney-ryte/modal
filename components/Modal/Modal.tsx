import styles from './Modal.module.css';
import {useState, useEffect, createContext} from 'react'; 
import { ModalChildren } from '../ModalChildren/ModalChildren.tsx';
import { ModalButton } from '../ModalButton/ModalButton.tsx';

export const Modal = ({
  isCloseOnClickOverlay = true,
}) => { 
  const ModalContext = createContext(); 
  const [isOpen, setIsOpen] = useState(false); 

  // ====== utils
  function disableScroll() { 
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden'; 
  }

  function enableScroll()  { 
    document.body.style.height = 'inherit';
    document.body.style.overflow = 'overlay'; 
  }

  // ====== click handlers
  function handleButtonClick() {
    setIsOpen(!isOpen)
  }
  
  function handleOverlayClick() { 
    if(isCloseOnClickOverlay) {
      setIsOpen(!isOpen)
    }
  }

  function handleWrapperClick(event) { 
    event.stopPropagation();
  }

  // ====== listener handlers
  function onOpenModal() {
    disableScroll()
  }

  function onCloseModal() {
    enableScroll()
  } 

  // ====== Listeners 
  useEffect(() => {
    if(isOpen) onOpenModal()
    if(!isOpen) onCloseModal()
  }, [isOpen]) 
 
  // ====== Output 
  return ( 
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      { 
        isOpen ?  
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.wrapper} onClick={handleWrapperClick}>
            <div className={styles.closeButtonContainer}>
              <button className={styles.closeButton} onClick={handleButtonClick}>x</button>
            </div>
            <ModalChildren context={ModalContext}/>
          </div>
        </div>
        :
        <ModalButton context={ModalContext}/>
      }
    </ModalContext.Provider>
  )
} 