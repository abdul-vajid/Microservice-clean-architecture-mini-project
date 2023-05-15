import { ProductEntity } from "../entities/product.entities";
import { IProductData } from "../../../../entities/product.entities";

export const createProduct = async (user: IProductData): Promise<any> => {
    const product = ProductEntity.create({
        productName : user.productName,
        category: user.category,
        madeIn: user.madeIn,
        stock: user.stock,
        amount: user.amount
	});

    return await product.save()
}
