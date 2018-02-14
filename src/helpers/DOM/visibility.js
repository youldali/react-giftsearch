// @flow

export 
const isElementInViewport = (el: HTMLElement): boolean => {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight && 
        rect.right <= window.innerWidth
    );
};

export
const isElementBottomVisible = (offsetBottomDetection: ?number, el: HTMLElement): boolean => {
    var rect = el.getBoundingClientRect();
    return (
        rect.bottom <= (window.innerHeight + (offsetBottomDetection || 0) )
    );
};