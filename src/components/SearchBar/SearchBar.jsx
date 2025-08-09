import styles from './SearchBar.module.css'

function SearchBar() {

    return (
        <header className={styles.header}>
            <form className={styles.form}>
                <input
                    className={styles.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button type="submit" className={styles.button}>Search</button>
            </form>
        </header>
    )
}

export default SearchBar
