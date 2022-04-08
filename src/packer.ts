import { tokenizeElement } from "./rendering";

export function packString(string: string) {
	const tokens = tokenizeElement(string);
	const packed: any = {}

	for (let i = 0; i < tokens.length; i++) {
		packed[tokens[i].type] = tokens[i].value
	}

	return packed;
}