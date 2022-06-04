// The below code is only for demo and will certainly replaced in next commit to add players in game
const game = async () => {
  console.log("Snake Game");

  const dice = new Dice("dice");
  dice.target.addEventListener("click", async () => {
    let steps = await dice.rollDice();
    console.log(steps);

    player.updatePosition(steps);

    setTimeout(() => {
      dice.resetDice();
    }, 1000 + 250 * steps);
  });

  const grid = new Grid();
  const player = new Player();
};

game();
