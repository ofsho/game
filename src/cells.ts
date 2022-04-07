import { SchemeScript, URL } from "./types"

export default class Cell {
	constructor (
		public namespace: string,
		public name: string,
		public image: URL,
		public display_name: string,
		public callback: SchemeScript
	) {}

	export () {
		// Exported in the SchemeToken format
		return `${this.namespace}|${this.name}|${this.display_name}|${this.image}`
	}
}