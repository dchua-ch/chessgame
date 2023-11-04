import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { v4 as uuidv4 } from "uuid";
import { EventSource } from "express-ts-sse";

// If port is not set, default to 3000
const port = process.env.PORT || 3000;

const sse = new EventSource();

// create an instance of ze application
const app = express();
// Log incoming request
app.engine("html", engine({ defaultLayout: false }));
app.set("view engine", "html");

// Enable logging
app.use(morgan("combined"));

app.post("/chess", express.urlencoded({ extended: true }), (req, res) => {
    const gameId = uuidv4().substring(0, 8);

    // Player who creates game will automatically play as white
    const orientation = "white";

    res.status(200).render("chess", { gameId, orientation });
});
// GET /chess?gameId=abc123
app.get("/chess", (req, res) => {
    const gameId = req.query.gameId;

    // Player who joins game will be black
    const orientation = "black";
    res.status(200).render("chess", { gameId, orientation });
});

// PATCH /chess/:gameId
app.patch("/chess/:gameId", express.json(), (req, res) => {
    // Get the gameId from the resource
    const gameId = req.params.gameId;
    const move = req.body;

    console.info(`GameId:${gameId}, `, move);

    res.status(201).json({ timestamp: new Date().getTime() });
});
// GET /chess/stream
app.get("/chess/stream", sse.init);

// Serve ze files from static
app.use(express.static(__dirname + "/static"));

app.listen(port, () => {
    console.info(`Application bound to port ${port} at ${new Date()}`);
});
