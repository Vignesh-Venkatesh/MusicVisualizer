import { canvas } from './index.js';
import { analyser } from './audio.js';
import { dataArray } from './audio.js';

let barInput = document.getElementById("freq-number-bars");
let colorInput = document.getElementById("freq-bar-color");
let colorValue = "#ffffff"


let defaultNumBars = 128;
export function barViz(){

    // Number of Bars required
    barInput.addEventListener('input', ()=>{
        let barValue = barInput.value;

        if (barValue === "" || parseInt(barValue)>1500){
            defaultNumBars = 128
        }
        else {
            defaultNumBars = parseInt(barValue)
        }
    })

    // Changing the color of the visualizer
    colorInput.addEventListener('input', ()=>{
        colorValue = colorInput.value;
    })


    analyser.getByteTimeDomainData(dataArray);
    
    // creating the canvas object
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let bars = defaultNumBars;
    let barWidth = canvas.width / bars;
    let barHeightScale = canvas.height / 300;


    for (let i = 0; i < bars; i++) {
        let barHeight = dataArray[Math.floor(i * dataArray.length / bars)] * barHeightScale;
        let x = i * barWidth;
        let y = canvas.height - barHeight;

        ctx.fillStyle = colorValue;
        
        ctx.fillRect(x, y, barWidth - 1, barHeight, 10);
    }

    requestAnimationFrame(barViz);
}
