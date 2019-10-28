

const toolSelect = document.getElementById("toolSelect");
const tileSelect = document.getElementById("tileSelect");

// Prevent context menu on right click.
canvas.addEventListener('contextmenu', event => event.preventDefault());


//block size.
tilesToPx = (n) => n * 16;
pxToTiles = (n) => Math.floor(n / 16);

let mouse = new Mouse(canvas);

window.onload = () => {
    Editor.loadLevelFromLocalStorage('test');
    draw();
}

draw = () => {
    requestAnimationFrame(draw);

    setCanvasSize(window.innerWidth, window.innerHeight)


    Renderer.clear();
    
    

    Editor.draw();
/*
    Renderer.ctx.globalAlpha = .5;
    Renderer.img(sprites.tiles[tileSelect.value], block(Editor.cursorX()), block(Editor.cursorY()));
    Renderer.ctx.globalAlpha = 1;
    */

    Renderer.ctx.fillStyle = "#fff";
    //console.log(mouse);

}

setCanvasSize = (width, height) => {
    canvas.width = width;
    canvas.height = height;
}