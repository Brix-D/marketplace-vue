import Axios from 'axios';

console.log('BASE_API_URI', process.env.VUE_APP_BASE_API_URI);
export const axios = Axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URI,
    debug: true,
});
export default { axios };
