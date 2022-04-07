module.exports = class Cell {
	constructor (ns, name, image, display_name, callback) {
		this.namespace = ns
		this.name = name
		this.image = image
		this.display_name = display_name
		this.callback = callback
	}

	export () {
		// Exported in the SchemeToken format
		return `${this.namespace}|${this.display_name}|${this.image}`
	}
}