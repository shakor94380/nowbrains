import AccountModel from '../models/account.model';
import { BaseAccount, Login } from '../interfaces/account.interfaces';

export const findByName = async (username: String) => {
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