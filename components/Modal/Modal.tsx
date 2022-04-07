import styles from './Modal.module.css';
import {useState, useEffect} from 'react';

export const Modal = ({
  children,
}) => { 
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
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


  return ( 
    <>
      <div className={styles.openButtonContainer}>
        <button className={styles.openButton} onClick={handleButtonClick}>Open Modal</button>
      </div>

      { isOpen && 
        <div className={styles.overlay}>
          <div className={styles.wrapper}>
            <div className={styles.closeButtonContainer}>
              <button className={styles.closeButton} onClick={handleButtonClick}>x</button>
            </div>
            {children}
          </div>
        </div>
      }
    </>
  )
} 