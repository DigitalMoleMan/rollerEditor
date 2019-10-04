class Mouse{
    constructor(element) {
        element.addEventListener('mousemove', (e) => {
            this.x = e.offsetX;
            this.y = e.offsetY;
           
        })
        element.addEventListener('mousedown', (e) => {
            console.log(e);
        })
        element.addEventListener('wheel', (e) => {
            console.log(e);
            //Renderer.ctx.scale(dy, dy);
        })
    }
};

class Keys {
    constructor(element) {
        document.addEventListener('keydown', (e) => {
            element.dispatchEvent(new Event(e.code));
        })
    }
};

