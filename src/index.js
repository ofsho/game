// global variables
const container = document.getElementById("container");
const Cell = require("./cells.js");
const cells = [
	new Cell("st", "mover", "./../resources/cells/mover.png", "pass"),
	new Cell("st", "enemy", "./../resources/cells/enemy.png", "pass"),
	new Cell("st", "generator", "./../resources/cells/generator.png", "pass"),
	new Cell("st", "rotator", "./../resources/cells/rotator.png", "pass")
]
let select = cells[0];

// functions
function createGrid(x,y,value) {
	// create a basic 2d grid
	const grid = [];

	// loop through y
	for (let i = 0; i < y; i++) {
		const grie = []; // make an array for each row
		for (let i = 0; i < x; i++) {
			grie.push(value); // append the value to grie
		}
		grid.push(grie); // push grie to grid
		// repeat until grid is finishe\d
	}

	// return grid
	return grid;
}

// overly complex tokenizing function that I refuse to comment
function tokenizeElement(ele) {
	const split = ele.split("|");
	const token = [];
	for (let i = 0; i < split.length; i++) {
		const element = split[i];
		switch (i) {
			case 0:
				token.push({type: "namespace", value: element});
				break;
			case 1:
				token.push({type: "save_code", value: element});
				break;
			case 2:
				token.push({type: "image", value: element});
				break;
			default:
				throw new Error(`Syntax Error: Unexpected token \'${element}\'`)
		}
	}

	return token
}

const board = createGrid(16,16,"st|blank|./../resources/cells/default.png");

function render() {
	// instantiate a basic HTML array
	const html = [];
	const ele = 0;
	let i = 0;

	board.forEach(function (row, y) {
		html.push([])
		row.forEach((item, x) => {
			html[i].push(`<td id="cell-${y}-${x}"></td>`);
		})
		i += 1
	})
	let htm = [];

	html.forEach(function (value, index, array) {
		// :vomit: hacky work around
		let ht = value.join("") // join the value of all columns in a row
		htm.push(`<tr>${ht}</tr>`) // push a row to HTM array
		container.innerHTML = htm.join(""); // then set the container's innerHTML to the HTM array
	})

	board.forEach(function (row, y) {
		row.forEach((item, x) => {
			// boring code V
			// document.getElementById(`cell-${x}-${y}`).innerHTML = item

			// fun code V
			const tokenize = tokenizeElement(item); // tokenize the element value in board
			const element = document.getElementById(`cell-${y}-${x}`) // get corresponding element in the DOM
			element.innerHTML = `<resources src="${tokenize[2].value}" onerror="this.src='./../resources/ohshit.png'" class="cell">` // set the element's innerHTML to the image
			
			// element functionality
			element.addEventListener('click', function(ev) {
				// set the element value to select save code
				board[y][x] = select.export();

				// rerender the board
				render();
			}, false);

			element.addEventListener('contextmenu', function(ev) {
				ev.preventDefault();
				alert('success!');
				return false;
			}, false);
		})
	})
}

function cellLookup(x,y) {
	return board[x][y]
}

// testing fallback
board[0][0] = "st|mover|./../resources/cells/mover.png";
board[0][1] = "st|gener|./../resources/cells/generator.png";
board[0][2] = "st|rotat|./../resources/cells/rotator.png";

board[1][2] = "st|enemy|./../resources/cells/enemy.png";

console.log(cellLookup(1,2))

render()