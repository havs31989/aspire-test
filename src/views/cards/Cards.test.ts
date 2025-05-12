// @ts-nocheck
import "reflect-metadata";
import { mount } from "@vue/test-utils";
import { vi } from 'vitest';
import Cards from "../cards/Cards.vue";
import { container } from 'tsyringe';
import { LanguageService } from '../../common/services/languageService';
import { LanguageCode } from 'one-frontend-framework';

// Mock fetch get cards list
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      serverDateTime: "2025-05-08T15:18:56.130Z",
      status: 200,
      msg: "",
      data: [
        {
          name: "John Doe",
          expMonth: 5,
          expYear: 2027,
          number: "4111111111111111",
          isFreeze: false,
          transactions: [
            {
              id: "1",
              title: "Hamleys",
              type: "file-storage",
              date: "2025-05-20T10:30:00Z",
              debit: true,
              value: 150,
              currency: "S$"
            },
            {
              id: "2",
              title: "Hamleys",
              type: "flights",
              date: "2025-05-20T10:30:00Z",
              debit: false,
              value: 150,
              currency: "S$"
            },
            {
              id: "3",
              title: "Hamleys",
              type: "megaphone",
              date: "2025-05-20T10:30:00Z",
              debit: false,
              value: 150,
              currency: "S$"
            },
            {
              id: "4",
              title: "Hamleys",
              type: "file-storage",
              date: "2025-05-20T10:30:00Z",
              debit: false,
              value: 150,
              currency: "S$"
            }
          ]
        },
        {
          name: "John Doe",
          expMonth: 11,
          expYear: 2026,
          number: "5500000000000004",
          isFreeze: false
        },
        {
          name: "John Doe",
          expMonth: 3,
          expYear: 2029,
          number: "378282246310005",
          isFreeze: true
        }
      ],
      successful: true
    }),
    ok: true
  })
) as typeof fetch;

const language = container.resolve(LanguageService);
await language.initLanguage(LanguageCode.EN);

const wrapper = mount(Cards, {
  global: {
    stubs: {
      RouterLink: true, // Stub RouterLink
    },
  },
});
it("Test cards shown", async () => {
  await wrapper.vm.$nextTick();
  // example to get element - others can get element with mock data
  const availableBalanceTitle = wrapper.find('.balance .availableBalance-title');
  expect(availableBalanceTitle.text()).toContain(language.text.cards.availableBalance);
});