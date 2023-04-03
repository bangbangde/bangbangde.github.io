import { loadEnv } from 'vitepress';

const env = loadEnv('', process.cwd(), "");

const fetchData = async () => {
  // console.log('env:token', env.TOKEN_YUQUE);
  return fetch('https://www.yuque.com/api/v2/repos/zhaochengqi/puhf6g/toc', {
    headers: {
      'X-Auth-Token': env.TOKEN_YUQUE,
      'User-Agent': 'vitepress',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) return {
      data: res.json(),
      error: null
    };
    return { data: null, error: new Error(res.statusText) };
  }).catch(err => {
    return {
      data: null,
      error: err
    }
  })
}

export default {
  async paths() {
    const {data, error} = await fetchData();
    return [
      {
        params: {
          pkg: 'index',
          data,
          error: error.message
        }
      }
    ]
  }
}