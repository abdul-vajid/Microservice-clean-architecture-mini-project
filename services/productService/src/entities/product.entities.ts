export interface IProductData {
    productName: string;
    category: string;
    madeIn: string;
    stock: number;
    amount: number
}

export class Product {
    productName: string;
    category: string;
    madeIn: string;
    stock: number;
    amount: number

    constructor({ productName, category, madeIn, stock, amount}: IProductData) {
        this.productName = productName;
        this.category = category;
        this.madeIn = madeIn;
        this.amount = amount;
        this.stock = stock;
    }
}
