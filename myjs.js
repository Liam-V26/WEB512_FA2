// External JavaScript for all 5 pages.

// Options used:
// A - Welcome message when the page loads (Home)
// B - Image slideshow (Gallery)
// C - Vaalidate the contact form (Contact Us)
// D - Buttons to show or hide information (Home, About Us, Events, Contact Us)
// F - Event cost calculator (Events)
// H - Dark mode / light mode switch (all pages)

// The events from the table on the Events page.

var events = [
    { name: "Wildlife Photography Workshop", date: "December 10, 2026", price: 350 },
    { name: "Bird Watching Tour", date: "December 20, 2026", price: 250 },
    { name: "Christmas Dinner", date: "December 24 & 25, 2026", price: 450 },
    { name: "Safari Adventure", date: "May 5, 2027", price: 1500 },
    { name: "Conservation Awareness Seminar", date: "June 20, 2027", price: 100 },
    { name: "Wildlife Art Exhibition", date: "July 15, 2027", price: 120 },
    { name: "Nature Photography Contest", date: "August 30, 2027", price: 80 },
    { name: "Eco-Tourism Fair", date: "September 25, 2027", price: 60 },
    { name: "Wildlife Conservation Fundraiser", date: "October 10, 2027", price: 600 },
    { name: "Endangered Species Awareness Campaign", date: "November 5, 2027", price: 0 },
    { name: "Wildlife Film Festival", date: "December 15, 2027", price: 150 },
    { name: "Christmas Dinner", date: "December 24 & 25, 2027", price: 450 }
];

// Makes a green button with the text that we give it
function makeButton(text){
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    button.style.backgroundColor = "#007749";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.padding = "8px 16px";
    button.style.margin = "5px";
    button.style.cursor = "pointer";

    // Hover effect (Darker green when the mouse is over the button)
    button.onmouseover = function (){
        button.style.backgroundColor = "#005a38";
    };
    button.onmouseout = function (){
        button.style.backgroundColor = "#007749";
    };
    return button;
}

// Makes an empty box with a border and some spacing
function makeBox(){
    var box = document.createElement("div");
    box.style.border = "2px solid #007749";
    box.style.borderRadius = "6px";
    box.style.padding = "15px";
    box.style.margin = "10px 0";
    return box;
}

// Turns a price into text (eg. 350 becomes R350)
function priceText(){
    if(price==0){
        return "Free";
    }
    return "R" + price;
}

//Option D - Buttons to show/hide information.

function addToggleButton(headingId){
    var heading = document.getElementById(headingId);
    if(heading == null){
        return;    // This heading is not on this page
    }

    var section = heading.parentNode;
    var button = makeButton("Hide section");
    var hidden = false;

    button.onclick = function(){
        hidden = !hidden; // The switch between true and false

        var children = section.children;
        for(var i = 0;i < children.length; i++) {
            if(children[i] != heading && children[i] != button){
                if(hidden){
                    children[i].style.display = "none"
                } else{
                    children[i].style.display = "";
                }
            }
        }

        // Stop any video that is playing when we hide it
        var videos = section.getElementByTagName("video");
        for (var j = 0; j < videos.length; j++){
            videos[j].pause();
        }

        if (hidden){
            button.textContent = "Show section";
        } else{
            button.textContent = "Hide section";
        }
    };

    // Put the button straight after the heading
    section.insertBefore(button, heading.nextSibling);
}

//Option A - Welcome message when the page loads

function showWelcomeMessage(){
    var hour = new Date().getHours();
    var greeting;

    if (hour < 12){
        greeting = "Good morning";
    } else if(hour < 18){
        greeting = "Good afternoon";
    } else{
        greeting = "Good evening";
    }

    var banner = document.createElement("div");
    banner.textContent = greeting + "! Welcome to Explore SA Events. Discover South Africa's wildlife, culture and upcoming events.";
    banner.style.backgroundColor = "#007749";
    banner.style.color = "white";
    banner.style.padding = "15px";
    banner.style.textAlign = "center";

    var closeButton = makeButton("Close");
    closeButton.style.backgroundColor = "white";
    closeButton.style.color = "#007749"
    closeButton.onmouseover = function (){ };
    closeButton.onmouseout = function () { };
    closeButton.onclick = function () {
        banner.style.display = "none";
    };
    banner.appendChild(closeButton);

    // Putting the banner at the top of the page
    document.body.insertBefore(banner, document.body.firstChild);

    // Hide it after 8 seconds
    setTimeout(function () {
        banner.style.display = "none";
    }, 8000);
}

// Option B - Image Slideshow
function addSlideshow(){
    var pictures = document.querySelectorAll("figure img");
    if(pictures.length == 0){
        return;
    }

    var section = document.createElement("section");
    section.innerHTML = "<h2>Featured slideshow</h2>";

    var box = makeBox();
    box.style.textAlign = "center";

    var image = document.createElement("img");
    image.style.width = "100%";
    image.style.maxWidth = "600px";
    image.style.height = "350px";
    image.style.objectFit = "contain";

    var caption = document.createElement("p");
    var current = 0;   // the number of the picture shown

    function showSlide(){
        image.src = pictures[current].src;
        image.alt = pictures[current].alt;
        caption.textContent = "Picture " + (current + 1) + " of " + pictures.length + ": " + pictures[current].alt;
    }
    function nextSlide(){
        current = current + 1;
        if(current == pictures.length){
            current = 0;
        }
        showSlide();
    }

    function previousSlide(){
        current = current - 1;
        if(current < 0){
            current = pictures.length - 1;
        }
        showSlide();
    }

    var previousButton = makeButton("Previous");
    var nextButton = makeButton("Next");
    previousButton.onclick = previousSlide;
    nextButton.onclick = nextSlide;

    box.appendChild(image);
    box.appendChild(caption);
    box.appendChild(previousButton);
    box.appendChild(nextButton);
    section.appendChild(box);

    // Placing the slideshow above the photo section
    var photoSection= document.getElementById("wildlife-heading").parentNode;
    photoSection.parentNode.insertBefore(section, photoSection);

    showSlide();
    setInterval(nextSlide, 4000); // Picture changes every 4 seconds
}

//OPTION F - Event cost calculator (Events page)

function addEventTools() {
    var section = document.createElement("section");
    section.innerHTML = "<h2>Plan your visit</h2>";

    var box = makeBox();
    box.innerHTML =
        "<h3>Event cost calculator</h3>" +
        "<p>Groups of 5 or more tickets get 10% off.</p>" +
        "<label for='calc-event'>Choose an event:</label><br>" +
        "<select id='calc-event'></select><br><br>" +
        "<label for='calc-tickets'>Number of tickets:</label><br>" +
        "<input type='number' id='calc-tickets' value='1' min='1'><br><br>";

    // Fill the drop-down list using a loop
    var select = box.querySelector("#calc-event");
    var firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = "Select an event";
    select.appendChild(firstOption);

    for (var j = 0; j < events.length; j++) {
        var option = document.createElement("option");
        option.value = j;
        option.textContent = events[j].name + " - " + events[j].date + " (" + priceText(events[j].price) + ")";
        select.appendChild(option);
    }

    var ticketsInput = box.querySelector("#calc-tickets");
    var button = makeButton("Calculate cost");
    var result = document.createElement("p");
    result.style.fontWeight = "bold";

    button.onclick = function () {
        var chosen = select.value;
        var tickets = parseInt(ticketsInput.value);

        if (chosen == "") {
            result.textContent = "Please choose an event.";
            return;
        }
        if (isNaN(tickets) || tickets < 1) {
            result.textContent = "Please enter 1 or more tickets.";
            return;
        }

        var theEvent = events[chosen];
        var total = theEvent.price * tickets;
        var message = tickets + " x R" + theEvent.price + " = R" + total;

        if (tickets >= 5) {
            var discount = total * 0.1;
            total = total - discount;
            message = message + ", minus 10% group discount (R" + discount + ")";
        }

        result.textContent = message + ". Total: R" + total.toFixed(2);
    };

    box.appendChild(button);
    box.appendChild(result);
    section.appendChild(box);

    var tipsSection = document.getElementById("event-tips-heading").parentNode;
    tipsSection.parentNode.insertBefore(section, tipsSection);
}

//OPTION C - Contact form

// Checks that an email looks like name@example.com
function emailIsValid(email) {
    var atPosition = email.indexOf("@");
    var dotPosition = email.lastIndexOf(".");

    if (email.indexOf(" ") != -1) {
        return false; 
    }
    if (atPosition < 1) {
        return false; 
    }
    if (atPosition != email.lastIndexOf("@")) {
        return false; 
    }
    if (dotPosition < atPosition + 2) {
        return false; 
    }
    if (dotPosition >= email.length - 2) {
        return false; 
    }
    return true;
}

function setUpContactForm() {
    var form = document.querySelector(".contact-form");
    if (form == null) {
        return;
    }

    // Stop the browser's own pop-up messages so our messages are used
    form.noValidate = true;

    // Add an empty red error message under each field we check
    var fields = ["name", "email", "subject", "message"];
    for (var i = 0; i < fields.length; i++) {
        var input = document.getElementById(fields[i]);
        var error = document.createElement("span");
        error.id = fields[i] + "-error";
        error.style.color = "red";
        error.style.display = "block";
        input.parentNode.appendChild(error);
    }

    // A green message that appears after a successful send
    var success = document.createElement("p");
    success.style.color = "green";
    success.style.fontWeight = "bold";
    form.parentNode.appendChild(success);

    // Shows an error message for one field
    function showError(fieldId, message) {
        document.getElementById(fieldId + "-error").textContent = message;
    }

    // This runs when the Submit button is clicked
    form.onsubmit = function (event) {
        event.preventDefault(); // stop the page from reloading
        success.textContent = "";

        // Clear the old error messages
        for (var k = 0; k < fields.length; k++) {
            showError(fields[k], "");
        }

        var name = document.getElementById("name").value.trim();
        var email = document.getElementById("email").value.trim();
        var subject = document.getElementById("subject").value.trim();
        var message = document.getElementById("message").value.trim();
        var allGood = true;

        if (name == "") {
            showError("name", "Please enter your name.");
            allGood = false;
        }

        if (email == "") {
            showError("email", "Please enter your email address.");
            allGood = false;
        } else if (!emailIsValid(email)) {
            showError("email", "Please enter a valid email address, for example name@example.com.");
            allGood = false;
        }

        if (subject == "") {
            showError("subject", "Please enter a subject.");
            allGood = false;
        }

        if (message == "") {
            showError("message", "Please enter your message.");
            allGood = false;
        }

        // Only send if every field is correct
        if (allGood) {
            success.textContent = "Thank you, " + name + "! Your message has been sent. We will reply to " + email + " soon.";
            form.reset();
        }
    };
}

//OPTION H - Dark mode / light mode switch (all pages)

function addDarkModeButton() {
    var button = makeButton("Dark mode");
    button.style.position = "fixed";
    button.style.bottom = "15px";
    button.style.right = "15px";
    button.style.zIndex = "1000";
    document.body.appendChild(button);

    // These are the parts of the page that change colour
    var parts = document.querySelectorAll("body, header, nav, main, section, article, footer, figure, table, th, td, caption, h1, h2, h3, p, li, label, figcaption");
    var links = document.querySelectorAll("a");

    function setTheme(dark) {
        for (var i = 0; i < parts.length; i++) {
            if (dark) {
                parts[i].style.backgroundColor = "#222222";
                parts[i].style.backgroundImage = "none";
                parts[i].style.color = "#f0f0f0";
            } else {
                // Empty text puts back the normal colours from style.css
                parts[i].style.backgroundColor = "";
                parts[i].style.backgroundImage = "";
                parts[i].style.color = "";
            }
        }

        for (var j = 0; j < links.length; j++) {
            if (dark) {
                links[j].style.color = "#8ecbff";
            } else {
                links[j].style.color = "";
            }
        }

        if (dark) {
            button.textContent = "Light mode";
        } else {
            button.textContent = "Dark mode";
        }
    }

    // Remember the choice so every page uses the same mode
    var darkOn = (localStorage.getItem("theme") == "dark");
    setTheme(darkOn);

    button.onclick = function () {
        darkOn = !darkOn;
        setTheme(darkOn);
        if (darkOn) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    };
}

//START: runs when the page has finished loading.It checks the page title to see which page is open.

window.onload = function () {
    var title = document.title;

    if (title == "Home") {
        showWelcomeMessage();               
        addToggleButton("highlights-heading"); 
        addToggleButton("video-heading");
    } else if (title == "About Us") {
        addToggleButton("what-you-can-find-heading");
    } else if (title == "Events") {
        addEventTools();                    
        addToggleButton("event-tips-heading");
    } else if (title == "Gallery") {
        addSlideshow();                     
    } else if (title == "Contact Us") {
        setUpContactForm();                
        addToggleButton("help-heading");
    }

    addDarkModeButton(); 
}
