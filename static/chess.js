const body = document.querySelector("body");

const gameId = body.dataset.gameid;
const orientation = body.dataset.orientation;

console.info(`gameId=${gameId}, orientation=${orientation}`);

// Handle onDrop
const onDrop = (src, dst, piece) => {
    console.info(`src=${src}, dst=${dst}, piece=${piece}`);
};

// Create a chess configuration
const config = {
    draggable: true,
    position: "start",
    orientation,
    onDrop
};

var board1 = Chessboard("board1", config);
