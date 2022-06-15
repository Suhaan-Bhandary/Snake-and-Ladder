class Dice {
  constructor(diceId) {
    this.target = document.getElementById(diceId);
    this.target.textContent = "Dice";
  }

  rollDice() {
    return new Promise((resolve) => {
      this.target.disabled = true;

      let count = 0;
      const diceFaceRolls = getDiceFacesDuringRoll();

      const diceRollInterval = setInterval(() => {
        this.target.textContent = diceFaceRolls[count];

        count++;
        if (count == diceFaceRolls.length) {
          clearInterval(diceRollInterval);
          setTimeout(() => resolve(diceFaceRolls[count - 1]), 500);
        }
      }, 200);
    });
  }

  resetDice() {
    this.target.disabled = false;
    this.target.textContent = "Dice";
  }
}
