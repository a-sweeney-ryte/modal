import styles from '../styles/Home.module.css'
import { Modal } from '../components/Modal/Modal.tsx';

export default function Home() {
  return (
    <div className={styles.background}> 
      <h1 className={styles.heading}>Example Heading</h1>
      <p className={styles.text}>example text</p>

      <div className={styles.btnContainer}>
        <button className={styles.btn}>Open Modal</button>
      </div>   

      {/* <Modal>
        
      </Modal>  */}
    </div>
  )
}
