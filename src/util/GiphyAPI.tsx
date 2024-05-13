import axios from 'axios';

const API_KEY = 'zwP7Z7O94LpXZ3Y1AO9NIx1IXXAVP7uo';

export const fetchGifs = async (currentPage = 1) => {
  try {
    const TRENDING_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20&offset=${
      (currentPage - 1) * 20
    }&rating=g&bundle=messaging_non_clips`;
    const response = await axios.get(TRENDING_URL);
    return response?.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchSearchGifs = async (searchTerm: string, currentPage = 1) => {
  const formattedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, '+');
  const SEARCH_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${formattedSearchTerm}&limit=10&offset=${
    (currentPage - 1) * 10
  }&rating=g&lang=en&bundle=messaging_non_clips`;
  try {
    const response = await axios.get(SEARCH_URL);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
