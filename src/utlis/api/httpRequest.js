import axios from 'axios'
import qs from 'qs';
const httpRequest=axios.create({
  timeout:60*5*1000
});
httpRequest.interceptors.request.use(config=>{
  console.log(config);
  if(config.headers['Content-Type']==="application/x-www-form-urlencoded"){
    config.data=qs.stringify(config.data);
  }
  if(sessionStorage.getItem('token')){
    config.headers['Authorization']=sessionStorage.getItem('token');
  }
  return config;
});
export default httpRequest;
