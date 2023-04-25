<template>
  <div class="NavBarAvatar">
    <div v-if="loading">...</div>
    <div v-else>
      <button v-if="userInfo == null" class="SignIn" @click="signIn">Sign in</button>
      <img v-else :src="userInfo.avatarUrl" alt="avatar">
    </div>
  </div>
</template>

<script>
import { baseUrl, fetchUserInfo } from "../../api";


export default {
  data: () => ({
    userInfo: null,
    loading: false
  }),
  created() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      this.loading = true;
      return fetchUserInfo().then(data => {
        this.userInfo = data;
      }).catch(err => {
        this.userInfo = null;
      }).finally(() => {
        this.loading = false;
      })
    },
    signIn() {
      const redirectUri = location.href;
      const url = `${baseUrl}/api/oauth/github?redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.open(url, '_blank', 'width=500,height=500');
    }
  }
}
</script>

<style scoped>
.NavBarAvatar {
  margin-left: 32px;
}
.SignIn {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
</style>