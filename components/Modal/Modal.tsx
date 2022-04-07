import styles from '../../styles/Modal.module.css';

export const Modal = ({
  children,
}) => { 
  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton}>x</button>
        </div>
        {children}
      </div>
    </div>
  )
}