// starting from scratch. great.
// imports

import Cell from "./cells";
import { ImageURI, DefaultScript } from "./types";
import { minifyJSON } from "./utils";

// variables
const container: HTMLElement  = document.getElementById("container");
const cmenu: HTMLElement = document.getElementById("cmenu");
const board = createGrid(16,16, `st|blank|./../img/cells/default.png|Empty|${minifyJSON(JSON.stringify(DefaultScript))}`)
const cells: Cell[] = [
	new Cell("st", "mover", "./../img/cells/mover.png", "Mover", DefaultScript),
	new Cell("st", "enemy", "./../img/cells/enemy.png", "Enemy", DefaultScript),
	new Cell("st", "generator", "./../img/cells/generator.png", "Generator", DefaultScript),
	new Cell("st", "rotator", "./../img/cells/rotator.png", "Rotator", DefaultScript),
]
let select: Cell = cells[0];

// bad function
function createGrid(x: number,y: number, value: string) {
	// create a basic 2d grid
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

function render() {
	const preHTML: string[][] = [];
	const html: string[] = [];

	console.log("Rendered")

	board.forEach(function (row, y) {
		const html_row: string[] = [];
		preHTML.push([])
		row.forEach((item, x) => {
			const element = item.split("|");
			html_row.push(`<td id="cell-${y}-${x}"><img src="${element[2]}" onerror="this.src='./../img/ohshit.png'" class="cell"></td>`);
		})
		preHTML.push(html_row)
	})
	
	preHTML.forEach(function (v) {
		let htm = v.join("")
		console.log(preHTML)
		html.push(`<tr>${htm}</tr>`)
	})

	container.innerHTML = html.join("")

	

	board.forEach(function (row, y) {
		row.forEach((item, x) => {
			console.log("loler")
		})
	})
}

function cellLookup(x: number, y: number) {
	return board[y][x]
}

render()