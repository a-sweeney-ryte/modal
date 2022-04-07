import styles from '../../styles/Modal.module.css';

export const Modal = ({
  children,
}) => { 
  return (
    <div className={styles.overlay}>
      <div>
        {children}
      </div>
    </div>
  )
}