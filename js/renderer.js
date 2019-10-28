const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

Renderer = new class Renderer{
    constructor() {
        this.canvas = canvas;
        this.ctx = ctx;


        this.scrollX = 0;
        this.scrollY = 0;
    }

    clear() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    saveState(){
        this.ctx.save();
    }

    restoreState(){
        this.ctx.restore();
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     * @param {String} color 
     */
    fillRect(x, y, width, height, color) {

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    /**
     * 
     * @param {Image} image 
     * @param {Number} x 
     * @param {Number} y 
     */
    img(image, x, y) {
        this.ctx.drawImage(image, x, y);
    }

    text(dText) {
        this.color = dText.color;
        this.ctx.fillText(dText.text, dText.x, dText.y);
    }
}