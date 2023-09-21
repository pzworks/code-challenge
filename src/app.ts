import express from "express";
import defaultRoutes from './routes/defaultRoutes';
import transactionRoutes from "./routes/transactionRoutes";

export const app = express();
const port = 3000;

app.use('/', defaultRoutes)
app.use('/', transactionRoutes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
