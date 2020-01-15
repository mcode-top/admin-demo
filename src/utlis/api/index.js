import httpRequest from './httpRequest'
const api="http://121.40.228.54:8081/gee/";
export function getData(url,params,option) {
  return httpRequest({
    url:api+url,
    method:'get',
    params:params,
    ...option
  })
}
export function postData(url,params,option) {
  return httpRequest({
    url:api+url,
    method:'post',
    data:params,
    ...option
  })
}
export function deleteData(url,params,option) {
  return httpRequest({
    url:api+url,
    method:'delete',
    params:params,
    ...option
  })
}
export function putData(url,params,option) {
  return httpRequest({
    url:api+url,
    method:'put',
    data:params,
    ...option
  })
}
