const tileSelect = document.getElementById("tileSelect");


update = () => {
    requestAnimationFrame(update);

   // if (Renderer.canvas.width !== window.innerWidth) Renderer.canvas.width = window.innerWidth;
  //  if (Renderer.canvas.height !== window.innerHeight) Renderer.canvas.height = window.innerHeight;

    Renderer.clear();

    for (var i = 0; i < level.length; i++) {

        var lvl = level[i];
        for (var j = 0; j < lvl.layout.length; j++) {
            var row = lvl.layout[j];
            for (var k = 0; k < row.length; k++) {
                var tile = row[k];
                switch (tile) {
                    case 'X': Renderer.ctx.drawImage(sprites.tiles.block, (k * 16) + (i * 1200) - Renderer.scrollX, (j * 16) - Renderer.scrollY); break;
                    //case '-': Renderer.ctx.drawImage(sprites.tiles.platform, (k * 16) + (i * 1200) - Renderer.scrollX, (j * 16) - Renderer.scrollY); break;
                }
            }
        }
    }

    Renderer.ctx.drawImage(sprites.tiles[tileSelect.value], (Math.floor((Mouse.x / 16))) * 16, (Math.floor((Mouse.y / 16))) * 16);
}

window.onload = () => update();

let Renderer = new class {
    constructor(options = {
        width: 920,
        height: 720
    }) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = options.width;
        this.canvas.height = options.height;

        document.body.appendChild(this.canvas);


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
            this.x = e.offsetX;
            this.y = e.offsetY;


        })
    }
}

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
}
