

const toolSelect = document.getElementById("toolSelect");
const tileSelect = document.getElementById("tileSelect");

// Canvas + Context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// Prevent context menu on right click.
canvas.addEventListener('contextmenu', event => event.preventDefault());


//block size.
block = (n) => n * 16;


let renderer = new Renderer(canvas, ctx);
let mouse = new Mouse(canvas);


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

    setCanvasSize(window.innerWidth, window.innerHeight)


    renderer.clear();

    lvl = () => Editor.activeLevel;
    
    lvl().tiles.forEach(tile => {
        var tSprite = sprites.tiles[tile.type];
        var tX = block(tile.x - scrollX);
        var tY = block(tile.y - scrollY);
        renderer.img(tSprite, tX, tY);
    });


    renderer.ctx.globalAlpha = .5;
    renderer.img(sprites.tiles[tileSelect.value], block(Editor.cursorX()), block(Editor.cursorY()));
    renderer.ctx.globalAlpha = 1;

    renderer.ctx.fillStyle = "#fff";
    //console.log(mouse);

}

setCanvasSize = (width, height) => {
    canvas.width = width;
    canvas.height = height;
}