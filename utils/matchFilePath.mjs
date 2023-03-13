/**
 * match[1] 全路径
 * match[2] 文件名为 index 时的上级目录名称
 * match[3] 文件名不是 index 时的文件名
 */
const regExp = /\/docs((?:\/\w+)*(?:\/(\w+)\/index|(?!\/index\.md$)\/(\w+)))\.md$/;

/**
 * 匹配文章标题和访问url
 * @param {*} path 
 * @returns { title, url }
 */
export const matchFilePath = path => {
  const [_, url, dirName, fileName] = regExp.exec(path) || [];
  return {
    title: dirName || fileName,
    url
  }
};