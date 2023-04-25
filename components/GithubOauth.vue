<template>
  <div>
    <button @click="() => openOauthWindow()">Connect to Github</button>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    openOauthWindow() {
      window.open('https://github.com/login/oauth/authorize?scope=user:email&client_id=bcf9b31b393990fe5bb9', 'newWindow', 'width=500,height=500');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>