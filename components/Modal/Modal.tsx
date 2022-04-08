import styles from './Modal.module.css';
import {useEffect} from 'react';  

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
  if(isOpen) {
    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.wrapper} onClick={handleWrapperClick}>
          {children}
        </div>
      </div> 
    )
  }
} 