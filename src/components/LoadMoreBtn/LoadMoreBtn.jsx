import styles from './LoadMoreBtn.module.css'

function LoadMoreBtn({ onClick }) {
    return (
        <div className={styles.wrap}>
            <button type="button" className={styles.button} onClick={onClick}>
                Load more
            </button>
        </div>
    )
}

export default LoadMoreBtn
