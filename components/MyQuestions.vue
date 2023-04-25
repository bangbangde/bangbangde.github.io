<template>
  <div class="MyQuestions">
    <div
      v-for="item in props.source"
      :key="item.title"
      class="MyQuestion"
    >
      <div class="QTitle">
        <span class="QType">[{{ item.type }}]</span>
        {{ item.title }}
      </div>
      <div class="QDetail">Q: {{ item.detail }}</div>
      <div class="QAnswer">A: {{ item.answer || 'unknown' }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  source: Array<{
    title: string
    type: string
    detail: string
    answer: string
  }>
}>();

</script>

<style scoped>
.MyQuestion {
  margin: 32px 0 64px;
  font-size: 14px;
}
.QTitle {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-yellow);
}
.QType {
  color: var(--vp-c-brand);
}
.QDetail {
  margin: 18px 0;
  color: var();
}

.QAnswer {
  color: var(--vp-c-brand-dark);
}
</style>