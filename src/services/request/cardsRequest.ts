/**
 * For getting my cards
 */
export class GetMyCardsRequest {
    public size: number = 0;

    /**
     * Size
     * @param size 
     */
    constructor(size: number) {
        this.size = size;
    }
}