import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import env from './configs/environement.config';
import routes from './routes/routes';
require('./loaders/mongo')

dotenv.config();

if (!env.port) {
  process.exit(1);
}
 
const PORT: number = parseInt(env.port as string, 10) || 3000;
 
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});