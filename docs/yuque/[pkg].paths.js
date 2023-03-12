import { loadEnv } from 'vitepress';

const env = loadEnv('', process.cwd(), "");

const fetchData = async () => {
  return fetch('https://www.yuque.com/api/v2/repos/zhaochengqi/puhf6g/toc', {
    headers: {
      'X-Auth-Token': env['X-Auth-Token'],
      'User-Agent': 'vitepress',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(data => {
      if (data.status === 200) return data;
      console.log(data);
      return { data: [] };
    }).catch(err => {
      console.error(err);
      return {
        data: []
      }
    })
}

export default {
  async paths() {
    const data = await fetchData();
    return [
      {
        params: {
          pkg: 'index',
          data
        }
      }
    ]
  }
}