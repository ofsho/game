import { SchemeScript, ImageURI, CellDirection } from "./types";
import { minifyJSON } from "./utils";

export default class Cell {
	constructor (
		public namespace: string,
		public name: string,
		public image: ImageURI,
		public display_name: string,
		public rotation: CellDirection,
		public callback: SchemeScript
	) {}

	export () {
		// Exported in the SchemeToken format
		return `${this.namespace}|||${this.name}|||${this.image}|||${this.display_name}|||${this.rotation}|||${minifyJSON(JSON.stringify(this.callback))}`
	}
}