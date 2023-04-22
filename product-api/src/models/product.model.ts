import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
    idAccount: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    createdDate: Date;
    updatedDate: Date;
}

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    idAccount: {type: String, required: true },
    price: {type: mongoose.Types.Decimal128, required: true },
    description: {type: String, required: true },
    stock: {type: Number, required: true },
}, {timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } })

export default mongoose.model<IProduct>('Product', productSchema);