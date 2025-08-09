import Modal from 'react-modal'
import styles from './ImageModal.module.css'

Modal.setAppElement('#root')

function ImageModal({ isOpen, onRequestClose, image }) {
    if (!image) return null

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Image preview"
            overlayClassName={styles.overlay}
            className={styles.content}
        >
            <img
                src={image.urls.regular}
                alt={image.alt_description}
                className={styles.image}
            />
            <p>Автор: {image.user.name}</p>
            <p>Лайків: {image.likes}</p>
            {image.description && <p>{image.description}</p>}
        </Modal>
    )
}

export default ImageModal

