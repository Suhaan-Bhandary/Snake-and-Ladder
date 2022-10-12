// File which contains all the util functions
const getDiceFacesDuringRoll = (
  rollCount = 6,
  minDiceValue = 1,
  maxDiceValue = 6
) => {
  let rolls = [];
  let preValue = -1;

  // Used to generated rollCount number of faces
  for (let i = 0; i < rollCount; i++) {
    let diceFace = getRandomInRange(minDiceValue, maxDiceValue);
    while (diceFace === preValue) {
      diceFace = getRandomInRange(minDiceValue, maxDiceValue);
    }

    preValue = diceFace;
    rolls.push(diceFace);
  }

  return rolls;
};

const getRandomInRange = (min, max) => {
  // The Numbers will be generated randomly between [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

console.log(getDiceFacesDuringRoll());
