import * as dotenv from 'dotenv';

dotenv.config();

const environements: any = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_SRV,
    mongoUser: process.env.MONGO_USER,
    mongoPwd: process.env.MONGO_PASSWORD,
    mongoDb: process.env.MONGO_DATABASE,
    secret: process.env.SECRET,
    isMongoSrv: process.env.IS_SRV,
    mongoPort: process.env.MONGO_PORT,
    mongoHost: process.env.MONGO_HOST
};

export default environements;