// @flow

export 
const isElementInViewport = (el) => {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
};

export
const isElementBottomVisible = (el) => {
    var rect = el.getBoundingClientRect();
    
    return (
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
};