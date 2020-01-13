import httpRequest from './httpRequest'
export function getData(url,params,option) {
  return httpRequest({
    url:'/api/'+url,
    method:'get',
    params:params,
    ...option
  })
}
export function postData(url,params,option) {
  return httpRequest({
    url:'/api/'+url,
    method:'post',
    data:params,
    ...option
  })
}
export function deleteData(url,params,option) {
  return httpRequest({
    url:'/api/'+url,
    method:'delete',
    params:params,
    ...option
  })
}
export function putData(url,params,option) {
  return httpRequest({
    url:'/api/'+url,
    method:'put',
    data:params,
    ...option
  })
}
