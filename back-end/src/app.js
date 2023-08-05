const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const apoyosRouter = require("./apoyos/apoyos.router");
const customersRouter = require("./customers/customers.router");
const dispatchersRouter = require("./dispatchers/dispatchers.router");
const driversRouter = require("./drivers/drivers.router");
const routesRouter = require("./routes/routes.router");
const vehiclesRouter = require("./vehicles/vehicles.router");
const app = express();

app.use(cors());
app.use(express.json());

//Routes

app.use("/apoyos", apoyosRouter);
// app.use("/customers", customersRouter);
// app.use("/dispatchers", dispatchersRouter);
// app.use("/drivers", driversRouter);
// app.use("/routes", routesRouter);
// app.use("/vehicles", vehiclesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
