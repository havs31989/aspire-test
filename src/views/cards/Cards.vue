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
  <template v-if="state.isReady">
    <LayoutComponent :meta="{ pageRouteName: routeNames.Cards }">
      <div class="cards flex flex-col">
        <div class="cards-header flex w-full justify-between items-end">
          <div class="balance">
            <div class="availableBalance-title text-sm pb-[18px]">{{ state.lanuage.text.cards.availableBalance }}</div>
            <div class="balance-value flex justify-center items-center">
              <div class="currency-block flex justify-center items-center rounded-sm text-[13px] font-bold">
                <span>{{ state.model.currency }}</span>
              </div>
              <span class="ms-3 text-[26px] font-bold">
                {{ new Intl.NumberFormat("en-SG").format(state.model.balance) }}</span>
            </div>
          </div>
          <div class="new-card">
            <button
              onclick="addNewCardModal.showModal()"
              class="btn btn-sm btn-ghost hover:bg-transparent hover:border-transparent hover:shadow-none"
            >
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
            <div class="my-cards tab-content cards-tab-content border shadow rounded-lg">
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
                    <section id="myCardSplide" class="splide w-full" aria-label="Card slider">
                      <div class="splide__track w-full h-[248.85px]">
                        <ul class="splide__list">
                          <template v-for="item in state.model.myCards" :key="item.number">
                            <li
                              :class="{ 'opacity-30': item.isFreeze }" class="splide__slide"
                              :data-cardnumber="item.number"
                            >
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
                          </template>
                        </ul>
                      </div>
                    </section>
                    <div v-if="state.myActiveCard" class="card-action rounded-2xl flex justify-between mt-8">
                      <button
                        class="btn btn-ghost h-auto flex flex-col hover:bg-transparent hover:border-transparent hover:shadow-none"
                        @click="state.setFreezeCurrentCard()"
                      >
                        <img class="btn-icon w-[32px] h-[32px]" src="/assets/img/Freeze card.svg" alt="btn-icon">
                        <span v-if="!state.myActiveCard.isFreeze" class="btn-text text-[13px] font-normal">
                          {{ state.lanuage.text.cards.freezeCard }}
                        </span>
                        <span v-if="state.myActiveCard.isFreeze" class="btn-text text-[13px] font-normal">
                          {{ state.lanuage.text.cards.unFreezeCard }}
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
                <div v-if="state.myActiveCard" class="right-panel flex-1 ms-[46px]">
                  <div class="card-details-collapse collapse rounded-lg">
                    <input type="checkbox" />
                    <div class="collapse-title p-6 flex justify-between items-center">
                      <div class="title-with-icon flex items-center">
                        <img class="w-[24px] h-[24px]" src="/assets/img/Group 11889.svg" alt="card-detail-icon" />
                        <span class="ms-3 text-[14px]"> {{ state.lanuage.text.cards.cardDetails }}</span>
                      </div>
                      <div class="collapse-title-icon">
                        <img class="open-icon title-icon" src="/assets/img/down-arrow.svg" alt="collapse-open-icon" />
                        <img
                          class="close-icon title-icon" src="/assets/img/down-arrow-1.svg"
                          alt="collapse-close-icon"
                        />
                      </div>
                    </div>
                    <div class="collapse-content p-0 !pb-0 bg-white">
                      <div class="transaction-content p-6">
                        {{ state.lanuage.text.cards.cardDetails }}
                      </div>
                    </div>
                  </div>
                  <div class="transaction-collapse collapse rounded-lg mt-6">
                    <input type="checkbox" checked />
                    <div class="collapse-title p-6 flex justify-between items-center">
                      <div class="title-with-icon flex items-center">
                        <img class="w-[24px] h-[24px]" src="/assets/img/Group 11889-1.svg" alt="card-detail-icon" />
                        <span class="ms-3 text-[14px]"> {{ state.lanuage.text.cards.recentTransactions }}</span>
                      </div>
                      <div class="collapse-title-icon">
                        <img class="open-icon title-icon" src="/assets/img/down-arrow.svg" alt="collapse-open-icon" />
                        <img
                          class="close-icon title-icon" src="/assets/img/down-arrow-1.svg"
                          alt="collapse-close-icon"
                        />
                      </div>
                    </div>
                    <div class="collapse-content p-0 !pb-0 bg-white">
                      <div class="transaction-content">
                        <div class="transaction-detail-list p-6">
                          <div
                            v-for="(item, index) in state.myActiveCard.transactions" :key="item.id"
                            class="transaction-detail-item flex flex-col"
                          >
                            <div class="transaction-detail-item-info flex flex-row justify-between items-center">
                              <div class="flex-1 flex justify-between items-center">
                                <div
                                  class="w-[48px] h-[48px] bg-[#009DFF1A] rounded-3xl flex justify-center items-center"
                                >
                                  <img class="w-[16px]" :src="item.getIcon()" alt="transction-icon" />
                                </div>
                                <div class="flex-1 flex flex-col ms-3">
                                  <h3 class="transaction-title text-sm font-semibold">{{ item.title }}</h3>
                                  <span class="transaction-time text-[13px] text-[#AAAAAA]">
                                    {{ new Date(item.date).toLocaleDateString('en-SG', {
                                      year: "numeric", month: "long", day: "numeric"
                                    }) }}
                                  </span>
                                </div>
                                <div class="flex">
                                  <span v-if="!item.debit" class="text-sm font-bold text-[#222222]">- {{ item.currency
                                  }}
                                    {{ item.value }}
                                  </span>
                                  <span v-if="item.debit" class="text-sm font-bold text-[#01D167]">+ {{ item.currency }}
                                    {{ item.value }}
                                  </span>
                                </div>
                              </div>
                              <button
                                class="btn btn-ghost h-full p-0 ms-[10.3px] showcard-button hover:bg-transparent hover:border-transparent hover:shadow-none"
                              >
                                <img class="w-[6.5px] h-[12px]" src="/assets/img/next.svg" alt="next" />
                              </button>
                            </div>
                            <div class="transaction-detail-item-option flex justify-center mt-3">
                              <button
                                class="btn btn-ghost h-auto p-0 showcard-button hover:bg-transparent hover:border-transparent hover:shadow-none"
                              >
                                <span
                                  class="w-[24px] h-[20px] bg-[#325BAF] rounded-lg flex justify-center items-center"
                                >
                                  <img
                                    class="w-[10px] h-[7.68px]" src="/assets/img/business-and-finance.svg"
                                    alt="card-icon"
                                  />
                                </span>
                                <span v-if="item.debit" class="text-[12px] font-semibold text-[#325BAF] ms-2">
                                  {{ state.lanuage.text.cards.refundOnDebitCard }}
                                </span>
                                <span v-if="!item.debit" class="text-[12px] font-semibold text-[#325BAF] ms-2">
                                  {{ state.lanuage.text.cards.chargedToDebitCard }}
                                </span>
                              </button>
                            </div>
                            <div
                              v-if="index != state.myActiveCard.transactions.length - 1"
                              class="line border-b border-[#F5F5F5] my-4"
                            >
                            </div>
                          </div>
                        </div>
                        <div
                          v-if="state.myActiveCard.transactions.length > 0"
                          class="transaction-view-all bg-[#EDFFF5] border-[#DDFFEC] py-4 text-center leading-[18px]"
                        >
                          <button
                            class="btn btn-ghost p-0 showcard-button h-auto hover:bg-transparent hover:border-transparent hover:shadow-none"
                          >
                            <span class="text-[13px] font-semibold text-[#01D167]">
                              {{ state.lanuage.text.cards.viewAllCardTransactions }}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="radio" name="cards_tab" class="cards-tab tab p-0"
              :aria-label="state.lanuage.text.cards.allCompanyCards"
            />
            <div class="all-cards tab-content cards-tab-content border shadow rounded-lg">
              {{ state.lanuage.text.cards.allCompanyCards }}
            </div>
          </div>
        </div>
      </div>
      <dialog id="addNewCardModal" class="modal">
        <div class="modal-box bg-white">
          <h3 class="text-lg font-bold">{{ state.lanuage.text.cards.newCard }}</h3>
          <p class="py-4">{{ state.lanuage.text.cards.enterCardName }}</p>
          <input
            v-model="state.createModel.name" type="text" placeholder="" class="input input-neutral bg-white w-full"
            maxlength="50"
          />
          <p v-if="state.createModel.checkError('name')" class="label text-sm text-error">
            {{ state.createModel.getError('name') }}
          </p>
          <div class="modal-action">
            <button class="btn btn-success min-w-20" @click="state.addNewCard()">
              {{ state.lanuage.text.label.save }}
            </button>
            <form method="dialog">
              <button class="btn min-w-20">{{ state.lanuage.text.label.cancel }}</button>
            </form>
          </div>
        </div>
      </dialog>
    </LayoutComponent>
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
@import './Cards.scss';
</style>
