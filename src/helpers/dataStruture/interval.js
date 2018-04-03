//@flow
export type Interval = {'0': number, '1': number}

const createInterval = (begin: number, end: number): Interval => (
    begin > end 
    ? {
        '0': 0, 
        '1': 0
    } 
    : {
        '0': begin, 
        '1': end
    }
);

export default createInterval;