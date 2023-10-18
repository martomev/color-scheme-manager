<template>
  <div>
    Hello, world!
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ColorSchemeManager from '../script';

onMounted(() => {
  window.ColorSchemeManager = ColorSchemeManager.init();
});
</script>