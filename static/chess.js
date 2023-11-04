const body = document.querySelector("body");

const gameId = body.dataset.gameid;
const orientation = body.dataset.orientation;

console.info(`gameId=${gameId}, orientation=${orientation}`);

// Handle onDrop
const onDrop = (src, dst, piece) => {
    console.info(`src=${src}, dst=${dst}, piece=${piece}`);

    //constuct the move
    const move = { src, dst, piece };
    // PATCH /chess/:gameId
    fetch(`/chess/${gameId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(move),
    })
        .then((result) => console.info("RESPONSE: ", result))
        .catch((error) => console.error("ERROR", error));
};

// Create a chess configuration
const config = {
    draggable: true,
    position: "start",
    orientation,
    onDrop,
};

var board1 = Chessboard("board1", config);

const sse = new EventSource("/chess/stream");
