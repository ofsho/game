import { URL } from "./types"

export default class Cell {
	constructor (
		ns: string,
		name: string,
		image: URL,
		display_name: string,
		callback
	) {
		this.namespace = ns
		this.name = name
		this.image = image
		this.display_name = display_name
		this.callback = callback
	}

	export () {
		// Exported in the SchemeToken format
		return `${this.namespace}|${this.name}|${this.display_name}|${this.image}`
	}
}