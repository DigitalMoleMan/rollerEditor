class Renderer{
    constructor(canvas, ctx) {


        this.canvas = canvas;
        this.ctx = ctx;
        this.zoom = 1;


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

    img(image, x, y){
        this.ctx.drawImage(image, x, y);
    }
}

