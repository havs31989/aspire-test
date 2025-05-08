<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { HomeState, HomeProps } from './Home.state.ts';
import LayoutComponent from '../../common/components/layout/LayoutComponent.vue';
import { appRouteNames } from '../../appRouter.ts';

export default defineComponent({
  inheritAttrs: false,
  components: {
    Layout: LayoutComponent
  },
  props: {
    meta: {
      type: Object as PropType<HomeProps>,
      default: new HomeProps()
    }
  },
  data() {
    return {
      state: new HomeState(),
      routeNames: appRouteNames
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
  <Layout :meta="{ pageRouteName: routeNames.Home }">
    <h1>Home</h1>
  </Layout>
</template>

<style scoped>
@import './Home.scss';
</style>
