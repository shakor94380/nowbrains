import { Request, Response } from "express";
import { findAll, findById, create, update, remov, searching } from '../services/products.services';
import { BaseProduct, Product, SearchProduct } from "../interfaces/product.interfaces";


export const getAll = async(req : Request, res : Response) => {
    try {
        const products = await findAll();

        return res.status(200).json(products);
    } catch (e) {
        return res.status(422).send(e.message);
    }
}

export const get = async(req : Request, res : Response) => {
    try {
        const id : string = req.params.id;

        const product = await findById(id);
    
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).send();
        }
    } catch (e) {
        return res.status(422).send(e.message);
    }
}

export const post = async(req : Request, res : Response) => {
    try {
        let product : BaseProduct = req.body.data;
        const account : any = req.body.account;

        product.idAccount = account.id;
        const created = await create(product);

        if (created) {
            return res.status(201).json(created);
        } else {
            return res.status(422).send('not created');
        }
    } catch (e) {
        return res.status(422).send(e.message);
    }
    
}

export const patch = async(req : Request, res : Response) => {
    try {
        const product : BaseProduct = req.body.data;
        const id : string = req.params.id;

        const modified = await update(id, product);

        if (modified.modifiedCount > 0) {
            const updatedProduct = await findById(id);
            return res.status(200).json(updatedProduct);
        } else {
            return res.status(404).send();
        }
    } catch (e) {
        return res.status(422).send(e.message);
    }
}

export const remove = async(req : Request, res : Response) => {
    try {
        const id : string = req.params.id;

        const removed = await remov(id);

        if (removed.deletedCount > 0) {
            return res.status(204).json('removed');
        } else {
            return res.status(404).send();
        }
    } catch (e) {
        return res.status(422).send(e.message);
    }
}

export const search = async(req : Request, res : Response) => {
    try {
        const filter : SearchProduct = req.body.data;
        const searched = await searching(filter);
        if (Object.keys(searched).length > 0) {
            return res.status(201).send(searched)
        } else {
            return res.status(204).send()
        }
    } catch (e) {
        return res.status(422).send(e.message);
    }
}