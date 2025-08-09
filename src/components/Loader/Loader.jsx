import { ClipLoader } from 'react-spinners'
import styles from './Loader.module.css'

function Loader() {
    return (
        <div className={styles.loader}>
            <ClipLoader color="#007bff" size={40} />
        </div>
    )
}

export default Loader

