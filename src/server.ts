import express from "express";

// Como não é um export default, a importação precisa estar entre {}
import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

const port = 3000;

app.use(express.json());

app.use(categoriesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
