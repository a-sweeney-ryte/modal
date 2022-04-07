import styles from './Modal.module.css';
import {useState, useEffect, useMemo, cloneElement} from 'react';

export const Modal = ({
  closeOnClickChildrenButton = true,
  closeOnClickOverlay = true,
  openButton,
  openButtonText = 'Open Modal',
  children,
}) => { 
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const clickableOpenButton = useMemo(() => {
    if(openButton) {
      return cloneElement(
        openButton,
        { onClick: handleButtonClick}
      )
    }
  }, []);
  
  const handleOverlayClick = () => { 
    if(closeOnClickOverlay) {
      setIsOpen(!isOpen)
    }
  }

  const handleWrapperClick = (event) => { 
    event.stopPropagation();
  }

  const disableScroll = () => { 
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden'; 
  }

  const enableScroll = () => { 
    document.body.style.height = 'inherit';
    document.body.style.overflow = 'overlay'; 
  }

  useEffect(() => {
    if(isOpen) {
      disableScroll()
    } else {
      enableScroll()
    }

    return () => {
      enableScroll()
    }
  }, [isOpen])

  useEffect(() => {
    let childContainer = document.querySelector('#modal-children-container');

    let buttons = childContainer && childContainer.querySelectorAll('button');
    console.log(buttons)
  }, [])

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
            <div id="modal-children-container">
              {children}
            </div>
          </div>
        </div>
      }
    </>
  )
} 