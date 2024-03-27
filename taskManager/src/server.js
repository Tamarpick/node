const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/usersRoute");
const connectDB = require("./db_setup/mongoSetup");
const categoryRouter = require("./routes/categoriesRoute");
const tasksRouter = require("./routes/tasksRoute");
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/tasks", tasksRouter);

app.use((err, req, res, next) => {
	console.log(`[ERROR ON REQEUST]\t`, err);
	let message = "Internal Server Error";
	let statusCode = 404;
	if (err.errors && err.errors[0]) {
		message = err.errors[0].msg;
		statusCode = 400;
	} else if (err[0]) {
		message = err[0].msg;
		statusCode = 400;
	} else if (err.message) {
		message = err.message;
		statusCode = 400;
	} else {
		message = err;
		statusCode = 400;
	}
	res.status(statusCode).json({ message });
});

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => console.log(`[SERVER STARTED]\tPORT: ${port}`));
