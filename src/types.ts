// Fancy version of String


export type URL = {
	url: string
}

export enum direction {
	
}

export type schemeScript = {
	name: string,
	save_code: string,
	update: string,
	display: {
	image_url: URL
	},
	collision: {
		can_collide: boolean,
		parameters: {
			any?: string
		}
	}
}