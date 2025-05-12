import { container } from 'tsyringe';
import { BaseModel, ErrorModel } from '../../common/types/baseModel';
import { MyCardItem } from '../../services/response/cardsResponse';
import validator from 'validator';
import { LanguageService } from '../../common/services/languageService';

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

export class CardCreateModel extends BaseModel {
    private readonly language = container.resolve(LanguageService);
    public name: string = '';

    public isValid(): boolean {
        const me = this;
        me.errors = [];
        if (validator.isEmpty(me.name)) {
            me.errors.push({
                property: 'name',
                error: this.language.text.cards.cardNameRequired
            } as ErrorModel);
        }
        else if (me.name.length > 50) {
            me.errors.push({
                property: 'name',
                error: this.language.text.cards.cardNameWrongData
            } as ErrorModel);
        }
        if (me.errors.length == 0) return true;
        return false;
    }

    public generateCardNumber(): string {
        const card: number[] = [];
        // Start with a Visa prefix "4"
        card.push(4);
        // Generate next 14 random digits (total 15 so far)
        for (let i = 0; i < 14; i++) {
            card.push(Math.floor(Math.random() * 10));
        }
        // Calculate the Luhn check digit
        const checkDigit = this.getCheckDigit(card);
        card.push(checkDigit);
        return card.join('');
    }
    
    private getCheckDigit(digits: number[]): number {
        let sum = 0;
        let shouldDouble = true;
        // Process digits from right to left
        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = digits[i];
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return (10 - (sum % 10)) % 10;
    }

    public generateMonth(): string {
        const month = Math.floor(Math.random() * 12) + 1; // 1 to 12
        return month.toString().padStart(2, '0');
    }

    public generateFutureYear(range: number = 5): number {
        const currentYear = new Date().getFullYear();
        return currentYear + Math.floor(Math.random() * range) + 1;
    }
}