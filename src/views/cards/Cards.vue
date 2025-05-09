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
      <div class="cards-header flex w-full justify-between items-end">
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
          <button class="btn btn-sm btn-ghost hover:bg-transparent hover:border-transparent hover:shadow-none">
            <img class="size-4" src="/public/assets/img/box.svg" alt="add-new-icon" />
            <span class="text-[13px]">{{ state.lanuage.text.cards.newCard }}</span>
          </button>
        </div>
      </div>
      <div class="cards-content mt-[34px]">
        <div class="tabs tabs-border">
          <input
            type="radio" name="cards_tab" class="cards-tab tab p-0"
            :aria-label="state.lanuage.text.cards.myDebitCards" checked
          />
          <div class="tab-content cards-tab-content border shadow rounded-lg">
            <div class="flex">
              <div class="left-panel w-[414px] flex flex-col">
                <div class="header-card-list w-full flex justify-end items-center">
                  <button
                    class="btn btn-ghost p-0 showcard-button hover:bg-transparent hover:border-transparent hover:shadow-none"
                  >
                    <img class="w-[16px] h-[16px]" src="/assets/img/remove_red_eye-24px.svg" alt="show-card" />
                    <span class="text-[12px] font-bold showcard-text">
                      {{ state.lanuage.text.cards.showCardNumber }}
                    </span>
                  </button>
                </div>
                <div class="content-card-list mt-3">
                  <section class="splide w-full" aria-label="Card slider">
                    <div class="splide__track w-full h-[248.85px]">
                      <ul class="splide__list">
                        <li v-for="item in state.model.myCards" :key="item.number" class="splide__slide">
                          <div class="card-detail w-full h-full p-[27.09px] flex flex-col justify-between">
                            <div class="card-detail-header w-full flex justify-end">
                              <img class="aspire-logo" src="/assets/img/Logo.svg" alt="aspire-logo" />
                            </div>
                            <div class="card-detail-content flex-1 flex flex-col justify-end">
                              <h2 class="card-user-name text-white font-bold text-2xl">{{ item.name }}</h2>
                              <div class="card-number flex items-center mt-[27.22px]">
                                <span class="hidden-num me-[27.09px] flex">
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                </span>
                                <span class="hidden-num me-[27.09px] flex">
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                </span>
                                <span class="hidden-num me-[27.09px] flex">
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                  <div class="dot w-[9.03px] h-[9.03px] border-0 rounded-lg me-[6.67px]"></div>
                                </span>
                                <span class="hidden-show text-white text-[14px] font-bold h-[19px]">
                                  {{ item.number.substring((item.number.length - 4), item.number.length) }}
                                </span>
                              </div>
                              <div class="card-opt text-white flex items-center mt-[17.02px] mb-0.5 h-[22.57px]">
                                <div class="card-exp text-[13px] font-bold me-[36.12px]">
                                  <span class="me-1">Thru: </span>
                                  <span>{{ item.expMonth }}/{{ item.expYear }}</span>
                                </div>
                                <div class="card-cvv flex items-center">
                                  <span class="text-[13px] font-bold me-2">CVV: </span>
                                  <span class="text-[24px] font-bold mt-1">***</span>
                                </div>
                              </div>
                            </div>
                            <div class="card-detail-footer w-full flex justify-end">
                              <img class="card-type-logo" src="/assets/img/Visa Logo.svg" alt="card-type-logo" />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>
                  <div class="card-action rounded-2xl flex justify-between mt-8">
                    <button
                      class="btn btn-ghost h-auto flex flex-col hover:bg-transparent hover:border-transparent hover:shadow-none"
                    >
                      <img class="btn-icon w-[32px] h-[32px]" src="/assets/img/Freeze card.svg" alt="btn-icon">
                      <span class="btn-text text-[13px] font-normal">
                        {{ state.lanuage.text.cards.freezeCard }}
                      </span>
                    </button>
                    <button
                      class="btn btn-ghost h-auto flex flex-col hover:bg-transparent hover:border-transparent hover:shadow-none"
                    >
                      <img class="btn-icon w-[32px] h-[32px]" src="/assets/img/Set spend limit.svg" alt="btn-icon">
                      <span class="btn-text text-[13px] font-normal">
                        {{ state.lanuage.text.cards.setSpendLimit }}
                      </span>
                    </button>
                    <button
                      class="btn btn-ghost h-auto flex flex-col hover:bg-transparent hover:border-transparent hover:shadow-none"
                    >
                      <img class="btn-icon w-[32px] h-[32px]" src="/assets/img/GPay.svg" alt="btn-icon">
                      <span class="btn-text text-[13px] font-normal">
                        {{ state.lanuage.text.cards.addToGPay }}
                      </span>
                    </button>
                    <button
                      class="btn btn-ghost h-auto flex flex-col hover:bg-transparent hover:border-transparent hover:shadow-none"
                    >
                      <img class="btn-icon w-[32px] h-[32px]" src="/assets/img/Replace card.svg" alt="btn-icon">
                      <span class="btn-text text-[13px] font-normal">
                        {{ state.lanuage.text.cards.replaceCard }}
                      </span>
                    </button>
                    <button
                      class="btn btn-ghost h-auto flex flex-col hover:bg-transparent hover:border-transparent hover:shadow-none"
                    >
                      <img class="btn-icon w-[32px] h-[32px]" src="/assets/img/Deactivate card.svg" alt="btn-icon">
                      <span class="btn-text text-[13px] font-normal">
                        {{ state.lanuage.text.cards.cancelCard }}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="right-panel flex-1 ms-[46px]">
                dsa
              </div>
            </div>
          </div>
          <input
            type="radio" name="cards_tab" class="cards-tab tab p-0"
            :aria-label="state.lanuage.text.cards.allCompanyCards"
          />
          <div class="tab-content cards-tab-content border shadow rounded-lg">
            {{ state.lanuage.text.cards.allCompanyCards }}
          </div>
        </div>
      </div>
    </div>
  </LayoutComponent>
</template>

<style scoped>
@import './Cards.scss';
</style>
