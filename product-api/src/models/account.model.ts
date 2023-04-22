import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { saltRound } from '../constants/accounts.constants';

export interface IAccount extends mongoose.Document {
    username: string;
    password: string;
    userLevel: 1 | 2 | 3;
    createdDate: Date;
    updatedDate: Date;
}

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, index: true, unique: true },
    password: {type: String, required: true },
    userLevel: {type: Number, required: true, enum: [1, 2, 3]  },
    
}, {timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } })

accountSchema.pre('save', function (next) {
    const account = this;

    if (!account.isModified('password')){
        return next();
    } else if (account.isModified('password')) {
        bcrypt.hash(account.password, saltRound, function (err, hash) {
            if (err) {
                return next();
            }
            account.password = hash;
            next();
        })
    }
});

accountSchema.methods.comparePassword = async function(
    loggedPassword : string,
    cb: (arg: any, isEqual?: Boolean) => void
) {
    bcrypt.compare(loggedPassword, this.password, function(err: any, isEqual: Boolean) {
        if (err) {
            return cb(err);
        }
        cb(null, isEqual)
    });
}

export default mongoose.model<IAccount>('Account', accountSchema);