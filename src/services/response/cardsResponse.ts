import { BaseResponseData } from '../../common/types/baseResponse';

export interface MyCardItem {
    name: string;
    expMonth: number;
    expYear: number;
    number: string;
}

export type MyCardsResponse = BaseResponseData<MyCardItem[]>;