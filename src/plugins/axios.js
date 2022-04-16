import Axios from 'axios';

export const axios = Axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URI,
    debug: true,
});
export default { axios };
