<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { LayoutComponentState, LayoutComponentProps } from './LayoutComponent.state.ts';

export default defineComponent({
  name: 'LayoutComponent',
  inheritAttrs: false,
  props: {
    meta: {
      type: Object as PropType<LayoutComponentProps>,
      default: new LayoutComponentProps()
    }
  },
  data() {
    return {
      state: new LayoutComponentState(),
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
  <div class="layout flex-1 flex">
    <div class="left-menu flex flex-col h-full">
      <div class="logo" alt="menu-app-logo"></div>
      <div class="slogan">
        <span>{{ state.lanuage.text.layout.slogan }}</span>
      </div>
      <div class="menu flex-1 w-full">
        <a class="menu-item flex justify-start items-center" href="#">
          <img class="menu-item-icon" src="/assets/img/Home.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.home }}</span>
        </a>
        <a class="menu-item active flex justify-start items-center" href="#">
          <img class="menu-item-icon" src="/assets/img/Card.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.card }}</span>
        </a>
        <a class="menu-item flex justify-start items-center" href="#">
          <img class="menu-item-icon" src="/assets/img/Payments.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.payments }}</span>
        </a>
        <a class="menu-item flex justify-start items-center" href="#">
          <img class="menu-item-icon" src="/assets/img/Credit.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.credit }}</span>
        </a>
        <a class="menu-item flex justify-start items-center" href="#">
          <img class="menu-item-icon" src="/assets/img/Account.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.settings }}</span>
        </a>
      </div>
    </div>
    <div class="content flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@import './LayoutComponent.scss';
</style>
