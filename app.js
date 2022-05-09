import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
import quotation from "./routes/quotation.js";
import taxreturns from "./routes/taxreturn.js";
import emails from "./routes/email.js";
import notes from "./routes/notes.js";
import chats from "./routes/chat.js";
import messages from "./routes/messages.js";
import uploads from "./routes/upload.js";
// import bodyParser from "body-parser";

//load env variables
dotenv.config({ path: "./config/.env" });

// Create Express app
const app = express();
app.use(express.json());

//bordy parser
// app.use(bodyParser.urlencoded({ extended: true }));

//connect DB
connectDB();

// Development logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

// Users routes
app.use("/api/v1/users", users);
app.use("/api/v1/quotation", quotation);
app.use("/api/v1/auth", auth);
app.use("/api/v1/taxreturns", taxreturns);
app.use("/api/v1/emails", emails);
app.use("/api/v1/notes", notes);
app.use("/api/v1/chats", chats);
app.use("/api/v1/messages", messages);
app.use("/api/v1/upload", uploads);

// A sample route
app.get("/", (req, res) => res.send("Hello World!"));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// start server
const server = app.listen(PORT, () =>
  console.log(
    `And we are live in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
