import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.post("/courses", (req, res) => {
  const { name } = req.body;
  return res.json({ name });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
