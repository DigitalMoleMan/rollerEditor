
var block = (n) => n * 16;

const mainDOM = document.getElementById("main");
const toolSelect = document.getElementById("toolSelect");
const tileSelect = document.getElementById("tileSelect");

const canvas = document.getElementById('canvas');

canvas.addEventListener('contextmenu', event => event.preventDefault());

canvas.width = block(58);
canvas.height = block(24);
const ctx = canvas.getContext('2d');


let renderer = new Renderer(canvas, ctx);
let mouse = new Mouse(canvas);
let keys = new Keys(canvas);


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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestAnimationFrame(draw);
    renderer.clear();

    
    lvl = () => Editor.activeLevel;
    lvl().tiles.forEach(tile => {
        var tSprite = sprites.tiles[tile.type];
        var tX = block(tile.x - scrollX);
        var tY = block(tile.y - scrollY)
        renderer.img(tSprite, tX, tY);
    });

    //case '-': renderer.ctx.drawImage(sprites.tiles.platform, (k * 16) + (i * 1200) - scrollX, (j * 16) - scrollY); break;
    renderer.ctx.globalAlpha = .5;
    renderer.img(sprites.tiles[tileSelect.value], block(Editor.cursorX()), block(Editor.cursorY()));
    renderer.ctx.globalAlpha = 1;
    renderer.ctx.fillStyle = "#fff";
    renderer.ctx.fillText("X:" + (Editor.cursorX() + scrollX) + " Y:" + (Editor.cursorY() + scrollY), block(11), block(5));
}