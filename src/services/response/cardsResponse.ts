import { BaseResponseData } from '../../common/types/baseResponse';

export interface MyCardItemTransaction {
    id: string;
    title: string;
    type: string;
    date: Date;
    debit: boolean;
    value: number;
    currency: string;
}

export interface MyCardItem {
    name: string;
    expMonth: number;
    expYear: number;
    number: string;
    isFreeze: boolean;
    transactions: MyCardItemTransaction[]
}

export type MyCardsResponse = BaseResponseData<MyCardItem[]>;