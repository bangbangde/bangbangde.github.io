module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier'],
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  plugins: ['vue'],
  ignorePatterns: ["packages/**/*"],
  rules: {
    // 在这里添加您的规则
  },
};
