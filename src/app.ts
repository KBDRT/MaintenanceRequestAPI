import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TS ESM!' });
});


