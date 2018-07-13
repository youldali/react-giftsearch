// @flow

declare type Operator = 
    '<' | '<=' | '>' | '>=' | '==' | '===' | 
    'inRangeClosed' | 'inRangeOpen' | 'inRangeClosedOpen' | 'inRangeOpenClosed' |
    'isIncluded' | 'contains' | 'hasOneInCommon';

declare type Interval = {'0': number, '1': number};

declare type ProxyObject<T> = { get: (value: string) => T};
