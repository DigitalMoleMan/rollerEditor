
update = () => {
    requestAnimationFrame(update);


    if(Mouse.x < 64) Renderer.scrollX+= 2;
            if(Mouse.x > Renderer.canvas.width - 64) Renderer.scrollX-= 2;
            if(Mouse.y < 64) Renderer.scrollY+= 2;
            if(Mouse.y > Renderer.canvas.height - 64) Renderer.scrollY-= 2;

    Renderer.clear();

    for (var i = 0; i < level.length; i++) {
        var lvl = level[i];
        for (var j = 0; j < lvl.layout.length; j++) {
            var row = lvl.layout[j];
            for (var k = 0; k < row.length; k++) {
                var tile = row[k];
                switch (tile) {
                    case 'X': {
                        Renderer.ctx.drawImage(sprites.tiles.block, (k * 16) + (i * 1200) + Renderer.scrollX, (j * 16)+ Renderer.scrollY);
                    }
                }
            }
        }
    }

    Renderer.fillRect(Mouse.x, Mouse.y, 1, 1, "#fff");
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
        this.ctx.scale(1, 1);

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

let Mouse = new class {
    constructor() {
        Renderer.canvas.addEventListener('mousemove', (e) => {
            this.x = e.offsetX;
            this.y = e.offsetY;

            
        })
    }
}

let Keys = new class {
    constructor(){
        Renderer.canvas.addEventListener('keydown', (e) => {

        })
    }
}
