import { MyCardItem } from '../../services/response/cardsResponse';

export class CardsModel {
    public currency: string = 'S$';
    public balance: number = 3000;
    public myCards: CardViewModel[] = [];
}

export class CardViewModel {
    public name: string = '';
    public expMonth: number = 1;
    public expYear: number = 1990;
    public number: string = '';
    public transactions: CardViewTransactionModel[] = [];
    public isFreeze: boolean = false;

    /**
     * Get card type name
     * @returns 
     */
    public getCardTypeName(): string {
        const sanitizedNumber = this.name.replace(/\D/g, "");
        if (/^4\d{12}(\d{3})?$/.test(sanitizedNumber)) {
            return "Visa";
        } else if (/^5[1-5]\d{14}$/.test(sanitizedNumber)) {
            return "Mastercard";
        } else if (/^3[47]\d{13}$/.test(sanitizedNumber)) {
            return "American Express";
        } else if (/^6(?:011|5\d{2})\d{12}$/.test(sanitizedNumber)) {
            return "Discover";
        } else {
            return "Unknown";
        }
    }

    /**
     * Map response
     * @param response 
     */
    public mapResponse(response: MyCardItem): void {
        this.name = response.name;
        this.expMonth = response.expMonth;
        this.expYear = response.expYear;
        this.number = response.number;
        this.isFreeze = response.isFreeze;
        this.transactions = [];
        if (response.transactions) {
            for (const transaction of response.transactions) {
                const cardTransaction = new CardViewTransactionModel();
                cardTransaction.id = transaction.id;
                cardTransaction.title = transaction.title;
                cardTransaction.type = transaction.type;
                cardTransaction.date = transaction.date;
                cardTransaction.debit = transaction.debit;
                cardTransaction.value = transaction.value;
                cardTransaction.currency = transaction.currency;
                this.transactions.push(cardTransaction);
            }
        }
    }
}

export class CardViewTransactionModel {
    public id: string = '';
    public title: string = '';
    public type: string = '';
    public date: Date = new Date();
    public debit: boolean = false;
    public value: number = 0;
    public currency: string = 'S$';

    public getIcon(): string {
        const defaultIcon = '/assets/img/Payments.svg';
        const fileStorage = '/assets/img/file-storage.svg';
        const flights = '/assets/img/flights.svg';
        const megaphone = '/assets/img/megaphone.svg';
        switch (this.type) {
            case 'file-storage':
                return fileStorage;
            case 'flights':
                return flights;
            case 'megaphone':
                return megaphone;
            default:
                return defaultIcon;
        }
    }
}