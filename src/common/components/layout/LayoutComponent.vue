<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { LayoutComponentState, LayoutComponentProps } from './LayoutComponent.state.ts';
import { appRouteNames } from '../../../appRouter.ts';

export default defineComponent({
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
  <template v-if="state.isReady">
    <div class="layout flex-1 flex flex-col xl:flex-row">
      <div class="left-menu flex-col h-full hidden xl:flex">
        <div class="logo" alt="menu-app-logo"></div>
        <div class="slogan">
          <span class="text-white">{{ state.lanuage.text.layout.slogan }}</span>
        </div>
        <div class="menu flex-1 w-full">
          <RouterLink
            class="menu-item flex justify-start items-center"
            :class="{ 'active': $props.meta?.pageRouteName == routeNames.Home }" :to="{ name: routeNames.Home }"
          >
            <img class="menu-item-icon" src="/assets/img/Home.svg" alt="menu-item-icon">
            <span class="menu-item-title">{{ state.lanuage.text.layout.home }}</span>
          </RouterLink>
          <RouterLink
            class="menu-item flex justify-start items-center"
            :class="{ 'active': $props.meta?.pageRouteName == routeNames.Cards }" :to="{ name: routeNames.Cards }"
          >
            <img class="menu-item-icon" src="/assets/img/Card.svg" alt="menu-item-icon">
            <span class="menu-item-title">{{ state.lanuage.text.layout.card }}</span>
          </RouterLink>
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
      <div class="top-menu flex w-full xl:hidden">
        <div class="logo" alt="menu-app-logo"></div>
      </div>
      <div class="content flex-1 flex flex-col xl:px-[60px] xl:py-[59px] mb-[50px] xl:mb-0">
        <slot></slot>
      </div>
      <div class="footer-menu flex justify-between shadow w-full xl:hidden">
        <RouterLink
          class="menu-item flex flex-col justify-start items-center"
          :class="{ 'active': $props.meta?.pageRouteName == routeNames.Home }" :to="{ name: routeNames.Home }"
        >
          <img class="menu-item-icon" src="/assets/img/Home.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.home }}</span>
        </RouterLink>
        <RouterLink
          class="menu-item flex flex-col justify-start items-center"
          :class="{ 'active': $props.meta?.pageRouteName == routeNames.Cards }" :to="{ name: routeNames.Cards }"
        >
          <img class="menu-item-icon" src="/assets/img/Card.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.card }}</span>
        </RouterLink>
        <a class="menu-item flex flex-col justify-start items-center" href="#">
          <img class="menu-item-icon" src="/assets/img/Payments.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.payments }}</span>
        </a>
        <a class="menu-item flex flex-col justify-start items-center" href="#">
          <img class="menu-item-icon" src="/assets/img/Credit.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.credit }}</span>
        </a>
        <a class="menu-item flex flex-col justify-start items-center" href="#">
          <img class="menu-item-icon" src="/assets/img/Account.svg" alt="menu-item-icon">
          <span class="menu-item-title">{{ state.lanuage.text.layout.settings }}</span>
        </a>
      </div>
    </div>
  </template>
  <template v-if="!state.isReady">
    <div class="layout flex-1 flex flex-col justify-center items-center">
      <div class="flex w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>
  </template>
</template>

<style scoped>
@import './LayoutComponent.scss';
</style>
