/**
 * match[1] 全路径
 * match[2] 文件名为 index 时的上级目录名称
 * match[3] 文件名不是 index 时的文件名
 */
const regExp = /[\/\\]docs((?:[\/\\][\S]+)*(?:[\/\\]([\S]+)[\/\\]index|(?![\/\\]index\.md$)[\/\\]([\S]+)))\.md$/;

/**
 * 匹配文章标题和访问url
 * @param {*} path 
 * @returns { title, url }
 */
export const matchFilePath = path => {
  const [_, url, dirname, filename] = regExp.exec(path) || [];
  return {
    title: dirname || filename,
    dirname,
    filename,
    isIndex: !filename,
    url
  }
};