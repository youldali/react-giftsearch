export type RouterState = {|
	location: {|
		pathname: string,
		search: string,
		hash: string,
	|},
	action: string
|};