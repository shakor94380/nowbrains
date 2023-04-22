import { Request, Response } from "express";
import { BaseAccount, Login } from "../interfaces/account.interfaces";
import { create, findByName } from "../services/accounts.services";
import jwt from 'jsonwebtoken';
import env from '../configs/environement.config'

export const login = async(req: Request, res: Response) => {
    try {
        const logInfo: Login = req.body.data;

        const account: any = await findByName(logInfo.username);
        if (!account) {
            return res.status(403).send('bad account'); 
        }

        account.comparePassword(logInfo.password, async (err: any, isEqual: boolean) => {
            if ( err || !isEqual) {
                return res.status(403).send('bad password');
            }
            const token: string = await jwt.sign(
                { id: account._id, userLevel: account.userLevel },
                env.secret,
                { expiresIn: '3h' }
            )
           return res.status(202).send(
            { token, account: {
                username: account.username, userLevel: account.userLevel
                }
            });
        })
    } catch(e) {
        return res.status(500).send(e.message);
    }
}

export const register = async(req: Request, res: Response) => {
    try {
        const account: BaseAccount = req.body.data;
        const created = await create(account);

        if (created) {
            return res.status(201).json(created);
        } else {
            return res.status(422).send('not created');
        }
    } catch(e) {
        return res.status(500).send(e.message);
    }
}