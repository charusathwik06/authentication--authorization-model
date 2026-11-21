require("dotenv").config();

const express = require("express");
const authRouter = require("./routes/authRouter");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use("/auth", authRouter);


app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Auth server running on port ${PORT}`);
});