import { IProductData, Product } from "../entities/product.entities";

export const addProduct_UseCase = (dependencies: any) => {
    const {
        repositories
    } = dependencies;

    if (!repositories)
        throw new Error("Repositories dependencie is missing");

    const execute = ({ productName, category, madeIn, stock, amount }: IProductData) => {
        const user = new Product({
            productName,
            category,
            madeIn,
            stock,
            amount
        });
        return repositories.createProduct(user)
    };
    return {
        execute,
    };
};