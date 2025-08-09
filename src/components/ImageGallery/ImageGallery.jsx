import styles from './ImageGallery.module.css'

function ImageGallery({ children }) {
    return <ul className={styles.list}>{children}</ul>
}

export default ImageGallery
