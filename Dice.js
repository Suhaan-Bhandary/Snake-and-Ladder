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
          this.target.disabled = false;

          clearInterval(diceRollInterval);
          resolve(diceFaceRolls[count - 1]);
        }
      }, 750);
    });
  }

  resetDice() {
    this.target.textContent = "Dice";
  }
}
