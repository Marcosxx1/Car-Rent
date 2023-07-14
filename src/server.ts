import express from "express";

// Como não é um export default, a importação precisa estar entre {}
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specifications.route";

const app = express();

const port = 3000;

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
