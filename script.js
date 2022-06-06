// The below code is only for demo and will certainly replaced in next commit to add players in game
const game = (playerCount) => {
  console.log("Snake Game");

  const grid = new Grid();
  const dice = new Dice("dice");

  // A players array to create and store players
  const players = [];
  const colors = ["red", "green", "blue", "yellow"];
  for (let i = 0; i < playerCount; i++) {
    players.push(new Player(i, i < colors.length ? colors[i] : "red"));
  }

  let sixCount = 0;

  const currentPlayerSpan = document.getElementById("current-player");
  let currentPlayer = 0;
  currentPlayerSpan.textContent = (currentPlayer + 1).toString();

  dice.target.addEventListener("click", async () => {
    let steps = await dice.rollDice();
    // let steps = 6;

    if (steps == 6) sixCount++;
    if (sixCount == 3) {
      steps = -12;
      sixCount = 0;
    }

    // Get the current player
    // -1: Snake
    //  0: Normal
    //  1: Ladder
    //  2: cannot move
    let nodeType = await players[currentPlayer].updatePosition(
      steps,
      grid.getJumpPoints()
    );

    // Update the current player to next player
    if (steps != 6) {
      sixCount = 0;
      currentPlayer = (currentPlayer + 1) % players.length;
      currentPlayerSpan.textContent = (currentPlayer + 1).toString();
    }

    dice.resetDice();
  });
};

let playerCount = 3;
game(playerCount);
