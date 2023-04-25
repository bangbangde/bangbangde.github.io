<script lang="ts">
export default {
  setup() {},
  name: 'bbd-workbench',
  data: () => ({
    utils: [
      { label: '格式化', desc: '支持json,yaml' },
      { label: '正则表达式', desc: ''},
      { label: '图标大全', desc: ''},
      { label: '图床', desc: ''},
      { label: '二维码', desc: ''},
      { label: 'Unicode', desc: ''},
      { label: 'UUID', desc: ''},
      { label: '图片压缩', desc: ''},
      { label: 'hosts', desc: ''},
      { label: 'MOCK', desc: ''},
      { label: 'TEST API', desc: ''},
    ]
  })
}
</script>

<template>
  <div class="BDWorkbench">
    <div class="aside">
      <div
        class="util-item"
        v-for="item in utils"
        :key="item.label"
      >{{ item.label }}</div>
    </div>
    <div class="content"></div>
  </div>
</template>

<style scoped>
.BDWorkbench {
  display: flex;
  min-height: 100%;
}
.aside {
  position: fixed;
  left: 24px;
  top: 50%;
  max-width: var(--vp-sidebar-width);
  background-color: var(--vp-sidebar-bg-color);
  padding: 8px;
  border-radius: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  width: auto;
}

.util-item {
  margin: 8px;
}
.content {
  flex: 1 1 auto;
  height: 100%;
}
</style>