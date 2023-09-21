import express from "express";
import defaultRoutes from './routes/defaultRoutes';

export const app = express();
const port = 3000;

app.use('/', defaultRoutes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
