import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_BACKEND_SERVICE

const instance = axios.create({
baseURL: SERVER_URL,
timeout: 60000
});

export default {
//load csv to database
storeCsv(csvDTOS){
  alert(SERVER_URL);
  return instance.post('store/csv', csvDTOS,{
    headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods':'*', 
    },
  })}
}