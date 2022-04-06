import axios from 'axios';

export const testAxios = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
