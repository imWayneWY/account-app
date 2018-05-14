import axios from 'axios'
const api = process.env.REACT_APP_RECORDS_API_URL 

export const getAll = () =>
    axios.get(`${api}/api/v1/records`)