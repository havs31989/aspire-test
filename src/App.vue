<script setup lang="ts">
import { AppEnvironment } from './appEnvironment';
document.getElementsByTagName('title')[0].text = AppEnvironment.APP_TITLE;
</script>

<template>
  <RouterView></RouterView>
</template>
<style scoped></style>
