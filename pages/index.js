import styles from '../styles/Home.module.css'
import { Modal } from '../components/Modal/Modal.tsx';
import { useState } from 'react';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}> 
        <h1 className={styles.heading}>Example Heading</h1>
        <p className={styles.text}>example text</p>
 
        <Modal openButton={<button>Passed Button</button>}>
          <p>Hello World</p>
        </Modal> 
      </div>

      <div className={styles.content}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  )
}
