class Grid {
    constructor(numBox) {
        this.gridGenerator(numBox);

    }

    gridGenerator(numBox) {
        const gridContainer = document.querySelector('.grid-container');

        const grid = document.createElement('table');
        grid.className = 'grid';
        let counter = numBox * numBox;
    

        for (let i = 0; i < numBox; i++) {
            let isOdd = i % 2;
            let startingCount = counter;

            if (isOdd) {
                counter = counter - numBox + 1;
            }

            const row = document.createElement('tr');
            row.className = 'row';
            for (let j = 0; j < numBox; j++) {
                const cell = document.createElement('td');
                cell.className = 'cell';
                cell.id = 'Cell-' + counter;
                cell.textContent = counter;
                row.appendChild(cell);
                if (isOdd) cell.classList.add('odd');
                else cell.classList.add('even');

                if (isOdd) counter++;
                else counter--;
            }

            if (isOdd) {
                counter = startingCount - numBox;
            }
            grid.appendChild(row);
        }
        gridContainer.appendChild(grid);
    }
}

