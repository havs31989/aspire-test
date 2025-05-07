<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { AppEnvironment } from './appEnvironment';
import { appRouteNames } from './appRouter';
document.getElementsByTagName('title')[0].text = AppEnvironment.APP_TITLE;
</script>

<template>
  <div style="display: flex; justify-content: space-between;">
    <RouterLink :to="{ name: appRouteNames.Home }">Home</RouterLink>
    <RouterLink :to="{ name: appRouteNames.About }">About</RouterLink>
  </div>
  <RouterView></RouterView>
  <div style="display: grid;">
    <span>
      {{ AppEnvironment.APP_TITLE }}
    </span>
    <small>
      {{ AppEnvironment.APP_VERSION }} - {{ AppEnvironment.APP_ENV }}
    </small>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
