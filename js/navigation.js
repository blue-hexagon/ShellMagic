/**
 * These functions handle the opening and closing of the navigation bar at the left side.
 * */

let windowWidthBig = window.matchMedia("(min-width: 800px)").matches;
let windowWidthMedium = window.matchMedia("(min-width: 600px), (max-width: 800px )").matches;
let windowWidthSmall = window.matchMedia("(max-width: 400)").matches;

setNavbarLinkProperties = function clickCloseNavigationBar() {
    let sideNavigationElement = document.getElementById("sideNavigation");
    console.log(sideNavigationElement.children.item(0));
    for (let i = 0; i < sideNavigationElement.childElementCount; i++) {
        if (window.screen.width < 850) { //If the true SCREEN_WIDTH is less than 600px, i.e. your resolution not your browser resolution?
            sideNavigationElement.children[i].addEventListener("click", evt => toggleSideNavigation());
        }
    }
};

let sideNavigationWidth = function determineDeviceWidth() {
    if (windowWidthBig) {
        return '250px';
    } else if (windowWidthMedium || windowWidthSmall) {
        return '100%';
    }
};

function toggleSideNavigation() {
    let sideNavigation = document.getElementById("sideNavigation");
    let main = document.getElementsByTagName("body");

    if (sideNavigation.style.width >= sideNavigationWidth()) {
        sideNavigation.style.width = '0';
        if (windowWidthBig) {
            main[0].style.marginLeft = "0";
        }
    } else {
        sideNavigation.style.width = sideNavigationWidth();
        if (windowWidthBig) {
            main[0].style.marginLeft = sideNavigationWidth();
        }
    }
}