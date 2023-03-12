---
layout: page
---
<script setup>
import { ref, onMounted } from "vue";
const src = ref("");
const iframeHeight = ref(0);

onMounted(() => {
  // window.addEventListener('message', ev => {
  //   if (ev.data.payload?.height) {
  //     iframeHeight.value = ev.data.payload?.height;
  //   }
  // })
  const query = new URLSearchParams(location.search);
  src.value = `https://www.yuque.com/zhaochengqi/puhf6g/${query.get('slug')}?view=doc_embed&from=codebuff&outline=1&title=1`;
  iframeHeight.value = document.getElementById('VPContent').offsetHeight - 64;
})

</script>
<iframe class="yuque-embed" :src="src" :height="iframeHeight"></iframe>

<style>
  .yuque-embed {
    border: none;
    width: 100%;
    margin: 32px 0;
  }
</style>
