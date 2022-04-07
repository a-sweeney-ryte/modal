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
  const childrenContainer = useRef();

  // add onClick handler to 
  const clickableOpenButton = useMemo(() => {
    if(openButton) {
      return addPropToElement(openButton, 'onClick', handleButtonClick);
    }
  }, []);
  
  // Functions
  const addPropToElement = (element, key, value) => {
    return cloneElement(
      element,
      { key: value}
    )
  }

  function getChildrenButtons() {
    return childrenContainer.current && childrenContainer.current.querySelectorAll('button');
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
    const childrenButtons = getChildrenButtons();

    closeOnClickChildrenButton && childrenButtons && childrenButtons.forEach(button => {
      button.addEventListener('click', handleButtonClick)
    })
  }

  const removeListenersFromChildrenButtons = () => {
    const childrenButtons = getChildrenButtons();

    closeOnClickChildrenButton && childrenButtons && childrenButtons.forEach(button => {
      button.removeEventListener('click', handleButtonClick)
    })
  }

  // click handlers
  const handleButtonClick = () => {
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
            <div id="modal-children-container" ref={childrenContainer}>
              {children}
            </div>
          </div>
        </div>
      }
    </>
  )
} 