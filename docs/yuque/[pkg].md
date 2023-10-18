---
layout: doc
editLink: false
---
<script setup>
  import YuqueTOC from "../../components/yuque/YuqueTOC.vue";
</script>

<template v-if="$params">
  <h1 v-if="$params.error">err: {{$params.error}}</h1>
  <YuqueTOC v-else :data="$params.data" />
</template>