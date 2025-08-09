import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import ImageModal from './components/ImageModal/ImageModal'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import Loader from './components/Loader/Loader'
import { searchImages } from './api'

function App() {
    const [query, setQuery] = useState('')
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [totalPages, setTotalPages] = useState(0)

    const [selectedImage, setSelectedImage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSearchSubmit = newQuery => {
        setQuery(newQuery)
        setImages([])
        setPage(1) // повертаємось на першу сторінку
    }

    useEffect(() => {
        if (!query) return
        const fetchImages = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const data = await searchImages(query, page)
                setImages(prev => (page === 1 ? data.results : [...prev, ...data.results]))
                setTotalPages(Math.ceil(data.total / 12))
            } catch (err) {
                setError('Не вдалося завантажити зображення')
            } finally {
                setIsLoading(false)
            }
        }
        fetchImages()
    }, [query, page])

    const handleImageClick = image => {
        setSelectedImage(image)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedImage(null)
    }

    const handleLoadMore = () => setPage(prev => prev + 1)

    return (
        <>
            <SearchBar onSubmit={handleSearchSubmit} />

            {error && <p style={{ padding: 16, color: 'red' }}>{error}</p>}

            {images.length > 0 && (
                <>
                    <ImageGallery images={images} onImageClick={handleImageClick} />
                    {isLoading && <Loader />}  {/* 🔹 тепер індикатор під галереєю */}
                    {page < totalPages && !isLoading && (
                        <LoadMoreBtn onClick={handleLoadMore} />
                    )}
                </>
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
