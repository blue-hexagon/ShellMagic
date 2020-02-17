function snackbar() {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar");
    x.className = "show";// Add the "show" class to DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 15000);

    function clickHandler(){ // declare a function that updates the state
        x.className = x.className.replace("show", "");
    }

    let element = document.getElementById('snackbar'); // grab a reference to your element
    element.addEventListener('click', clickHandler); // associate the function above with the click event
}
// <!--<div id="snackbar">We use <u style="text-decoration: dotted; color: #ff327e;">Google Analytics</u> for website analytics
// and we use <u style="text-decoration: dotted; color: #ff327e;">Freeform.io</u> for mail collection.
//     <u style="text-decoration: dotted; color: #65ffa0;">We don't collect cookies</u> and we have <u
// style="text-decoration: dotted; color: #65ffa0;">no intention of selling or distributing <b
// style="color: darkorange;">any</b> of your data.</u>
//     <br><i>For more information, please refer to our simple privacy policy in the footer at the bottom of the
// page.</i>
// <br><b style="font-family: 'Source Code Pro', serif;">[You may click anywhere on this popup to close it - autocloses
//     in 15 seconds]</b>
//     </div>-->