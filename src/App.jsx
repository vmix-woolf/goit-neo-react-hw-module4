import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import ImageModal from './components/ImageModal/ImageModal'
import { searchImages } from './api'

function App() {
    const [query, setQuery] = useState('')
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [selectedImage, setSelectedImage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSearchSubmit = newQuery => {
        setQuery(newQuery)
        setImages([])
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

    const handleImageClick = image => {
        setSelectedImage(image)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedImage(null)
    }

    return (
        <>
            <SearchBar onSubmit={handleSearchSubmit} />

            {isLoading && <p style={{ padding: 16 }}>Завантаження...</p>}
            {error && <p style={{ padding: 16, color: 'red' }}>{error}</p>}

            {images.length > 0 && (
                <ImageGallery images={images} onImageClick={handleImageClick} />
            )}

            <ImageModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                image={selectedImage}
            />

            <Toaster position="top-right" />
        </>
    )
}

export default App
