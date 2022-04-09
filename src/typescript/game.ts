import { packString } from "./packer";
import { emptyCell, render, tokenizeElement } from "./rendering";
import { Board, CellDirection, SchemeScript, ScriptParameters } from "./types";

export function doesExist(x: number, y: number, board: Board) {
	if (board[y][x] == undefined) return false
	if (board[y][x] == null)	  return false
								  return true
}


export function isOccupied(x: number,y: number,board: Board) {
	if (doesExist(x, y, board)) {
		const name = packString(board[y][x]).name
		if (name == "blank") {
			return false;
		}
		return true;
	}
	console.log("Cell no existy")
	return false;
}

export function moveCell(cellX: number, cellY: number, offX: number, offY: number, board: Board, cellName?: string) {
	const newX = cellX + offX
	const newY = cellY + offY

	if (isOccupied(newX, newY, board)) {
		console.log(`Current X: ${cellX}, Current Y: ${cellY}, Cell: ${cellName}`)

		moveCell(newX,newY,offX,offY,board)
	}
	if (doesExist(newX, newY, board)) {
		board[newY][newX] = board[cellY][cellX]
		board[cellY][cellX] = emptyCell
	}
	console.log(`Current X: ${cellX}, Current Y: ${cellY}, Cell: ${cellName}`)
}

export function removeCell(cellX: number, cellY: number, board: Board) {
	board[cellY][cellX] = emptyCell;
}

export function handleScript(script: SchemeScript, paremeters: ScriptParameters, board: Board) {
	const update = script.update.split(" ")
	let any: any = script.collision.parameters.any
	if (any != null) {
		console.log(any)
		any = any.split(" ")
	
		any.forEach(function(a: any, x: number) {
			const func: string[] = any[x].split("-")
			console.log(func)
			func.forEach(function(b: any, i: number) {
				if (
					isOccupied(x - 1, y, board) //||
					// isOccupied(x + 1, y, board) ||
					// isOccupied(x, y - 1, board) ||
					// isOccupied(x, y + 1, board)
				) {
					board[y][x] = emptyCell;
					if (func[i] == "self" && func[i + 1] != null && func[i + 1] == "destroy") {
					}
				} else {
					console.log("no collision")
				}
			})
		}, false)

	}
	
	let { x,y } = paremeters.transform.position
	
	if (update != null) {
		update.forEach(function(a: any, X: number) {
			const func: string[] = update[x].split("-")
			func.forEach(function(b: any, i: number) {
				if (func[i] == "move" && func[i + 1] != null && func[i + 1] == "forward") {
					switch (paremeters.transform.rotation) {
						case 0:	
							moveCell(x, y, 0, 1, board, paremeters.element.name)
							break
						
						case 1:
							moveCell(x, y, 1, 0, board, paremeters.element.name)
							break
						
						case 2:
							moveCell(x, y, 0, -1, board, paremeters.element.name)
							break
	
						case 3:
							moveCell(x, y, -1, 0, board, paremeters.element.name)
							break
					}	
					board[y][x] = emptyCell;
				}
			})
		})
	}

	return board
}

export default function tickGame(board: any) {
	board.forEach(function (row: any, y: number) {
		for (let i = 0; i < row.length; i++) {
			const item = row[i];
			const element = packString(item) // more readable version of tokenizeElement
			if (element.name != "blank") {
				board = handleScript(
					JSON.parse(
						element.callback
					),
					{
						element: element,
						transform: {
							position: {
								x: i,
								y: y
							},
							rotation: parseInt(element.rotation)
						}
					},
					board
				)
				i++;
			}
		}
	})

	return board;
}