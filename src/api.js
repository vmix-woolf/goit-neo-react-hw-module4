import axios from 'axios'

// 🔹 Твій Access Key з Unsplash (замінити на свій)
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

// Базовий URL Unsplash
const BASE_URL = 'https://api.unsplash.com'

const unsplashApi = axios.create({ baseURL: BASE_URL })

/**
 * Пошук зображень
 * @param {string} query - ключове слово
 * @param {number} page - сторінка
 * @param {number} perPage - кількість зображень на сторінку
 * @returns {Promise<Object>}
 */
export async function searchImages(query, page = 1, perPage = 12) {
    if (!ACCESS_KEY) {
        // Кидаємо явну помилку — її перехопить App і покаже користувачу
        throw new Error('Unsplash Access Key відсутній. Заповни VITE_UNSPLASH_ACCESS_KEY у .env.local')
    }

    const response = await unsplashApi.get('/search/photos', {
        params: { query, page, per_page: perPage },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    })

    return response.data
}
