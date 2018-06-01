//@flow

const createObjectWithDefault = (object: Object, defaultValue: any) => {
    return {
        get(value: string){
            return object[value] ? object[value] : defaultValue;
        }
    }
};

export default createObjectWithDefault;
