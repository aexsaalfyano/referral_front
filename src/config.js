const API_PRODUCTION = process.env.VUE_APP_API_PRODUCTION // API Production
const API_DEV = 'http://localhost:5000' // API Development

export const API_URL = process.env.NODE_ENV === 'development' ? API_DEV : API_PRODUCTION;