<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ExampleComponentState, ExampleComponentProps } from './ExampleComponent.state.ts';

export default defineComponent({
  inheritAttrs: false,
  props: {
    meta: {
      type: Object as PropType<ExampleComponentProps>,
      default: new ExampleComponentProps()
    }
  },
  data() {
    return {
      state: new ExampleComponentState()
    };
  },
  async mounted() {
    await this.state.init();
  },
  methods: {
  }
})
</script>

<template>
  <h1>{{ meta?.msg }}</h1>
  <h1>{{ meta?.name }}</h1>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
@import './ExampleComponent.scss';
</style>
