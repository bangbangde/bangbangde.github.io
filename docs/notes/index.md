---
title: 笔记
description: ''
tags: []
categories: [archive]
created: '2023-3-12 1:48:29'
updated: '2023-3-12 1:48:29'
layout: doc
---
<script setup>
  import { data } from "../data/notes-index.data.js";
  import NotesIndex from "../../components/NotesIndex.vue";
</script>

<NotesIndex :source="data" />

