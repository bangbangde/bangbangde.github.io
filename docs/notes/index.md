---
title: 笔记
description: ''
tags: []
categories: []
created: '2023-3-12 1:48:29'
updated: '2023-3-12 1:48:29'
layout: page
---
<script setup>
  import { data } from "./notes.data.js";
  import Archive from "../../views/Archive.vue";
</script>

<Archive :source="data" />

