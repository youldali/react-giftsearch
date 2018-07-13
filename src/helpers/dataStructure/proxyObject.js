//@flow

const createProxyObject = (object: Object, defaultValue: any) => {
    return {
        get(value: string){
            return object[value] ? object[value] : defaultValue;
        }
    }
};

export default createProxyObject;
