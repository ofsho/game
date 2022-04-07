export function minifyJSON(json: string) {
	return JSON.stringify(JSON.parse(json))
}