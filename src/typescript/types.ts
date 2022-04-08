// Fancy version of String


export type ImageURI = string

export enum CellDirection {
	up,
	left,
	down,
	right
}

export enum SSDirection {
	up,
	left,
	down,
	right,
	any
}

export type SchemeScript =
{
	name: string,
	save_code: string,
	update: string,
	collision: {
		can_collide: boolean,
		parameters: {
			any?: string,
			up?: string,
			down?: string,
			left?: string,
			right?: string
		}
	}
}

export const DefaultScript: SchemeScript = {
	name: "Default",
	save_code: "st|default",
	update: "pass",
	collision: {
		can_collide: true,
		parameters: {}
	}
}