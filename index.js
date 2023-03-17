import { barViz } from "./BarViz.js";
import { waveFormViz } from "./WaveformViz.js";

// animationID = {0: "Home", 1:"BarViz", 3:"WaveFormViz"}

// Get the canvas element
export var canvas = document.getElementById("myCanvas");

// Get the canvas context
export var ctx = canvas.getContext("2d");

var animationID = 0;

var x = 135;
var y = 80;
var width = 200;
var height = 100;

ctx.clearRect(0, 0, canvas.width, canvas.height);

let img = new Image()
img.src = "./Assets/welcome.png"
img.onload = function(){
    ctx.drawImage(img, 0, 0, 480, 270)
}



ctx.clearRect(0, 0, canvas.width, canvas.height);
// Draw the rectangle
ctx.fillStyle = "red";
ctx.fillRect(x, y, width, height);


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
