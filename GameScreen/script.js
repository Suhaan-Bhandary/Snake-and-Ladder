// The below code is only for demo and will certainly replaced in next commit to add players in game
const game = (playerCount) => {
  console.log("Snake Game");

  const grid = new Grid();
  const dice = new Dice("dice");

  // A players array to create and store players
  const players = [];
  const colors = [
    "#F96167", // red
    "#CCF381", // Lime Green
    "#2F3C7E", // blue
    "yellow",
    "orange",
    "#FF69B4",
    "purple",
    "lightblue",
    "black",
    "brown",
  ];

  for (let i = 0; i < playerCount; i++) {
    players.push(new Player(i, i < colors.length ? colors[i] : "red"));
  }

  let sixCount = 0;

  const currentPlayerSpan = document.getElementById("current-player");
  let currentPlayer = 0;
  currentPlayerSpan.textContent = (currentPlayer + 1).toString();
  currentPlayerSpan.style.color = players[currentPlayer].color;

  dice.target.addEventListener("click", async () => {
    let steps = await dice.rollDice();
    // let steps = 6;

    if (steps == 6) sixCount++;
    if (sixCount == 3) {
      steps = -12;
      sixCount = 0;
    }

    // Get the current player
    // -1: Snake, 0: Normal, 1: Ladder, 2: cannot move, 100: Winner condition
    let nodeType = await players[currentPlayer].updatePosition(
      steps,
      grid.getJumpPoints()
    );

    if (nodeType === 100) {
      console.log("Winner");
    }

    // Update the current player to next player
    if (steps != 6) {
      sixCount = 0;
      currentPlayer = (currentPlayer + 1) % players.length;
      currentPlayerSpan.textContent = (currentPlayer + 1).toString();
      currentPlayerSpan.style.color = players[currentPlayer].color;
    }

    dice.resetDice();
  });
};

window.addEventListener("load", () => {
  // Game Loaded Message
  console.log("Game Loaded");

  // Get the Query Data
  const urlParams = new URLSearchParams(location.search);
  let playerCount = urlParams.get("players") || 2;

  game(playerCount);
});
