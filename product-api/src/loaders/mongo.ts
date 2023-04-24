import mongoose from 'mongoose';
import env from '../configs/environement.config';

let uri: string;
let isSrv = env.isMongoSrv;
let credential: string;

let pwd = env.mongoPwd;
let user = env.mongoUser;

credential = user.length > 0 ? user : '';
if (pwd.length > 0 && credential.length > 0) {
    credential += `:${pwd}@`;
}

if (isSrv == 1) {
    uri = `mongodb+srv://${credential}${env.mongoUrl}/${env.mongoDb}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
} else {
    uri = `mongodb://${credential}${env.mongoHost}:${env.mongoPort}/${env.mongoDb}`;
}

mongoose.connect(uri)
.then(() => console.log('connected to database'))
.catch((err) => console.log(err));