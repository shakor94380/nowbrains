import AccountModel from '../models/account.model';
import { BaseAccount } from '../interfaces/account.interfaces';

export const findByName = async (username: string) => {
    return await AccountModel.findOne({username});
};

export const create = async (account: BaseAccount) => {
    const created = await AccountModel.create(account);
    if (created instanceof AccountModel) {
        return created.id;
    } else {
        return false;
    }
};