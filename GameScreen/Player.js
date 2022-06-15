class Player {
  constructor(id, color) {
    this.position = 1;
    this.id = id;
    this.color = color;

    this.draw();

    window.addEventListener("resize", () =>
      this.setPlayerPosition(this.position)
    );
  }

  updatePosition(steps, jumpPoints) {
    return new Promise((resolve) => {
      if (this.position + steps > 100) return resolve(2);

      let oldPosition = this.position;
      this.position = oldPosition + steps;

      // Here we are using flag to know that we are going in front or back direction
      let flag = 1;
      if (this.position < oldPosition) flag = -1;

      for (let i = oldPosition; i * flag <= this.position * flag; i += flag) {
        setTimeout(() => {
          this.setPlayerPosition(i);

          if (i == this.position) {
            if(this.position == 100) return resolve(100);
            if (!jumpPoints.hasOwnProperty(this.position)) return resolve(0);

            setTimeout(() => {
              let isLadder = jumpPoints[this.position] - this.position > 0;
              this.position = jumpPoints[this.position];
              this.setPlayerPosition(this.position);

              return resolve(isLadder ? 1 : -1);
            }, 300);
          }
        }, Math.abs(i - oldPosition) * 300);
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
    this.playerCircle.setAttribute("fill", this.color);
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
