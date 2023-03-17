import { canvas } from './index.js';

export function waveFormViz(){
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 50, 50);
}
