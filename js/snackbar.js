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
