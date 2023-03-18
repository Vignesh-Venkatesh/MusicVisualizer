import { barViz } from "./BarViz.js";
import { waveFormViz } from "./WaveformViz.js";
import { CircularViz } from "./CircularViz.js";

// animationID = {0: "Home", 1:"BarViz", 2:"CircularViz", 3:"WaveFormViz"}

// Get the canvas element
export var canvas = document.getElementById("myCanvas");

// Get the canvas context
export var ctx = canvas.getContext("2d");


let img = new Image()
img.src = "./Assets/welcome.png"
img.onload = function(){
    ctx.drawImage(img, 0, 0, 480, 270)
}


// Get the dropdown menu element
var dropdown = document.getElementById("myDropdown");

// Listen for the change event
dropdown.addEventListener("change", function() {
// Get the selected option value
    var selectedValue = dropdown.value;

    if (selectedValue === "option1"){
        // animationID = 1
        barViz();
    }

    else if (selectedValue === "option2"){
        // animationID = 2
        CircularViz();
    }

    else if (selectedValue === "option3"){
        // animationID = 3
        waveFormViz();
    }


    // Hide all the option divs
    var optionDivs = document.querySelectorAll(".option-div");
    optionDivs.forEach(function(optionDiv) {
        optionDiv.style.display = "none";
    });

    // Show the div with the corresponding id
    var selectedDiv = document.getElementById(selectedValue + "-div");
    selectedDiv.style.display = "block";
});
