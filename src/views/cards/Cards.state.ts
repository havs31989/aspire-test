import { container } from 'tsyringe';
import { BaseComponentState } from '../../common/types/baseComponentState';
import { CardCreateModel, CardsModel, CardViewModel } from './Cards.model';
import { StorageService } from '../../common/services/storageService';
import { CardsService } from '../../services/cardsService';
import { MyCardItem } from '../../services/response/cardsResponse';
import { StorageKey } from '../../common/constants/storageKey';
import { GetMyCardsRequest } from '../../services/request/cardsRequest';
import { ObjectHelper } from '../../common/utils/objectHelper';
import { SystemError } from '../../common/services/baseService';
import { AnyType } from 'one-frontend-framework';
import Splide, { SlideComponent } from '@splidejs/splide';

export class CardsProps {
}

export class CardsState extends BaseComponentState {
    private readonly storageSerivce = container.resolve(StorageService);
    private readonly cardsService = container.resolve(CardsService);

    public model: CardsModel = new CardsModel();
    public myActiveCard?: CardViewModel;
    public myCardsSplide?: Splide;
    public myCardsSplideMobile?: Splide;
    public createModel: CardCreateModel = new CardCreateModel();
    public currentTab?: string;
    public myCardTabId: string = 'myCardsTab';
    public myCardsTabMobileId: string = 'myCardsTabMobile';
    public allCardTabId: string = 'allCardsTab';
    public allCardsTabMobileId: string = 'allCardsTabMobile';

    public async init(): Promise<void> {
        const me = this;
        await me.getMyCards();
        me.isReady = true;
    }

    public async onMounted(): Promise<void> {
        const me = this;
        window.addEventListener('load', function () {
            me.changeSizeDetect(false);
        });
        window.addEventListener('resize', function () {
            me.debounce(me.changeSizeDetect(false), 250);
        });
    }

    public async onTabClick(tabId: string): Promise<void> {
        const me = this;
        if (me.currentTab != tabId) {
            me.currentTab = tabId;
            if (me.currentTab == me.myCardTabId || me.currentTab == me.myCardsTabMobileId) {
                if (me.model.myCards.length == 0) {
                    me.myActiveCard = undefined;
                }
            }
            else {
                me.myActiveCard = undefined;
            }
            me.changeSizeDetect();
        }
    }

    public debounce(func: AnyType, delay: number): AnyType {
        let timer = 0;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(func, delay);
        };
    }

    public changeSizeDetect(clickTab: boolean = true): void {
        const me = this;
        if (window.innerWidth < 1366) {
            if (!me.currentTab || (clickTab && me.currentTab == me.myCardsTabMobileId) || (!clickTab && me.currentTab != me.myCardsTabMobileId)) {
                const intervalRender = setInterval(() => {
                    const myCardSplideMobileEl = document.getElementById('myCardSplideMobile');
                    if (myCardSplideMobileEl) {
                        clearInterval(intervalRender);
                        if (me.myCardsSplideMobile) {
                            me.myCardsSplideMobile.destroy();
                        }
                        me.myCardsSplideMobile = new Splide('#myCardSplideMobile');
                        me.myCardsSplideMobile.on('active', (Slide: SlideComponent) => { this.onMyActiveCard(Slide); });
                        me.myCardsSplideMobile.mount();
                        myCardSplideMobileEl.classList.add('is-overflow');
                        if (!clickTab) {
                            document.getElementById(me.myCardsTabMobileId)?.click();
                        }
                    }
                }, 100);
            }
        } else {
            if (!me.currentTab || (clickTab && me.currentTab == me.myCardTabId) || (!clickTab && me.currentTab != me.myCardTabId)) {
                const intervalRender = setInterval(() => {
                    const myCardSplideEl = document.getElementById('myCardSplide');
                    if (myCardSplideEl) {
                        clearInterval(intervalRender);
                        if (me.myCardsSplide) {
                            me.myCardsSplide.destroy();
                        }
                        me.myCardsSplide = new Splide('#myCardSplide');
                        me.myCardsSplide.on('active', (Slide: SlideComponent) => { this.onMyActiveCard(Slide); })
                        me.myCardsSplide.mount();
                        myCardSplideEl.classList.add('is-overflow');
                        if (!clickTab) {
                            document.getElementById(me.myCardTabId)?.click();
                        }
                    }
                }, 100);
            }
        }
    }

    public async getMyCards(): Promise<void> {
        const me = this;
        let myCards = await me.storageSerivce.getObject<MyCardItem[]>(StorageKey.myCards);
        if (!myCards) {
            const request = new GetMyCardsRequest(100);
            const response = await me.cardsService.getMyCardsList(request);
            if (ObjectHelper.hasApiError(response)) {
                console.log((response as SystemError).message);
            }
            else {
                myCards = response as MyCardItem[];
            }
        }
        if (myCards) {
            me.model.myCards = [];
            for (const item of myCards) {
                const myCard = new CardViewModel();
                myCard.mapResponse(item);
                me.model.myCards.push(myCard);
            }
        }
    }

    public onMyActiveCard(slide: SlideComponent): void {
        const me = this;
        const cardnumber = slide.slide.dataset.cardnumber;
        const cardViewData = me.model.myCards.find(a => a.number == cardnumber);
        if (cardViewData) {
            me.myActiveCard = cardViewData;
        }
    }

    public async setFreezeCurrentCard(): Promise<void> {
        const me = this;
        if (me.myActiveCard) {
            me.myActiveCard.isFreeze = !me.myActiveCard.isFreeze;
            const cardViewData = me.model.myCards.find(a => a.number == me.myActiveCard?.number);
            if (cardViewData) {
                cardViewData.isFreeze = me.myActiveCard.isFreeze;
            }
            const myCards = await me.storageSerivce.getObject<MyCardItem[]>(StorageKey.myCards);
            if (myCards) {
                const cardInStore = myCards.find(a => a.number == me.myActiveCard?.number);
                if (cardInStore) {
                    cardInStore.isFreeze = me.myActiveCard.isFreeze;
                    await me.storageSerivce.saveObject<MyCardItem[]>(StorageKey.myCards, myCards);
                }
            }
        }
    }

    public async addNewCard(): Promise<void> {
        const me = this;
        if (me.createModel.isValid()) {
            const myCards = await me.storageSerivce.getObject<MyCardItem[]>(StorageKey.myCards);
            if (myCards) {
                const newCard = {
                    name: me.createModel.name,
                    number: me.createModel.generateCardNumber(),
                    expMonth: Number.parseInt(me.createModel.generateMonth()),
                    expYear: me.createModel.generateFutureYear(),
                    isFreeze: false
                } as MyCardItem;
                myCards.push(newCard);
                await me.storageSerivce.saveObject<MyCardItem[]>(StorageKey.myCards, myCards);
                window.location.reload();
            }
        }
    }
}