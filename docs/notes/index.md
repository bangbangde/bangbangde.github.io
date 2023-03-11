---
titile: 笔记
layout: page
---
<script setup>
  import { data } from "./notes.data.js";
  import Archice from "../../views/Archive.vue";
</script>

<Archice :source="data" />