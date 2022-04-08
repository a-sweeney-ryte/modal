import styles from './Modal.module.css';
import {useState, useEffect, useMemo, cloneElement, memo} from 'react';

export const Modal = ({
  isCloseOnClickChildrenButton = true,
  isCloseOnClickOverlay = true,
  openButton,
  openButtonText = 'Open Modal',
  children,
}) => { 
  const [isOpen, setIsOpen] = useState(false); 
  const [modalContent, setModalContent] = useState(children);

  // add onClick handler to props.openButton
  const clickableOpenButton = useMemo(() => {
    if(openButton) {
      return addPropToElement(openButton, 'onClick', handleButtonClick);
    }
  }, []);
  
  // ====== Functions 
  function updateModalContent() {
    let newModalContent;

    if(isOpen && isCloseOnClickChildrenButton) {
      newModalContent = addPropToElements(children, 'onClick', handleButtonClick, 'button'); 
    } else {
      newModalContent = children;
    }

    setModalContent(newModalContent)
  }

  function addPropToElements(elements, key, value, targetType) {
    if(!Array.isArray(elements)) elements = [ elements ];

    return Array.from(elements).map(element => { 
      if(targetType && element.type === targetType) {
        return addPropToElement(element, key, value);
      } else {
        return element;
      }
    })
  }

  function addPropToElement(element, key: string, value: Function) {
    return cloneElement(
      element,
      { [key]: value}
    )
  }

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
    updateModalContent()
  }

  function onCloseModal() {
    enableScroll()
    // updateModalContent()
  } 

  // ====== Listeners 
  useEffect(() => {
    if(isOpen) onOpenModal()
    if(!isOpen) onCloseModal()
  }, [isOpen]) 
 
  // ====== Output 
  return ( 
    <>
      {
        openButton ? clickableOpenButton : (
          <div className={styles.openButtonContainer}>
            <button className={styles.openButton} onClick={handleButtonClick}>{openButtonText}</button>
          </div>
        )
      }
     
      { 
        isOpen &&  
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.wrapper} onClick={handleWrapperClick}>
            <div className={styles.closeButtonContainer}>
              <button className={styles.closeButton} onClick={handleButtonClick}>x</button>
            </div>
            <div>
              {modalContent}
            </div>
          </div>
        </div>
      }
    </>
  )
} 