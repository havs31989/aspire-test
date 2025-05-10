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
    public myCardsSplide: AnyType;
    public createModel: CardCreateModel = new CardCreateModel();

    public async init(): Promise<void> {
        const me = this;
        await me.getMyCards();
        me.isReady = true;
        const intervalRender = setInterval(() => {
            const myCardSplideEl = document.getElementById('myCardSplide');
            if (myCardSplideEl) {
                clearInterval(intervalRender);
                const myCardsSplide = new Splide('.splide');
                myCardsSplide.on('active', (Slide) => { this.onMyActiveCard(Slide); })
                myCardsSplide.mount();
            }
        }, 100);
    }

    public async onMounted(): Promise<void> {
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