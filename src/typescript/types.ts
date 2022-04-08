// Fancy version of String


export type ImageURI = string

export enum CellDirection {
	up, // 0
	left, // 1
	down, // 2
	right // 3
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


export type ScriptParameters =
{
	element: any,
	transform: {
		position: {
			x: number,
			y: number
		},
		rotation: CellDirection
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

export const MoverScript: SchemeScript = {
	name: "Mover",
	save_code: "st|mover",
	update: "move-forward",
	collision: {
		can_collide: true,
		parameters: {}
	}
}