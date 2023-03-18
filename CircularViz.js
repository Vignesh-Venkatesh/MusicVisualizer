import { canvas } from './index.js';
import { analyser } from './audio.js';
import { dataArray } from './audio.js';


let barInput = document.getElementById("circular-number-bars");
let colorInput = document.getElementById("circular-bar-color");
let colorValue = "#ffffff"

let sliderInput = document.getElementById("circular-range-slider");
let sliderValue = 0;

let defaultNumBars = 128;
let maxBarLength = 60 / 2; // maximum bar length based on canvas size
let fixedPoint = {x: 480 / 2, y: 270 / 2}; // center of the canvas
export function CircularViz() {
    // Number of Bars required
    barInput.addEventListener('input', () => {
    const barValue = parseInt(barInput.value);
    if (barValue === '' || isNaN(barValue) || barValue > 1500) {
        defaultNumBars = 128;
    } else {
        defaultNumBars = barValue;
    }
    });

    // Changing the color of the visualizer
    colorInput.addEventListener('input', () => {
    colorValue = colorInput.value;
    });

    sliderInput.addEventListener('input', () => {
    sliderValue = parseFloat(sliderInput.value);
    });

    analyser.getByteTimeDomainData(dataArray);
    // creating the canvas object
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bars = defaultNumBars;
    const barWidth = 2 * Math.PI / bars;
    const barHeightScale = maxBarLength / 255; // maximum value in dataArray

    // Draw the bars outwards from the center of the disc
    for (let i = 0; i < bars; i++) {
        const amplitude = dataArray[Math.floor(i * dataArray.length / bars)];
        const barLength = amplitude * barHeightScale;
        const angle = i * barWidth;

        const x1 = fixedPoint.x + Math.cos(angle) * (maxBarLength + sliderValue) / 2;
        const y1 = fixedPoint.y + Math.sin(angle) * (maxBarLength + sliderValue) / 2;
        const x2 = fixedPoint.x + Math.cos(angle) * (maxBarLength + sliderValue) / 2 + barLength * Math.cos(angle);
        const y2 = fixedPoint.y + Math.sin(angle) * (maxBarLength + sliderValue) / 2 + barLength * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = colorValue;
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    requestAnimationFrame(CircularViz);
}
  