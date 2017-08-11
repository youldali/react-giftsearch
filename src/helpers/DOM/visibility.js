// @flow

export 
const isElementInViewport = (el: HTMLElement) => {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight && 
        rect.right <= window.innerWidth
    );
};

export
const isElementBottomVisible = (el: HTMLElement) => {
    var rect = el.getBoundingClientRect();
    
    return (
        rect.bottom <= window.innerHeight
    );
};