import jwt from 'jsonwebtoken';
import env from '../configs/environement.config'
import {NextFunction, Request, Response } from 'express'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!.split(' ')[1];
        const decode = jwt.verify(token, env.secret);
        req.body.account = decode;
        next();
    } catch(e) {
        return res.status(403).send('not authorized');
    }
}