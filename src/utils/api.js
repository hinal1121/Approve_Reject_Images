import client from './client'

const getRandomPhoto = async () => {
  return client.get('https://api.unsplash.com/photos/random')
}

const api = {
  getRandomPhoto,
}

export default api
