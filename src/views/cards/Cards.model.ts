export class CardsModel {
    public currency: string = 'S$';
    public balance: number = 3000;
}

export class CardViewModel {
    public name: string = '';
    public expMonth: number = 1;
    public expYear: number = 1990;
    public number: string = '';

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
}

