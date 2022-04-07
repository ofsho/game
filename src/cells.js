module.exports = class Cell {
	constructor (ns, name, image, callback) {
		this.namespace = ns
		this.name = name
		this.image = image
		this.callback = callback
	}

	export () {
		// Exported in the SchemeToken format
		return `${this.namespace}|${this.name}|${this.image}`
	}
}