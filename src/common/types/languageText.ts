export interface LanguageText {
  appName: string;
  label: Label;
  layout: Layout;
  cards: Cards;
}

export interface Cards {
  availableBalance: string;
  myDebitCards: string;
  allCompanyCards: string;
  newCard: string;
  showCardNumber: string;
  cardDetails: string;
  recentTransactions: string;
  freezeCard: string;
  unFreezeCard: string;
  setSpendLimit: string;
  addToGPay: string;
  replaceCard: string;
  cancelCard: string;
  chargedToDebitCard: string;
  refundOnDebitCard: string;
  viewAllCardTransactions: string;
}

export interface Label {
  save: string;
  cancel: string;
}

export interface Layout {
  slogan: string;
  home: string;
  card: string;
  payments: string;
  credit: string;
  settings: string;
}
