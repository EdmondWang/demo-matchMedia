let breakpoints = [
        ["mobile", null, 560, null, null],
        ["tablet", 561, 850, null, null],
        ["tabletLandscape", 851, null, null, 768],
        ["desktop", 851, 1140, null, null],
        ["largeScr", 1141, null, null, null]
    ],
    deviceMatrix = {},
    realMatchMedia = typeof window.matchMedia !== "undefined" ? window.matchMedia : "";

function getDevice() {
    for (let b = 0; b < breakpoints.length; b++) {
        breakpoint = breakpoints[b][0];
        deviceMatrix[breakpoint] = "screen ";

        if (breakpoints[b][1]) {
            deviceMatrix[breakpoint] += "and (min-width:" + breakpoints[b][1] + "px) ";
        }
        if (breakpoints[b][2]) {
            deviceMatrix[breakpoint] += "and (max-width:" + breakpoints[b][2] + "px)";
        }
        if (breakpoints[b][3]) {
            deviceMatrix[breakpoint] += "and (min-height:" + breakpoints[b][3] + "px) ";
        }
        if (breakpoints[b][4]) {
            deviceMatrix[breakpoint] += "and (max-height:" + breakpoints[b][4] + "px)";
        }

        if (!breakpoints[b][1]) {
            breakpoints[b][1] = 0;
        }
        if (!breakpoints[b][2]) {
            breakpoints[b][2] = 999999;
        }
        if (!breakpoints[b][3]) {
            breakpoints[b][3] = 0;
        }
        if (!breakpoints[b][4]) {
            breakpoints[b][4] = 999999;
        }
    }
}

const myMatchMedia = (device) => {
    getDevice();
    let computedStyle = "";

    try {
        computedStyle = window.getComputedStyle(document.body, ':after').getPropertyValue('content').split('"').join("").split("'").join("");
    } catch (e) {
        // Use default value when error happens (getComputedStyle not supported)
    }
    // if MatchMedia is supported, see http://caniuse.com/#search=matchMedia
    if (realMatchMedia) {
        let mql = realMatchMedia.call(this, deviceMatrix[device]);
        if (mql.matches === true) {
            return true;
        }

        // if MatchMedia is not supported then fallback to getComputedStyle, see http://caniuse.com/#search=getComputedStyle
        // make sure css set up correctly
    } else if (computedStyle) {
        return computedStyle === device;
    } else {

        // check the window width of the browser and decide whether the breakpoiknt falls within
        let windowWidth = $window.width(),
            windowHeight = $window.height();
        for (let b = 0; b < breakpoints.length; b++) {
            if (breakpoints[b][1] <= windowWidth && windowWidth <= breakpoints[b][2] && breakpoints[b][3] <= windowHeight && windowHeight <= breakpoints[b][4]) {
                return breakpoints[b][0] === device;
            }
        }

        // solution from, http://www.nczonline.net/blog/2012/01/03/css-media-queries-in-javascript-part-1/
        if (!div) {
            div = document.createElement("div");
            div.id = "ncz1";
            div.style.cssText = "position:absolute;top:-1000px";
            document.body.insertBefore(div, document.body.firstChild);
        }

        div.innerHTML = "_<style media=\"" + deviceMatrix[device] + "\"> #ncz1 { width: 1px; }</style>";
        div.removeChild(div.firstChild);
        return div.offsetWidth === 1;
    }
    return false;
};