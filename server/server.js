const express = require("express");
const app = express();
app.use(express.json());
const dbConfig = require("./config/dbConfig");
const usersRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionRoute");
const requestsRoute = require("./routes/requestsRoute");

const PORT = process.env.PORT || 5000;

app.use("/api/users", usersRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/requests", requestsRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
