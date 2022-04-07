import { SchemeScript, ImageURI } from "./types";
import { minifyJSON } from "./utils";

export default class Cell {
	constructor (
		public namespace: string,
		public name: string,
		public image: ImageURI,
		public display_name: string,
		public callback: SchemeScript
	) {}

	export () {
		// Exported in the SchemeToken format
		return `${this.namespace}|${this.name}|${this.image}|${this.display_name}|${minifyJSON(JSON.stringify(this.callback))}`
	}
}