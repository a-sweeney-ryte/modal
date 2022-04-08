import styles from './Modal.module.css';
import {useState, useEffect, useMemo, cloneElement, memo} from 'react';

export const Modal = ({
  closeOnClickChildrenButton = true,
  closeOnClickOverlay = true,
  openButton,
  openButtonText = 'Open Modal',
  children,
}) => { 
  const [isOpen, setIsOpen] = useState(false); 
  const childrenWithButtonListeners = useMemo(() => {
    return getElementsWithPropAddedToTargetType(children, 'button', 'onClick', () => toggleValue(setIsOpen, isOpen, closeOnClickChildrenButton));
  }, [children, setIsOpen, isOpen]);

  const modalContent = useMemo(() => {
    if(isOpen) {
      return childrenWithButtonListeners;
    } else {
      return children;
    }
  }, [isOpen])

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

  // ====== click handlers
  function handleButtonClick() {
    setIsOpen(!isOpen)
  }

  function toggleValue(setFn, value, toggleOn = true) {
    if(toggleOn) {
      setFn(!value);
    }
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
  }

  const onCloseModal = () => {
    enableScroll() 
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