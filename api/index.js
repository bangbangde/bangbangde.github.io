export const baseUrl = process.env.NODE_ENV === 'development' ?
  'https://local.next.codebuff.tech' :
  'https://next.codebuff.tech';

export const fetchUserInfo = async () => {
  return fetch(baseUrl + '/api/oauth/decode', {
    method: 'POST'
  }).then(res => {
    if (!res.ok) throw new Error(`error status: ${res.status}`);
    return res.json()
  })
}