<template>
  <div class="comp-show-code">
    <div><slot></slot></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  defaultShowView: Boolean
})
const showCode = ref(!!props.defaultShowView);
</script>