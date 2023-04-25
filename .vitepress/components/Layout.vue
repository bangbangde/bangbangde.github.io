<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme';
import NavBarAvatar from './NavBarAvatar.vue';

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <NavBarAvatar />
    </template>
  </Layout>
</template>