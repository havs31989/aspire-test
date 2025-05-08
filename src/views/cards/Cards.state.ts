import { container } from 'tsyringe';
import { BaseComponentState } from '../../common/types/baseComponentState';
import { CardsModel, CardViewModel } from './Cards.model';
import { StorageService } from '../../common/services/storageService';
import { CardsService } from '../../services/cardsService';
import { MyCardItem } from '../../services/response/cardsResponse';
import { StorageKey } from '../../common/constants/storageKey';
import { GetMyCardsRequest } from '../../services/request/cardsRequest';
import { ObjectHelper } from '../../common/utils/objectHelper';
import { SystemError } from '../../common/services/baseService';
import { AnyType } from 'one-frontend-framework';
import Splide from '@splidejs/splide';

export class CardsProps {
}

export class CardsState extends BaseComponentState {
    private readonly storageSerivce = container.resolve(StorageService);
    private readonly cardsService = container.resolve(CardsService);

    public model: CardsModel = new CardsModel();
    public myCardsSplide: AnyType;

    public async init(): Promise<void> {
        const me = this;
        await me.getMyCards();
        const myCardsSplide = new Splide('.splide');
        myCardsSplide.mount();
        me.isReady = true;
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
                alert((response as SystemError).message);
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
}