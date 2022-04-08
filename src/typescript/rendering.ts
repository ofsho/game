import { cellLookup } from ".";
import Cell from "./cells";
import { packString } from "./packer";
import { DefaultScript } from "./types";
import { minifyJSON } from "./utils";
export const emptyCell = `st|||blank|||./../assets/img/cells/default.png|||Empty|||${minifyJSON(JSON.stringify(DefaultScript))}`
const cmenu: HTMLElement = document.getElementById("cmenu");
const fallback = "./../assets/img/ohshit.png"

export function tokenizeElement(ele: string) {
	// ok basic thing that converts ${element} into a object i can read
	const split = ele.split("|||");
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
			case 3:
				token.push({type: "display_name", value: element});
				break;
			case 4:
				token.push({type: "rotation", value: element});
				break;
			case 5:
				token.push({type: "callback", value: element});
				break;
			default:
				console.dir(element)
				throw new Error(`Syntax Error: Unexpected token \'${element}\'`)
		}
	}

	return token
}

export function render(board: any, container: any, select: Cell) {
	const preHTML: any[] = [];
	const html: string[] = [];

	board.forEach(function (row: any, y: number) {
		const html_row: string[] = [];
		preHTML.push([])
		row.forEach((item: string, x: number) => {
			const element = item.split("|||");
			html_row.push(`<td id="cell-${y}-${x}"><img src="${element[2]}" onerror="this.src='${fallback}'" class="cell"></td>`);
		})
		preHTML.push(html_row)
	})
	
	preHTML.forEach(function (v) {
		let htm = v.join("")
		if (v.length > 0) html.push(`<tr>${htm}</tr>`) // wtf is this workaround
	})

	container.innerHTML = html.join("")

	preHTML.forEach(function (row: any, y: number) {
		row.forEach(function(item: any, x: number) {})
	})

	board.forEach(function (row: any, y: number) {
		row.forEach((item: any, x: number) => {
			// fun code V
			let tokenize = tokenizeElement(item);
			let packed = packString(item);
			
			const element = document.getElementById(`cell-${y}-${x}`) // get corresponding element in the DOM
			element.innerHTML = `<img src="${tokenize[2].value}" style="transform: rotate(${90 * parseInt(packed.rotation)}deg);" onerror="this.src='${fallback}'" class="cell">` // set the element's innerHTML to the image

			// element functionality
			element.addEventListener('mousedown', function(ev) {
				ev.preventDefault();
				// set the element value to select save code
				if (ev.button === 0) {
					board[y][x] = select.export();
				}
				else if (ev.button === 2) {
					board[y][x] = emptyCell;
				}

				// rerender the board
				render(board, container, select);
			}, false);

			// element.addEventListener('contextmenu', function(ev) {
			// 	ev.preventDefault();

			// 	// stupid ass code
			// 	// make it appear
			// 	ev.preventDefault();

			// 	const { clientX: mouseX, clientY: mouseY } = ev;

			// 	cmenu.style.top = `${mouseY}px`
			// 	cmenu.style.left = `${mouseX}px`

			// 	cmenu.classList.add("visible")

			// 	const tokens = tokenizeElement(cellLookup(x,y))

			// 	// buttons
			// 	cmenu.getElementsByClassName("title")[0].textContent = tokens[3].value;
			// 	if (tokens[1].value == "blank") {
			// 		document.getElementById("cmenu-title").textContent = "Nothing here... :(";
			// 		document.getElementById("cmenu-delete").style.display = "none";
			// 		// cmenu.getElementsByClassName("modify")[0].style.display = "none";
			// 	} else {
			// 		document.getElementById("cmenu-delete").style.display = "block";
			// 		// cmenu.getElementsByClassName("modify")[0].style.display = "block";
			// 	}

			// 	cmenu.getElementsByClassName("delete")[0].addEventListener('click', () => {
			// 		// set the element value to blank save code
			// 		board[y][x] = emptyCell;
			// 		cmenu.classList.remove("visible");
			// 		render(board, container, select); // dont forget to re-render :lol: but this causes lag so use barebone
			// 	}, false);

			// 	// cmenu.getElementsByClassName("modify")[0].addEventListener('click', () => {
			// 	// 	// will fix soon
			// 	// 	cmenu.classList.remove("visible");
			// 	// }, false)

			// 	cmenu.getElementsByClassName("close")[0].addEventListener('click', () => {
			// 		cmenu.classList.remove("visible");
			// 	}, false)

			// 	return false;
			// }, false);
		})
	})
}