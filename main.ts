import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { v4 as uuidv4 } from "uuid";

// If port is not set, default to 3000
const port = process.env.PORT || 3000;

// create an instance of ze application

const app = express();

app.get("/", (_req, res) => res.send("Hello world!"));

app.listen(port, () => {
    console.info(`Application bound to port ${port} at ${new Date()}`);
});
