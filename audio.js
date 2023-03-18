let playButton = document.getElementById("play-btn");
let pauseButton = document.getElementById("pause-btn");
let stopButton = document.getElementById("stop-btn");

playButton.addEventListener("click", () => {
    console.log(audioContext);
    if (audioContext.state === "suspended"){
        audioContext.resume();
    }
    audio.play()
})

pauseButton.addEventListener("click", () => {
    audio.pause()
})

stopButton.addEventListener("click", () => {
    audio.pause()
    audio.currentTime = 0;
})

const audioContext = new AudioContext();

export let analyser;
export let dataArray;
export let fftsize = 512;
const importSongButton = document.getElementById("import-song-button");
const options = document.getElementById("myDropdown");
// When the user loads the page for the first time, the select options are not shown

options.style.display = "none"
export var audio = new Audio();

importSongButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.addEventListener("change", () => {
    const file = input.files[0];
    const fileName = document.getElementById("import-song-name")
    
    let displayFileName = ""
    if (file.name.length > 21){
        displayFileName = file.name.slice(0,8)+" ..... "+file.name.slice(-8)
    } else {
        displayFileName = file.name
    }
    fileName.innerHTML = displayFileName;
    // Select options are shown after the file has been chosen
    options.style.display = "flex"
    audio.src = URL.createObjectURL(file);
    
    });
    input.click();

    // creating a source
    const source = audioContext.createMediaElementSource(audio);

    // creating the analyser
    analyser = audioContext.createAnalyser();

    // set audio analyser
    analyser.fftsize = fftsize; // fast fourier transform
    let bufferLength = analyser.frequencyBinCount;
    // bufferLength = bufferLength;
    dataArray = new Uint8Array(bufferLength);

    // bind our analyser to the media element source
    source.connect(analyser);
    source.connect(audioContext.destination);

    
});