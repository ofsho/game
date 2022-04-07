// starting from scratch. great.
// imports

import Cell from "./cells";
import { render } from "./rendering";
import { version } from '../package.json';
import { DefaultScript, CellDirection } from "./types";
import { minifyJSON } from "./utils";
import { etf2html } from "./etf";

// variables
const container: HTMLElement  = document.getElementById("container");
const emptyCell = `st|||blank|||./../img/cells/default.png|||Empty|||${minifyJSON(JSON.stringify(DefaultScript))}`

const board = createGrid(16,16, emptyCell)
const cells: Cell[] = [
	new Cell("st", "mover", "./../img/cells/mover.png", "Mover", CellDirection.right, DefaultScript),
	new Cell("st", "enemy", "./../img/cells/enemy.png", "Enemy", CellDirection.right, DefaultScript),
	new Cell("st", "generator", "./../img/cells/generator.png", "Generator", CellDirection.right, DefaultScript),
	new Cell("st", "rotator", "./../img/cells/rotator.png", "Rotator", CellDirection.right, DefaultScript),
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
if (document.getElementById("game_version") != null) document.getElementById("game_version").innerHTML = `v${version}`

const menuItems = [
	document.getElementById("play"),
	document.getElementById("edit"),
	document.getElementById("settings"),
	document.getElementById("exit"),
	document.getElementById("return")
]

if (menuItems[0]){
	menuItems[0].addEventListener("click", function() {
		window.location.href = window.location.href + "/../game.html"
	}, false)
}

if (menuItems[1]){
	menuItems[1].addEventListener("click", function() {
		console.log("fail")
	}, false)
}

if (menuItems[2]){
	menuItems[2].addEventListener("click", function() {
		console.log("fail")
	}, false)
}

if (menuItems[3]){
	menuItems[3].addEventListener("click", function() {
		window.close()
	}, false)
}

if (menuItems[4]){
	menuItems[4].addEventListener("click", function() {
		window.location.href = window.location.href + "/../index.html"
	}, false)
}

if (document.getElementById("update_log")) {
	const ulog = document.getElementById("update_log")
	const changelogURI = "https://raw.githubusercontent.com/Schematell/game/master/changelog.etf"
	fetch(changelogURI)
		.then(data => data.text())
		.then(data => {
			// console.log(data)
			ulog.innerHTML = etf2html(data)
		})
}