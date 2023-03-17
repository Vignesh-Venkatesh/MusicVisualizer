import { fftsize } from './audio.js';
import { canvas } from './index.js';
import { analyser } from './audio.js';
import { dataArray } from './audio.js';

let barInput = document.getElementById("number-bars");
let colorInput = document.getElementById("bar-color");
let colorValue = "#ffffff"

let barfftsize = 128;
export function barViz(){

    // Number of Bars required
    barInput.addEventListener('input', ()=>{
        let barValue = barInput.value;

        if (barValue === "" || parseInt(barValue)>1500){
            barfftsize = 128
        }
        else {
            barfftsize = parseInt(barValue)
        }
    })

    colorInput.addEventListener('input', ()=>{
        colorValue = colorInput.value;
    })

    analyser.getByteTimeDomainData(dataArray);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let bars = barfftsize;
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
