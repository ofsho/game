// Enums
// Numbers but readable and conscise.. Probably

export enum CellDirection {
	up, // 0
	right, // 1
	down, // 2
	left // 3
}

export enum SSDirection {
	up,
	left,
	down,
	right,
	any
}

// Aliased Types
// Types that are really just aliases so that it's easier for me (and contributors) to read
export type ImageURI = string
export type Board = string[][]

// Actual Types
// The actual types
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

export const RotateScript: SchemeScript = {
	name: "Mover",
	save_code: "st|mover",
	update: "",
	collision: {
		can_collide: true,
		parameters: {
			"any": "rotate-coll"
		}
	}
}

export const EnemyScript: SchemeScript = {
	name: "Mover",
	save_code: "st|mover",
	update: "",
	collision: {
		can_collide: true,
		parameters: {
			"any": "self-destroy"
		}
	}
}