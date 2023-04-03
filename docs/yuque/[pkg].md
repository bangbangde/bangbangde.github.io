---
layout: doc
editLink: false
---
<script setup>
  import YuqueTOC from "../../views/yuque/YuqueTOC.vue";
</script>

<h1 v-if="$params.error">err: {{$params.error}}</h1>
<YuqueTOC v-else :data="$params.data" />