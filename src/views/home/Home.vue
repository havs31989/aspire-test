<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { HomeState, HomeProps } from './Home.state.ts';
import LayoutComponent from '../../common/components/layout/LayoutComponent.vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    LayoutComponent
  },
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
  <LayoutComponent>
    <h1>Home</h1>
  </LayoutComponent>
</template>

<style scoped>
@import './Home.scss';
</style>
