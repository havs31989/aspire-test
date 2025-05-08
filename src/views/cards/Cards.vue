<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { CardsState, CardsProps } from './Cards.state.ts';
import LayoutComponent from '../../common/components/layout/LayoutComponent.vue';
import { appRouteNames } from '../../appRouter.ts';

export default defineComponent({
  inheritAttrs: false,
  components: {
    LayoutComponent
  },
  props: {
    meta: {
      type: Object as PropType<CardsProps>,
      default: new CardsProps()
    }
  },
  data() {
    return {
      state: new CardsState(),
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
  <LayoutComponent :meta="{ pageRouteName: routeNames.Cards }">
    <div class="cards flex flex-col">
      <div class="header flex w-full justify-between items-end">
        <div class="balance">
          <div class="text-sm pb-[18px]">{{ state.lanuage.text.cards.availableBalance }}</div>
          <div class="balance-value flex justify-center items-center">
            <div class="currency-block flex justify-center items-center rounded-sm text-[13px] font-bold">
              <span>{{ state.model.currency }}</span>
            </div>
            <span class="ms-3 text-[26px] font-bold">
              {{ new Intl.NumberFormat("en-US").format(state.model.balance) }}</span>
          </div>
        </div>
        <div class="new-card">
          <button class="btn btn-sm btn-ghost">
            <img class="size-4" src="/public/assets/img/box.svg" alt="add-new-icon" />
            <span class="text-[13px]">{{ state.lanuage.text.cards.newCard }}</span>
          </button>
        </div>
      </div>
      <div class="cards-content">
        <div class="tabs tabs-border">
          <input type="radio" name="cards_tab" class="tab" :aria-label="state.lanuage.text.cards.myDebitCards"
            checked />
          <div class="tab-content">Tab content 1</div>

          <input type="radio" name="cards_tab" class="tab"
            :aria-label="state.lanuage.text.cards.allCompanyCards" />
          <div class="tab-content">Tab content 2</div>
        </div>
      </div>
    </div>
  </LayoutComponent>
</template>

<style scoped>
@import './Cards.scss';
</style>
