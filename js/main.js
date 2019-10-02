

const mainDOM = document.getElementById("main");
const toolSelect = document.getElementById("toolSelect");
const tileSelect = document.getElementById("tileSelect");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let renderer = new Renderer(canvas, ctx);
let mouse = new Mouse(canvas);
let keys = new Keys(canvas);

var block = (n) => n * 16;

var scrollX = 0;
var scrollY = 0;

window.onload = () => {

    canvas.addEventListener('KeyW', () => scrollY--);
    canvas.addEventListener('KeyA', () => scrollX--);
    canvas.addEventListener('KeyS', () => scrollY++);
    canvas.addEventListener('KeyD', () => scrollX++);
    draw();
}

draw = () => {
    requestAnimationFrame(draw);
    renderer.clear();

    var lvl = () => Editor.activeLevel;

    lvl().tiles.forEach(tile => {
       renderer.img(sprites.tiles[tile.type], block(tile.x - scrollX), block(tile.y - scrollY));
    });

    //case '-': renderer.ctx.drawImage(sprites.tiles.platform, (k * 16) + (i * 1200) - scrollX, (j * 16) - scrollY); break;
    renderer.ctx.globalAlpha = .5;
    renderer.img(sprites.tiles[tileSelect.value], block(Editor.cursorX()), block(Editor.cursorY()));
    renderer.ctx.globalAlpha = 1;
    renderer.ctx.fillStyle = "#fff";
    renderer.ctx.fillText("X:" + Editor.cursorX() + " Y:" + Editor.cursorY(), 10, 10);
}