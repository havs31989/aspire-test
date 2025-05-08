import { BaseComponentState } from '../../common/types/baseComponentState';
import { CardsModel } from './Cards.model';

export class CardsProps {
}

export class CardsState extends BaseComponentState {
    public model: CardsModel = new CardsModel();

    public async init(): Promise<void> {
        const me = this;
        const response = await fetch('https://dummyjson.com/products')
        const data = await response.json();
        console.table(data);
        me.isReady = true;
    }

    public async onMounted(): Promise<void> {
    }
}