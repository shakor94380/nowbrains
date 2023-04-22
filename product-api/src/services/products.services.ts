import { BaseProduct, Product, SearchProduct } from '../interfaces/product.interfaces';
import ProductModel from '../models/product.model';
import { filters, filtersDate } from '../constants/products.contants';
import _ from 'lodash';
import moment from 'moment';

export const findAll = async () => {
    return await ProductModel.find();
};

export const findById = async (id: Product['id']) => {
    return await ProductModel.findById(id);
};

export const create = async (product: BaseProduct) => {
    const created = await ProductModel.create(product);

    if (created instanceof ProductModel){
        return created.id;
    } else {
        return false;
    }
};

export const update = async (id: Product['id'], product: BaseProduct) => {
    return await ProductModel.updateOne({ _id: id }, product);
};

export const remov = async (id: Product['id']) => {
    return await ProductModel.deleteOne({ _id: id});
};

export const searching = async (search: SearchProduct) => {
    const filter: any = _.pick(search, filters);
    return await filtering(filter);
};

async function filtering(filter: SearchProduct) {
    const dateFilter = _.pick(filter, filtersDate);
    const otherFilter = _.omit(filter, filtersDate);
    let finalFilter: any = {};

    const keys: String[] = Object.keys(filter);
    if (Object.keys(otherFilter).length > 0) {
        for (let index = 0; index < Object.keys(otherFilter).length; index++) {
            const key = Object.keys(otherFilter)[index];
            finalFilter[key] = otherFilter[key];
        }
        ProductModel.find(otherFilter);
    }
    if (Object.keys(dateFilter).length > 0) {
        if (dateFilter['start'] && dateFilter['end']) {
            finalFilter.createdDate = {
                $gte: moment(dateFilter['start']).startOf('day').toISOString(),
                $lte: moment(dateFilter['end']).endOf('day').toISOString()
            }
        } else if (dateFilter['start'] && !dateFilter['end']){
            finalFilter.createdDate = {
                $gte: moment(dateFilter['start']).startOf('day').toISOString()
            }
        } else if (!dateFilter['start'] && dateFilter['end']) {
            finalFilter.createdDate = {
                $lte: moment(dateFilter['end']).endOf('day').toISOString()
            }
        }
    }
    if (Object.keys(finalFilter).length > 0) {
        return ProductModel.find(finalFilter);
    } else {
        return false;
    }
};