<!--.vitepress/theme/MyLayout.vue-->
<script lang="ts" setup>
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