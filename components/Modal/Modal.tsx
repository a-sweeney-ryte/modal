import styles from './Modal.module.css';
import {useState, useEffect, useMemo, cloneElement, useRef} from 'react';

export const Modal = ({
  closeOnClickChildrenButton = true,
  closeOnClickOverlay = true,
  openButton,
  openButtonText = 'Open Modal',
  children,
}) => { 
  const [isOpen, setIsOpen] = useState(false);  
  const childrenWithListeners = getElementsWithPropAddedToTargetType(children, 'button', 'onClick', handleButtonClick);
  // const childrenWithListeners = useMemo(() => {
  //   return getElementsWithOnClickListeners(children);
  // }, [])  
  const [modalContent, setModalContent] = useState(children); 

  // add onClick handler to props.openButton
  const clickableOpenButton = useMemo(() => {
    if(openButton) {
      return addPropToElement(openButton, 'onClick', handleButtonClick);
    }
  }, []);
  
  // Functions
  function addPropToElement(element, key: string, value: Function) {
    return cloneElement(
      element,
      { [key]: value}
    )
  }

  function getElementsWithPropAddedToTargetType(elements, targetType, key, value) {
    return Array.from(elements).map(element => { 
      let newElement;

      if(element.type === targetType) {
        newElement = addPropToElement(element, key, value);
      } else {
        newElement = element;
      }

      return newElement;
    })
  }

  const disableScroll = () => { 
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden'; 
  }

  const enableScroll = () => { 
    document.body.style.height = 'inherit';
    document.body.style.overflow = 'overlay'; 
  }

  const addListenersToChildrenButtons = () => {  
    setModalContent(childrenWithListeners)
  }

  const removeListenersFromChildrenButtons = () => { 
    setModalContent(children)
  }

  // click handlers
  function handleButtonClick() {
    setIsOpen(!isOpen)
  }
  
  const handleOverlayClick = () => { 
    if(closeOnClickOverlay) {
      setIsOpen(!isOpen)
    }
  }

  const handleWrapperClick = (event) => { 
    event.stopPropagation();
  }

  // listener handlers
  const onOpenModal = () => {
    disableScroll()
    addListenersToChildrenButtons()
  }

  const onCloseModal = () => {
    enableScroll()
    removeListenersFromChildrenButtons()
  } 

  // Listeners 
  useEffect(() => {
    if(isOpen) onOpenModal()
    if(!isOpen) onCloseModal()
  }, [isOpen]) 
 
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