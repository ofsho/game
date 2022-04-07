export function etf2html(etf: string) {
	// convert etf to html
	const lines = etf.split("\n")
	console.log(lines)
	const compiled = []

	for (let i = 0; i < lines.length; i++) {
		let element = lines[i];
		let modified = "";
		if (element.startsWith("**") && element.endsWith("**")) {
			modified = element.substring(2)
			modified = element.substring(modified.length - 3, modified.length - 1)
			modified = `<strong>${modified}</strong>`
			compiled.push(modified)
			continue
		} else if (element.startsWith("%NL%")) {
			modified = `<br>`
			compiled.push(modified)
			continue
		}else if (element.startsWith("##")) {
			modified = element.substring(2)
			modified = `<p class="yellow">${modified}</p>`
			compiled.push(modified)
			continue
		}else if (element.startsWith("#")) {
			modified = element.substring(1)
			modified = `<p class="purple">${modified}</p>`
			compiled.push(modified)
			continue
		}else {
			compiled.push(element)
		}
	}

	console.log(compiled)
	return compiled.join("\n")
}