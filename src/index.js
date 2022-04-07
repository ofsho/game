// global variables
const container = document.getElementById("container");
const scope = document.querySelector("body")

const Cell = require("./cells.js");
const cells = [
	new Cell("st", "mover", "./../img/cells/mover.png", "Mover", "pass"),
	new Cell("st", "enemy", "./../img/cells/enemy.png", "Enemy", "pass"),
	new Cell("st", "generator", "./../img/cells/generator.png", "Generator", "pass"),
	new Cell("st", "rotator", "./../img/cells/rotator.png", "Rotator", "pass"),
]
const cmenu = document.getElementById("cmenu");
let select = cells[0];

// functions

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
				token.push({type: "name", value: element});
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

const board = createGrid(16,16,"st|blank|./../img/cells/default.png");

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

function render() {
	console.log("Main render initiated")
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
	})

	container.innerHTML = htm.join(""); // then set the container's innerHTML to the HTM array

	board.forEach(function (row, y) {
		row.forEach((item, x) => {
			// fun code V
			const tokenize = tokenizeElement(item); // tokenize the element value in board
			const element = document.getElementById(`cell-${y}-${x}`) // get corresponding element in the DOM
			element.innerHTML = `<img src="${tokenize[2].value}" onerror="this.src='./../img/ohshit.png'" class="cell">` // set the element's innerHTML to the image

			// element functionality
			element.addEventListener('mousedown', function(ev) {
				ev.preventDefault();
				// set the element value to select save code
				board[y][x] = select.export();

				// rerender the board
				render();
			}, false);

			element.addEventListener('contextmenu', function(ev) {
				ev.preventDefault();

				board[y][x] = "st|blank|./../img/cells/default.png";
				render(); // dont forget to re-render :lol: but this causes lag so use barebone

				// stupid ass code
				// make it appear
				// ev.preventDefault();

				// const { clientX: mouseX, clientY: mouseY } = ev;

				// cmenu.style.top = `${mouseY}px`
				// cmenu.style.left = `${mouseX}px`

				// cmenu.classList.add("visible")

				// const tokens = tokenizeElement(cellLookup(y,x))

				// // buttons
				// cmenu.getElementsByClassName("title")[0].textContent = tokens[1].value;
				// if (tokens[1].value == "blank") {
				// 	cmenu.getElementsByClassName("title")[0].textContent = "Nothing here... :(";
				// 	cmenu.getElementsByClassName("delete")[0].style.display = "none";
				// 	cmenu.getElementsByClassName("modify")[0].style.display = "none";
				// } else {
				// 	cmenu.getElementsByClassName("delete")[0].style.display = "block";
				// 	cmenu.getElementsByClassName("modify")[0].style.display = "block";
				// }

				// cmenu.getElementsByClassName("delete")[0].addEventListener('click', () => {
				// 	// set the element value to blank save code
				// 	board[y][x] = "st|blank|./../img/cells/default.png";
				// 	cmenu.classList.remove("visible");
				// 	render(); // dont forget to re-render :lol: but this causes lag so use barebone
				// }, false);

				// cmenu.getElementsByClassName("modify")[0].addEventListener('click', () => {
				// 	// will fix soon
				// 	cmenu.classList.remove("visible");
				// }, false)

				// cmenu.getElementsByClassName("close")[0].addEventListener('click', () => {
				// 	cmenu.classList.remove("visible");
				// }, false)
				
				// return false;
			}, false);

			scope.addEventListener("click", (ev) => {
				if (ev.target.offsetParent != cmenu) {
					cmenu.classList.remove("visible");
				}
			}, false)
		})
	})
}

function cellLookup(x,y) {
	return board[x][y]
}

render()