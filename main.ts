import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { v4 as uuidv4 } from "uuid";

// If port is not set, default to 3000
const port = process.env.PORT || 3000;

// create an instance of ze application

const app = express();
// Log incoming request
app.engine("html", engine({ defaultLayout: false }));
app.set("view engine", "html");

// Enable logging
app.use(morgan("combined"));

app.post("/chess", express.urlencoded({ extended: true }), (req, res) => {
    const gameId = uuidv4().substring(0, 8);

    // First player who joins game will automatically play as white
    const orientation = "white";

    res.status(200).render("chess", { gameId, orientation });
});

// Serve ze files from static
app.use(express.static(__dirname + "/static"));

app.listen(port, () => {
    console.info(`Application bound to port ${port} at ${new Date()}`);
});
