class Player {
  constructor() {
    this.position = 1;
    this.draw();

    window.addEventListener("resize", () =>
      this.setPlayerPosition(this.position)
    );
  }

  updatePosition(steps, jumpPoints) {
    return new Promise((resolve) => {
      if (this.position + steps > 100) return resolve();

      let oldPosition = this.position;
      this.position = oldPosition + steps;

      for (let i = oldPosition; i <= this.position; i++) {
        setTimeout(() => {
          this.setPlayerPosition(i);

          if (i == this.position) {
            if (!jumpPoints.hasOwnProperty(this.position)) return resolve();
            
            setTimeout(() => {
              this.position = jumpPoints[this.position];
              this.setPlayerPosition(this.position);

              return resolve();
            }, 300);
          }
        }, (i - oldPosition) * 300);
      }
    });
  }

  // Draw the initial circle
  draw() {
    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    this.playerCircle = circle;
    this.playerCircle.setAttribute("class", "player-circle");
    this.setPlayerPosition(this.position);

    const svgContainer = document.getElementById("playerSvg");
    svgContainer.appendChild(circle);
  }

  // Function takes the cell position and repositions the circle according to it
  setPlayerPosition(cellPosition) {
    const currentCell = document.getElementById("Cell-" + cellPosition);
    const circleData = currentCell.getBoundingClientRect();
    let x = circleData.x + circleData.width / 2;
    let y = circleData.y + circleData.height / 2;

    this.playerCircle.setAttributeNS(null, "cx", x);
    this.playerCircle.setAttributeNS(null, "cy", y);
    this.playerCircle.setAttributeNS(null, "r", circleData.width / 4);
  }
}
