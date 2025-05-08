import { injectable } from 'tsyringe';
import { AppError, BaseService, SystemError } from '../common/services/baseService';
import { GetMyCardsRequest } from './request/cardsRequest';
import { MyCardItem, MyCardsResponse } from './response/cardsResponse';
import { StorageKey } from '../common/constants/storageKey';

@injectable()
export class CardsService extends BaseService {
    private readonly requestUrl = {
        getMyCardsList: 'https://aspire-test-cards.free.beeceptor.com/cards?size={size}'
    }

    /**
     * Get my cards list
     * @param request 
     * @returns 
     */
    public async getMyCardsList(request: GetMyCardsRequest): Promise<MyCardItem[] | SystemError> {
        const me = this;
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            } as RequestInit;
            const url = me.requestUrl.getMyCardsList.replace('{size}', request.size.toString());
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const result = await response.json() as MyCardsResponse;
                if (result.successful) {
                    const myCardItems = result.data;
                    await me.storageService.saveObject<MyCardItem[]>(StorageKey.myCards, myCardItems);
                    return myCardItems;
                }
                else {
                    throw new AppError('Cannot get');
                }
            }
            else {
                throw new AppError('Cannot get');
            }
        } catch (error) {
            return me.handleError(error as Error);
        }
    }
}