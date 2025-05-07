<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { HomeState, HomeProps } from './Home.state.ts';

export default defineComponent({
  inheritAttrs: false,
  props: {
    meta: {
      type: Object as PropType<HomeProps>,
      default: new HomeProps()
    }
  },
  data() {
    return {
      state: new HomeState()
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
  <h1>Home</h1>
</template>

<style scoped>
@import './Home.scss';
</style>
