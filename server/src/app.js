import express, { json } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
