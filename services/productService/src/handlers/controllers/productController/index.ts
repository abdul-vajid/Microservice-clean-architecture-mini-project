import addProduct from "./addProduct";
import deleteProduct from "./deleteProduct";
import getProducts from "./getProducts";


export = (dependencies: any) => {
    return {
        addProduct: addProduct(dependencies),
        deleteProduct: deleteProduct(dependencies),
        getProducts: getProducts(dependencies)
    };
};