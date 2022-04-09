import styles from './Modal.module.css';
import {useEffect} from 'react';  
import {createPortal} from 'react-dom';

export const Modal = ({
  isOpen, 
  setIsOpen,
  isCloseOnClickOverlay = true,
  children
}) => { 
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
  function handleOverlayClick() { 
    if(isCloseOnClickOverlay) {
      setIsOpen(!isOpen)
    }
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
  if(isOpen) {
    return createPortal(
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.wrapper}>
          {children}
        </div>
      </div>,
      document.body
    )
  }
} 