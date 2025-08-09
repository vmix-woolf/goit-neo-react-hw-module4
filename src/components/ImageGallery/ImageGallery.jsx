import styles from './ImageGallery.module.css'

function ImageGallery({ images, onImageClick }) {
    return (
        <ul className={styles.list}>
            {images.map(img => (
                <li key={img.id}>
                    <div onClick={() => onImageClick(img)}>
                        <img
                            src={img.urls.small}
                            alt={img.alt_description}
                            className={styles.image}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ImageGallery
