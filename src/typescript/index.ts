// starting from scratch. great.
// imports

import Cell from "./cells";
import tickGame from "./game";
import { render } from "./rendering";
import { DefaultScript, CellDirection, MoverScript } from "./types";
import { minifyJSON } from "./utils";
let running: boolean = false;
let currentTick: number = 0;
let save: string[][] = null;

// variables
const container: HTMLElement  = document.getElementById("container");
const controls = document.getElementById("controls");
const scope = document.querySelector("body");
const tickElement = document.getElementById("tick");
const restartElement = document.getElementById("restart");
const emptyCell = `st|||blank|||./../assets/img/cells/default.png|||Empty|||${minifyJSON(JSON.stringify(DefaultScript))}`

let board = createGrid(16,16, emptyCell)
let selectRotation: CellDirection = CellDirection.right;
let selector = 0;
const cells: Cell[] = [
	new Cell("st", "mover", "./../assets/img/cells/mover.png", "Mover", selectRotation, MoverScript),
	new Cell("st", "enemy", "./../assets/img/cells/enemy.png", "Enemy", selectRotation, DefaultScript),
	new Cell("st", "generator", "./../assets/img/cells/generator.png", "Generator", selectRotation, DefaultScript),
	new Cell("st", "rotator", "./../assets/img/cells/rotator.png", "Rotator", selectRotation, DefaultScript),
	new Cell("st", "push", "./../assets/img/cells/push.png", "Push", selectRotation, DefaultScript),
]
let select: Cell = cells[selector];

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

function tick(ev: any) {
	ev.preventDefault();
	
	currentTick += 1;
	board = tickGame(board);

	render(board, container, select);
	console.log(`ticked! ${currentTick} ${running}`)
}

if (container != null) {
	// board[3][8] = new Cell("st", "mover", "./../assets/img/cells/mover.png", "Mover", CellDirection.up, MoverScript).export()

	scope.addEventListener("keydown", function(ev) {
		if (ev.key == "z") {
			selector++;
			if (cells[selector] != null || undefined) {
				select = cells[selector]
			} else {
				selector = 0
				select = cells[selector]
			}
			console.log(select)
			render(board, container, select)
		}
	}, false)

	render(board, container, select)
	tickElement.addEventListener("click", function(ev) {
		if (running == false) {
			running = true;
			save = board;
		}
		console.log(save)
		tick(ev);
	}, false)

	restartElement.addEventListener("click", function(ev) {
		ev.preventDefault();

		if (save != null) {
			// running = false;
			board = save;
			currentTick = 0;
			
			render(board, container, select);

			save = null;
			console.log(`restarted. ${currentTick} ${running}`)
		}
	}, false)
}
