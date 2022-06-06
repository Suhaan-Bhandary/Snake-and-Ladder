// The below code is only for demo and will certainly replaced in next commit to add players in game
const game = async () => {
  console.log("Snake Game");

  const grid = new Grid();
  const player = new Player();
  const dice = new Dice("dice");

  dice.target.addEventListener("click", async () => {
    let steps = await dice.rollDice();
    await player.updatePosition(steps, grid.getJumpPoints());
    dice.resetDice();
  });
};

game();
