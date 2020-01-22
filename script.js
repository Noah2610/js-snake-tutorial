const width = 800;
const height = 800;
const framerate = 2;
const step = 32;

let direction = "r";
const w = 32;
const h = 32;
let x = 0;
let y = 0;

function setup() {
    createCanvas(width, height);
    frameRate(framerate); //zwei mal pro Sekunde wird draw ausgeführt
}
function keyPressed() {
    switch (String.fromCharCode(keyCode)) {
        case "A": 
    }
} 
function draw() {
    if (keyIsDown(87)) { //87 ist w
        direction = "u";
    } else if (keyIsDown(65)) { //a
        direction = "l";
    } else if (keyIsDown(83)) { //s
        direction = "d";
    } else if (keyIsDown(68)) { //d 
        direction = "r";
    }
    switch (direction) {
        case "l": 
            x -= step;
            break;
        case "r": 
            x += step;
            break;
        case "u":
            y -= step;
            break;
        case "d":
            y += step;
            break;
    }

    //zeichnet das spiel - drawing
    background(128, 128, 128);
    fill(255, 0, 0);
    rect(x, y, w, h);
}