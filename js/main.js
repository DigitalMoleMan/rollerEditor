const mainDOM = document.getElementById("main");
const toolSelect = document.getElementById("toolSelect");
const tileSelect = document.getElementById("tileSelect");

let Renderer = new class {
    constructor(options = {
        width: 920,
        height: 720
    }) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = options.width;
        this.canvas.height = options.height;

        this.zoom = 1;
        

        mainDOM.appendChild(this.canvas);


        this.scrollX = 0;
        this.scrollY = 0;
    }

    clear() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fillRect(x, y, w, h, c) {

        this.ctx.fillStyle = c;
        this.ctx.fillRect(x, y, w, h);
    }
}

Mouse = new class {
    constructor() {
        Renderer.canvas.addEventListener('mousemove', (e) => {
            this.x = Math.floor((e.offsetX / 16));
            this.y = Math.floor((e.offsetY / 16));


        })
        document.addEventListener('wheel', (e) => {
            var dy = (e.deltaY / 500);
            //Renderer.ctx.scale(dy, dy);
        })
    }
};

Keys = new class {
    constructor() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'KeyW': Renderer.scrollY -= 16; break;
                case 'KeyA': Renderer.scrollX -= 16; break;
                case 'KeyS': Renderer.scrollY += 16; break;
                case 'KeyD': Renderer.scrollX += 16; break;
            }
        })
    }
};

Editor = new class {
    constructor() {
        this.activeTool = () => tools[toolSelect.value];
        this.activeLevel = new Level({
            name: level[0].name,
            tiles: new Array,
            doors: new Array
        });

        this.cursorX = () => Mouse.x + (Renderer.scrollX / 16);
        this.cursorY = () => Mouse.y + (Renderer.scrollY / 16);

        Renderer.canvas.addEventListener("mousedown", () => this.activeTool().mouseDown());
        Renderer.canvas.addEventListener("mouseup", () => this.activeTool().mouseUp());
        Renderer.canvas.addEventListener("mousemove", () => this.activeTool().mouseMove());
    }

    newLevel() {
        this.activeLevel = new Level();
    }

    openLevel(e) {
        var input = e.target;

        var reader = new FileReader();
        reader.onload = () => {
            this.activeLevel = new Level(JSON.parse(reader.result));
        }
        reader.readAsText(input.files[0]);
    }

    saveLevel() {
        var levelString = JSON.stringify(this.activeLevel);
        console.log(levelString);
        /*
        var exportData = 'data:text/json;charset=utf-8,';
        exportData += escape(levelString);
        var encodedUri = encodeURI(exportData);
        window.open(encodedUri);
        */

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(levelString);
        var dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "level.json");
        dlAnchorElem.click();
    }
}

update = () => {
    requestAnimationFrame(update);

    Renderer.clear();
    

    var lvl = () => Editor.activeLevel;

    lvl().tiles.forEach(tile => {
        Renderer.ctx.drawImage(sprites.tiles[tile.type], (tile.x * 16) - Renderer.scrollX, (tile.y * 16) - Renderer.scrollY);
    });

    //case '-': Renderer.ctx.drawImage(sprites.tiles.platform, (k * 16) + (i * 1200) - Renderer.scrollX, (j * 16) - Renderer.scrollY); break;
    Renderer.ctx.globalAlpha = .5;
    Renderer.ctx.drawImage(sprites.tiles[tileSelect.value], Mouse.x * 16, Mouse.y * 16);
    Renderer.ctx.globalAlpha = 1;
    Renderer.ctx.fillStyle = "#fff";
    Renderer.ctx.fillText("X:" + Editor.cursorX() + " Y:" + Editor.cursorY(), 10, 10);
}

window.onload = () => {

    update();

}