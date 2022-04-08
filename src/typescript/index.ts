// starting from scratch. great.
// imports

import Cell from "./cells";
import { render, tokenizeElement } from "./rendering";
import { DefaultScript, CellDirection } from "./types";
import { minifyJSON } from "./utils";


// variables
const container: HTMLElement  = document.getElementById("container");
const emptyCell = `st|||blank|||./../assets/img/cells/default.png|||Empty|||${minifyJSON(JSON.stringify(DefaultScript))}`

const board = createGrid(16,16, emptyCell)
const cells: Cell[] = [
	new Cell("st", "mover", "./../assets/img/cells/mover.png", "Mover", CellDirection.right, DefaultScript),
	new Cell("st", "enemy", "./../assets/img/cells/enemy.png", "Enemy", CellDirection.right, DefaultScript),
	new Cell("st", "generator", "./../assets/img/cells/generator.png", "Generator", CellDirection.right, DefaultScript),
	new Cell("st", "rotator", "./../assets/img/cells/rotator.png", "Rotator", CellDirection.right, DefaultScript),
]
let select: Cell = cells[0];

// bad function
function createGrid(x: number,y: number, value: string) {
	// create a basic 2d grid!!
	const grid = [];

	// loop through y
	for (let i = 0; i < y; i++) {
		const grie = []; // make an array for each row
		for (let j = 0; j < x; j++) {
			grie.push(value); // append the value to grie
		}
		grid.push(grie); // push grie to grid
		// repeat until grid is finished
	}

	// return grid
	return grid;
}

export function cellLookup(x: number, y: number) {
	return board[y][x]
}

if (container != null) render(board, container, select)