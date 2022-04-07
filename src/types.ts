// Fancy version of String


export type URL = {
	url: string
}

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