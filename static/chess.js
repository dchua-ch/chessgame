const body = document.querySelector("body");

const gameId = body.dataset.gameid;
const orientation = body.dataset.orientation;

console.info(`gameId=${gameId}, orientation=${orientation}`);

// Create a chess configuration

const config = {
    draggable: true,
    position: "start",
    orientation,
};

var board1 = Chessboard("board1", config);
