import { loadEnv } from 'vitepress';

const env = loadEnv('', process.cwd(), "");

const fetchData = async () => {
  const res = await (await fetch('https://www.yuque.com/api/v2/repos/zhaochengqi/puhf6g/toc', {
    headers: {
      'X-Auth-Token': env['X-Auth-Token'],
      'User-Agent': 'vitepress',
      'Content-Type': 'application/json'
    }
  })).json();
  return res;
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