import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import SearchBar from './components/SearchBar/SearchBar'
import { searchImages } from './api'

function App() {
    const [query, setQuery] = useState('')
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearchSubmit = newQuery => {
        setQuery(newQuery)
        setImages([]) // очищаємо попередні результати
    }

    useEffect(() => {
        if (!query) return

        const fetchImages = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const data = await searchImages(query)
                setImages(data.results)
            } catch (err) {
                setError('Не вдалося завантажити зображення')
            } finally {
                setIsLoading(false)
            }
        }

        fetchImages()
    }, [query])

    return (
        <>
            <SearchBar onSubmit={handleSearchSubmit} />
            {isLoading && <p style={{ padding: 16 }}>Завантаження...</p>}
            {error && <p style={{ padding: 16, color: 'red' }}>{error}</p>}
            {images.length > 0 && (
                <ul style={{ padding: 16 }}>
                    {images.map(img => (
                        <li key={img.id}>
                            <img src={img.urls.small} alt={img.alt_description} width="200" />
                        </li>
                    ))}
                </ul>
            )}
            <Toaster position="top-right" />
        </>
    )
}

export default App


