import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
    const [query, setQuery] = useState('')

    const handleSearchSubmit = newQuery => {
        setQuery(newQuery)

    }

    return (
        <>
            <SearchBar onSubmit={handleSearchSubmit} />
            {/* Тимчасовий маркер, щоб уникнути попередження про невикористану змінну */}
            {query && <p style={{ padding: 16 }}>Пошук: <b>{query}</b></p>}
            <Toaster position="top-right" />
        </>
    )
}

export default App

