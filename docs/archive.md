---
title: 笔记
description: ''
tags: []
categories: [archive]
created: '2023-3-12 1:48:29'
updated: '2023-3-12 1:48:29'
layout: page
---
<script setup>
  import { data } from "./data/notes-archive.data.js";
  import Archive from "../components/Archive.vue";
</script>

<Archive :source="data" />

