export interface Product {
    _id: string;
    idAccount: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    createdDate: Date;
    updatedDate: Date;
}

export interface FormProduct {
    name: string;
    price: number;
    description: string;
    stock: number;
}