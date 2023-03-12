<template>
  <div>
    <TOCItem v-for="(v, k) in toc" :key="k" :params="v" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TOCItem from '../components/TOCItem.vue';

const props = defineProps({
  data: Object
});

const toc = computed(() => {
  const toc = {};
  let stack = [];
  props.data.data.forEach(item => {
    const { type, title, uuid, level, slug, parent_uuid } = item;
    if (level === 0) {
      toc[uuid] = stack[level] = {
        ...item,
        children: []
      }
    } else {
      const child = {
        ...item,
        children: []
      }
      stack[level] = child;
      stack[level - 1].children.push(child);
    }
  });
  return toc;
})
</script>