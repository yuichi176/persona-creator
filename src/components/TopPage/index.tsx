import styles from './TopPage.module.css'
import { Link } from 'react-router-dom'

export default function TopPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Persona Creator</h1>
      <Link to={'/create'} className={styles.startButton}>
        Start
      </Link>
    </div>
  )
}
