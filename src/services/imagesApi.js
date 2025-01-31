import axios from 'axios';

const apiKey = '47183054-e1a59e68b6a36ed457abdd105';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=20`;
  const response = await axios.get(url);
  return response.data;
}
