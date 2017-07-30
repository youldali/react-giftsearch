// @flow
export const
deletePropertiesImmutable = (target: Object, properties: Array<string>): Object => {
	let resetedObject = {...target};
	for (const field of properties) {
		delete resetedObject[field];
	}
	return resetedObject;
};