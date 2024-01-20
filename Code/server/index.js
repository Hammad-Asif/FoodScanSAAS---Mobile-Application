const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./helpers/error-handler");

const port = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.options("*", cors());

require("dotenv/config");

// =======================================  Importing Routers  =====================================

const usersRoutes = require("./routers/users");
const subscriptionsRoutes = require("./routers/subscriptions");
const plansRoutes = require("./routers/plans");
const paymentsRoutes = require("./routers/payments");
const productsRoutes = require("./routers/products");

// =======================================  Middleware  ============================================

app.use(express.json());
app.use(morgan("tiny"));
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

// =======================================  Connection with MongoDB  ===============================

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("DB Not Connected", err);
  });

// =======================================  Routers  ===============================================

app.use(`/api/users`, usersRoutes);
app.use(`/api/subscriptions`, subscriptionsRoutes);
app.use(`/api/plans`, plansRoutes);
app.use(`/api/payments`, paymentsRoutes);
app.use(`/api/products`, productsRoutes);

// =======================================  Creating Server  =======================================

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
