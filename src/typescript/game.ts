import { packString } from "./packer";
import { emptyCell, render, tokenizeElement } from "./rendering";
import { CellDirection, SchemeScript, ScriptParameters } from "./types";

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
						board[y][x - 1] = board[y][x]
						break
					
					case 2:
						board[y - 1][x] = board[y][x]
						break
					
					case 3:
						board[y][x + 1] = board[y][x]
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
							rotation: CellDirection.right
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