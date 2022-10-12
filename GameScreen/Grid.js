class Grid {
  #jumpPoints = {
    // Snakes
    23: 14,
    34: 5,
    55: 50,
    64: 41,
    71: 66,
    93: 3,
    99: 77,

    // Laders
    11: 30,
    39: 80,
    44: 65,
    49: 70,
    74: 96,
    90: 91,
  };

  constructor(numBox) {
    this.gridGenerator(numBox);
    window.addEventListener("resize", () => this.gridGenerator(numBox));
  }

  getJumpPoints() { 
    return this.#jumpPoints;
  }

  linedraw(startCell, endCell, isSnake) {
    // Drawing lines
    const lineOne = startCell.getBoundingClientRect();
    let x1 = lineOne.x + lineOne.width / 2;
    let y1 = lineOne.y + lineOne.height / 2;

    const lineTwo = endCell.getBoundingClientRect();
    let x2 = lineTwo.x + lineTwo.width / 2;
    let y2 = lineTwo.y + lineTwo.height / 2;

    const svgContainer = document.getElementById("svg");

    // let line = document.createElement("line");
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    // line.className = 'line';

    line.setAttribute("x1", `${x1}`);
    line.setAttribute("y1", `${y1}`);
    line.setAttribute("x2", `${x2}`);
    line.setAttribute("y2", `${y2}`);
    line.setAttribute("stroke", isSnake ? "rgb(255, 0, 0)" : "blue");
    line.setAttribute("stroke-width", "4px");

    svgContainer.appendChild(line);
  }

  getCell(cellNumber, isOdd) {
    const cell = document.createElement("td");
    cell.className = "cell";
    cell.id = "Cell-" + cellNumber.toString();

    if (isOdd) cell.classList.add("odd");
    else cell.classList.add("even");

    // Create span for numbering
    let cellIdSpan = document.createElement("span");
    cellIdSpan.className = "cellId";
    cellIdSpan.textContent = cellNumber;
    cell.appendChild(cellIdSpan);

    return cell;
  }

  generateCells() {
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.lastElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild);
    }

    const grid = document.createElement("table");
    grid.className = "grid";

    let counter = 100;

    for (let i = 0; i < 10; i++) {
      let isOdd = i % 2;

      let startingCount = counter;
      if (isOdd) {
        counter = counter - 10 + 1;
      }

      const row = document.createElement("tr");
      row.className = "row";

      for (let j = 0; j < 10; j++) {
        row.appendChild(this.getCell(counter, isOdd));
        if (isOdd) counter++;
        else counter--;
      }

      if (isOdd) {
        counter = startingCount - 10;
      }
      grid.appendChild(row);
    }
    gridContainer.appendChild(grid);
  }

  generateSnakesAndLadders() {
    // clear all the preious lines
    const svgContainer = document.getElementById("svg");
    while (svgContainer.lastElementChild) {
      svgContainer.removeChild(svgContainer.lastElementChild);
    }

    // First we scroll to the top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    // After the table is created we loop through the jumpoinst and set them
    for (const [start, end] of Object.entries(this.#jumpPoints)) {
      let distance = end - start;
      let isSnake = distance < 0;

      let startCell = document.getElementById("Cell-" + start.toString());
      let endCell = document.getElementById("Cell-" + end.toString());

      // Adding class of snake and ladder
      startCell.classList.add(isSnake ? "snake" : "ladder");
      endCell.classList.add(isSnake ? "snakeTail" : "ladderHead");

      this.linedraw(startCell, endCell, isSnake);
    }
  }

  gridGenerator() {
    this.generateCells();
    this.generateSnakesAndLadders();
  }
}
