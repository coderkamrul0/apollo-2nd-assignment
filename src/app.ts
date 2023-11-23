import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/users/user.route';
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'Success',
    message: 'Server is ok',
  });
});

export default app;
