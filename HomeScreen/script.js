const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  let players = 5;

  const origin = window.location.origin + "/Snake-and-Ladder";
  const redirectPath = "GameScreen/index.html";
  const data = `?players=${players}`;

  const redirectLink = origin + '/' + redirectPath + data;
  // console.log(redirectLink);

  window.location = redirectLink;
});
