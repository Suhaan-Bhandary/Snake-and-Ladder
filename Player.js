class Player {
  constructor() {
    this.position = 1;
    this.draw();
  }

  updatePosition(steps) {
    if(this.position + steps > 100) return;

    let oldPosition = this.position;
    this.position = oldPosition + steps;

    for (let i = oldPosition; i <= this.position; i++) {
      setTimeout(() =>{
        const currentCell = document.getElementById("Cell-" + i);
        const circleData = currentCell.getBoundingClientRect();
        let x = circleData.x + circleData.width / 2;
        let y = circleData.y + circleData.height / 2;

        this.playerCircle.setAttributeNS(null, "cx", x);
        this.playerCircle.setAttributeNS(null, "cy", y);

      }, (i - oldPosition) * 250)
      
    }
  }

  draw() {
    const svgContainer = document.getElementById("svg");

    const currentCell = document.getElementById("Cell-" + this.position);
    const circleData = currentCell.getBoundingClientRect();
    let x = circleData.x + circleData.width / 2;
    let y = circleData.y + circleData.height / 2;

    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttributeNS(null, "cx", x);
    circle.setAttributeNS(null, "cy", y);
    circle.setAttributeNS(null, "r", circleData.width / 4);
    svgContainer.appendChild(circle);

    this.playerCircle = circle;
    this.playerCircle.setAttribute("class", "player-circle");
  }
}
