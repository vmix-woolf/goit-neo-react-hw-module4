import styles from './ErrorMessage.module.css'

function ErrorMessage({ message = 'Something went wrong' }) {
    return <p className={styles.error}>{message}</p>
}

export default ErrorMessage
