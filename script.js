console.log("Snake Game");

const dice = new Dice("dice");
dice.target.addEventListener("click", async () => {
  const diceFace = await dice.rollDice();
  dice.resetDice();

  console.log(diceFace);
});

const grid = new Grid();
