const express = require("express");
const app = express();
const quizRoutes = require("./routes/quizRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

app.use("/quizzes", quizRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
