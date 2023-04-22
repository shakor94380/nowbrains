import mongoose from 'mongoose';
import env from '../configs/environement.config';

const uri: string = `mongodb+srv://${env.mongoUser}:${env.mongoPwd}@${env.mongoUrl}.mongodb.net/${env.mongoDb}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;

mongoose.connect(uri)
.then(() => console.log('connected to database'))
.catch((err) => console.log(err));