import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'https://nopescript-default-rtdb.europe-west1.firebasedatabase.app/',
});
