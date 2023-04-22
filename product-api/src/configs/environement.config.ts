import * as dotenv from 'dotenv';

dotenv.config();

const environements : any = {
    port : process.env.PORT,
    mongoUrl : process.env.MONGO_URL,
    mongoUser : process.env.MONGO_USER,
    mongoPwd : process.env.MONGO_PASSWORD,
    mongoDb : process.env.MONGO_DATABASE,
    secret: process.env.SECRET
};

export default environements;