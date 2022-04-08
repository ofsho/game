import { packString } from "./packer";
import { emptyCell, render, tokenizeElement } from "./rendering";
import { CellDirection, SchemeScript, ScriptParameters } from "./types";

export function isOccupied(x: number,y: number,board: string[][]) {
	return packString(board[y][x]).name != "blank"
}

export function moveCell(cellX: number, cellY: number, offX: number, offY: number, board: string[][], cellName?: string) {
	const newX = cellX + offX
	const newY = cellY + offY

	if (isOccupied(newX, newY, board)) {
		console.log("New position occupied, looping!")
		console.log(`Current X: ${cellX}, Current Y: ${cellY}, Cell: ${cellName}`)

		moveCell(newX,newY,offX,offY, board)
	}
	console.log("New position not occupied, moving!")
	console.log(`Current X: ${cellX}, Current Y: ${cellY}, Cell: ${cellName}`)

	board[newY][newX] = board[cellY][cellX]
	board[cellY][cellX] = emptyCell
}

export function handleScript(script: SchemeScript, paremeters: ScriptParameters, board: string[][]) {
	const update = script.update.split(" ")
	let { x,y } = paremeters.transform.position
	
	update.forEach(function(a: any, i: number) {
		const func: string[] = update[i].split("-")
		func.forEach(function(b: any, i: number) {
			if (func[i] == "move" && func[i + 1] != null && func[i + 1] == "forward") {
				switch (paremeters.transform.rotation) {
					case 0:	
						board[y + 1][x] = board[y][x]
						break
					
					case 1:
						moveCell(x, y, 1, 0, board, paremeters.element.name)
						break
					
					case 2:
						board[y - 1][x] = board[y][x]
						break

					case 3:
						board[y][x - 1] = board[y][x]
						break
					}	

				board[y][x] = emptyCell;
			}
		})
	})

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