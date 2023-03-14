---
title: vitepress 支持的 emoji
description: vitepress 支持的 emoji
tags: [emoji]
categories: [vitepress]
created: '2023-3-12 1:48:29'
updated: '2023-3-12 1:48:29'
---
> https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json

<div v-if="emojiSet" class="emoji-set">
  <span
    class="emoji-box"
    :data-emoji="emoji"
    :data-code="code"
    v-for="(emoji, code) in emojiSet"
  >
    {{ emoji }}
  </span>
</div>
<p v-else>Loading...</p>

<script setup>
  import { ref } from "vue";

  const url = 'https://raw.githubusercontent.com/markdown-it/markdown-it-emoji/master/lib/data/full.json';
  const loading = ref(false);
  const error = ref(null);
  const emojiSet = ref(null);

  function fetchEmoji() {
    if (loading.value) return;
    loading.value = true;
    error.value = null;
    fetch(url).then(res => res.json()).then(data => {
      emojiSet.value = data;
    }).catch(err => {
      error.value = err.message;
      console.error(err);
    }).finally(() => {
      loading.value = false;
    })
  }

  fetchEmoji();
</script>
