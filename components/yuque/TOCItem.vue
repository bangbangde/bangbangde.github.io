<template>
  <div class="toc-item">
    <span v-if="params.type === 'TITLE'">[D]</span>
    <span v-if="params.type === 'DOC'">[A]</span>
    <a v-if="params.url" :href="`https://www.yuque.com/zhaochengqi/puhf6g/${params.url}`" target="_blank">{{ params.title }}</a>
    <span :class="'title-menu lv-' + params.level" v-else>{{ params.title }}</span>
    <ul v-if="params.children.length">
      <li v-for="(item, i) in params.children" :key="i">
        <toc-item :params="item"></toc-item>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'toc-item',
    props: {
      params: Object
    }
  }
</script>

<style scoped>
.title-menu {
  font-weight: 700;
  font-size: 16px;
}
.lv-0 { font-size: 20px; }
.lv-1 { font-size: 18px; }
.lv-2 { font-size: 16px; }
</style>