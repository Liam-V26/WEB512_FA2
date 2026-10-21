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