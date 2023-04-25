---
title: "Q&A"
layout: doc
editLink: false
lastUpdated: false
---
# Q&A

<script lang="ts" setup>
  import { data } from "./data/questions.data.js";
  import MyQuestions from "../components/MyQuestions.vue";
</script>

<MyQuestions :source="data" />